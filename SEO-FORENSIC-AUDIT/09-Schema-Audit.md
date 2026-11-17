# 09 — تدقيق البيانات المنظمة (Schema)

**المنهجية:** تحليل كل كتل `application/ld+json` في 64 صفحة بـ `json.loads` + فحص القيم عبر الصفحات.
**التحقق الرسمي المطلوب لاحقاً:** [Rich Results Test](https://search.google.com/test/rich-results) و [Schema Markup Validator](https://validator.schema.org/) لكل صفحة، + تقرير Enhancements في Search Console.

## 1. الصحة النحوية
✅ **0 أخطاء JSON** في كل الصفحات. كل الكتل تُحلَّل بنجاح.

## 2. الأنواع المستخدمة
MovingCompany (معظم الصفحات)، Organization، LocalBusiness، FAQPage، BreadcrumbList، Article، Service، WebPage، ContactPage، AboutPage، HowTo، ItemList، CollectionPage، Offer، AggregateRating، City، Place، GeoCoordinates، OpeningHoursSpecification. الصفحات بلا Schema: `/blog/protect-the-furniture-during-transport/`, `/privacy-policy/`.

## 3. المشاكل (مرتبة حسب الخطورة)

### S1 — AggregateRating ذاتي غير مدعوم بمراجعات ظاهرة ❌ (عالي)
| الصفحة | ratingValue | reviewCount |
|---|---|---|
| /areas/hayu-albasatin/ | 4.9 | 187 |
| /areas/hayu-alsafa/ | 4.9 | 215 |
| /areas/jeddah-to-alshaati/ | 4.9 | 228 |
| /blog/how-to-choose-a-furniture-moving-company-in-jeddah/ | 4.9 | 187 |
| /cities/jeddah-to-riyadh/ | 4.9 | 340 |
| /cities/jeddah-to-taif/ | 4.9 | 260 |

- لا توجد عُقد `Review` في أي صفحة، ولا مراجعات ظاهرة بهذه الأعداد.
- أعداد مختلفة لنفس الشركة في صفحات مختلفة.
- إرشادات Google: تقييمات LocalBusiness/Organization **التي يضعها النشاط عن نفسه (self-serving) غير مؤهلة** لـ Rich Results، والبيانات المنظمة التي لا تعكس المحتوى الظاهر قد تؤدي لـ **Manual Action (Structured data issue)**.
- **الإجراء:** إزالة AggregateRating من الصفحات الست.

### S2 — تعارض هوية الكيان (@id والاسم) ❌ (عالي)
- `https://almukhtar-moving.com/#organization` يُستخدم كـ `@id` لأنواع مختلفة (Organization، MovingCompany، LocalBusiness) **بأسماء مختلفة** ("شركة المختار لنقل العفش"، "…بجدة"، "شركة المختار - ارخص شركة نقل عفش بجدة").
- `https://almukhtar-moving.com/#localbusiness` بأسماء مختلفة ("شركة المختار لنقل العفش بجدة" و"شركة نقل عفش حي الصالحية جدة").
- 36 صفحة تعرّف MovingCompany جديدة بلا `@id` → جوجل يرى عشرات الكيانات المنفصلة.
- **الإجراء:** كيان واحد معرّف بالكامل في الرئيسية بـ `@id` ثابت واسم ثابت؛ باقي الصفحات تشير له بـ `{"@id": "…/#organization"}` فقط.

### S3 — فروع وعناوين وهمية محتملة ❌ (عالي — يحتاج تأكيد من العميل)
- `MovingCompany "شركة المختار لنقل العفش - فرع حي الصفا"` و`"- فرع حي الشاطئ"` بعنوان "طريق الكورنيش، بالقرب من ردسي مول".
- 7 عناوين شارع و6 إحداثيات مختلفة (انظر 08).
- إن لم تكن هذه فروعاً حقيقية → بيانات مضللة.

### S4 — sameAs وهمية ❌ (متوسط)
`sameAs` يحتوي `https://facebook.com/`، `https://instagram.com/`، `https://x.com/`، `https://twitter.com/` (الصفحات الرئيسية للمنصات، وليس حسابات الشركة) + الموقع نفسه + رابط واتساب. هذا لا يضيف أي إشارة ويبدو مُصطنعاً. **الإجراء:** فقط روابط حسابات حقيقية للشركة (وGBP)، أو حذف sameAs.

### S5 — openingHours متعارضة ⚠️ (متوسط)
`Mo-Su 00:00-23:59` (11 صفحة) مقابل `Sa-Th 08:00-22:00` (1) مقابل نص صفحة التواصل (سبت-خميس 8-10، جمعة 4-10).

### S6 — priceRange بـ 14 قيمة مختلفة ⚠️ (متوسط)
`$$` (28)، `250+ SAR` (8)، `SAR 800 - SAR 9500`، `150 - 4000 SAR`، `350-2500 SAR`… — أسعار غير معتمدة من العميل.

### S7 — FAQPage ℹ️ (منخفض)
منذ 2023 تعرض Google نتائج FAQ Rich Results لمواقع حكومية/صحية موثوقة فقط. وجودها غير ضار لكن **لن يُنتج Rich Result**. يجب أن تتطابق الأسئلة مع النص الظاهر — تحقق بأداة Rich Results.

### S8 — Schema تجارية في المقالات ⚠️ (متوسط)
`MovingCompany`/`LocalBusiness` + `Offer` داخل مقالات (`best-moving-company`, `cheapest`, `najjar`, `moving-electrical-appliances`, `furniture-moving-prices`) — تعزز التنافس مع الرئيسية (انظر 06). المقالات يكفيها `Article` + `BreadcrumbList` + `publisher: {"@id": "#organization"}`.

### S9 — أنواع غير مناسبة ℹ️
- `HowTo` في `/blog/steps-for-moving-furniture/` — أوقفت Google Rich Results لـ HowTo (2023). غير ضار.
- `"@type": "blog"` بأحرف صغيرة في `/blog/` — نوع غير صالح (الصحيح `Blog`).

## 4. ما يعمل بشكل صحيح ✅
- BreadcrumbList في معظم الصفحات الداخلية.
- الهاتف متسق في كل Schema.
- canonical وurl في Schema متطابقان مع URL الصفحة.

## 5. الهيكل الموصى به (للتنفيذ بعد الموافقة)
```
الرئيسية: MovingCompany (@id …/#organization) — اسم واحد، عنوان حقيقي واحد أو areaServed فقط إن كان SAB، هاتف، ساعات حقيقية، sameAs حقيقية + WebSite
صفحات الخدمات: Service {provider: {@id …/#organization}, areaServed: جدة} + BreadcrumbList
الأحياء: Service {areaServed: Place الحي} + BreadcrumbList — بلا MovingCompany جديدة وبلا AggregateRating
المقالات: Article {publisher: {@id}} + BreadcrumbList
التواصل: ContactPage + mainEntity {@id}
```
