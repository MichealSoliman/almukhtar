# تحليل التنافس الذاتي لمجموعة الصفحات التجارية (Cannibalization Analysis)

**المشروع:** almukhtar-moving.com  
**المجموعة المستهدفة:** 8 صفحات كبرى تتنافس على الكلمة الرئيسية ومشتقاتها.  
**بيانات Search Console:** غير متوفرة في المجلد (تم الاعتماد على التدقيق الدلالي المعمق وتحليل Shingles 5-grams).  

## 1. جدول بيانات المجموعة المستهدفة

| URL | النية الحالية | الكلمة الأساسية المستهدفة | عدد الكلمات | التوصية الإستراتيجية |
| :--- | :---: | :--- | :---: | :--- |
| `/` | تجارية عامة | شركة نقل عفش جدة | 2864 | **Keep (الصفحة الرسمية الأم)** |
| `/blog/best-moving-company-jeddah/` | تجارية فرعية | أفضل شركة نقل عفش بجدة | 1736 | **Reposition (تحويل لمقال معايير معلوماتي)** |
| `/blog/how-to-choose-a-furniture-moving-company-in-jeddah/` | معلوماتية إرشادية | كيف تختار شركة نقل عفش بجدة؟ | 1019 | **Keep (معلوماتية إرشادية)** |
| `/blog/comparison-between-furniture-moving-companies/` | مقارنة | مقارنة بين شركات نقل الأثاث في الرياض وجدة | 1599 | **Keep (مقارنة محايدة)** |
| `/blog/cheapest-furniture-moving-company-in-jeddah/` | تجارية فرعية | ارخص شركة نقل عفش بجدة أسعار تبدأ من 300 ريال | 1595 | **Reposition (تحويل لمقال اقتصادي تحليلي)** |
| `/guaranteed-furniture-moving-company-jeddah/` | تجارية ثقة | شركة نقل عفش مضمونة بجدة 0561110020 | 2817 | **Keep (صفحة خدمة متخصصة)** |
| `/blog/furniture-moving-prices-in-Jeddah/` | معلوماتية إرشادية | اسعار نقل العفش في جدة 2026 — جدول تفصيلي | 4010 | **Keep (معلوماتية إرشادية)** |
| `/furniture-moving-within-jeddah/` | تجارية فرعية | نقل عفش داخل جدة | 3289 | **Keep (صفحة خدمة متخصصة)** |


## 2. مصفوفة التشابه النصي (Jaccard Similarity 5-Grams)

| الصفحة 1 | الصفحة 2 | نسبة التشابه النصي | التقييم |
| :--- | :--- | :---: | :--- |
| `/blog/how-to-choose-a-furniture-moving-company-in-jeddah/` | `/blog/comparison-between-furniture-moving-companies/` | **3.6%** | آمن ومتباعد (< 15%) |
| `/blog/how-to-choose-a-furniture-moving-company-in-jeddah/` | `/blog/furniture-moving-prices-in-Jeddah/` | **2.0%** | آمن ومتباعد (< 15%) |
| `/blog/comparison-between-furniture-moving-companies/` | `/blog/furniture-moving-prices-in-Jeddah/` | **1.8%** | آمن ومتباعد (< 15%) |
| `/` | `/blog/how-to-choose-a-furniture-moving-company-in-jeddah/` | **0.4%** | آمن ومتباعد (< 15%) |
| `/blog/best-moving-company-jeddah/` | `/blog/cheapest-furniture-moving-company-in-jeddah/` | **0.4%** | آمن ومتباعد (< 15%) |
| `/` | `/guaranteed-furniture-moving-company-jeddah/` | **0.4%** | آمن ومتباعد (< 15%) |
| `/blog/best-moving-company-jeddah/` | `/blog/how-to-choose-a-furniture-moving-company-in-jeddah/` | **0.3%** | آمن ومتباعد (< 15%) |
| `/` | `/blog/furniture-moving-prices-in-Jeddah/` | **0.3%** | آمن ومتباعد (< 15%) |
| `/` | `/blog/best-moving-company-jeddah/` | **0.3%** | آمن ومتباعد (< 15%) |
| `/blog/how-to-choose-a-furniture-moving-company-in-jeddah/` | `/furniture-moving-within-jeddah/` | **0.2%** | آمن ومتباعد (< 15%) |
| `/` | `/blog/comparison-between-furniture-moving-companies/` | **0.2%** | آمن ومتباعد (< 15%) |
| `/blog/best-moving-company-jeddah/` | `/blog/furniture-moving-prices-in-Jeddah/` | **0.2%** | آمن ومتباعد (< 15%) |
| `/blog/how-to-choose-a-furniture-moving-company-in-jeddah/` | `/guaranteed-furniture-moving-company-jeddah/` | **0.2%** | آمن ومتباعد (< 15%) |
| `/blog/best-moving-company-jeddah/` | `/blog/comparison-between-furniture-moving-companies/` | **0.2%** | آمن ومتباعد (< 15%) |
| `/` | `/furniture-moving-within-jeddah/` | **0.2%** | آمن ومتباعد (< 15%) |
| `/blog/cheapest-furniture-moving-company-in-jeddah/` | `/furniture-moving-within-jeddah/` | **0.1%** | آمن ومتباعد (< 15%) |
| `/blog/comparison-between-furniture-moving-companies/` | `/guaranteed-furniture-moving-company-jeddah/` | **0.1%** | آمن ومتباعد (< 15%) |
| `/guaranteed-furniture-moving-company-jeddah/` | `/blog/furniture-moving-prices-in-Jeddah/` | **0.1%** | آمن ومتباعد (< 15%) |
| `/` | `/blog/cheapest-furniture-moving-company-in-jeddah/` | **0.1%** | آمن ومتباعد (< 15%) |
| `/blog/furniture-moving-prices-in-Jeddah/` | `/furniture-moving-within-jeddah/` | **0.1%** | آمن ومتباعد (< 15%) |
| `/blog/cheapest-furniture-moving-company-in-jeddah/` | `/blog/furniture-moving-prices-in-Jeddah/` | **0.1%** | آمن ومتباعد (< 15%) |
| `/blog/best-moving-company-jeddah/` | `/furniture-moving-within-jeddah/` | **0.0%** | آمن ومتباعد (< 15%) |
| `/blog/how-to-choose-a-furniture-moving-company-in-jeddah/` | `/blog/cheapest-furniture-moving-company-in-jeddah/` | **0.0%** | آمن ومتباعد (< 15%) |
| `/blog/best-moving-company-jeddah/` | `/guaranteed-furniture-moving-company-jeddah/` | **0.0%** | آمن ومتباعد (< 15%) |
| `/blog/comparison-between-furniture-moving-companies/` | `/furniture-moving-within-jeddah/` | **0.0%** | آمن ومتباعد (< 15%) |
| `/guaranteed-furniture-moving-company-jeddah/` | `/furniture-moving-within-jeddah/` | **0.0%** | آمن ومتباعد (< 15%) |
| `/blog/comparison-between-furniture-moving-companies/` | `/blog/cheapest-furniture-moving-company-in-jeddah/` | **0.0%** | آمن ومتباعد (< 15%) |
| `/blog/cheapest-furniture-moving-company-in-jeddah/` | `/guaranteed-furniture-moving-company-jeddah/` | **0.0%** | آمن ومتباعد (< 15%) |


## 3. خطة إعادة التموضع الآمنة (Repositioning Plan)

لتجنب تنافس مقالات المدونة مع الصفحة الرئيسية على كلمة «شركة نقل عفش جدة»:
1. **صفحة `/blog/best-moving-company-jeddah/`:**
   - **العنوان القديم:** أفضل شركة نقل عفش بجدة 0561110020 | نقل أثاث احترافي وضمان شامل
   - **العنوان الجديد (Reposition):** معايير اختيار أفضل شركة نقل عفش بجدة | دليل المختار الشامل
   - **H1 الجديد:** أهم معايير اختيار أفضل شركة نقل عفش بجدة المعتمدة
   - **النية:** معلوماتية استشارية بدلاً من تجارية بيعية مباشرة، لحماية أولوية الصفحة الرئيسية.

2. **صفحة `/blog/cheapest-furniture-moving-company-in-jeddah/`:**
   - **العنوان القديم:** ارخص شركة نقل عفش بجدة 0561110020 | خصم 30% وأسعار تبدأ من 250 ريال
   - **العنوان الجديد (Reposition):** كيف تجد أرخص شركة نقل عفش بجدة دون التضحية بالجودة؟
   - **H1 الجديد:** دليل العثور على أرخص أسعار نقل العفش بجدة مع الحفاظ على الأمان
   - **النية:** مقال اقتصادي توعوي يوجه الزائر للرئيسية لمعرفة الأسعار الحقيقية.
