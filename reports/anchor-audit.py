import os
import re
import csv
from urllib.parse import urlparse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "almukhtar-moving.com"

html_files = []
for root, dirs, files in os.walk(BASE_DIR):
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
    if '.git' in dirs:
        dirs.remove('.git')
    for f in sorted(files):
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

# Standard canon for each file
def get_canonical(rel_file):
    if rel_file == 'index.html':
        return '/'
    elif rel_file.endswith('/index.html'):
        return '/' + rel_file[:-len('index.html')]
    return '/' + rel_file

# Check section position of an anchor
def get_position(pos, html):
    # nav, footer, or body
    nav_match = re.search(r'<nav\b.*?</nav>', html, re.DOTALL | re.IGNORECASE)
    if nav_match and nav_match.start() <= pos <= nav_match.end():
        return 'nav'
    footer_match = re.search(r'<footer\b.*?</footer>', html, re.DOTALL | re.IGNORECASE)
    if footer_match and footer_match.start() <= pos <= footer_match.end():
        return 'footer'
    # Check if inside related section
    # e.g., id="related" or class containing related
    rel_snippet = html[max(0, pos-200):min(len(html), pos+200)]
    if 'related' in rel_snippet.lower() or 'ذات صلة' in rel_snippet:
        return 'related'
    return 'body'

records = []
a_regex = re.compile(r'<a\b([^>]*)>(.*?)</a>', re.DOTALL | re.IGNORECASE)
href_regex = re.compile(r'href\s*=\s*["\'](.*?)["\']', re.IGNORECASE)

for fpath in html_files:
    rel_file = os.path.relpath(fpath, BASE_DIR).replace('\\', '/')
    source_url = get_canonical(rel_file)
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    for m in a_regex.finditer(html):
        attrs = m.group(1)
        raw_text = re.sub(r'<[^>]+>', '', m.group(2)).strip()
        anchor_text = ' '.join(raw_text.split())

        hm = href_regex.search(attrs)
        if not hm:
            continue
        href = hm.group(1).strip()
        if href.startswith(('tel:', 'mailto:', 'javascript:', '#', '${')):
            continue

        parsed = urlparse(href)
        if parsed.netloc and DOMAIN not in parsed.netloc:
            continue

        path = parsed.path or '/'
        if not path.startswith('/'):
            cur_dir = os.path.dirname(rel_file)
            path = '/' + os.path.normpath(os.path.join(cur_dir, path)).replace('\\', '/')
            if not path.startswith('/'):
                path = '/' + path
        if not os.path.splitext(path)[1] and not path.endswith('/'):
            path += '/'

        position = get_position(m.start(), html)

        records.append({
            'source': source_url,
            'anchor': anchor_text,
            'target': path,
            'position': position,
            'file': rel_file
        })

csv_path = os.path.join(BASE_DIR, 'reports', 'anchors.csv')
with open(csv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['source', 'anchor', 'target', 'position', 'file'])
    writer.writeheader()
    writer.writerows(records)

print(f"Extracted {len(records)} internal anchors to reports/anchors.csv")
