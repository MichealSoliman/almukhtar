import os
import re
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

html_files = []
for root, dirs, files in os.walk(BASE_DIR):
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
    if '.git' in dirs:
        dirs.remove('.git')
    for f in sorted(files):
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

print(f"Total HTML files found: {len(html_files)}")
assert len(html_files) == 66, f"Expected 66 HTML files, found {len(html_files)}"

checks = {
    'forbidden_phone_0563806459': re.compile(r'0563806459'),
    'href_index_html': re.compile(r'href\s*=\s*["\'][^"\']*index\.html[^"\']*["\']', re.IGNORECASE),
    'meta_keywords': re.compile(r'<meta\s+name=["\']keywords["\']', re.IGNORECASE),
    'taqeem_mowathaq': re.compile(r'تقييم موثق'),
    'ameel_mowathaq': re.compile(r'عميل موثق'),
    'false_survey_65pct': re.compile(r'65%'),
    'typo_raeesia': re.compile(r'الرائيس[ية]'),
    'keyword_block': re.compile(r'الكلمات المفتاحية:'),
    'mutawajid_alan': re.compile(r'متواجد الآن'),
}

findings = {k: [] for k in checks}
json_errors = []

for file_path in html_files:
    rel_path = os.path.relpath(file_path, BASE_DIR).replace('\\', '/')
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    for k, pattern in checks.items():
        matches = pattern.findall(content)
        if matches:
            findings[k].append((rel_path, len(matches)))

    # Validate JSON-LD
    json_scripts = re.findall(r'<script\s+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', content, re.DOTALL | re.IGNORECASE)
    for idx, js in enumerate(json_scripts):
        try:
            json.loads(js.strip())
        except Exception as e:
            json_errors.append((rel_path, idx + 1, str(e)))

print("\n--- FORBIDDEN TERMS AUDIT RESULTS ---")
all_passed = True
for k, results in findings.items():
    if results:
        all_passed = False
        print(f"FAILED: {k} found in {len(results)} files:")
        for r in results:
            print(f"   {r[0]}: {r[1]} occurrences")
    else:
        print(f"PASSED: {k} -> 0 occurrences")

print("\n--- JSON-LD SYNTAX VALIDATION RESULTS ---")
if json_errors:
    all_passed = False
    print(f"FAILED: {len(json_errors)} JSON-LD blocks with syntax errors:")
    for err in json_errors:
        print(f"   {err[0]} block {err[1]}: {err[2]}")
else:
    print("PASSED: All JSON-LD scripts across all 66 HTML files are valid JSON.")

print(f"\nOVERALL VERIFICATION: {'PASSED PERFECTLY' if all_passed else 'NEEDS ATTENTION'}")

