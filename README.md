# FocusBloom Pharmacy Edition

نسخة كاملة تعمل مباشرة على GitHub Pages بدون خادم.

## المزايا
- Pomodoro 25/5
- Deep Focus 50/10
- مؤقت حر
- مواد صيدلة
- Drug Vault
- Flashcards مع مراجعة متباعدة مبسطة
- Quiz Generator
- Study Planner
- Pharmacy Trainer
- سجل أخطاء
- إحصائيات
- إنجازات
- Daily Challenge
- مساعد صيدلة محلي
- رفع صورة دواء للمعاينة
- الوضع الداكن
- حفظ البيانات داخل المتصفح

## ملاحظات
- البيانات محفوظة محليًا على نفس الجهاز والمتصفح.
- مساعد الصيدلة يبحث فقط في Drug Vault.
- Scan Medicine يعرض الصورة فقط. التعرّف التلقائي يحتاج خدمة خارجية/API.
- لا يوجد تسجيل دخول أو مزامنة سحابية في هذه النسخة.

## النشر
ارفعي:
- index.html
- styles.css
- app.js

إلى مستودع GitHub Pages في الجذر ثم انتظري إعادة النشر.


## Medication Safety Upgrade
- Includes a curated starter library of common medications.
- Adds pregnancy, lactation, pediatric, geriatric, renal and hepatic considerations.
- Adds important warnings, interactions and monitoring.
- Uses cautious educational wording rather than absolute “safe/unsafe” claims.
- Primary reference basis: FDA/DailyMed official product labeling.
- Always verify the current official label and local clinical guidance.


# FocusBloom Pharmacy 2.0

## يعمل مباشرة بدون إعداد
- Drug Vault ومعلومات السلامة.
- بحث حي في openFDA Drug Label API.
- لوحة تقدم متقدمة.
- نظام XP ومستويات.
- كل الميزات المحلية السابقة.

## يحتاج إعداد Supabase
- إنشاء حساب وتسجيل دخول.
- حفظ البيانات ومزامنتها بين الأجهزة.
- مساعد صيدلة بالذكاء الاصطناعي.
- التعرف على عبوة الدواء من الصورة.

## خطوات تفعيل Supabase
1. أنشئي مشروعًا في Supabase.
2. افتحي SQL Editor وشغّلي `supabase/schema.sql`.
3. انسخي Project URL وPublishable/Anon Key إلى `config.js`.
4. أنشئي Edge Function باسم `pharmacy-ai` والصقي ملف:
   `supabase/functions/pharmacy-ai/index.ts`
5. أنشئي Edge Function باسم `medicine-vision` والصقي ملف:
   `supabase/functions/medicine-vision/index.ts`
6. أضيفي secret باسم `OPENAI_API_KEY` داخل Supabase Edge Functions Secrets.
7. لا تضعي مفتاح OpenAI داخل GitHub أو `config.js`.

## تنبيه
المساعد والتعرف على الصورة أدوات تعليمية وقد تخطئ، ولا يجوز استخدامها للتشخيص أو تحديد العلاج أو الجرعة.


# FocusBloom Pharmacy 3.0

## قاعدة الأدوية الكبيرة
لا يتم وضع آلاف الأدوية داخل ملف ثابت قد يصبح قديمًا. أضيفت واجهة Drug Explorer تبحث مباشرة في:
- RxNorm: الأسماء المعيارية، المنتجات السريرية، الأشكال والتركيزات وRxCUI.
- openFDA Drug Labels: الاستطبابات، التحذيرات، التداخلات، الآثار الجانبية والفئات الخاصة.

> "التركيزات المتاحة" ليست "جرعة موصى بها". الجرعة السريرية تتغير حسب المريض والاستطباب والبروتوكول.

## محلل ملفات المواد
يدعم استخراج النص من:
- PDF النصي
- PPTX
- DOCX
- TXT / MD / HTML

ثم يرسل النص إلى Supabase Edge Function `course-summarizer` لإنشاء:
- تلخيص شامل
- شرح مفصل
- أهم نقاط الامتحان
- أسئلة Active Recall
- MCQs
- Flashcards
- ورقة مراجعة أخيرة

## تفعيل محلل المواد
1. أنشئي Edge Function باسم `course-summarizer`.
2. الصقي `supabase/functions/course-summarizer/index.ts`.
3. تأكدي من وجود secret باسم `OPENAI_API_KEY`.
4. ضعي اسم الدالة داخل `config.js` (موجود مسبقًا).

## حدود مهمة
- ملفات PDF المصورة تحتاج OCR.
- الملفات الضخمة جدًا يفضّل تقسيمها حسب Chapter.
- الملخص يجب مراجعته مع السلايدات الأصلية لأن الذكاء الاصطناعي قد يخطئ أو يفوّت تفصيلًا.


# ASU Curriculum Upgrade
تمت إضافة الخطة الدراسية الظاهرة في صورة المستخدم من السنة الأولى حتى الخامسة، مع:
- تقسيم حسب السنة والفصل.
- إظهار رمز المادة والساعات والنوع.
- زر لإضافة المادة إلى قائمة المواد.
- زر لفتح محلل الملفات مباشرة باسم المادة المختارة.
- دعم السنوات الأولى والثانية والثالثة والرابعة والخامسة.
