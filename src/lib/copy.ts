import type { Bi } from '../data/deals'

export const copy = {
  brand: 'Waffar',
  brandTail: { en: '.jo', ar: '.jo' },

  nav: {
    allDeals: { en: 'All deals', ar: 'كل العروض' },
    stores: { en: 'Stores', ar: 'المتاجر' },
    categories: { en: 'Categories', ar: 'التصنيفات' },
    guide: { en: 'How it works', ar: 'كيف يعمل' },
    faq: { en: 'FAQ', ar: 'الأسئلة' },
  },

  ticker: [
    { en: '312 codes re-checked today', ar: 'تم التحقق من 312 كود اليوم' },
    { en: '96% of codes worked last month', ar: '96% من الأكواد عملت الشهر الماضي' },
    { en: 'Free to use — no account needed', ar: 'مجاني بالكامل — بدون تسجيل' },
    { en: 'Updates every 30 minutes', ar: 'تحديث كل 30 دقيقة' },
  ],

  hero: {
    eyebrow: { en: 'Jordan · Verified daily', ar: 'الأردن · موثّق يومياً' },
    title1: { en: 'Never pay', ar: 'لا تدفع' },
    title2: { en: 'full price', ar: 'السعر الكامل' },
    title3: { en: 'again.', ar: 'مرة أخرى.' },
    body: {
      en: 'Hand-checked coupon codes for the stores Jordan actually shops at. We test every code before it goes live, then test it again tomorrow.',
      ar: 'أكواد خصم مفحوصة يدوياً لأشهر المتاجر في الأردن. نختبر كل كود قبل نشره، ثم نعيد اختباره في اليوم التالي.',
    },
    searchPlaceholder: { en: 'Search a store — iHerb, SHEIN, Noon…', ar: 'ابحث عن متجر — آي هيرب، شي إن، نون…' },
    searchCta: { en: 'Find codes', ar: 'ابحث عن الكود' },
    browseAll: { en: 'Browse all 180+ stores', ar: 'تصفح أكثر من 180 متجر' },
    stats: [
      { value: { en: '184', ar: '184' }, label: { en: 'Stores covered', ar: 'متجر مشمول' } },
      { value: { en: '1.2k', ar: '1.2 ألف' }, label: { en: 'Live codes', ar: 'كود فعّال' } },
      { value: { en: 'JOD 186k', ar: '186 ألف د.أ' }, label: { en: 'Saved by shoppers', ar: 'وفّرها المتسوقون' } },
    ],
    liveNow: { en: 'live now', ar: 'متاح الآن' },
    verified: { en: 'Verified', ar: 'موثّق' },
  },

  filters: {
    searchLabel: { en: 'Search 1,240 deals', ar: 'ابحث في 1,240 عرضاً' },
    searchPlaceholder: { en: 'Store or product…', ar: 'متجر أو منتج…' },
    category: { en: 'Category', ar: 'التصنيف' },
    all: { en: 'All', ar: 'الكل' },
    sort: { en: 'Sort', ar: 'ترتيب' },
    sortNewest: { en: 'Newest first', ar: 'الأحدث أولاً' },
    sortPopular: { en: 'Most used', ar: 'الأكثر استخداماً' },
    sortExpiring: { en: 'Ending soon', ar: 'ينتهي قريباً' },
    sortBiggest: { en: 'Biggest saving', ar: 'أكبر توفير' },
    typeAll: { en: 'All types', ar: 'كل الأنواع' },
    typeCode: { en: 'Coupon code', ar: 'كود خصم' },
    typeDeal: { en: 'Auto deal', ar: 'عرض تلقائي' },
    results: { en: 'deals', ar: 'عرض' },
    clear: { en: 'Clear filters', ar: 'إزالة الفلاتر' },
    emptyTitle: { en: 'No codes match that search', ar: 'لا توجد نتائج لهذا البحث' },
    emptyBody: {
      en: 'Try a shorter store name, or clear the filters to see every live deal.',
      ar: 'جرّب اسماً أقصر للمتجر، أو أزل الفلاتر لعرض كل العروض.',
    },
  },

  card: {
    reveal: { en: 'Reveal code', ar: 'إظهار الكود' },
    viewDeal: { en: 'View deal', ar: 'عرض الصفقة' },
    copy: { en: 'Copy code', ar: 'نسخ الكود' },
    copied: { en: 'Copied!', ar: 'تم النسخ!' },
    useIt: { en: 'Use it', ar: 'استخدمه' },
    used: { en: 'used', ar: 'استخدام' },
    verified: { en: 'Verified', ar: 'موثّق' },
    expires: { en: 'Expires in', ar: 'ينتهي خلال' },
    days: { en: 'days', ar: 'يوم' },
    day: { en: 'day', ar: 'يوم' },
    hoursAgo: { en: 'h ago', ar: 'ساعة' },
    terms: { en: 'Terms', ar: 'الشروط' },
    hideTerms: { en: 'Hide terms', ar: 'إخفاء' },
    hot: { en: 'Popular', ar: 'الأكثر طلباً' },
    noCode: { en: 'No code needed', ar: 'بدون كود' },
  },

  featured: {
    eyebrow: { en: 'Trending this week', ar: 'الأكثر رواجاً هذا الأسبوع' },
    title: { en: 'The codes everyone is grabbing', ar: 'الأكواد التي يبحث عنها الجميع' },
    body: {
      en: 'Ranked by real redemption attempts across Jordan in the last 7 days.',
      ar: 'مرتبة حسب محاولات الاستخدام الفعلية في الأردن خلال آخر 7 أيام.',
    },
  },

  stores: {
    eyebrow: { en: 'Store directory', ar: 'دليل المتاجر' },
    title: { en: 'Shop where you already shop', ar: 'تسوّق من متاجرك المفضلة' },
    body: {
      en: 'Every store page is rebuilt nightly with fresh codes, shipping notes and local pricing.',
      ar: 'نُحدّث صفحة كل متجر كل ليلة بأكواد جديدة وملاحظات الشحن والأسعار المحلية.',
    },
    deals: { en: 'deals', ar: 'عرض' },
    viewAll: { en: 'All stores', ar: 'كل المتاجر' },
  },

  how: {
    eyebrow: { en: 'How it works', ar: 'كيف يعمل' },
    title: { en: 'Three taps between you and the discount', ar: 'ثلاث خطوات بينك وبين الخصم' },
    steps: [
      {
        title: { en: 'Find your store', ar: 'اعثر على متجرك' },
        body: {
          en: 'Search 184 stores or browse by category. Every listing shows the discount, the cap and the expiry up front.',
          ar: 'ابحث بين 184 متجراً أو تصفح حسب التصنيف. كل عرض يظهر قيمته وحدوده وتاريخ انتهائه.',
        },
      },
      {
        title: { en: 'Reveal and copy', ar: 'أظهر الكود وانسخه' },
        body: {
          en: 'Tap reveal, the code lands in your clipboard with one tap. No pop-ups, no waiting rooms.',
          ar: 'اضغط إظهار، وينسخ الكود بنقرة واحدة. بدون نوافذ منبثقة أو انتظار.',
        },
      },
      {
        title: { en: 'Paste at checkout', ar: 'الصقه عند الدفع' },
        body: {
          en: 'Paste it in the promo field, confirm the new total, and you are done. We keep the code valid for the whole window.',
          ar: 'الصقه في خانة الكوبون وتأكد من المجموع الجديد. نضمن صلاحية الكود طوال الفترة المعلنة.',
        },
      },
    ],
    guaranteeTitle: { en: 'Our validation promise', ar: 'وعد التحقق' },
    guaranteeBody: {
      en: 'A human opens the store, adds an item to the cart and tries the code — every single day. If a code fails twice, it is pulled within the hour.',
      ar: 'يفتح أحد أعضاء الفريق المتجر ويضيف منتجاً ويجرب الكود — كل يوم. وإذا فشل الكود مرتين يُحذف خلال ساعة.',
    },
    guaranteePoints: [
      { en: '96% success rate last quarter', ar: 'نسبة نجاح 96% في الربع الماضي' },
      { en: 'Codes re-tested every 24 hours', ar: 'إعادة اختبار كل كود كل 24 ساعة' },
      { en: 'Zero paid placement in the ranking', ar: 'لا إعلانات مدفوعة في الترتيب' },
    ],
  },

  categories: {
    eyebrow: { en: 'Browse by category', ar: 'تصفح حسب التصنيف' },
    title: { en: 'Where the savings live', ar: 'أين تجد التوفير' },
    body: {
      en: 'From grocery runs to long-haul flights — pick a lane and see only codes that work for it.',
      ar: 'من البقالة إلى الرحلات الطويلة — اختر التصنيف وسترى الأكواد التي تعمل فقط.',
    },
  },

  newsletter: {
    eyebrow: { en: 'Weekly drop', ar: 'النشرة الأسبوعية' },
    title: { en: 'Ten fresh codes every Thursday', ar: 'عشرة أكواد جديدة كل خميس' },
    body: {
      en: 'One email. The codes that actually survived testing, plus the sales worth planning around. No spam, unsubscribe in a tap.',
      ar: 'رسالة واحدة. الأكواد التي نجحت فعلاً في الاختبار، والعروض التي تستحق التخطيط. بدون إزعاج، وإلغاء الاشتراك بنقرة.',
    },
    placeholder: { en: 'you@example.com', ar: 'بريدك@مثال.com' },
    cta: { en: 'Get the codes', ar: 'احصل على الأكواد' },
    success: { en: 'You are in — check your inbox on Thursday.', ar: 'تم الاشتراك — تفقد بريدك يوم الخميس.' },
    invalid: { en: 'Enter a valid email address.', ar: 'أدخل بريداً إلكترونياً صحيحاً.' },
    fine: { en: '8,412 subscribers. 0 spam emails. Ever.', ar: '8,412 مشتركاً. صفر رسائل مزعجة.' },
  },

  faq: {
    eyebrow: { en: 'Questions', ar: 'أسئلة' },
    title: { en: 'Everything about using the codes', ar: 'كل ما تحتاج معرفته عن الأكواد' },
    body: {
      en: 'The short answers. If something still fails, message us and a human replies within a day.',
      ar: 'إجابات قصيرة. وإذا لم يعمل شيء راسلنا وسيرد عليك إنسان خلال يوم.',
    },
    items: [
      {
        q: { en: 'Are the codes really free?', ar: 'هل الأكواد مجانية فعلاً؟' },
        a: {
          en: 'Yes. Stores pay us a small commission when someone completes a purchase, but that never changes which codes we list or where they rank.',
          ar: 'نعم. تدفع لنا المتاجر عمولة صغيرة عند إتمام الشراء، لكن هذا لا يغيّر الأكواد التي ننشرها أو ترتيبها.',
        },
      },
      {
        q: { en: 'Why did my code not apply?', ar: 'لماذا لم يُطبق الكود؟' },
        a: {
          en: 'Usually a minimum basket, a new-customer-only rule, or an expired window. Open the terms on the card; if it still looks valid, report it and we re-test within the hour.',
          ar: 'غالباً بسبب حد أدنى للسلة أو شرط العميل الجديد أو انتهاء المدة. راجع الشروط على البطاقة، وإذا كان ساري المفعول أبلغنا وسنعيد الاختبار خلال ساعة.',
        },
      },
      {
        q: { en: 'Do stores ship to Jordan?', ar: 'هل تشحن المتاجر إلى الأردن؟' },
        a: {
          en: 'Everything listed ships to Jordan. On each store page we note the typical delivery window and whether duties are included at checkout.',
          ar: 'كل ما ننشره يُشحن إلى الأردن. في صفحة كل متجر نوضح مدة التوصيل المعتادة وما إذا كانت الرسوم مشمولة.',
        },
      },
      {
        q: { en: 'How often do you test codes?', ar: 'كم مرة تختبرون الأكواد؟' },
        a: {
          en: 'Every code is tested at least once a day by a person, and permanently removed after two consecutive failures.',
          ar: 'يُختبر كل كود مرة على الأقل يومياً بواسطة فريقنا، ويُحذف نهائياً بعد فشلين متتاليين.',
        },
      },
      {
        q: { en: 'Can I use more than one code?', ar: 'هل يمكن استخدام أكثر من كود؟' },
        a: {
          en: 'Most checkouts allow one. Where a store permits stacking, the card says so in the terms line.',
          ar: 'معظم المتاجر تسمح بكود واحد. وإذا سمح المتجر بالجمع نذكر ذلك في سطر الشروط.',
        },
      },
    ],
  },

  trust: {
    title: { en: 'Trusted by 60,000+ shoppers in Jordan', ar: 'يثق بنا أكثر من 60,000 متسوق في الأردن' },
    body: {
      en: 'Independently funded, editorially ranked, and quietly obsessive about clicking “apply” one more time.',
      ar: 'ممول بشكل مستقل، ترتيب تحريري، ومهووسون بهدوء بتجربة زر «تطبيق» مرة أخرى.',
    },
  },

  footer: {
    tagline: {
      en: 'Coupon codes that were actually tested. Built for Jordan.',
      ar: 'أكواد خصم تم اختبارها فعلاً. صُنعت للأردن.',
    },
    explore: { en: 'Explore', ar: 'استكشف' },
    company: { en: 'Company', ar: 'الشركة' },
    legal: { en: 'Legal', ar: 'قانوني' },
    links: {
      explore: [
        { en: 'All deals', ar: 'كل العروض' },
        { en: 'Stores', ar: 'المتاجر' },
        { en: 'Categories', ar: 'التصنيفات' },
        { en: 'Weekly newsletter', ar: 'النشرة الأسبوعية' },
      ],
      company: [
        { en: 'How we test codes', ar: 'كيف نختبر الأكواد' },
        { en: 'About Waffar', ar: 'عن وفّر' },
        { en: 'Submit a code', ar: 'أرسل كوداً' },
        { en: 'Contact', ar: 'اتصل بنا' },
      ],
      legal: [
        { en: 'Privacy', ar: 'الخصوصية' },
        { en: 'Terms', ar: 'الشروط' },
        { en: 'Cookies', ar: 'الكوكيز' },
        { en: 'Affiliate disclosure', ar: 'الإفصاح عن العمولات' },
      ],
    },
    rights: { en: '© 2025 Waffar. All rights reserved.', ar: '© 2025 وفّر. جميع الحقوق محفوظة.' },
    made: { en: 'Made in Amman 🇯🇴', ar: 'صُنع في عمّان 🇯🇴' },
    country: { en: 'Jordan', ar: 'الأردن' },
    currency: { en: 'JOD', ar: 'د.أ' },
  },

  misc: {
    langToggle: { en: 'العربية', ar: 'English' },
    menu: { en: 'Menu', ar: 'القائمة' },
    close: { en: 'Close', ar: 'إغلاق' },
    skip: { en: 'Skip to deals', ar: 'تخطَّ إلى العروض' },
    jumpDeals: { en: 'See all deals', ar: 'كل العروض' },
  },
} satisfies Record<string, unknown>

export const t = (value: Bi, lang: 'en' | 'ar') => value[lang]
