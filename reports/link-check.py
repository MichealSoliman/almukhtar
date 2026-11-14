import os
import re
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

broken_links = []
index_html_links = []
bad_ext_links = []
self_links = []
no_href_anchors = []

a_tag_regex = re.compile(r'<a\b([^>]*)>(.*?)</a>', re.IGNORECASE | re.DOTALL)
href_regex = re.compile(r'href\s*=\s*["\'](.*?)["\']', re.IGNORECASE)

for file_path in html_files:
    rel_file = os.path.relpath(file_path, BASE_DIR).replace('\\', '/')
    # determine canonical url of this file
    if rel_file == 'index.html':
        curr_page_url = '/'
    elif rel_file.endswith('/index.html'):
        curr_page_url = '/' + rel_file[:-len('index.html')]
    else:
        curr_page_url = '/' + rel_file

    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    for match in a_tag_regex.finditer(content):
        attrs = match.group(1)
        anchor_text = re.sub(r'<[^>]+>', '', match.group(2)).strip()
        anchor_text = ' '.join(anchor_text.split())

        h_match = href_regex.search(attrs)
        if not h_match:
            no_href_anchors.append({
                'file': rel_file,
                'attrs': attrs.strip(),
                'text': anchor_text
            })
            continue

        raw_href = h_match.group(1).strip()
        
        # Skip external, non-http protocols, or template literals
        if raw_href.startswith(('tel:', 'mailto:', 'javascript:', '#', '${')):
            continue

        parsed = urlparse(raw_href)
        if parsed.netloc and DOMAIN not in parsed.netloc:
            # External domain
            continue

        # Check for index.html in href
        if 'index.html' in raw_href:
            index_html_links.append({
                'file': rel_file,
                'href': raw_href,
                'text': anchor_text
            })

        # Check for bad extensions like .webp/ or .html/
        if re.search(r'\.(webp|png|jpg|jpeg|html)/', raw_href, re.IGNORECASE):
            bad_ext_links.append({
                'file': rel_file,
                'href': raw_href,
                'text': anchor_text
            })

        # Resolve path
        path_part = parsed.path
        if not path_part:
            path_part = '/'

        # Normalize relative path
        if not path_part.startswith('/'):
            # relative to current file directory
            cur_dir = os.path.dirname(rel_file)
            resolved = os.path.normpath(os.path.join(cur_dir, path_part)).replace('\\', '/')
            if not resolved.startswith('/'):
                resolved = '/' + resolved
        else:
            resolved = path_part

        # Ensure trailing slash if no extension
        if not os.path.splitext(resolved)[1] and not resolved.endswith('/'):
            resolved += '/'

        # Check self-link (ignore '#' only)
        if resolved == curr_page_url and not parsed.fragment:
            self_links.append({
                'file': rel_file,
                'href': raw_href,
                'text': anchor_text
            })

        # Check existence on disk
        target_fs_path = None
        if resolved == '/':
            target_fs_path = os.path.join(BASE_DIR, 'index.html')
        elif resolved.endswith('/'):
            target_fs_path = os.path.join(BASE_DIR, resolved.lstrip('/'), 'index.html')
        else:
            target_fs_path = os.path.join(BASE_DIR, resolved.lstrip('/'))

        if not os.path.exists(target_fs_path):
            broken_links.append({
                'file': rel_file,
                'href': raw_href,
                'resolved': resolved,
                'text': anchor_text
            })

report_path = os.path.join(BASE_DIR, 'reports', 'link_check_results.txt')
with open(report_path, 'w', encoding='utf-8') as out:
    out.write("=== LINK CHECK REPORT ===\n\n")
    out.write(f"Total HTML files checked: {len(html_files)}\n")
    out.write(f"1. Broken Links: {len(broken_links)}\n")
    for b in broken_links:
        out.write(f"   - File: {b['file']} | Href: {b['href']} | Text: {b['text']} | Target checked: {b['resolved']}\n")
    
    out.write(f"\n2. Links containing 'index.html': {len(index_html_links)}\n")
    for b in index_html_links:
        out.write(f"   - File: {b['file']} | Href: {b['href']} | Text: {b['text']}\n")

    out.write(f"\n3. Bad Extension Links (.webp/ or .html/): {len(bad_ext_links)}\n")
    for b in bad_ext_links:
        out.write(f"   - File: {b['file']} | Href: {b['href']} | Text: {b['text']}\n")

    out.write(f"\n4. Self-referencing links: {len(self_links)}\n")
    for b in self_links:
        out.write(f"   - File: {b['file']} | Href: {b['href']} | Text: {b['text']}\n")

    out.write(f"\n5. Anchors without href: {len(no_href_anchors)}\n")
    for b in no_href_anchors:
        out.write(f"   - File: {b['file']} | Text: {b['text']} | Attrs: {b['attrs']}\n")

print("Link check completed.")
print(f"Broken: {len(broken_links)}, index.html: {len(index_html_links)}, Bad ext: {len(bad_ext_links)}, Self: {len(self_links)}, No href: {len(no_href_anchors)}")
