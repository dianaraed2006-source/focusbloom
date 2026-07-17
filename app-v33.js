const KEY="focusbloom-pharmacy-v1";
const todayISO=()=>new Date().toISOString().slice(0,10);
const defaultState={
  profile:{name:"Diana",major:"Pharmacy Student",university:"Applied Science Private University"},
  settings:{dailyGoal:120,dark:false},
  subjects:[
    {id:"s1",name:"Pharmaceutics",color:"#7c5ce7",slides:120,targetHours:20},
    {id:"s2",name:"Organic Chemistry II",color:"#4d9bd8",slides:90,targetHours:15},
    {id:"s3",name:"Pharmacology",color:"#3aa57a",slides:0,targetHours:25},
    {id:"s4",name:"Medicinal Chemistry",color:"#df7c5c",slides:0,targetHours:20}
  ],
  tasks:[],
  sessions:[],
  drugs:[{"id":"med-acetaminophen","generic":"Paracetamol / Acetaminophen","brand":"Panadol, Tylenol","drugClass":"Analgesic and antipyretic","use":"Mild to moderate pain and fever.","sideEffects":"Usually well tolerated; nausea or rash may occur. Overdose can cause severe liver injury.","mnemonic":"Para-CETA-mol: pain and temperature control.","mastery":"new","pregnancy":"غالبًا يُستخدم عند الحاجة وتحت إشراف مختص؛ تجنّبي الجرعات الزائدة والاستخدام المطوّل دون تقييم.","children":"يُستخدم للأطفال بجرعات محسوبة حسب الوزن والعمر؛ انتبهي لتكرار المادة في أدوية الزكام.","elderly":"يمكن استخدامه غالبًا، لكن قد تحتاج الجرعة للخفض عند الهزال أو أمراض الكبد أو سوء التغذية.","lactation":"يُعد عادةً متوافقًا مع الرضاعة عند الجرعات المعتادة، مع استشارة مختص.","warnings":"سمّية كبدية خطيرة عند تجاوز الجرعة أو الجمع بين أكثر من منتج يحتوي عليه.","interactions":"الكحول، الوارفارين مع الاستخدام المتكرر، وأدوية أخرى تحتوي على acetaminophen.","monitoring":"إجمالي الجرعة اليومية ووظائف الكبد عند الاستخدام المطوّل أو وجود عوامل خطورة.","renal":"الحذر في القصور الكلوي الشديد مع تعديل الفاصل بين الجرعات حسب التوجيه الطبي.","hepatic":"تجنّب الجرعات العالية؛ قد يكون غير مناسب في المرض الكبدي الشديد.","source":"DailyMed / FDA labeling"},{"id":"med-ibuprofen","generic":"Ibuprofen","brand":"Brufen, Advil, Nurofen","drugClass":"NSAID","use":"Pain, fever, inflammation, dysmenorrhea.","sideEffects":"Dyspepsia, nausea, edema; serious GI bleeding, kidney injury, and cardiovascular events may occur.","mnemonic":"IBU = Inflammation, Bruising, discomfort.","mastery":"new","pregnancy":"يُتجنّب من نحو الأسبوع 20 إلا بتوجيه طبي، ويُمنع عادةً بعد نحو الأسبوع 30 بسبب مخاطر على الجنين.","children":"توجد مستحضرات أطفال، ويُستخدم عادةً من عمر 6 أشهر فما فوق حسب المنتج والوزن.","elderly":"حذر مرتفع: خطر النزف الهضمي، تدهور الكلى، احتباس السوائل وارتفاع الضغط.","lactation":"قد يكون مناسبًا لفترات قصيرة بتوجيه مختص.","warnings":"نزيف أو قرحة معدية، جلطة قلبية/دماغية، تدهور كلوي، تفاقم الربو الحساس للأسبرين.","interactions":"Warfarin ومضادات الصفائح، ACEI/ARB، المدرات، lithium، methotrexate، NSAIDs أخرى.","monitoring":"ضغط الدم، وظائف الكلى، علامات النزف، واحتباس السوائل.","renal":"يُتجنب أو يُستخدم بحذر شديد في القصور الكلوي والجفاف.","hepatic":"الحذر في القصور الكبدي.","source":"DailyMed / FDA NSAID labeling"},{"id":"med-amoxicillin","generic":"Amoxicillin","brand":"Amoxil","drugClass":"Aminopenicillin antibiotic","use":"Susceptible bacterial infections of ear, sinus, throat, respiratory tract, skin and urinary tract.","sideEffects":"Diarrhea, nausea, rash; serious allergy and C. difficile-associated diarrhea can occur.","mnemonic":"-cillin = penicillin family.","mastery":"new","pregnancy":"يُستخدم عند وجود عدوى بكتيرية تستدعي العلاج وبعد تقييم الطبيب.","children":"شائع الاستخدام بجرعات تعتمد على الوزن والعمر ونوع العدوى.","elderly":"غالبًا قابل للاستخدام، مع تقييم وظائف الكلى وتعديل الجرعة عند الحاجة.","lactation":"قد يسبب للرضيع إسهالًا أو طفحًا؛ تتم المراقبة عند الاستخدام.","warnings":"يُمنع عند وجود حساسية شديدة للبنسلين/البيتا-لاكتام؛ لا يعالج العدوى الفيروسية.","interactions":"Warfarin، allopurinol، methotrexate، وبعض اللقاحات البكتيرية الحية.","monitoring":"الاستجابة، الحساسية، الإسهال الشديد، ووظائف الكلى عند الفئات عالية الخطورة.","renal":"تعديل الجرعة قد يكون ضروريًا في القصور الكلوي.","hepatic":"مراقبة عند العلاج المطوّل أو المرض الكبدي.","source":"DailyMed / FDA amoxicillin labeling"},{"id":"med-amoxclav","generic":"Amoxicillin / Clavulanate","brand":"Augmentin","drugClass":"Penicillin + beta-lactamase inhibitor","use":"Susceptible bacterial infections including sinus, ear, respiratory, skin and bite infections.","sideEffects":"Diarrhea, nausea, rash; cholestatic liver injury and severe allergy are important risks.","mnemonic":"Clavulanate protects amoxicillin from beta-lactamase.","mastery":"new","pregnancy":"يُستخدم فقط عند الحاجة وتحت إشراف طبي.","children":"يُستخدم بجرعات وزنية؛ يجب اختيار التركيز الصحيح لأن نسب المكونات تختلف بين المستحضرات.","elderly":"مراقبة وظائف الكبد والكلى، خصوصًا مع العلاج المطوّل.","lactation":"راقبي الرضيع لاحتمال الإسهال أو التهيّج أو الطفح.","warnings":"تاريخ يرقان أو أذية كبدية سابقة مرتبطة بالدواء مانع مهم للاستعمال.","interactions":"Warfarin، allopurinol، probenecid.","monitoring":"وظائف الكبد عند العلاج المطوّل، وظائف الكلى، والإسهال الشديد.","renal":"قد يلزم تعديل الجرعة؛ بعض التركيبات لا تناسب القصور الكلوي الشديد.","hepatic":"حذر ومراقبة؛ احتمال أذية كبدية ركودية.","source":"DailyMed / FDA labeling"},{"id":"med-omeprazole","generic":"Omeprazole","brand":"Losec, Prilosec","drugClass":"Proton pump inhibitor (PPI)","use":"GERD, peptic ulcer disease, erosive esophagitis and H. pylori regimens.","sideEffects":"Headache, abdominal pain, nausea, diarrhea; long-term use may be associated with hypomagnesemia, B12 deficiency, fractures and infections.","mnemonic":"-prazole = PPI.","mastery":"new","pregnancy":"تتوفر بيانات بشرية مطمئنة نسبيًا، لكن الاستخدام يكون عند الحاجة وبعد تقييم مختص.","children":"معتمد لبعض الاستطبابات والأعمار بجرعات تعتمد على الوزن؛ لا يُستخدم عشوائيًا للرضع.","elderly":"يمكن استخدامه، لكن راجعي ضرورة الاستمرار طويلًا بسبب مخاطر الكسور ونقص المغنيسيوم والتداخلات.","lactation":"يُقيّم حسب الحاجة والبدائل؛ استشارة مختص مطلوبة.","warnings":"الاستعمال الطويل دون متابعة قد يخفي مرضًا مهمًا أو يسبب نقص مغذيات/عدوى.","interactions":"Clopidogrel، warfarin، phenytoin، methotrexate بجرعات عالية، وبعض مضادات الفيروسات.","monitoring":"المغنيسيوم، B12، وظائف الكلى، والحاجة المستمرة للعلاج.","renal":"لا يحتاج عادةً تعديل جرعة، لكن التهاب الكلية الخلالي ممكن.","hepatic":"قد تحتاج الجرعة للتعديل في القصور الكبدي الشديد.","source":"DailyMed / FDA omeprazole labeling"},{"id":"med-metformin","generic":"Metformin","brand":"Glucophage","drugClass":"Biguanide","use":"Type 2 diabetes; sometimes used for insulin resistance/PCOS under medical supervision.","sideEffects":"Nausea, diarrhea, abdominal discomfort; B12 deficiency; rare but serious lactic acidosis.","mnemonic":"METformin = metabolic first-line.","mastery":"new","pregnancy":"قد يُستخدم في بعض الحالات تحت إشراف متخصص؛ قرار الاستمرار يعتمد على الحالة وخطة ضبط السكر.","children":"بعض المستحضرات معتمدة من عمر 10 سنوات فأكثر؛ تختلف التوصيات حسب الصيغة.","elderly":"يُستخدم بحذر مع تقييم وظائف الكلى بانتظام وخطر الجفاف أو نقص الأكسجة.","lactation":"يُقيّم طبيًا؛ توجد خبرة استخدام، لكن القرار فردي.","warnings":"الحماض اللبني نادر وخطير؛ إيقاف مؤقت قد يلزم حول صبغة الأشعة أو المرض الحاد حسب تعليمات الطبيب.","interactions":"صبغات اليود، الكحول، أدوية تؤثر في الكلى أو التوازن الحمضي.","monitoring":"eGFR، السكر/HbA1c، فيتامين B12، وأعراض الحماض.","renal":"ممنوع عند eGFR أقل من 30؛ بدء العلاج غير موصى به عادةً عند 30–45.","hepatic":"يُتجنب غالبًا في القصور الكبدي الشديد بسبب خطر الحماض اللبني.","source":"DailyMed / FDA metformin labeling"},{"id":"med-losartan","generic":"Losartan","brand":"Cozaar","drugClass":"Angiotensin II receptor blocker (ARB)","use":"Hypertension, diabetic kidney protection and selected heart failure patients.","sideEffects":"Dizziness, hyperkalemia, kidney function changes, hypotension.","mnemonic":"-sartan = ARB.","mastery":"new","pregnancy":"غير آمن للحمل؛ قد يسبب أذية أو وفاة للجنين، ويجب إيقافه والتواصل مع الطبيب عند حدوث الحمل.","children":"معتمد لبعض الأطفال المصابين بارتفاع الضغط وفق العمر/الوزن؛ ليس لكل الحالات.","elderly":"يمكن استخدامه مع بدء حذر ومراقبة الضغط والكلى والبوتاسيوم.","lactation":"عادةً يُبحث عن بديل بسبب عدم كفاية البيانات.","warnings":"هبوط الضغط، ارتفاع البوتاسيوم، وتدهور وظيفة الكلى خصوصًا مع تضيق الشريان الكلوي.","interactions":"Potassium supplements، potassium-sparing diuretics، NSAIDs، lithium، ACEI/Aliskiren في حالات محددة.","monitoring":"ضغط الدم، البوتاسيوم، creatinine/eGFR.","renal":"قد يحدث تغير في وظائف الكلى؛ المراقبة ضرورية.","hepatic":"قد تحتاج جرعة ابتدائية أقل في القصور الكبدي.","source":"DailyMed / FDA losartan labeling"},{"id":"med-atorvastatin","generic":"Atorvastatin","brand":"Lipitor","drugClass":"HMG-CoA reductase inhibitor (Statin)","use":"Lowering LDL cholesterol and cardiovascular risk reduction.","sideEffects":"Muscle aches, liver enzyme elevation; rare rhabdomyolysis and immune-mediated necrotizing myopathy.","mnemonic":"-statin stops cholesterol synthesis.","mastery":"new","pregnancy":"لا يُستخدم عادةً أثناء الحمل؛ يجب مراجعة الطبيب فور حدوث الحمل.","children":"معتمد لحالات وراثية محددة من عمر 10 سنوات فأكثر؛ ليس لعلاج روتيني لكل طفل.","elderly":"قابل للاستخدام، لكن خطر الاعتلال العضلي أعلى مع تعدد الأدوية والضعف الكلوي.","lactation":"تُتجنب الرضاعة عادةً أثناء العلاج.","warnings":"ألم عضلي شديد أو بول داكن يستلزم تقييمًا؛ الحذر في مرض الكبد النشط.","interactions":"Macrolides، azole antifungals، cyclosporine، grapefruit بكميات كبيرة، وبعض أدوية HIV/HCV.","monitoring":"LDL، أعراض العضلات، ووظائف الكبد عند وجود أعراض أو عوامل خطورة.","renal":"لا يحتاج غالبًا تعديلًا، لكن القصور الكلوي يزيد خطر الاعتلال العضلي.","hepatic":"يُمنع في مرض الكبد النشط غير المفسر.","source":"DailyMed / FDA atorvastatin labeling"},{"id":"med-warfarin","generic":"Warfarin","brand":"Coumadin","drugClass":"Vitamin K antagonist anticoagulant","use":"Prevention and treatment of thromboembolism in selected indications.","sideEffects":"Bleeding, bruising, skin necrosis, purple toe syndrome; many interactions.","mnemonic":"WARfarin: watch INR and bleeding.","mastery":"new","pregnancy":"مضاد استطباب غالبًا في الحمل بسبب تشوهات ونزف جنيني، مع استثناءات تخصصية نادرة مثل بعض الصمامات الميكانيكية.","children":"يُستخدم فقط تحت إشراف تخصصي مع مراقبة INR دقيقة.","elderly":"خطر النزف أعلى؛ يحتاج جرعة حذرة ومراقبة متكررة وتقييم السقوط والتداخلات.","lactation":"يُعد غالبًا متوافقًا مع الرضاعة تحت إشراف طبي.","warnings":"نزف خطير أو قاتل؛ لا تغيّري الغذاء أو الأدوية دون مراجعة.","interactions":"عدد كبير جدًا: antibiotics، amiodarone، NSAIDs، antiplatelets، herbal products، وتغيّر تناول vitamin K.","monitoring":"INR، علامات النزف، CBC، وظائف الكبد، والتداخلات.","renal":"لا يعتمد الإطراح أساسًا على الكلى، لكن القصور الكلوي يزيد خطر النزف.","hepatic":"مرض الكبد يرفع الحساسية وخطر النزف.","source":"DailyMed / FDA warfarin labeling"},{"id":"med-cetirizine","generic":"Cetirizine","brand":"Zyrtec","drugClass":"Second-generation antihistamine","use":"Allergic rhinitis and urticaria.","sideEffects":"Drowsiness, fatigue, dry mouth.","mnemonic":"Cetiri-ZINE may make you sleepy.","mastery":"new","pregnancy":"يُستخدم عند الحاجة بعد تقييم مختص؛ تجنّبي الاستخدام الذاتي غير الضروري.","children":"توجد جرعات ومستحضرات للأطفال حسب العمر؛ يجب اتباع نشرة المنتج أو وصف الطبيب.","elderly":"قد تزيد النعاس وخطر السقوط؛ خفض الجرعة قد يلزم مع ضعف الكلى.","lactation":"قد يسبب نعاسًا للرضيع أو يؤثر في الإدرار عند بعض الحالات؛ استشارة مختص.","warnings":"تجنّب القيادة إذا سبب نعاسًا، وتجنب الكحول والمهدئات.","interactions":"Alcohol، sedatives، وبعض مثبطات الجهاز العصبي المركزي.","monitoring":"النعاس والاستجابة؛ وظائف الكلى في كبار السن.","renal":"تعديل الجرعة شائع في القصور الكلوي.","hepatic":"قد يلزم الحذر عند القصور الكبدي المترافق مع قصور كلوي.","source":"DailyMed / product labeling"},{"id":"med-albuterol","generic":"Albuterol / Salbutamol","brand":"Ventolin","drugClass":"Short-acting beta2 agonist (SABA)","use":"Rapid relief of bronchospasm in asthma and COPD.","sideEffects":"Tremor, palpitations, tachycardia, nervousness, hypokalemia.","mnemonic":"SABA = short-acting bronchodilator rescue.","mastery":"new","pregnancy":"يُستخدم عادةً كدواء إنقاذ عند الحاجة تحت متابعة؛ سوء السيطرة على الربو بحد ذاته خطر.","children":"شائع الاستخدام وفق العمر والجهاز والجرعة الموصوفة؛ تقنية الاستنشاق مهمة.","elderly":"الحذر مع أمراض القلب واضطراب النظم.","lactation":"يُتوقع تعرض جهازي منخفض مع الاستنشاق؛ استشارة مختص.","warnings":"الإفراط في الحاجة إليه قد يعني أن الربو غير مسيطر عليه ويحتاج مراجعة عاجلة.","interactions":"Nonselective beta-blockers، MAOI/TCA، diuretics، وأدوية تزيد النبض.","monitoring":"عدد مرات الاستخدام، النبض، الأعراض، والبوتاسيوم عند الجرعات العالية.","renal":"لا توجد عادةً تعديلات خاصة للاستنشاق.","hepatic":"لا توجد عادةً تعديلات خاصة للاستنشاق.","source":"DailyMed / FDA albuterol labeling"},{"id":"med-azithromycin","generic":"Azithromycin","brand":"Zithromax","drugClass":"Macrolide antibiotic","use":"Selected susceptible respiratory, skin and sexually transmitted bacterial infections.","sideEffects":"Diarrhea, nausea, abdominal pain; QT prolongation and liver injury are important risks.","mnemonic":"AZI = atypicals and selected infections.","mastery":"new","pregnancy":"يُستخدم عند الحاجة لعدوى مناسبة وبعد تقييم الطبيب.","children":"مستخدم في الأطفال بجرعات وزنية وللاستطبابات المناسبة.","elderly":"الحذر من إطالة QT، اضطراب النظم، وأمراض الكبد.","lactation":"قد يسبب اضطرابات هضمية للرضيع؛ تتم المراقبة.","warnings":"ليس لكل عدوى تنفسية؛ مقاومة المضادات مهمة. راقبي خفقانًا أو إغماءً.","interactions":"أدوية تطيل QT، warfarin، digoxin وبعض antiarrhythmics.","monitoring":"الاستجابة، ECG عند الخطورة، وظائف الكبد عند الأعراض.","renal":"الحذر في القصور الشديد.","hepatic":"يُتجنب في تاريخ أذية كبدية مرتبطة بالدواء.","source":"DailyMed / FDA azithromycin labeling"},{"id":"med-fluconazole","generic":"Fluconazole","brand":"Diflucan","drugClass":"Azole antifungal","use":"Selected Candida infections and cryptococcal disease.","sideEffects":"Nausea, abdominal pain, headache, liver injury, QT prolongation and serious skin reactions.","mnemonic":"-conazole = azole antifungal.","mastery":"new","pregnancy":"الجرعات العالية أو المطوّلة تُتجنب بسبب خطر جنيني؛ حتى الجرعة المفردة تحتاج تقييمًا حسب الحالة والبدائل.","children":"يُستخدم في بعض العدوى بجرعات وزنية وتحت إشراف طبي.","elderly":"تعديل الجرعة حسب الكلى ومراجعة التداخلات مهمان.","lactation":"قد يكون مقبولًا في حالات محددة تحت إشراف.","warnings":"تداخلات كثيرة، سمية كبدية، وإطالة QT.","interactions":"Warfarin، sulfonylureas، phenytoin، بعض statins، tacrolimus وأدوية QT.","monitoring":"وظائف الكبد، INR عند warfarin، ECG عند الخطورة، ووظائف الكلى.","renal":"تعديل الجرعة مطلوب غالبًا في القصور الكلوي.","hepatic":"حذر ومراقبة وظائف الكبد.","source":"DailyMed / FDA fluconazole labeling"},{"id":"med-levothyroxine","generic":"Levothyroxine","brand":"Eltroxin, Synthroid","drugClass":"Thyroid hormone (T4)","use":"Hypothyroidism and TSH suppression in selected conditions.","sideEffects":"Excess dose causes palpitations, tremor, insomnia, weight loss and bone loss.","mnemonic":"Levo-T4 replaces thyroxine.","mastery":"new","pregnancy":"ضروري عادةً الاستمرار، وغالبًا تحتاج الجرعة للزيادة مع متابعة TSH؛ لا يوقف دون الطبيب.","children":"أساسي لعلاج قصور الدرق، والجرعات تعتمد بشدة على العمر والوزن.","elderly":"البدء بجرعة منخفضة والتدرج، خصوصًا مع مرض القلب.","lactation":"متوافق عادةً مع الرضاعة عند العلاج التعويضي.","warnings":"ليس دواءً لإنقاص الوزن؛ الجرعة الزائدة قد تسبب اضطرابات قلبية.","interactions":"Calcium، iron، antacids، bile-acid sequestrants، بعض الأطعمة وwarfarin.","monitoring":"TSH وFree T4 بعد تغيير الجرعة وبشكل دوري.","renal":"لا تعديل روتيني محدد، لكن الحالة العامة تؤثر في المتابعة.","hepatic":"لا تعديل روتيني محدد عادةً.","source":"DailyMed / FDA levothyroxine labeling"},{"id":"med-furosemide","generic":"Furosemide","brand":"Lasix","drugClass":"Loop diuretic","use":"Edema and selected patients with hypertension or heart failure.","sideEffects":"Dehydration, hypotension, low potassium/sodium/magnesium, kidney injury, hyperuricemia and ototoxicity.","mnemonic":"FURiously removes fluid.","mastery":"new","pregnancy":"يُستخدم فقط عند وجود داعٍ طبي واضح؛ ليس لعلاج الوذمة الطبيعية للحمل.","children":"يُستخدم في حالات مختارة بجرعات وزنية ومراقبة دقيقة.","elderly":"خطر الجفاف، هبوط الضغط، السقوط واضطراب الشوارد أعلى.","lactation":"قد يقلل إدرار الحليب بجرعات عالية؛ قرار فردي.","warnings":"فقدان سوائل وشوارد شديد؛ راقبي الدوخة وتشنجات العضلات.","interactions":"Lithium، digoxin مع نقص البوتاسيوم، NSAIDs، aminoglycosides، وأدوية الضغط.","monitoring":"الوزن، الضغط، Na/K/Mg، وظائف الكلى، حمض اليوريك.","renal":"يُستخدم أحيانًا في القصور الكلوي لكن بجرعات ومراقبة تخصصية.","hepatic":"الحذر في تليف الكبد بسبب اضطراب السوائل والشوارد.","source":"DailyMed / FDA furosemide labeling"},{"id":"med-enalapril","generic":"Enalapril","brand":"Renitec, Vasotec","drugClass":"ACE inhibitor","use":"Hypertension, heart failure and selected kidney/cardiac indications.","sideEffects":"Cough, dizziness, hyperkalemia, kidney function changes; rare angioedema.","mnemonic":"-pril = ACE inhibitor.","mastery":"new","pregnancy":"غير آمن للحمل ويجب إيقافه والتواصل مع الطبيب عند حدوث الحمل.","children":"معتمد لبعض الأطفال وفق العمر والوزن والحالة.","elderly":"البدء بحذر مع مراقبة الضغط والكلى والبوتاسيوم.","lactation":"يُقيّم حسب عمر الرضيع والحالة؛ توجد بدائل وخبرة متفاوتة.","warnings":"وذمة وعائية قد تكون خطيرة؛ ارتفاع البوتاسيوم وتدهور الكلى.","interactions":"Potassium، potassium-sparing diuretics، NSAIDs، lithium، ARBs/Aliskiren في حالات محددة.","monitoring":"ضغط الدم، potassium، creatinine/eGFR.","renal":"تعديل الجرعة قد يكون ضروريًا.","hepatic":"الحذر في القصور الكبدي، مع أن التحويل للشكل الفعال قد يتأثر.","source":"DailyMed / FDA enalapril labeling"},{"id":"med-ondansetron","generic":"Ondansetron","brand":"Zofran","drugClass":"5-HT3 antagonist antiemetic","use":"Prevention and treatment of nausea and vomiting in selected settings.","sideEffects":"Headache, constipation, dizziness; QT prolongation and serotonin syndrome are important risks.","mnemonic":"ON-DAN-setron turns nausea off.","mastery":"new","pregnancy":"يُستخدم في بعض حالات الغثيان بعد موازنة الفائدة والمخاطر؛ القرار للطبيب.","children":"معتمد لبعض الاستطبابات والأعمار؛ الجرعة تعتمد على الوزن أو مساحة الجسم.","elderly":"الحذر مع إطالة QT، اضطراب الشوارد وتعدد الأدوية.","lactation":"البيانات محدودة؛ تقييم مختص مطلوب.","warnings":"تجنب/حذر في long QT الخلقي واضطراب الشوارد.","interactions":"أدوية تطيل QT، serotonergic drugs، وapomorphine (تداخل خطير).","monitoring":"ECG والشوارد عند عوامل الخطورة، حركة الأمعاء.","renal":"لا تعديل غالبًا.","hepatic":"تحديد الجرعة القصوى في القصور الكبدي الشديد.","source":"DailyMed / FDA ondansetron labeling"}],
  flashcards:[],
  quizHistory:[],
  plans:[],
  mistakes:[],
  completedChallenges:[],
  challengeDate:"",
  challengeIndex:0,
  weeklyPlanSettings:{days:[],daysCount:5,hoursPerDay:3,preferences:""}
};
let state=load();
let timerMode="pomodoro",timerRunning=false,timerInterval=null,timerSeconds=1500,stopwatchBase=0,stopwatchStartedAt=null;
let reviewQueue=[],currentReview=null,quizQuestions=[],trainerMode="drug-class",trainerQuestion=null,trainerIndex=0,trainerCorrect=0;

function load(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||"{}");
    const merged={...structuredClone(defaultState),...saved};
    const savedDrugs=Array.isArray(saved.drugs)?saved.drugs:[];
    const byGeneric=new Map(savedDrugs.map(d=>[(d.generic||"").toLowerCase(),d]));
    merged.drugs=defaultState.drugs.map(d=>byGeneric.get(d.generic.toLowerCase())?{...d,...byGeneric.get(d.generic.toLowerCase())}:d);
    savedDrugs.forEach(d=>{if(!merged.drugs.some(x=>(x.generic||"").toLowerCase()===(d.generic||"").toLowerCase()))merged.drugs.push(d)});
    return merged;
  }catch{return structuredClone(defaultState)}
}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const fmt=m=>{m=Math.round(m);return m<60?`${m}د`:`${Math.floor(m/60)}س ${m%60}د`};
const sessionMinutes=s=>Math.max(1,Math.round(s.durationSeconds/60));
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
function startOfDay(d=new Date()){const x=new Date(d);x.setHours(0,0,0,0);return x}
function startOfWeek(d=new Date()){const x=startOfDay(d);const day=x.getDay();x.setDate(x.getDate()-(day===0?6:day-1));return x}
function totals(){const td=startOfDay(),wk=startOfWeek();return{total:state.sessions.reduce((a,s)=>a+sessionMinutes(s),0),today:state.sessions.filter(s=>new Date(s.endedAt)>=td).reduce((a,s)=>a+sessionMinutes(s),0),week:state.sessions.filter(s=>new Date(s.endedAt)>=wk).reduce((a,s)=>a+sessionMinutes(s),0)}}
function streak(){const days=new Set(state.sessions.map(s=>startOfDay(new Date(s.endedAt)).toISOString()));let d=startOfDay(),n=0;if(!days.has(d.toISOString()))d.setDate(d.getDate()-1);while(days.has(d.toISOString())){n++;d.setDate(d.getDate()-1)}return n}
function subjectMinutes(id){return state.sessions.filter(s=>s.subjectId===id).reduce((a,s)=>a+sessionMinutes(s),0)}
function plantInfo(total){if(total<30)return{icon:"🌱",stage:"بذرة",next:30,from:0,msg:"ابدئي أول جلسة حتى تنمو نبتتك."};if(total<120)return{icon:"🌿",stage:"برعم",next:120,from:30,msg:"أكملي ساعتين لتصبح نبتة صغيرة."};if(total<600)return{icon:"🪴",stage:"نبتة صغيرة",next:600,from:120,msg:"أكملي 10 ساعات لتتفتح الزهرة."};if(total<3000)return{icon:"🌸",stage:"زهرة",next:3000,from:600,msg:"أكملي 50 ساعة لتصبح شجرة."};return{icon:"🌳",stage:"شجرة",next:total,from:total,msg:"رائع! بنيتِ عادة دراسة قوية."}}
function nav(page){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===page));
function firstText(obj, keys){
  for(const key of keys){
    const v=obj?.[key];
    if(Array.isArray(v)&&v.length) return v[0];
  }
  return "غير متوفر في هذا السجل";
}
async function searchOpenFDA(){
  const term=$("fdaSearchInput").value.trim();
  if(!term){toast("اكتبي اسم دواء");return}
  $("fdaSearchResult").innerHTML="<p>جارٍ البحث…</p>";
  try{
    const query=encodeURIComponent(`openfda.generic_name:"${term}" openfda.brand_name:"${term}"`);
    let url=`https://api.fda.gov/drug/label.json?search=${query}&limit=1`;
    let res=await fetch(url);
    if(!res.ok){
      const loose=encodeURIComponent(term);
      res=await fetch(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:${loose}+openfda.brand_name:${loose}&limit=1`);
    }
    const data=await res.json();
    if(!res.ok||!data.results?.length) throw new Error(data?.error?.message||"لم يتم العثور على نتيجة");
    const d=data.results[0];
    $("fdaSearchResult").innerHTML=`
      <h3>${esc(d.openfda?.generic_name?.[0]||d.openfda?.brand_name?.[0]||term)}</h3>
      <div class="fda-section"><strong>Indications:</strong><p>${esc(firstText(d,["indications_and_usage","purpose"]))}</p></div>
      <div class="fda-section"><strong>Warnings:</strong><p>${esc(firstText(d,["boxed_warning","warnings","warnings_and_cautions"]))}</p></div>
      <div class="fda-section"><strong>Adverse reactions:</strong><p>${esc(firstText(d,["adverse_reactions"]))}</p></div>
      <div class="fda-section"><strong>Drug interactions:</strong><p>${esc(firstText(d,["drug_interactions"]))}</p></div>
      <div class="fda-section"><strong>Pregnancy:</strong><p>${esc(firstText(d,["pregnancy","pregnancy_or_breast_feeding"]))}</p></div>
      <div class="fda-section"><strong>Pediatric use:</strong><p>${esc(firstText(d,["pediatric_use"]))}</p></div>
      <div class="fda-section"><strong>Geriatric use:</strong><p>${esc(firstText(d,["geriatric_use"]))}</p></div>
      <p class="medical-disclaimer">هذه بيانات نشرة FDA وقد تختلف بين الشركات والمستحضرات. لا تعتمد عليها وحدها لاتخاذ قرار علاجي.</p>`;
  }catch(e){
    $("fdaSearchResult").innerHTML=`<p>${esc(e.message)}</p>`;
  }
}

async function updateCloudStatus(){
  const el=$("cloudStatus");
  if(!window.FocusBloomCloud?.configured()){el.textContent="يحتاج إعداد";return}
  try{
    const user=await window.FocusBloomCloud.getUser();
    el.textContent=user?`متصل: ${user.email}`:"غير مسجل";
  }catch{el.textContent="خطأ في الاتصال"}
}
async function signUpCloud(){
  try{await window.FocusBloomCloud.signUp($("authEmail").value,$("authPassword").value);toast("تم إنشاء الحساب. افحصي البريد إذا كان التأكيد مفعّلًا");updateCloudStatus()}catch(e){toast(e.message)}
}
async function signInCloud(){
  try{await window.FocusBloomCloud.signIn($("authEmail").value,$("authPassword").value);toast("تم تسجيل الدخول");updateCloudStatus()}catch(e){toast(e.message)}
}
async function signOutCloud(){
  try{await window.FocusBloomCloud.signOut();toast("تم تسجيل الخروج");updateCloudStatus()}catch(e){toast(e.message)}
}
async function pushCloud(){
  try{await window.FocusBloomCloud.pushState(state);toast("تم رفع البيانات إلى السحابة")}catch(e){toast(e.message)}
}
async function pullCloud(){
  try{
    const data=await window.FocusBloomCloud.pullState();
    if(!data?.state){toast("لا توجد نسخة سحابية");return}
    if(!confirm("سيتم استبدال بيانات هذا الجهاز. متابعة؟"))return;
    state=data.state;save();render();toast("تم تنزيل البيانات")
  }catch(e){toast(e.message)}
}
let latestMedicineImage=null;
async function recognizeMedicine(){
  if(!latestMedicineImage){toast("اختاري صورة أولًا");return}
  $("visionResult").innerHTML="<p>جارٍ تحليل الصورة…</p>";
  try{
    const name=(window.FOCUS_BLOOM_CONFIG||{}).VISION_FUNCTION_NAME||"medicine-vision";
    const data=await window.FocusBloomCloud.invoke(name,{imageDataUrl:latestMedicineImage});
    $("visionResult").innerHTML=`<pre style="white-space:pre-wrap">${esc(data.result||JSON.stringify(data,null,2))}</pre>`;
  }catch(e){$("visionResult").innerHTML=`<p>${esc(e.message)}</p>`}
}


const pharmacyYears=[{"year":"1","title":"السنة الأولى","semesters":[{"name":"الفصل الأول","credits":15,"courses":[{"code":"907110","name":"مقدمة في ممارسة الصيدلة","credits":1,"type":"نظري"},{"code":"1501132","name":"كيمياء عامة لطلبة الصيدلة","credits":3,"type":"نظري"},{"code":"1501135","name":"كيمياء عامة عملي لطلبة الصيدلة","credits":1,"type":"عملي"},{"code":"1501141","name":"علوم حياتية للصيدلة","credits":3,"type":"نظري"},{"code":"—","name":"متطلب جامعة","credits":3,"type":"نظري"},{"code":"—","name":"متطلب جامعة","credits":3,"type":"نظري"}]},{"name":"الفصل الثاني","credits":15,"courses":[{"code":"905120","name":"كيمياء عضوية صيدلانية 1","credits":3,"type":"نظري"},{"code":"906122","name":"علم التشريح ووظائف الأعضاء 1","credits":2,"type":"نظري"},{"code":"906123","name":"علم التشريح ووظائف الأعضاء عملي","credits":1,"type":"عملي"},{"code":"1501165","name":"مهارات الحاسوب","credits":3,"type":"نظري"},{"code":"—","name":"متطلب جامعة","credits":3,"type":"نظري"},{"code":"—","name":"متطلب جامعة","credits":3,"type":"نظري"}]}],"focus":["تأسيس قوي في الكيمياء والعلوم الحيوية.","إتقان المصطلحات الطبية والصيدلانية الأساسية.","بناء عادة دراسة منتظمة قبل مواد التخصص الثقيلة."]},{"year":"2","title":"السنة الثانية","semesters":[{"name":"الفصل الأول","credits":15,"courses":[{"code":"905210","name":"كيمياء عضوية صيدلانية 2","credits":3,"type":"نظري"},{"code":"906214","name":"علم التشريح ووظائف الأعضاء 2","credits":3,"type":"نظري"},{"code":"906216","name":"كيمياء حيوية","credits":3,"type":"نظري"},{"code":"906217","name":"كيمياء حيوية عملي","credits":1,"type":"عملي"},{"code":"907214","name":"علم الأحياء الدقيقة الصيدلانية والمناعة 1","credits":3,"type":"نظري"},{"code":"907215","name":"علم الأحياء الدقيقة الصيدلانية عملي","credits":1,"type":"عملي"},{"code":"907216","name":"إحصاء حيوي تطبيقي","credits":1,"type":"نظري"}]},{"name":"الفصل الثاني","credits":15,"courses":[{"code":"905222","name":"كيمياء تحليلية","credits":2,"type":"نظري"},{"code":"906224","name":"علم وظائف الأعضاء المرضي","credits":3,"type":"نظري"},{"code":"907224","name":"علم الأحياء الدقيقة الصيدلانية 2","credits":3,"type":"نظري"},{"code":"907226","name":"صيدلانيات 1","credits":3,"type":"نظري"},{"code":"907227","name":"صيدلانيات 1 عملي","credits":1,"type":"عملي"},{"code":"—","name":"متطلب جامعة","credits":3,"type":"نظري"}]}],"focus":["ربط الكيمياء العضوية بالكيمياء الدوائية لاحقًا.","فهم الفسيولوجيا المرضية والميكروبيولوجي كأساس للفارماكولوجي.","إتقان الحسابات والمفاهيم الصيدلانية الأساسية."]},{"year":"3","title":"السنة الثالثة","semesters":[{"name":"الفصل الأول","credits":17,"courses":[{"code":"905314","name":"تحليل آلي","credits":2,"type":"نظري"},{"code":"905315","name":"كيمياء تحليلية وتحليل آلي عملي","credits":1,"type":"عملي"},{"code":"905316","name":"كيمياء دوائية 1","credits":3,"type":"نظري"},{"code":"906314","name":"علم الأدوية 1","credits":3,"type":"نظري"},{"code":"906316","name":"ممارسة الصيدلة عملي","credits":1,"type":"عملي"},{"code":"907314","name":"صيدلانيات 2","credits":3,"type":"نظري"},{"code":"907315","name":"صيدلانيات 2 عملي","credits":1,"type":"عملي"},{"code":"—","name":"متطلب جامعة","credits":3,"type":"نظري"}]},{"name":"الفصل الثاني","credits":15,"courses":[{"code":"905324","name":"كيمياء دوائية 2","credits":3,"type":"نظري"},{"code":"905325","name":"كيمياء دوائية عملي","credits":1,"type":"عملي"},{"code":"906324","name":"علم الأدوية 2","credits":3,"type":"نظري"},{"code":"906325","name":"علم الأدوية عملي","credits":1,"type":"عملي"},{"code":"907326","name":"تكنولوجيا صيدلانية 1","credits":3,"type":"نظري"},{"code":"907327","name":"تكنولوجيا صيدلانية عملي","credits":1,"type":"عملي"},{"code":"907328","name":"صيدلة حيوية","credits":2,"type":"نظري"},{"code":"907329","name":"تشريعات وأخلاقيات مهنة الصيدلة","credits":1,"type":"نظري"}]},{"name":"الفصل الصيفي","credits":2,"courses":[{"code":"906330","name":"تدريب ميداني 1","credits":2,"type":"عملي"}]}],"focus":["حفظ Drug classes وMechanisms of action بطريقة منظمة.","ربط الكيمياء الدوائية بالـ SAR والفارماكولوجي.","فهم الجرعات والأشكال الصيدلانية والتوافر الحيوي.","بناء Drug Vault وFlashcards لكل مادة."]},{"year":"4","title":"السنة الرابعة","semesters":[{"name":"الفصل الأول","credits":16,"courses":[{"code":"905414","name":"كيمياء النواتج الطبيعية","credits":3,"type":"نظري"},{"code":"905415","name":"كيمياء النواتج الطبيعية عملي","credits":1,"type":"عملي"},{"code":"906415","name":"صيدلة سريرية ومداواة 1","credits":3,"type":"نظري"},{"code":"906417","name":"أدوية بدون وصفة","credits":2,"type":"نظري"},{"code":"906418","name":"حركية الدواء","credits":2,"type":"نظري"},{"code":"906419","name":"حركية الدواء عملي","credits":1,"type":"عملي"},{"code":"906421","name":"علم السموم","credits":2,"type":"نظري"},{"code":"907412","name":"تكنولوجيا صيدلانية 2","credits":2,"type":"نظري"}]},{"name":"الفصل الثاني","credits":16,"courses":[{"code":"905422","name":"التداوي بالأعشاب","credits":3,"type":"نظري"},{"code":"906432","name":"صيدلة سريرية ومداواة 2","credits":3,"type":"نظري"},{"code":"906433","name":"صيدلة سريرية ومداواة عملي","credits":1,"type":"عملي"},{"code":"906434","name":"معلومات دوائية وممارسة مهنية","credits":2,"type":"نظري"},{"code":"906436","name":"كيمياء حيوية وتقنية سريرية","credits":3,"type":"نظري"},{"code":"906437","name":"كيمياء حيوية وتقنية سريرية عملي","credits":1,"type":"عملي"},{"code":"—","name":"متطلب تخصص اختياري","credits":3,"type":"نظري"}]},{"name":"الفصل الصيفي","credits":4,"courses":[{"code":"906440","name":"تدريب ميداني 2","credits":4,"type":"عملي"}]}],"focus":["تطبيق المعلومات على حالات مرضية ومقارنة الخيارات العلاجية.","إتقان Monitoring parameters والتداخلات والتحذيرات.","فهم Pharmacokinetics والسموم ومعلومات الأدوية.","التدرب على كتابة إجابة Drug Information احترافية."]},{"year":"5","title":"السنة الخامسة","semesters":[{"name":"الفصل الأول","credits":15,"courses":[{"code":"906511","name":"صيدلة سريرية ومداواة 3","credits":3,"type":"نظري"},{"code":"906515","name":"اقتصاديات صيدلانية","credits":2,"type":"نظري"},{"code":"906518","name":"صحة عامة","credits":2,"type":"نظري"},{"code":"907512","name":"مستحضرات التجميل","credits":2,"type":"نظري"},{"code":"—","name":"متطلب تخصص اختياري","credits":3,"type":"نظري"},{"code":"—","name":"متطلب جامعة","credits":3,"type":"نظري"}]},{"name":"الفصل الثاني","credits":16,"courses":[{"code":"907525","name":"تسويق صيدلاني","credits":2,"type":"نظري"},{"code":"907527","name":"تقنية حيوية صيدلانية","credits":3,"type":"نظري"},{"code":"907528","name":"جودة الدواء وتطويره","credits":2,"type":"نظري"},{"code":"—","name":"متطلب تخصص اختياري","credits":3,"type":"نظري"},{"code":"—","name":"متطلب جامعة","credits":3,"type":"نظري"},{"code":"—","name":"مادة حرة","credits":3,"type":"نظري"}]}],"focus":["الاستعداد للممارسة المهنية وسوق العمل.","التفكير السريري المتقدم وتقييم الدليل العلمي.","فهم اقتصاديات الدواء والجودة والتقنية الحيوية.","إعداد ملفات المراجعة النهائية والتدريب على الحالات."]}];
function renderYearModules(){
  if(!["all","1","2","3","4","5"].includes($("yearFilter").value)) $("yearFilter").value="1";
  const filter=$("yearFilter").value;
  const arr=pharmacyYears.filter(y=>filter==="all"||y.year===filter);
  $("yearModules").innerHTML=arr.map(y=>`
    <article class="curriculum-year-card">
      <div class="curriculum-year-header">
        <h2>${esc(y.title)}</h2>
        <span class="year-badge">Year ${y.year}</span>
      </div>

      ${y.semesters.map((sem,index)=>`
        <section class="semester-accordion">
          <button class="semester-toggle ${index===0?"open":""}" type="button"
            onclick="toggleSemester(this)">
            <span>${esc(sem.name)}</span>
            <span><small>${sem.credits} ساعة</small> <b class="semester-arrow">⌄</b></span>
          </button>

          <div class="semester-courses ${index===0?"open":""}">
            ${sem.courses.map(c=>{
              const added=state.subjects.some(s=>s.name===c.name);
              return`<div class="curriculum-course-row">
                <button class="course-add-btn ${added?"added":""}" type="button"
                  onclick="addCurriculumSubject('${esc(c.name).replace(/'/g,"&#39;")}','${esc(c.code)}',${c.credits})"
                  title="إضافة المادة">${added?"✓":"+"}</button>
                <button class="course-name-button" type="button"
                  onclick="previewCurriculumCourse('${esc(c.name).replace(/'/g,"&#39;")}','${y.year}')">${esc(c.name)}</button>
                <div class="course-credit">${c.credits}<small>ساعة</small></div>
              </div>`
            }).join("")}
          </div>
        </section>
      `).join("")}

      <div class="curriculum-note">${y.focus.map(x=>`• ${esc(x)}`).join("<br>")}</div>
    </article>
  `).join("")
}
window.toggleSemester=button=>{
  button.classList.toggle("open");
  button.nextElementSibling.classList.toggle("open");
};
window.previewCurriculumCourse=(course,year)=>{
  const existing=state.subjects.find(s=>s.name===course);
  if(existing){openSubjectWorkspace(existing.id);return}
  toast("اضغطي + أولًا لإضافة المادة إلى موادك");
};

window.openCourseAnalyzer=(course,year)=>{
  nav("course-analyzer");
  $("courseName").value=course;
  const map={"1":"First year","2":"Second year","3":"Third year","4":"Fourth year","5":"Fifth year"};
  if(map[year]) $("courseYear").value=map[year];
  toast(`تم اختيار مادة ${course}`);
};

window.addCurriculumSubject=(course,code="",credits=0)=>{
  const existing=state.subjects.find(s=>s.name===course);
  if(existing){toast("المادة موجودة بالفعل");renderYearModules();return}
  const colors=["#7c5ce7","#4d9bd8","#3aa57a","#df7c5c","#d18b36","#b65ca8"];
  state.subjects.push({
    id:crypto.randomUUID(),
    name:course,
    code,
    credits,
    color:colors[state.subjects.length%colors.length],
    slides:0,
    targetHours:Math.max(credits*2,0)
  });
  save();render();renderYearModules();toast(`تمت إضافة ${course}`);
}

async function rxNormSearch(){
  const term=$("rxDrugSearch").value.trim();
  if(!term){toast("اكتبي اسم دواء");return}
  $("rxDrugStatus").textContent="جارٍ البحث في RxNorm…";
  $("rxDrugResults").innerHTML="";
  try{
    const res=await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(term)}`);
    const data=await res.json();
    const groups=data.drugGroup?.conceptGroup||[];
    const products=[];
    groups.forEach(g=>(g.conceptProperties||[]).forEach(p=>products.push({
      tty:g.tty||"",
      rxcui:p.rxcui,
      name:p.name,
      synonym:p.synonym||""
    })));
    const unique=[...new Map(products.map(p=>[p.rxcui,p])).values()];
    if(!unique.length) throw new Error("لم يتم العثور على منتجات أو تركيزات مطابقة");
    const generic=unique.filter(p=>["SCD","SCDC","SCDF"].includes(p.tty));
    const brands=unique.filter(p=>["SBD","SBDC","SBDF"].includes(p.tty));
    const packs=unique.filter(p=>["BPCK","GPCK"].includes(p.tty));
    $("rxDrugStatus").textContent=`تم العثور على ${unique.length} مفهوم/منتج دوائي.`;
    const section=(title,arr)=>arr.length?`<div class="rx-group"><h3>${title}</h3><div class="rx-product-grid">${arr.slice(0,60).map(p=>`<div class="rx-product"><h4>${esc(p.name)}</h4><small>${esc(p.tty)} · RxCUI ${esc(p.rxcui)}</small>${p.synonym?`<p class="muted">${esc(p.synonym)}</p>`:""}<button class="text-btn" onclick="lookupLabelFromExplorer('${esc(term).replace(/'/g,"&#39;")}')">فتح معلومات النشرة</button></div>`).join("")}</div></div>`:"";
    $("rxDrugResults").innerHTML=section("Generic clinical products — التركيزات والأشكال",generic)+section("Branded products — المنتجات التجارية",brands)+section("Packs — العبوات المركبة",packs);
  }catch(e){
    $("rxDrugStatus").textContent=e.message;
  }
}
window.lookupLabelFromExplorer=term=>{
  nav("drug-vault");
  $("fdaSearchInput").value=term;
  searchOpenFDA();
};

let extractedCourseContent="",lastCourseSummary="";
async function extractPDF(file){
  const pdfjs=await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";
  const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;
  const parts=[];
  for(let i=1;i<=pdf.numPages;i++){
    const page=await pdf.getPage(i);
    const content=await page.getTextContent();
    parts.push(`\n--- Page ${i} ---\n`+content.items.map(x=>x.str).join(" "));
  }
  return parts.join("\n");
}
async function extractDOCX(file){
  const result=await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()});
  return result.value;
}
async function extractPPTX(file){
  const zip=await JSZip.loadAsync(await file.arrayBuffer());
  const slideNames=Object.keys(zip.files).filter(n=>/^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a,b)=>{
    const na=Number(a.match(/slide(\d+)/)[1]),nb=Number(b.match(/slide(\d+)/)[1]);return na-nb;
  });
  const slides=[];
  for(const name of slideNames){
    const xml=await zip.file(name).async("text");
    const texts=[...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map(m=>m[1].replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">"));
    slides.push(`\n--- ${name.match(/slide\d+/)[0]} ---\n${texts.join(" ")}`);
  }
  return slides.join("\n");
}
async function extractCourseFile(){
  const file=$("courseFile").files[0];
  if(!file){toast("اختاري ملفًا");return}
  $("courseExtractionStatus").textContent=`جارٍ استخراج ${file.name}…`;
  try{
    const ext=file.name.split(".").pop().toLowerCase();
    if(ext==="pdf") extractedCourseContent=await extractPDF(file);
    else if(ext==="docx") extractedCourseContent=await extractDOCX(file);
    else if(ext==="pptx") extractedCourseContent=await extractPPTX(file);
    else extractedCourseContent=await file.text();
    $("extractedCourseText").value=extractedCourseContent;
    $("courseExtractionStatus").textContent=`تم استخراج ${extractedCourseContent.length.toLocaleString()} حرف. راجعي المعاينة ثم أنشئي الحزمة.`;
    if(extractedCourseContent.trim().length<100) toast("النص المستخرج قليل؛ قد يكون الملف صورًا فقط");
  }catch(e){
    $("courseExtractionStatus").textContent=`فشل الاستخراج: ${e.message}`;
  }
}
async function summarizeCourse(){
  const text=$("extractedCourseText").value.trim();
  if(text.length<50){toast("استخرجي الملف أولًا");return}
  if(!window.FocusBloomCloud?.configured()){toast("فعّلي Supabase أولًا");return}
  $("courseSummaryResult").innerHTML="<p>جارٍ إنشاء الحزمة الدراسية… قد يستغرق ذلك قليلًا.</p>";
  try{
    const fn=(window.FOCUS_BLOOM_CONFIG||{}).COURSE_SUMMARIZER_FUNCTION_NAME||"course-summarizer";
    const data=await window.FocusBloomCloud.invoke(fn,{
      text,
      mode:$("summaryMode").value,
      language:$("summaryLanguage").value,
      course:$("courseName").value.trim(),
      year:$("courseYear").value,
      professorStyle:$("professorStyle").value.trim()
    });
    lastCourseSummary=data.summary||"";
    $("courseSummaryResult").textContent=lastCourseSummary+(data.truncated?"\n\n⚠️ تم اختصار الملف بسبب الحجم؛ قسّميه إلى أجزاء للحصول على تغطية أدق.":"");
  }catch(e){
    $("courseSummaryResult").innerHTML=`<p>${esc(e.message)}</p>`;
  }
}
function copyCourseSummary(){if(!lastCourseSummary){toast("لا توجد نتيجة");return}navigator.clipboard.writeText(lastCourseSummary);toast("تم النسخ")}
function downloadCourseSummary(){
  if(!lastCourseSummary){toast("لا توجد نتيجة");return}
  const blob=new Blob([lastCourseSummary],{type:"text/plain;charset=utf-8"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${$("courseName").value||"course"}-study-pack.txt`;a.click();URL.revokeObjectURL(a.href);
}
function summaryToFlashcards(){
  if(!lastCourseSummary){toast("لا توجد نتيجة");return}
  const lines=lastCourseSummary.split("\n").map(x=>x.trim()).filter(Boolean);
  let added=0;
  for(let i=0;i<lines.length-1&&added<20;i++){
    if(lines[i].endsWith("?")||/^(Q|Question|سؤال)\s*\d*/i.test(lines[i])){
      const answer=lines[i+1].replace(/^(A|Answer|الإجابة)\s*[:\-]?\s*/i,"");
      state.flashcards.push({id:crypto.randomUUID(),front:lines[i],back:answer,subjectId:$("flashSubject").value||state.subjects[0]?.id,nextReview:new Date().toISOString(),interval:0});
      added++;
    }
  }
  save();render();toast(added?`تمت إضافة ${added} بطاقة`:"لم أتعرف تلقائيًا على أسئلة وأجوبة واضحة");
}


/* ---------- Subject file workspace (IndexedDB) ---------- */
let activeSubjectId=null;
const SUBJECT_DB_NAME="FocusBloomSubjectFiles";
const SUBJECT_DB_VERSION=1;
function openSubjectDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(SUBJECT_DB_NAME,SUBJECT_DB_VERSION);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains("files")){const store=db.createObjectStore("files",{keyPath:"id"});store.createIndex("subjectId","subjectId")}};
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });
}
async function saveSubjectFile(subjectId,file){
  const db=await openSubjectDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("files","readwrite");
    tx.objectStore("files").put({id:crypto.randomUUID(),subjectId,name:file.name,type:file.type,size:file.size,addedAt:new Date().toISOString(),blob:file});
    tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
  });
}
async function getSubjectFiles(subjectId){
  const db=await openSubjectDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("files","readonly"),idx=tx.objectStore("files").index("subjectId"),req=idx.getAll(subjectId);
    req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error);
  });
}
async function deleteSubjectFile(id){
  const db=await openSubjectDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("files","readwrite");tx.objectStore("files").delete(id);
    tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
  });
}
async function renderSubjectFiles(){
  if(!activeSubjectId)return;
  const files=await getSubjectFiles(activeSubjectId);
  $("subjectFilesList").innerHTML=files.length?files.map(f=>`<div class="file-row">
    <div><strong>${esc(f.name)}</strong><div class="file-meta">${Math.ceil(f.size/1024)} KB · ${new Date(f.addedAt).toLocaleDateString("ar-JO")}</div></div>
    <div class="hero-actions">
      <button class="text-btn" onclick="sendStoredFileToAnalyzer('${f.id}')">تحليل</button>
      <button class="danger-btn" onclick="removeStoredFile('${f.id}')">حذف</button>
    </div>
  </div>`).join(""):'<div class="muted">لم تتم إضافة ملفات لهذه المادة بعد.</div>'
}
window.openSubjectWorkspace=async id=>{
  const s=state.subjects.find(x=>x.id===id);if(!s)return;
  activeSubjectId=id;nav("subject-workspace");
  $("workspaceSubjectTitle").textContent=s.name;
  $("workspaceSubjectHours").textContent=fmt(subjectMinutes(id));
  $("workspaceSubjectStats").innerHTML=`
    <div class="item"><span>وقت الدراسة المسجل</span><strong>${fmt(subjectMinutes(id))}</strong></div>
    <div class="item"><span>عدد السلايدات</span><strong>${s.slides||0}</strong></div>
    <div class="item"><span>الهدف الأسبوعي المقترح</span><strong>${s.credits?`${Math.max(2,s.credits)} ساعات`:"حدديه من الخطة"}</strong></div>`;
  await renderSubjectFiles();
};
window.removeStoredFile=async id=>{await deleteSubjectFile(id);renderSubjectFiles();toast("تم حذف الملف")};
window.sendStoredFileToAnalyzer=async id=>{
  const files=await getSubjectFiles(activeSubjectId),record=files.find(f=>f.id===id);
  if(!record)return;
  nav("course-analyzer");
  const s=state.subjects.find(x=>x.id===activeSubjectId);
  $("courseName").value=s?.name||"";
  try{
    const dt=new DataTransfer();
    dt.items.add(new File([record.blob],record.name,{type:record.type}));
    $("courseFile").files=dt.files;
    toast("تم نقل الملف إلى محلل المادة");
  }catch{
    toast("اختاري الملف يدويًا من محلل المادة");
  }
};

/* ---------- Weekly anti-backlog planner ---------- */
function chosenStudyDays(){
  return [...document.querySelectorAll("#studyDaysPicker input:checked")].map(x=>x.value);
}
function subjectPriorityScore(s){
  const studied=subjectMinutes(s.id);
  const credits=s.credits||3;
  const target=(s.targetHours||credits*2)*60;
  const deficit=Math.max(0,target-studied);
  return credits*100+deficit;
}
function generateBalancedPlan(){
  let days=chosenStudyDays();
  const requested=Math.max(1,Math.min(7,Number($("studyDaysCount").value)||5));
  const allDays=["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
  if(!days.length)days=allDays.slice(0,requested);
  days=days.slice(0,requested);
  const hours=Math.max(.5,Number($("studyHoursPerDay").value)||3);
  if(!state.subjects.length){toast("أضيفي موادك أولًا");return null}
  const sorted=[...state.subjects].sort((a,b)=>subjectPriorityScore(b)-subjectPriorityScore(a));
  const totalMinutes=Math.round(hours*60);
  const studyMinutes=Math.max(30,totalMinutes-20);
  const blockLength=studyMinutes>=180?50:studyMinutes>=100?40:30;
  const blocksPerDay=Math.max(1,Math.floor(studyMinutes/(blockLength+10)));
  let cursor=0;
  const plan=days.map((day,dayIndex)=>{
    const blocks=[];
    for(let b=0;b<blocksPerDay;b++){
      const subject=sorted[cursor%sorted.length];cursor++;
      const task=b===blocksPerDay-1&&dayIndex===days.length-1?"مراجعة أسبوعية + Active Recall":"دراسة جديدة ثم 10 دقائق Active Recall";
      blocks.push({subject:subject.name,minutes:blockLength,task});
    }
    return{day,blocks,buffer:Math.max(10,totalMinutes-blocks.reduce((a,x)=>a+x.minutes,0))};
  });
  state.weeklyPlanSettings={days,daysCount:requested,hoursPerDay:hours,preferences:$("studyPlanPreferences").value.trim()};
  save();
  return plan;
}
function renderLocalWeeklyPlan(plan){
  if(!plan)return;
  $("weeklyStudyPlanResult").innerHTML=plan.map(d=>`<div class="plan-day">
    <h3>${esc(d.day)}</h3>
    ${d.blocks.map((b,i)=>`<div class="plan-block"><span class="plan-time">${i+1}. ${b.minutes} دقيقة</span><div><strong>${esc(b.subject)}</strong><br><small>${esc(b.task)}</small></div></div>`).join("")}
    <div class="muted">وقت احتياطي: ${d.buffer} دقيقة للتأخير أو مراجعة ما لم يكتمل.</div>
  </div>`).join("")+`<div class="medical-disclaimer">قاعدة منع التراكم: لا تنقلي أكثر من بلوك واحد لليوم التالي. عند ضياع يوم، استخدمي الوقت الاحتياطي وقلّلي الجديد بدل إلغاء المراجعة.</div>`;
}
async function generateAIWeeklyPlan(){
  const local=generateBalancedPlan();renderLocalWeeklyPlan(local);
  if(!local)return;
  if(!window.FocusBloomCloud?.configured()){toast("ظهرت الخطة المحلية. فعّلي Supabase لاستخدام الذكاء الاصطناعي");return}
  $("weeklyStudyPlanResult").innerHTML="<p>جارٍ تحسين الخطة بالذكاء الاصطناعي…</p>";
  try{
    const fn=(window.FOCUS_BLOOM_CONFIG||{}).WEEKLY_PLANNER_FUNCTION_NAME||"weekly-study-planner";
    const data=await window.FocusBloomCloud.invoke(fn,{
      subjects:state.subjects.map(s=>({name:s.name,credits:s.credits||3,studiedMinutes:subjectMinutes(s.id),targetHours:s.targetHours||0})),
      days:chosenStudyDays().length?chosenStudyDays():local.map(x=>x.day),
      hoursPerDay:Number($("studyHoursPerDay").value)||3,
      preferences:$("studyPlanPreferences").value.trim()
    });
    $("weeklyStudyPlanResult").textContent=data.plan||"";
  }catch(e){renderLocalWeeklyPlan(local);toast(`تعذر تحسين الخطة: ${e.message}`)}
}
function restorePlanSettings(){
  const p=state.weeklyPlanSettings||{};
  $("studyDaysCount").value=p.daysCount||5;$("studyHoursPerDay").value=p.hoursPerDay||3;$("studyPlanPreferences").value=p.preferences||"";
  document.querySelectorAll("#studyDaysPicker input").forEach(x=>x.checked=(p.days||[]).includes(x.value));
}

document.querySelectorAll(".nav-link").forEach(n=>n.classList.toggle("active",n.dataset.page===page));const titles={dashboard:"مرحبًا بكِ في FocusBloom Pharmacy 👋",timer:"جلسة تركيز",subjects:"مواد الصيدلة","drug-vault":"Drug Vault",flashcards:"Flashcards",quiz:"Quiz Generator",planner:"Study Planner",trainer:"Pharmacy Trainer",stats:"الإحصائيات",achievements:"الإنجازات",assistant:"مساعد الصيدلة","subject-workspace":"ملفات المادة","drug-explorer":"Drug Explorer",curriculum:"Pharmacy Years Hub","course-analyzer":"محلل ملفات المواد",cloud:"الحساب والمزامنة",profile:"الملف الشخصي"};$("pageTitle").textContent=titles[page]||"FocusBloom";window.scrollTo({top:0,behavior:"smooth"});if(page==="flashcards")startReview();if(page==="trainer")startTrainer()}
function render(){applyTheme();renderProfile();renderOptions();renderDashboard();renderSubjects();renderDrugs();renderFlashcards();renderSessions();renderPlans();renderTrainerMistakes();renderStats();renderAchievements()}
function applyTheme(){document.body.classList.toggle("dark",state.settings.dark);$("themeToggle").textContent=state.settings.dark?"☀️ الوضع الفاتح":"🌙 الوضع الداكن"}
function renderProfile(){const p=state.profile,initial=(p.name||"D").trim().charAt(0).toUpperCase();$("miniAvatar").textContent=$("profileAvatar").textContent=initial;$("miniName").textContent=$("profileDisplayName").textContent=p.name;$("miniMajor").textContent=$("profileDisplayMajor").textContent=p.major;$("profileDisplayUniversity").textContent=p.university;$("profileName").value=p.name;$("profileMajor").value=p.major;$("profileUniversity").value=p.university;$("dailyGoal").value=state.settings.dailyGoal}
function renderOptions(){const opts=state.subjects.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("");["timerSubject","taskSubject","flashSubject","planSubject"].forEach(id=>$(id).innerHTML=(id==="taskSubject"?'<option value="">بدون مادة</option>':"")+opts);$("timerTask").innerHTML='<option value="">بدون مهمة</option>'+state.tasks.filter(t=>!t.completed).map(t=>`<option value="${t.id}">${esc(t.title)}</option>`).join("")}

function calculateXP(){
  const t=totals();
  const mastered=state.drugs.filter(d=>d.mastery==="mastered").length;
  const reviewed=state.flashcards.filter(f=>f.interval>0).length;
  const quizzes=state.quizHistory.length;
  const plans=state.plans.length;
  const challengeXP=state.completedChallenges.length*40;
  return Math.round(t.total*2 + mastered*50 + reviewed*15 + quizzes*60 + plans*40 + challengeXP);
}
function levelInfo(){
  const xp=calculateXP(),perLevel=500,level=Math.floor(xp/perLevel)+1,inLevel=xp%perLevel;
  return {xp,level,inLevel,perLevel};
}
function renderAdvancedProgress(){
  const mastered=state.drugs.filter(d=>d.mastery==="mastered").length;
  const totalDrugs=Math.max(1,state.drugs.length);
  const reviewed=state.flashcards.filter(f=>f.interval>0).length;
  const totalCards=Math.max(1,state.flashcards.length);
  const quizAvg=state.quizHistory.length?Math.round(state.quizHistory.reduce((a,q)=>a+q.score,0)/state.quizHistory.length):0;
  const rows=[
    ["إتقان الأدوية",Math.round(mastered/totalDrugs*100)],
    ["مراجعة البطاقات",Math.round(reviewed/totalCards*100)],
    ["متوسط الاختبارات",quizAvg]
  ];
  $("pharmacyProgress").innerHTML=rows.map(r=>`<div class="metric-line"><span>${r[0]}</span><div class="progress"><div style="width:${r[1]}%"></div></div><strong>${r[1]}%</strong></div>`).join("");
  const l=levelInfo();
  $("xpTotal").textContent=`${l.xp} XP`;
  $("levelLabel").textContent=`المستوى ${l.level}`;
  $("levelOrb").textContent=l.level;
  $("xpNextLabel").textContent=`${l.inLevel} / ${l.perLevel} XP`;
  $("xpProgress").style.width=`${l.inLevel/l.perLevel*100}%`;
}

function renderDashboard(){const t=totals(),p=plantInfo(t.total);$("todayFocus").textContent=fmt(t.today);$("currentStreak").textContent=`${streak()} يوم`;$("drugCount").textContent=state.drugs.length;const due=getDueFlashcards();$("flashcardDue").textContent=due.length;$("plantVisual").textContent=p.icon;$("plantStage").textContent=p.stage;$("plantMessage").textContent=p.msg;$("plantLevel").textContent=`المستوى ${Math.floor(t.total/600)+1}`;const prog=p.next===p.from?100:Math.min(100,((t.total-p.from)/(p.next-p.from))*100);$("plantProgress").style.width=`${prog}%`;$("plantNext").textContent=p.next===p.from?"وصلتِ لأعلى مرحلة":`${fmt(p.next-t.total)} للمرحلة التالية`;$("dashboardSubjects").innerHTML=state.subjects.slice(0,4).map(s=>`<div class="item"><span><b style="color:${s.color}">●</b> ${esc(s.name)}</span><strong>${fmt(subjectMinutes(s.id))}</strong></div>`).join("");$("dashboardReview").innerHTML=due.length?due.slice(0,4).map(f=>`<div class="item"><span>${esc(f.front)}</span><span class="pill">مستحقة</span></div>`).join(""):'<div class="muted">لا توجد بطاقات مستحقة.</div>';renderWeeklyBars();$("weekTotalPill").textContent=fmt(t.week);renderChallenge();renderAdvancedProgress()}
function renderChallenge(){const list=[["احفظي 5 أدوية","أضيفي أو راجعي خمس مواد فعالة اليوم."],["راجعي 10 Flashcards","جلسة مراجعة سريعة بالتكرار المتباعد."],["ادرسي 50 دقيقة","استخدمي وضع 50/10 لمادة صعبة."],["اختبار الفئات","حاولي الحصول على 80% في Pharmacy Trainer."],["راجعي أخطاءك","افتحي قائمة الأخطاء السابقة وراجعيها."]];if(state.challengeDate!==todayISO()){state.challengeDate=todayISO();state.challengeIndex=new Date().getDate()%list.length;save()}const c=list[state.challengeIndex];$("dailyChallengeTitle").textContent=c[0];$("dailyChallengeText").textContent=c[1];const done=state.completedChallenges.includes(todayISO());$("completeChallenge").textContent=done?"تم الإنجاز ✅":"تم الإنجاز";$("completeChallenge").disabled=done}
function renderWeeklyBars(){const labels=["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"],days=[];for(let i=6;i>=0;i--){const d=startOfDay();d.setDate(d.getDate()-i);const n=new Date(d);n.setDate(n.getDate()+1);const m=state.sessions.filter(s=>{const x=new Date(s.endedAt);return x>=d&&x<n}).reduce((a,s)=>a+sessionMinutes(s),0);days.push({label:labels[d.getDay()],minutes:m})}const max=Math.max(1,...days.map(d=>d.minutes));$("weeklyBars").innerHTML=days.map(d=>`<div class="day-bar"><strong>${d.minutes?fmt(d.minutes):""}</strong><div class="bar" style="height:${Math.max(6,d.minutes/max*120)}px"></div><small>${d.label}</small></div>`).join("")}
function renderSubjects(){
  $("subjectsCount").textContent=`${state.subjects.length} مواد`;
  $("subjectsList").innerHTML=state.subjects.length?state.subjects.map(s=>{
    const m=subjectMinutes(s.id),target=(s.targetHours||0)*60,p=target?Math.min(100,m/target*100):0;
    return`<div class="card subject-card" onclick="openSubjectWorkspace('${s.id}')">
      <div class="subject-color" style="background:${s.color}"></div>
      <div>
        <div class="card-head"><strong>${esc(s.name)}</strong><small>${fmt(m)}</small></div>
        <div class="progress subject-progress"><div style="width:${p}%;background:${s.color}"></div></div>
        <small class="muted">${s.slides?`${s.slides} سلايد · `:""}${target?`${Math.round(p)}% من الهدف`:"لا يوجد هدف"}</small>
        <div class="subject-open-hint">اضغطي لفتح الملفات والأدوات</div>
      </div>
      <button class="danger-btn" onclick="event.stopPropagation();deleteSubject('${s.id}')">حذف</button>
    </div>`
  }).join(""):'<div class="muted">أضيفي موادك من الخطة الدراسية باستخدام علامة +.</div>'
}
function masteryLabel(m){return{new:"جديد",learning:"قيد الحفظ",mastered:"متقن"}[m]}
function safetyBadge(label,text){
  const lower=(text||"").toLowerCase();
  const cls=lower.includes("غير آمن")||lower.includes("يُمنع")||lower.includes("مضاد استطباب")?"unsafe":lower.includes("حذر")||lower.includes("تقييم")||lower.includes("إشراف")?"caution":"conditional";
  return `<span class="safety-badge ${cls}"><b>${label}:</b> ${esc(text||"غير محدد")}</span>`;
}
function renderDrugs(){
  const q=$("drugSearch").value.toLowerCase(),f=$("drugMasteryFilter").value;
  let arr=state.drugs.filter(d=>[d.generic,d.brand,d.drugClass,d.use,d.pregnancy,d.children,d.elderly].join(" ").toLowerCase().includes(q));
  if(f!=="all")arr=arr.filter(d=>d.mastery===f);
  $("drugList").innerHTML=arr.length?arr.map(d=>`<div class="drug-card mastery-${d.mastery}">
    <div class="card-head"><h3>${esc(d.generic)}</h3><span class="pill">${masteryLabel(d.mastery)}</span></div>
    <p><strong>Brand:</strong> ${esc(d.brand||"—")}</p>
    <p><strong>Class:</strong> ${esc(d.drugClass)}</p>
    <p><strong>Uses:</strong> ${esc(d.use||"—")}</p>
    <details open><summary>الفئات الخاصة</summary>
      <div class="safety-grid">
        ${safetyBadge("الحمل",d.pregnancy)}
        ${safetyBadge("الأطفال",d.children)}
        ${safetyBadge("كبار السن",d.elderly)}
        ${safetyBadge("الرضاعة",d.lactation)}
      </div>
    </details>
    <details><summary>الآثار الجانبية والتحذيرات</summary>
      <p><strong>Common/important adverse effects:</strong> ${esc(d.sideEffects||"—")}</p>
      <p><strong>Key warnings:</strong> ${esc(d.warnings||"—")}</p>
    </details>
    <details><summary>التداخلات والمتابعة</summary>
      <p><strong>Interactions:</strong> ${esc(d.interactions||"—")}</p>
      <p><strong>Monitoring:</strong> ${esc(d.monitoring||"—")}</p>
      <p><strong>Renal:</strong> ${esc(d.renal||"—")}</p>
      <p><strong>Hepatic:</strong> ${esc(d.hepatic||"—")}</p>
    </details>
    <p><strong>Mnemonic:</strong> ${esc(d.mnemonic||"—")}</p>
    <p class="source-note"><strong>Source:</strong> ${esc(d.source||"Official product labeling")}</p>
    <div class="tag-row"><button class="secondary-btn" onclick="cycleMastery('${d.id}')">تغيير مستوى الحفظ</button><button class="danger-btn" onclick="deleteDrug('${d.id}')">حذف</button></div>
  </div>`).join(""):'<div class="muted">لا توجد نتائج.</div>'
}
function renderFlashcards(){$("flashcardCount").textContent=state.flashcards.length;$("flashcardList").innerHTML=state.flashcards.length?state.flashcards.map(f=>`<div class="item"><div class="item-main"><strong>${esc(f.front)}</strong><small>${esc(f.back)}</small></div><button class="danger-btn" onclick="deleteFlashcard('${f.id}')">حذف</button></div>`).join(""):'<div class="muted">لا توجد بطاقات.</div>'}
function getDueFlashcards(){const now=Date.now();return state.flashcards.filter(f=>!f.nextReview||new Date(f.nextReview).getTime()<=now)}
function startReview(){reviewQueue=getDueFlashcards();$("reviewDueCount").textContent=`${reviewQueue.length} مستحقة`;if(!reviewQueue.length){$("reviewEmpty").hidden=false;$("reviewArea").hidden=true;return}$("reviewEmpty").hidden=true;$("reviewArea").hidden=false;currentReview=reviewQueue[0];$("reviewFront").textContent=currentReview.front;$("reviewBack").textContent=currentReview.back;$("reviewBack").classList.add("hidden");$("showAnswer").hidden=false;$("reviewButtons").hidden=true}
function reviewRate(r){if(!currentReview)return;const now=new Date(),days={again:0,hard:1,good:3,easy:7}[r];now.setDate(now.getDate()+days);currentReview.nextReview=now.toISOString();currentReview.interval=days;save();startReview();renderDashboard()}
function renderSessions(){const list=[...state.sessions].reverse().slice(0,10);$("sessionList").innerHTML=list.length?list.map(s=>{const sub=state.subjects.find(x=>x.id===s.subjectId);return`<div class="item"><div class="item-main"><strong>${sub?esc(sub.name):"جلسة دراسة"}</strong><small>${s.mode} · ${new Date(s.endedAt).toLocaleDateString("ar-JO")}</small></div><strong>${fmt(sessionMinutes(s))}</strong></div>`}).join(""):'<div class="muted">لا توجد جلسات بعد.</div>'}
function renderPlans(){$("planCount").textContent=state.plans.length;$("planList").innerHTML=state.plans.length?state.plans.map(p=>`<div class="item"><div class="item-main"><strong>${esc(p.title)}</strong><small>${p.days} أيام · ${p.chaptersPerDay} شابتر/يوم ${p.slidesPerDay?`· ${p.slidesPerDay} سلايد/يوم`:""}</small></div><button class="danger-btn" onclick="deletePlan('${p.id}')">حذف</button></div>`).join(""):'<div class="muted">لا توجد خطط.</div>'}
function trainerData(){if(state.drugs.length<2)return null;const drug=state.drugs[Math.floor(Math.random()*state.drugs.length)];let answer,question,wrongPool;if(trainerMode==="drug-class"){question=drug.generic;answer=drug.drugClass;wrongPool=state.drugs.map(d=>d.drugClass)}else if(trainerMode==="class-drug"){question=drug.drugClass;answer=drug.generic;wrongPool=state.drugs.map(d=>d.generic)}else{question=drug.generic;answer=drug.use||"—";wrongPool=state.drugs.map(d=>d.use||"—")}const opts=[answer,...wrongPool.filter(x=>x&&x!==answer)].filter((x,i,a)=>a.indexOf(x)===i).slice(0,4).sort(()=>Math.random()-.5);return{drug,question,answer,options:opts}}
function startTrainer(){trainerQuestion=trainerData();if(!trainerQuestion){$("trainerQuestion").textContent="أضيفي دواءين على الأقل لبدء التدريب.";$("trainerOptions").innerHTML="";return}$("trainerQuestion").textContent=trainerQuestion.question;$("trainerOptions").innerHTML=trainerQuestion.options.map(o=>`<button class="trainer-option" onclick="answerTrainer(this,'${esc(o).replace(/'/g,"&#39;")}')">${esc(o)}</button>`).join("");$("nextTrainer").hidden=true;$("trainerProgress").textContent=`${trainerCorrect} صحيح`}
function answerTrainer(btn,ans){document.querySelectorAll(".trainer-option").forEach(b=>b.disabled=true);if(ans===trainerQuestion.answer){btn.classList.add("correct");trainerCorrect++;toast("إجابة صحيحة ✅")}else{btn.classList.add("wrong");document.querySelectorAll(".trainer-option").forEach(b=>{if(b.textContent===trainerQuestion.answer)b.classList.add("correct")});state.mistakes.unshift({id:crypto.randomUUID(),question:trainerQuestion.question,answer:trainerQuestion.answer,yourAnswer:ans,date:new Date().toISOString()});save();renderTrainerMistakes()}$("nextTrainer").hidden=false;$("trainerProgress").textContent=`${trainerCorrect} صحيح`}
function renderTrainerMistakes(){$("mistakeList").innerHTML=state.mistakes.length?state.mistakes.slice(0,10).map(m=>`<div class="item"><div class="item-main"><strong>${esc(m.question)}</strong><small>الصحيح: ${esc(m.answer)} · إجابتك: ${esc(m.yourAnswer)}</small></div></div>`).join(""):'<div class="muted">لا توجد أخطاء مسجلة.</div>'}
function renderStats(){const t=totals(),longest=state.sessions.length?Math.max(...state.sessions.map(sessionMinutes)):0;$("weekStudy").textContent=fmt(t.week);$("longestSession").textContent=fmt(longest);$("pomodoroCount").textContent=state.sessions.filter(s=>s.mode!=="stopwatch").length;const vals=state.subjects.map(s=>({...s,minutes:subjectMinutes(s.id)})),max=Math.max(1,...vals.map(v=>v.minutes));$("subjectStats").innerHTML=vals.map(v=>`<div class="bar-row"><span>${esc(v.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${v.minutes/max*100}%;background:${v.color}"></div></div><strong>${fmt(v.minutes)}</strong></div>`).join("")}
function achievements(){const t=totals(),s=streak(),mastered=state.drugs.filter(d=>d.mastery==="mastered").length;return[
["🌱","أول جلسة","إكمال أول جلسة",state.sessions.length>=1],["⏱️","ساعة تركيز","دراسة ساعة",t.total>=60],["📚","10 ساعات","دراسة 10 ساعات",t.total>=600],["🔥","3 أيام","سلسلة 3 أيام",s>=3],["🏆","7 أيام","سلسلة 7 أيام",s>=7],["💊","أول دواء","إضافة أول دواء",state.drugs.length>=1],["🧪","Drug Collector","إضافة 20 دواء",state.drugs.length>=20],["✅","Mastered","إتقان 10 أدوية",mastered>=10],["🧠","Flashcard Starter","إضافة 10 بطاقات",state.flashcards.length>=10],["📝","Quiz Master","إكمال 5 اختبارات",state.quizHistory.length>=5],["🎯","Planner","إنشاء أول خطة",state.plans.length>=1],["🌳","Focus Tree","دراسة 50 ساعة",t.total>=3000]
]}
function renderAchievements(){const a=achievements(),count=a.filter(x=>x[3]).length;$("achievementSummary").textContent=`${count} / ${a.length}`;$("achievementGrid").innerHTML=a.map(x=>`<div class="achievement ${x[3]?"":"locked"}"><div class="achievement-icon">${x[0]}</div><h3>${x[1]}</h3><p class="muted">${x[2]}</p><strong>${x[3]?"تم الفتح ✅":"مقفل 🔒"}</strong></div>`).join("")}


function firstText(obj, keys){
  for(const key of keys){
    const v=obj?.[key];
    if(Array.isArray(v)&&v.length) return v[0];
  }
  return "غير متوفر في هذا السجل";
}
async function searchOpenFDA(){
  const term=$("fdaSearchInput").value.trim();
  if(!term){toast("اكتبي اسم دواء");return}
  $("fdaSearchResult").innerHTML="<p>جارٍ البحث…</p>";
  try{
    const query=encodeURIComponent(`openfda.generic_name:"${term}" openfda.brand_name:"${term}"`);
    let url=`https://api.fda.gov/drug/label.json?search=${query}&limit=1`;
    let res=await fetch(url);
    if(!res.ok){
      const loose=encodeURIComponent(term);
      res=await fetch(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:${loose}+openfda.brand_name:${loose}&limit=1`);
    }
    const data=await res.json();
    if(!res.ok||!data.results?.length) throw new Error(data?.error?.message||"لم يتم العثور على نتيجة");
    const d=data.results[0];
    $("fdaSearchResult").innerHTML=`
      <h3>${esc(d.openfda?.generic_name?.[0]||d.openfda?.brand_name?.[0]||term)}</h3>
      <div class="fda-section"><strong>Indications:</strong><p>${esc(firstText(d,["indications_and_usage","purpose"]))}</p></div>
      <div class="fda-section"><strong>Warnings:</strong><p>${esc(firstText(d,["boxed_warning","warnings","warnings_and_cautions"]))}</p></div>
      <div class="fda-section"><strong>Adverse reactions:</strong><p>${esc(firstText(d,["adverse_reactions"]))}</p></div>
      <div class="fda-section"><strong>Drug interactions:</strong><p>${esc(firstText(d,["drug_interactions"]))}</p></div>
      <div class="fda-section"><strong>Pregnancy:</strong><p>${esc(firstText(d,["pregnancy","pregnancy_or_breast_feeding"]))}</p></div>
      <div class="fda-section"><strong>Pediatric use:</strong><p>${esc(firstText(d,["pediatric_use"]))}</p></div>
      <div class="fda-section"><strong>Geriatric use:</strong><p>${esc(firstText(d,["geriatric_use"]))}</p></div>
      <p class="medical-disclaimer">هذه بيانات نشرة FDA وقد تختلف بين الشركات والمستحضرات. لا تعتمد عليها وحدها لاتخاذ قرار علاجي.</p>`;
  }catch(e){
    $("fdaSearchResult").innerHTML=`<p>${esc(e.message)}</p>`;
  }
}

async function updateCloudStatus(){
  const el=$("cloudStatus");
  if(!window.FocusBloomCloud?.configured()){el.textContent="يحتاج إعداد";return}
  try{
    const user=await window.FocusBloomCloud.getUser();
    el.textContent=user?`متصل: ${user.email}`:"غير مسجل";
  }catch{el.textContent="خطأ في الاتصال"}
}
async function signUpCloud(){
  try{await window.FocusBloomCloud.signUp($("authEmail").value,$("authPassword").value);toast("تم إنشاء الحساب. افحصي البريد إذا كان التأكيد مفعّلًا");updateCloudStatus()}catch(e){toast(e.message)}
}
async function signInCloud(){
  try{await window.FocusBloomCloud.signIn($("authEmail").value,$("authPassword").value);toast("تم تسجيل الدخول");updateCloudStatus()}catch(e){toast(e.message)}
}
async function signOutCloud(){
  try{await window.FocusBloomCloud.signOut();toast("تم تسجيل الخروج");updateCloudStatus()}catch(e){toast(e.message)}
}
async function pushCloud(){
  try{await window.FocusBloomCloud.pushState(state);toast("تم رفع البيانات إلى السحابة")}catch(e){toast(e.message)}
}
async function pullCloud(){
  try{
    const data=await window.FocusBloomCloud.pullState();
    if(!data?.state){toast("لا توجد نسخة سحابية");return}
    if(!confirm("سيتم استبدال بيانات هذا الجهاز. متابعة؟"))return;
    state=data.state;save();render();toast("تم تنزيل البيانات")
  }catch(e){toast(e.message)}
}
let latestMedicineImage=null;
async function recognizeMedicine(){
  if(!latestMedicineImage){toast("اختاري صورة أولًا");return}
  $("visionResult").innerHTML="<p>جارٍ تحليل الصورة…</p>";
  try{
    const name=(window.FOCUS_BLOOM_CONFIG||{}).VISION_FUNCTION_NAME||"medicine-vision";
    const data=await window.FocusBloomCloud.invoke(name,{imageDataUrl:latestMedicineImage});
    $("visionResult").innerHTML=`<pre style="white-space:pre-wrap">${esc(data.result||JSON.stringify(data,null,2))}</pre>`;
  }catch(e){$("visionResult").innerHTML=`<p>${esc(e.message)}</p>`}
}


async function rxNormSearch(){
  const term=$("rxDrugSearch").value.trim();
  if(!term){toast("اكتبي اسم دواء");return}
  $("rxDrugStatus").textContent="جارٍ البحث في RxNorm…";
  $("rxDrugResults").innerHTML="";
  try{
    const res=await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(term)}`);
    const data=await res.json();
    const groups=data.drugGroup?.conceptGroup||[];
    const products=[];
    groups.forEach(g=>(g.conceptProperties||[]).forEach(p=>products.push({
      tty:g.tty||"",
      rxcui:p.rxcui,
      name:p.name,
      synonym:p.synonym||""
    })));
    const unique=[...new Map(products.map(p=>[p.rxcui,p])).values()];
    if(!unique.length) throw new Error("لم يتم العثور على منتجات أو تركيزات مطابقة");
    const generic=unique.filter(p=>["SCD","SCDC","SCDF"].includes(p.tty));
    const brands=unique.filter(p=>["SBD","SBDC","SBDF"].includes(p.tty));
    const packs=unique.filter(p=>["BPCK","GPCK"].includes(p.tty));
    $("rxDrugStatus").textContent=`تم العثور على ${unique.length} مفهوم/منتج دوائي.`;
    const section=(title,arr)=>arr.length?`<div class="rx-group"><h3>${title}</h3><div class="rx-product-grid">${arr.slice(0,60).map(p=>`<div class="rx-product"><h4>${esc(p.name)}</h4><small>${esc(p.tty)} · RxCUI ${esc(p.rxcui)}</small>${p.synonym?`<p class="muted">${esc(p.synonym)}</p>`:""}<button class="text-btn" onclick="lookupLabelFromExplorer('${esc(term).replace(/'/g,"&#39;")}')">فتح معلومات النشرة</button></div>`).join("")}</div></div>`:"";
    $("rxDrugResults").innerHTML=section("Generic clinical products — التركيزات والأشكال",generic)+section("Branded products — المنتجات التجارية",brands)+section("Packs — العبوات المركبة",packs);
  }catch(e){
    $("rxDrugStatus").textContent=e.message;
  }
}
window.lookupLabelFromExplorer=term=>{
  nav("drug-vault");
  $("fdaSearchInput").value=term;
  searchOpenFDA();
};

let extractedCourseContent="",lastCourseSummary="";
async function extractPDF(file){
  const pdfjs=await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";
  const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;
  const parts=[];
  for(let i=1;i<=pdf.numPages;i++){
    const page=await pdf.getPage(i);
    const content=await page.getTextContent();
    parts.push(`\n--- Page ${i} ---\n`+content.items.map(x=>x.str).join(" "));
  }
  return parts.join("\n");
}
async function extractDOCX(file){
  const result=await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()});
  return result.value;
}
async function extractPPTX(file){
  const zip=await JSZip.loadAsync(await file.arrayBuffer());
  const slideNames=Object.keys(zip.files).filter(n=>/^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a,b)=>{
    const na=Number(a.match(/slide(\d+)/)[1]),nb=Number(b.match(/slide(\d+)/)[1]);return na-nb;
  });
  const slides=[];
  for(const name of slideNames){
    const xml=await zip.file(name).async("text");
    const texts=[...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map(m=>m[1].replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">"));
    slides.push(`\n--- ${name.match(/slide\d+/)[0]} ---\n${texts.join(" ")}`);
  }
  return slides.join("\n");
}
async function extractCourseFile(){
  const file=$("courseFile").files[0];
  if(!file){toast("اختاري ملفًا");return}
  $("courseExtractionStatus").textContent=`جارٍ استخراج ${file.name}…`;
  try{
    const ext=file.name.split(".").pop().toLowerCase();
    if(ext==="pdf") extractedCourseContent=await extractPDF(file);
    else if(ext==="docx") extractedCourseContent=await extractDOCX(file);
    else if(ext==="pptx") extractedCourseContent=await extractPPTX(file);
    else extractedCourseContent=await file.text();
    $("extractedCourseText").value=extractedCourseContent;
    $("courseExtractionStatus").textContent=`تم استخراج ${extractedCourseContent.length.toLocaleString()} حرف. راجعي المعاينة ثم أنشئي الحزمة.`;
    if(extractedCourseContent.trim().length<100) toast("النص المستخرج قليل؛ قد يكون الملف صورًا فقط");
  }catch(e){
    $("courseExtractionStatus").textContent=`فشل الاستخراج: ${e.message}`;
  }
}
async function summarizeCourse(){
  const text=$("extractedCourseText").value.trim();
  if(text.length<50){toast("استخرجي الملف أولًا");return}
  if(!window.FocusBloomCloud?.configured()){toast("فعّلي Supabase أولًا");return}
  $("courseSummaryResult").innerHTML="<p>جارٍ إنشاء الحزمة الدراسية… قد يستغرق ذلك قليلًا.</p>";
  try{
    const fn=(window.FOCUS_BLOOM_CONFIG||{}).COURSE_SUMMARIZER_FUNCTION_NAME||"course-summarizer";
    const data=await window.FocusBloomCloud.invoke(fn,{
      text,
      mode:$("summaryMode").value,
      language:$("summaryLanguage").value,
      course:$("courseName").value.trim(),
      year:$("courseYear").value,
      professorStyle:$("professorStyle").value.trim()
    });
    lastCourseSummary=data.summary||"";
    $("courseSummaryResult").textContent=lastCourseSummary+(data.truncated?"\n\n⚠️ تم اختصار الملف بسبب الحجم؛ قسّميه إلى أجزاء للحصول على تغطية أدق.":"");
  }catch(e){
    $("courseSummaryResult").innerHTML=`<p>${esc(e.message)}</p>`;
  }
}
function copyCourseSummary(){if(!lastCourseSummary){toast("لا توجد نتيجة");return}navigator.clipboard.writeText(lastCourseSummary);toast("تم النسخ")}
function downloadCourseSummary(){
  if(!lastCourseSummary){toast("لا توجد نتيجة");return}
  const blob=new Blob([lastCourseSummary],{type:"text/plain;charset=utf-8"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${$("courseName").value||"course"}-study-pack.txt`;a.click();URL.revokeObjectURL(a.href);
}
function summaryToFlashcards(){
  if(!lastCourseSummary){toast("لا توجد نتيجة");return}
  const lines=lastCourseSummary.split("\n").map(x=>x.trim()).filter(Boolean);
  let added=0;
  for(let i=0;i<lines.length-1&&added<20;i++){
    if(lines[i].endsWith("?")||/^(Q|Question|سؤال)\s*\d*/i.test(lines[i])){
      const answer=lines[i+1].replace(/^(A|Answer|الإجابة)\s*[:\-]?\s*/i,"");
      state.flashcards.push({id:crypto.randomUUID(),front:lines[i],back:answer,subjectId:$("flashSubject").value||state.subjects[0]?.id,nextReview:new Date().toISOString(),interval:0});
      added++;
    }
  }
  save();render();toast(added?`تمت إضافة ${added} بطاقة`:"لم أتعرف تلقائيًا على أسئلة وأجوبة واضحة");
}


/* ---------- Subject file workspace (IndexedDB) ---------- */
let activeSubjectId=null;
const SUBJECT_DB_NAME="FocusBloomSubjectFiles";
const SUBJECT_DB_VERSION=1;
function openSubjectDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(SUBJECT_DB_NAME,SUBJECT_DB_VERSION);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains("files")){const store=db.createObjectStore("files",{keyPath:"id"});store.createIndex("subjectId","subjectId")}};
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
  });
}
async function saveSubjectFile(subjectId,file){
  const db=await openSubjectDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("files","readwrite");
    tx.objectStore("files").put({id:crypto.randomUUID(),subjectId,name:file.name,type:file.type,size:file.size,addedAt:new Date().toISOString(),blob:file});
    tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
  });
}
async function getSubjectFiles(subjectId){
  const db=await openSubjectDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("files","readonly"),idx=tx.objectStore("files").index("subjectId"),req=idx.getAll(subjectId);
    req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error);
  });
}
async function deleteSubjectFile(id){
  const db=await openSubjectDB();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("files","readwrite");tx.objectStore("files").delete(id);
    tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
  });
}
async function renderSubjectFiles(){
  if(!activeSubjectId)return;
  const files=await getSubjectFiles(activeSubjectId);
  $("subjectFilesList").innerHTML=files.length?files.map(f=>`<div class="file-row">
    <div><strong>${esc(f.name)}</strong><div class="file-meta">${Math.ceil(f.size/1024)} KB · ${new Date(f.addedAt).toLocaleDateString("ar-JO")}</div></div>
    <div class="hero-actions">
      <button class="text-btn" onclick="sendStoredFileToAnalyzer('${f.id}')">تحليل</button>
      <button class="danger-btn" onclick="removeStoredFile('${f.id}')">حذف</button>
    </div>
  </div>`).join(""):'<div class="muted">لم تتم إضافة ملفات لهذه المادة بعد.</div>'
}
window.openSubjectWorkspace=async id=>{
  const s=state.subjects.find(x=>x.id===id);if(!s)return;
  activeSubjectId=id;nav("subject-workspace");
  $("workspaceSubjectTitle").textContent=s.name;
  $("workspaceSubjectHours").textContent=fmt(subjectMinutes(id));
  $("workspaceSubjectStats").innerHTML=`
    <div class="item"><span>وقت الدراسة المسجل</span><strong>${fmt(subjectMinutes(id))}</strong></div>
    <div class="item"><span>عدد السلايدات</span><strong>${s.slides||0}</strong></div>
    <div class="item"><span>الهدف الأسبوعي المقترح</span><strong>${s.credits?`${Math.max(2,s.credits)} ساعات`:"حدديه من الخطة"}</strong></div>`;
  await renderSubjectFiles();
};
window.removeStoredFile=async id=>{await deleteSubjectFile(id);renderSubjectFiles();toast("تم حذف الملف")};
window.sendStoredFileToAnalyzer=async id=>{
  const files=await getSubjectFiles(activeSubjectId),record=files.find(f=>f.id===id);
  if(!record)return;
  nav("course-analyzer");
  const s=state.subjects.find(x=>x.id===activeSubjectId);
  $("courseName").value=s?.name||"";
  try{
    const dt=new DataTransfer();
    dt.items.add(new File([record.blob],record.name,{type:record.type}));
    $("courseFile").files=dt.files;
    toast("تم نقل الملف إلى محلل المادة");
  }catch{
    toast("اختاري الملف يدويًا من محلل المادة");
  }
};

/* ---------- Weekly anti-backlog planner ---------- */
function chosenStudyDays(){
  return [...document.querySelectorAll("#studyDaysPicker input:checked")].map(x=>x.value);
}
function subjectPriorityScore(s){
  const studied=subjectMinutes(s.id);
  const credits=s.credits||3;
  const target=(s.targetHours||credits*2)*60;
  const deficit=Math.max(0,target-studied);
  return credits*100+deficit;
}
function generateBalancedPlan(){
  let days=chosenStudyDays();
  const requested=Math.max(1,Math.min(7,Number($("studyDaysCount").value)||5));
  const allDays=["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
  if(!days.length)days=allDays.slice(0,requested);
  days=days.slice(0,requested);
  const hours=Math.max(.5,Number($("studyHoursPerDay").value)||3);
  if(!state.subjects.length){toast("أضيفي موادك أولًا");return null}
  const sorted=[...state.subjects].sort((a,b)=>subjectPriorityScore(b)-subjectPriorityScore(a));
  const totalMinutes=Math.round(hours*60);
  const studyMinutes=Math.max(30,totalMinutes-20);
  const blockLength=studyMinutes>=180?50:studyMinutes>=100?40:30;
  const blocksPerDay=Math.max(1,Math.floor(studyMinutes/(blockLength+10)));
  let cursor=0;
  const plan=days.map((day,dayIndex)=>{
    const blocks=[];
    for(let b=0;b<blocksPerDay;b++){
      const subject=sorted[cursor%sorted.length];cursor++;
      const task=b===blocksPerDay-1&&dayIndex===days.length-1?"مراجعة أسبوعية + Active Recall":"دراسة جديدة ثم 10 دقائق Active Recall";
      blocks.push({subject:subject.name,minutes:blockLength,task});
    }
    return{day,blocks,buffer:Math.max(10,totalMinutes-blocks.reduce((a,x)=>a+x.minutes,0))};
  });
  state.weeklyPlanSettings={days,daysCount:requested,hoursPerDay:hours,preferences:$("studyPlanPreferences").value.trim()};
  save();
  return plan;
}
function renderLocalWeeklyPlan(plan){
  if(!plan)return;
  $("weeklyStudyPlanResult").innerHTML=plan.map(d=>`<div class="plan-day">
    <h3>${esc(d.day)}</h3>
    ${d.blocks.map((b,i)=>`<div class="plan-block"><span class="plan-time">${i+1}. ${b.minutes} دقيقة</span><div><strong>${esc(b.subject)}</strong><br><small>${esc(b.task)}</small></div></div>`).join("")}
    <div class="muted">وقت احتياطي: ${d.buffer} دقيقة للتأخير أو مراجعة ما لم يكتمل.</div>
  </div>`).join("")+`<div class="medical-disclaimer">قاعدة منع التراكم: لا تنقلي أكثر من بلوك واحد لليوم التالي. عند ضياع يوم، استخدمي الوقت الاحتياطي وقلّلي الجديد بدل إلغاء المراجعة.</div>`;
}
async function generateAIWeeklyPlan(){
  const local=generateBalancedPlan();renderLocalWeeklyPlan(local);
  if(!local)return;
  if(!window.FocusBloomCloud?.configured()){toast("ظهرت الخطة المحلية. فعّلي Supabase لاستخدام الذكاء الاصطناعي");return}
  $("weeklyStudyPlanResult").innerHTML="<p>جارٍ تحسين الخطة بالذكاء الاصطناعي…</p>";
  try{
    const fn=(window.FOCUS_BLOOM_CONFIG||{}).WEEKLY_PLANNER_FUNCTION_NAME||"weekly-study-planner";
    const data=await window.FocusBloomCloud.invoke(fn,{
      subjects:state.subjects.map(s=>({name:s.name,credits:s.credits||3,studiedMinutes:subjectMinutes(s.id),targetHours:s.targetHours||0})),
      days:chosenStudyDays().length?chosenStudyDays():local.map(x=>x.day),
      hoursPerDay:Number($("studyHoursPerDay").value)||3,
      preferences:$("studyPlanPreferences").value.trim()
    });
    $("weeklyStudyPlanResult").textContent=data.plan||"";
  }catch(e){renderLocalWeeklyPlan(local);toast(`تعذر تحسين الخطة: ${e.message}`)}
}
function restorePlanSettings(){
  const p=state.weeklyPlanSettings||{};
  $("studyDaysCount").value=p.daysCount||5;$("studyHoursPerDay").value=p.hoursPerDay||3;$("studyPlanPreferences").value=p.preferences||"";
  document.querySelectorAll("#studyDaysPicker input").forEach(x=>x.checked=(p.days||[]).includes(x.value));
}

document.querySelectorAll(".nav-link").forEach(b=>b.onclick=()=>nav(b.dataset.page));
document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>nav(b.dataset.jump));
$("todayDate").textContent=new Date().toLocaleDateString("ar-JO",{weekday:"long",year:"numeric",month:"long",day:"numeric"})+" · الإصدار 3.3";
$("themeToggle").onclick=()=>{state.settings.dark=!state.settings.dark;save();applyTheme()};
$("completeChallenge").onclick=()=>{if(!state.completedChallenges.includes(todayISO()))state.completedChallenges.push(todayISO());save();renderChallenge();toast("أحسنتِ! تم إنجاز التحدي")};

$("subjectForm").onsubmit=e=>{e.preventDefault();state.subjects.push({id:crypto.randomUUID(),name:$("subjectName").value.trim(),color:$("subjectColor").value,slides:Number($("subjectSlides").value)||0,targetHours:Number($("subjectTarget").value)||0});e.target.reset();$("subjectColor").value="#7c5ce7";save();render();toast("تمت إضافة المادة")};
window.deleteSubject=id=>{state.subjects=state.subjects.filter(s=>s.id!==id);save();render()};

$("drugForm").onsubmit=e=>{e.preventDefault();state.drugs.push({
  id:crypto.randomUUID(),
  generic:$("drugGeneric").value.trim(),brand:$("drugBrand").value.trim(),
  drugClass:$("drugClass").value.trim(),use:$("drugUse").value.trim(),
  sideEffects:$("drugSideEffects").value.trim(),mnemonic:$("drugMnemonic").value.trim(),
  mastery:$("drugMastery").value,
  pregnancy:$("drugPregnancy").value.trim(),children:$("drugChildren").value.trim(),
  elderly:$("drugElderly").value.trim(),lactation:$("drugLactation").value.trim(),
  warnings:$("drugWarnings").value.trim(),interactions:$("drugInteractions").value.trim(),
  monitoring:$("drugMonitoring").value.trim(),renal:$("drugRenal").value.trim(),
  hepatic:$("drugHepatic").value.trim(),source:$("drugSource").value.trim()||"User-added entry"
});e.target.reset();save();render();toast("تمت إضافة الدواء")};
$("drugSearch").oninput=renderDrugs;$("drugMasteryFilter").onchange=renderDrugs;
window.deleteDrug=id=>{state.drugs=state.drugs.filter(d=>d.id!==id);save();render()};
window.cycleMastery=id=>{const d=state.drugs.find(x=>x.id===id),order=["new","learning","mastered"];d.mastery=order[(order.indexOf(d.mastery)+1)%3];save();render()};

$("flashcardForm").onsubmit=e=>{e.preventDefault();state.flashcards.push({id:crypto.randomUUID(),front:$("flashFront").value.trim(),back:$("flashBack").value.trim(),subjectId:$("flashSubject").value,nextReview:new Date().toISOString(),interval:0});e.target.reset();save();render();startReview();toast("تمت إضافة البطاقة")};
window.deleteFlashcard=id=>{state.flashcards=state.flashcards.filter(f=>f.id!==id);save();render();startReview()};
$("showAnswer").onclick=()=>{$("reviewBack").classList.remove("hidden");$("showAnswer").hidden=true;$("reviewButtons").hidden=false};
document.querySelectorAll("[data-rating]").forEach(b=>b.onclick=()=>reviewRate(b.dataset.rating));

$("generateQuiz").onclick=()=>{const count=Number($("quizCount").value),source=$("quizSource").value;if(source==="drugs"){if(state.drugs.length<4){toast("أضيفي 4 أدوية على الأقل");return}quizQuestions=Array.from({length:Math.min(count,state.drugs.length)},(_,i)=>{const d=state.drugs[i%state.drugs.length],answer=d.drugClass,opts=[answer,...state.drugs.map(x=>x.drugClass).filter(x=>x!==answer)].filter((x,i,a)=>a.indexOf(x)===i).slice(0,4).sort(()=>Math.random()-.5);return{q:`ما الفئة الدوائية لـ ${d.generic}؟`,answer,opts}})}else{if(state.flashcards.length<4){toast("أضيفي 4 بطاقات على الأقل");return}quizQuestions=state.flashcards.slice(0,count).map(f=>{const answer=f.back,opts=[answer,...state.flashcards.map(x=>x.back).filter(x=>x!==answer)].slice(0,3).sort(()=>Math.random()-.5);return{q:f.front,answer,opts}})}$("quizArea").innerHTML=quizQuestions.map((q,i)=>`<div class="quiz-question"><strong>${i+1}. ${esc(q.q)}</strong><div class="quiz-options">${q.opts.map(o=>`<button class="quiz-option" data-q="${i}" data-a="${esc(o)}">${esc(o)}</button>`).join("")}</div></div>`).join("")+`<button id="submitQuiz" class="primary-btn full" style="margin-top:14px">إنهاء الاختبار</button>`;document.querySelectorAll(".quiz-option").forEach(b=>b.onclick=()=>{document.querySelectorAll(`.quiz-option[data-q="${b.dataset.q}"]`).forEach(x=>x.classList.remove("selected"));b.classList.add("selected")});$("submitQuiz").onclick=submitQuiz};
function submitQuiz(){let correct=0;quizQuestions.forEach((q,i)=>{const s=document.querySelector(`.quiz-option.selected[data-q="${i}"]`);if(s&&s.dataset.a===q.answer)correct++});const pct=Math.round(correct/quizQuestions.length*100);$("quizScore").textContent=`${pct}%`;state.quizHistory.unshift({id:crypto.randomUUID(),date:new Date().toISOString(),score:pct,count:quizQuestions.length});save();$("quizHistory").innerHTML=state.quizHistory.slice(0,8).map(h=>`<div class="item"><span>${new Date(h.date).toLocaleDateString("ar-JO")}</span><strong>${h.score}%</strong></div>`).join("");toast("تم حفظ النتيجة")}

$("planForm").onsubmit=e=>{e.preventDefault();const exam=new Date($("planExamDate").value),today=startOfDay(),days=Math.max(1,Math.ceil((exam-today)/86400000)),chap=Number($("planChapters").value),slides=Number($("planSlides").value)||0;state.plans.push({id:crypto.randomUUID(),title:$("planTitle").value.trim(),subjectId:$("planSubject").value,examDate:$("planExamDate").value,days,chaptersPerDay:Math.ceil(chap/days),slidesPerDay:slides?Math.ceil(slides/days):0});e.target.reset();save();renderPlans();renderAchievements();toast("تم إنشاء الخطة")};
window.deletePlan=id=>{state.plans=state.plans.filter(p=>p.id!==id);save();renderPlans()};

document.querySelectorAll("[data-trainer]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-trainer]").forEach(x=>x.classList.remove("active"));b.classList.add("active");trainerMode=b.dataset.trainer;trainerCorrect=0;startTrainer()});
$("nextTrainer").onclick=startTrainer;
window.answerTrainer=answerTrainer;

$("assistantForm").onsubmit=async e=>{
  e.preventDefault();
  const raw=$("assistantInput").value.trim(),q=raw.toLowerCase();
  $("assistantAnswer").innerHTML="<p>جارٍ التحليل…</p>";
  try{
    if(window.FocusBloomCloud?.configured()){
      const fn=(window.FOCUS_BLOOM_CONFIG||{}).AI_FUNCTION_NAME||"pharmacy-ai";
      const context=state.drugs.filter(d=>[d.generic,d.brand,d.drugClass].join(" ").toLowerCase().includes(q)).slice(0,8);
      const data=await window.FocusBloomCloud.invoke(fn,{question:raw,drugContext:context});
      $("assistantAnswer").innerHTML=`<div style="white-space:pre-wrap">${esc(data.answer||JSON.stringify(data,null,2))}</div>`;
      return;
    }
  }catch(err){
    console.warn("AI fallback:",err);
  }
  const matches=state.drugs.filter(d=>[d.generic,d.brand,d.drugClass].join(" ").toLowerCase().includes(q));
  $("assistantAnswer").innerHTML=matches.length?matches.map(d=>`<div class="drug-card mastery-${d.mastery}"><h3>${esc(d.generic)}</h3><p><strong>Class:</strong> ${esc(d.drugClass)}</p><p><strong>Use:</strong> ${esc(d.use||"—")}</p><p><strong>Pregnancy:</strong> ${esc(d.pregnancy||"—")}</p><p><strong>Children:</strong> ${esc(d.children||"—")}</p><p><strong>Elderly:</strong> ${esc(d.elderly||"—")}</p><p><strong>Side effects:</strong> ${esc(d.sideEffects||"—")}</p><p><strong>Warnings:</strong> ${esc(d.warnings||"—")}</p><p><strong>Interactions:</strong> ${esc(d.interactions||"—")}</p><p><strong>Monitoring:</strong> ${esc(d.monitoring||"—")}</p><p><strong>Mnemonic:</strong> ${esc(d.mnemonic||"—")}</p><p class="source-note"><strong>Source:</strong> ${esc(d.source||"Official product labeling")}</p></div>`).join(""):'<p>لم أجد نتيجة في Drug Vault، والذكاء الاصطناعي السحابي غير مفعّل.</p>'
};
$("medicineImage").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{latestMedicineImage=r.result;$("imagePreview").innerHTML=`<img src="${r.result}" alt="Medicine preview">`};r.readAsDataURL(f)};

$("profileForm").onsubmit=e=>{e.preventDefault();state.profile={name:$("profileName").value.trim(),major:$("profileMajor").value.trim(),university:$("profileUniversity").value.trim()};state.settings.dailyGoal=Math.max(10,Number($("dailyGoal").value)||120);save();render();toast("تم حفظ التغييرات")};

document.querySelectorAll(".tab").forEach(tab=>tab.onclick=()=>{if(timerRunning)return;document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));tab.classList.add("active");timerMode=tab.dataset.mode;resetTimer()});
$("startTimer").onclick=startTimer;$("pauseTimer").onclick=pauseTimer;$("finishTimer").onclick=finishTimer;$("resetTimer").onclick=resetTimer;$("clearSessions").onclick=()=>{if(confirm("مسح جميع الجلسات؟")){state.sessions=[];save();render()}};
function modeSeconds(){return timerMode==="pomodoro"?1500:timerMode==="deep"?3000:0}
function timerText(sec){return`${String(Math.floor(sec/60)).padStart(2,"0")}:${String(sec%60).padStart(2,"0")}`}
function updateTimer(){$("timerDisplay").textContent=timerText(timerSeconds)}
function startTimer(){if(timerRunning)return;timerRunning=true;$("timerStatus").textContent="جلسة جارية...";if(timerMode==="stopwatch"&&!stopwatchStartedAt)stopwatchStartedAt=Date.now();timerInterval=setInterval(()=>{if(timerMode==="stopwatch")timerSeconds=Math.floor((stopwatchBase+Date.now()-stopwatchStartedAt)/1000);else{timerSeconds--;if(timerSeconds<=0){saveSession(modeSeconds());toast("انتهت الجلسة ✅");resetTimer()}}updateTimer()},250)}
function pauseTimer(){if(!timerRunning)return;clearInterval(timerInterval);timerRunning=false;if(timerMode==="stopwatch"){stopwatchBase+=Date.now()-stopwatchStartedAt;stopwatchStartedAt=null}$("timerStatus").textContent="متوقف مؤقتًا"}
function finishTimer(){let sec=timerMode==="stopwatch"?timerSeconds:modeSeconds()-timerSeconds;if(sec<1){toast("لا يوجد وقت لحفظه");return}saveSession(sec);resetTimer();toast("تم حفظ الجلسة")}
function resetTimer(){clearInterval(timerInterval);timerRunning=false;stopwatchBase=0;stopwatchStartedAt=null;timerSeconds=modeSeconds();$("timerStatus").textContent="جاهزة للتركيز";updateTimer()}
function saveSession(sec){state.sessions.push({id:crypto.randomUUID(),subjectId:$("timerSubject").value,taskId:$("timerTask").value,durationSeconds:sec,mode:timerMode,endedAt:new Date().toISOString()});save();render()}

$("fdaSearchButton").onclick=searchOpenFDA;
$("recognizeMedicine").onclick=recognizeMedicine;
$("signUpButton").onclick=signUpCloud;
$("signInButton").onclick=signInCloud;
$("signOutButton").onclick=signOutCloud;
$("pushCloudButton").onclick=pushCloud;
$("pullCloudButton").onclick=pullCloud;
$("backToSubjects").onclick=()=>nav("subjects");
$("subjectFileUpload").onchange=async e=>{
  if(!activeSubjectId)return;
  for(const file of e.target.files)await saveSubjectFile(activeSubjectId,file);
  e.target.value="";await renderSubjectFiles();toast("تم حفظ الملفات داخل المادة");
};
$("workspaceAnalyzeButton").onclick=async()=>{
  const files=await getSubjectFiles(activeSubjectId);
  if(files.length)sendStoredFileToAnalyzer(files[0].id);else toast("أضيفي ملفًا أولًا");
};
$("workspaceTimerButton").onclick=()=>{
  nav("timer");$("timerSubject").value=activeSubjectId;toast("تم اختيار المادة في المؤقت");
};
$("workspaceFlashcardButton").onclick=()=>{
  nav("flashcards");$("flashSubject").value=activeSubjectId;toast("تم اختيار المادة للبطاقة");
};
$("workspacePlanButton").onclick=()=>{nav("subjects");setTimeout(()=>document.querySelector(".weekly-planner-card")?.scrollIntoView({behavior:"smooth"}),150)};
$("generateLocalStudyPlan").onclick=()=>renderLocalWeeklyPlan(generateBalancedPlan());
$("generateAIStudyPlan").onclick=generateAIWeeklyPlan;

$("rxDrugSearchButton").onclick=rxNormSearch;
$("yearFilter").onchange=renderYearModules;
$("extractCourseButton").onclick=extractCourseFile;
$("summarizeCourseButton").onclick=summarizeCourse;
$("copySummaryButton").onclick=copyCourseSummary;
$("downloadSummaryButton").onclick=downloadCourseSummary;
$("makeFlashcardsButton").onclick=summaryToFlashcards;
render();updateTimer();startReview();startTrainer();updateCloudStatus();renderYearModules();restorePlanSettings();
