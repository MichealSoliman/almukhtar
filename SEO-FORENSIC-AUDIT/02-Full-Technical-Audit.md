# 02 — التدقيق التقني الشامل (Full Technical Audit)

**تاريخ الفحص:** 2026-11-17 · **النطاق:** 66 ملف HTML في المستودع + فحص حي (HEAD) لكل روابط السايت ماب و19 مسار اختباري.
**الأدوات:** سكربت Python (BeautifulSoup) لاستخراج العناصر، `curl -I` على الموقع الحي، `git log/show` للتاريخ.
**قيد مهم:** طلبات GET الآلية تعيد 403 (حماية بوتات من Hostinger CDN `hcdn`) بينما طلبات HEAD تعيد الحالة الحقيقية. لا يعني ذلك أن Googlebot الحقيقي محجوب، لكن **يجب التحقق عبر أداة فحص الروابط (URL Inspection) في Search Console** (انظر 18).

**تأكيد تطابق الإنتاج مع المستودع:** ETag الصفحة الرئيسية الحية `328bb` = 207,035 بايت = حجم `index.html` المحلي تماماً، و`last-modified: Sat, 14 Nov 2026 09:07:52 GMT`. أي أن ما في المستودع هو المنشور فعلاً.

---

## A. الزحف والفهرسة (Crawling & Indexing)

| # | الفحص | النتيجة | الدليل | الحالة |
|---|---|---|---|---|
| A1 | حالة صفحات السايت ماب | 63/64 تعيد 200، وواحدة 301 | `live_status.tsv` (ملحق بالأسفل) | ⚠️ |
| A2 | `/furniture-lifting-crane-jeddah/` | **301 → `/furniture-moving-within-jeddah/`** رغم وجود صفحة كاملة (2,148 كلمة) | `.htaccess` السطران 1-2 (أضيفا في commit `daf2963` بتاريخ 2026-11-14) | ❌ مؤكد |
| A3 | التعارض حول صفحة الونش | الصفحة محوّلة لكنها: (1) في `sitemap.xml` السطر 39، (2) في النافبار `assets/js/load-navbar.js` (مصفوفة siteServices)، (3) في الفوتر `assets/js/load-footer.js` (مرتان)، (4) في **26 رابطاً داخلياً ثابتاً في 15 صفحة** | السايت ماب أزيلت منه ثم أُعيدت بعد 28 دقيقة في commit `2ca8c1c` بينما بقي التحويل | ❌ مؤكد |
| A4 | وجهة التحويل غير ذات صلة | "ونش رفع عفش" → "نقل عفش داخل جدة" (خدمة مختلفة). جوجل يعامل التحويل لصفحة غير مكافئة غالباً كـ **Soft 404** ولا ينقل الإشارات | استنتاج من إرشادات Google المعلنة | ⚠️ محتمل |
| A5 | Noindex | لا توجد أي صفحة noindex. `privacy-policy` بلا meta robots (افتراضياً index) | `04-Full-Page-Inventory.csv` | ✅ |
| A6 | robots.txt | `User-agent: * / Allow: / Sitemap: …` — صحيح ولا يحظر CSS/JS | `robots.txt` | ✅ |
| A7 | HTTP→HTTPS | `http://` → 301 → `https://` | فحص حي | ✅ |
| A8 | www → non-www | 301 → `https://almukhtar-moving.com/` | فحص حي | ✅ |
| A9 | `index.html` | `/about/index.html` → 301 → `/about/` | فحص حي | ✅ |
| A10 | Trailing slash | `/about` → 301 → `/about/` | فحص حي | ✅ |
| A11 | حساسية الأحرف | `/ABOUT/` → 404؛ `/blog/furniture-moving-prices-in-jeddah/` (حرف صغير) → **404** بينما الأصلية بحرف `J` كبير | فحص حي | ⚠️ (أي رابط خارجي بالأحرف الصغيرة سيضيع) |
| A12 | صفحة 404 الحقيقية | `/nonexistent-page-xyz/` → 404 حقيقي (ليس Soft 404) | فحص حي | ✅ |
| A13 | 410 Gone | 8 مسارات قديمة تعيد 410 (مثل `/furniture-moving-in-jeddah/`، `/blog/home-furniture-moving-jeddah/`) | `.htaccess` السطور 162-177 | ⚠️ إن كانت لهذه الروابط Backlinks فقد ضاعت قيمتها — يحتاج بيانات (18) |
| A14 | سلاسل التحويل | التحويلات القديمة قفزة واحدة إلى الوجهة النهائية؛ لكن طلب `http://…/old-url` = قفزتان (https ثم Redirect) | `.htaccess` | ℹ️ منخفض |
| A15 | ملفات غير مخصصة للنشر متاحة للعامة | `navbar.html` و`footer.html` (200، HTML بدون noindex)، `/reports/*.md` و`*.py` (200)، `package.json` (200)، `.vscode/settings.json` (200). `.git/` محمي (403) | فحص حي | ⚠️ مؤكد — يكشف استراتيجية SEO الداخلية وقد تُفهرس الأجزاء كصفحات رقيقة |
| A16 | BOM في `.htaccess` | السطر الأول يبدأ بـ `EF BB BF` (أضيف في `daf2963`). على Apache القياسي هذا يسبب **500 لكامل الموقع**؛ الخادم الحالي (Hostinger/LiteSpeed) يتسامح معه بدليل أن التحويلات تعمل | `od -c .htaccess` | ⚠️ خطر كامن عند تغيير الاستضافة |
| A17 | التنقل الأساسي يُحقن بالجافاسكربت | 59 صفحة تبني النافبار والفوتر عبر `load-navbar.js`/`load-footer.js`؛ الصفحة الرئيسية فقط تحتوي نافبار ثابتاً في HTML | `grep load-navbar` | ⚠️ جوجل يُرندر JS لكن الروابط تُكتشف في موجة الرندر الثانية؛ صفحات مثل `/about/` لديها **0 روابط داخلية ثابتة** في المحتوى |

## B. تدقيق Canonical

- **كل الصفحات الـ64 (عدا الجزأين navbar/footer) لها canonical ذاتي مطابق لـ URL النهائي.** ✅
- **الاستثناء الوحيد:** `/furniture-lifting-crane-jeddah/` canonical ذاتي لكن الخادم يحوّلها — تعارض بين الإشارتين.
- لا توجد صفحات تشير canonical لصفحة أخرى. ✅
- لا تعارض بين canonical والسايت ماب إلا في حالة الونش.

| URL | المشكلة | الإجراء المقترح |
|---|---|---|
| /furniture-lifting-crane-jeddah/ | canonical ذاتي + 301 + في السايت ماب | قرار واحد: إمّا إلغاء التحويل (موصى به — انظر 16) أو إزالتها من السايت ماب والقوائم والروابط |
| navbar.html / footer.html | لا canonical، 200، قابلة للفهرسة | منع الوصول أو `X-Robots-Tag: noindex` عبر .htaccess |

## C. Sitemap.xml

- XML صالح، 64 رابطاً، بدون BOM حالياً. ✅
- **رابط واحد محوَّل** (الونش). ❌
- **lastmod غير دقيق:** صفحات الأحياء معدّلة في 2026-11-14 (8 commits) لكن lastmod = `2026-10-10`؛ الرئيسية عُدّلت 2026-11-07 (`bc00383`) لكن lastmod = `2026-10-31`. جوجل يتجاهل lastmod إذا ثبت عدم دقته. ⚠️
- `priority` و`changefreq` يتجاهلهما جوجل — لا ضرر ولا فائدة.
- لا حاجة لتقسيم السايت ماب (64 رابطاً).
- لا توجد صفحات مهمة مفقودة من السايت ماب.

## D. Robots.txt
صحيح، لا مشاكل. لا يوجد ما يمنع ملفات `/reports/` من الزحف (لكن الحل الصحيح عدم نشرها أصلاً).

## E. الخادم وHTTP Headers (من الاستجابة الحية)

| العنصر | القيمة الحية | التقييم |
|---|---|---|
| الخادم | `Server: hcdn`, `platform: hostinger` | — |
| الضغط | `Content-Encoding: br` (Brotli) على HTML وCSS | ✅ |
| Cache-Control HTML | `public, max-age=3600` | ✅ |
| Cache-Control CSS/JS | `public, max-age=604800, must-revalidate` | ✅ |
| HTTP/3 | `alt-svc: h3` | ✅ |
| Security headers | nosniff, referrer-policy, permissions-policy, CSP upgrade-insecure-requests | ✅ |
| HSTS | غير موجود | ℹ️ منخفض — يمكن إضافته بعد التأكد من HTTPS على كل النطاقات الفرعية |
| TTFB (HEAD من أوروبا) | ~0.3–0.7 ث | ✅ مقبول (القياس من edge في فرانكفورت، ليس من السعودية) |

## F. موارد مفقودة (404) تؤثر على الصفحات

| المورد المفقود | الصفحات المتأثرة | الأثر |
|---|---|---|
| `/assets/js/services-dropdown.js` | **47 صفحة** (43 بمسار مطلق + 4 نسبي) | طلب 404 في كل صفحة؛ إن كانت القائمة المنسدلة تعتمد عليه فهي معطلة. تم التأكد حياً: 404 |
| `/assets/img/furniture-moving-in-Jeddah-{480,640,864}.avif` | الرئيسية (preload بأولوية high) | تحميل 3 ملفات 404 بأولوية عالية في بداية الصفحة — هدر لـ LCP |
| `/assets/img/responsive/*` (المجلد غير موجود) | الرئيسية (`<source>` داخل `<picture>` لبطاقتي مقالات) و2 مقالات (logo-168) | **في المتصفحات الداعمة لـ AVIF يختار المتصفح الـ source ولا يرجع للـ img عند 404 → الصورة تظهر مكسورة** |
| og:image مفقودة | `/apartment-furniture-moving-jeddah/`, `/blog/furniture-moving-without-damage/`, `/blog/glass-and-mirror-coating/`, `/blog/the-best-time-to-move-furniture/` | معاينة مكسورة عند المشاركة في واتساب/تويتر |

## G. ملاحظات تقنية أخرى
- **CSS خارجية متعددة الإصدارات:** Font Awesome يُحمّل بخمس إصدارات مختلفة عبر الموقع (6.0.0 في 45 صفحة، 6.0.0-beta3 في 11، 6.4.0، 6.5.0، 6.5.2)؛ وصفحتان تحمّلانه مرتين. AOS CSS في 31 صفحة.
- **`cdn.tailwindcss.com` (Tailwind runtime)** في صفحتين: `areas/hayu-alrubwa/`, `blog/protect-the-furniture-during-transport/` — سكربت ثقيل يولّد CSS في المتصفح ويحذّر منه Tailwind للإنتاج.
- **لا يوجد GA4 ولا GTM** في أي صفحة (فقط Cloudflare beacon في الرئيسية). لا يمكن قياس التحويلات.
- `google-site-verification` موجود في الرئيسية → يوجد حساب Search Console غالباً (لم يُتح لنا).

## ملحق: نتائج الفحص الحي (HEAD، 2026-11-17)
كل روابط السايت ماب = 200 عدا: `furniture-lifting-crane-jeddah/ → 301`.
مسارات اختبارية: `robots.txt 200` · `sitemap.xml 200` · `navbar.html 200` · `footer.html 200` · `reports/inventory.md 200` · `reports/anchor-audit.py 200` · `package.json 200` · `.vscode/settings.json 200` · `.git/HEAD 403` · `/ABOUT/ 404` · `/about 301` · `/about/index.html 301` · `/jeddah-furniture-moving-company/ 301→/` · `/blog/home-furniture-moving-jeddah/ 410` · `/blog/furniture-moving-prices-in-jeddah/ 404`.
