const ar = {
  Home: "الرئيسية",
  Wishlist: "المفضلة",
  Cart: "عربة التسوق",
  Orders: "الطلبات",
  Search: "بحث",
  about: "من نحن",
  contact: "اتصل بنا",
  theme: "الموضوع الحالي هو",
  lang: "اللغة الحالية هي",
  themebtn: "تبديل الموضوع",
  langbtn: "تبديل اللغة",
  light: "فاتح",
  dark: "داكن",
  english: "الإنجليزية",
  arabic: "العربية",
  aboutus: "من نحن",

  // Auth
  Login: "تسجيل الدخول",
  Register: "تسجيل حساب جديد",
  "Login to ShopSmart": "تسجيل الدخول إلى ShopSmart",
  "Please enter your details back!": "من فضلك أدخل تفاصيلك!",
  "Email / Username": "البريد الإلكتروني / اسم المستخدم",
  "Enter your email": "أدخل بريدك الإلكتروني",
  "Email is required.": "البريد الإلكتروني مطلوب.",
  Password: "كلمة المرور",
  "Enter your password": "أدخل كلمة المرور الخاصة بك",
  "Password must be at least 6 characters.": "يجب أن تكون كلمة المرور على الأقل 6 أحرف.",
  "Forgot Password?": "هل نسيت كلمة المرور؟",
  "Sign In": "تسجيل الدخول",
  "user": "مستخدم",
  "admin": "مدير",
    "Select your role": "اختر دورك",

 
  

  // Register
  "Create Account": "إنشاء حساب",
  "Enter your details below to create your ShopSmart account.": "أدخل تفاصيلك أدناه لإنشاء حسابك في ShopSmart.",
  Name: "الاسم",
  "Enter your full name": "أدخل اسمك الكامل",
  Email: "البريد الإلكتروني",
  "Enter your email address": "أدخل عنوان بريدك الإلكتروني",
  "Create a password": "أنشئ كلمة مرور",
  "Confirm Password": "تأكيد كلمة المرور",
  "Re-enter your password": "أعد إدخال كلمة المرور",
  Role: "الدور",
 
  "Already have an account? Login here.": "هل لديك حساب بالفعل؟ سجل الدخول هنا.",
  // WishList
  wishlistTitle: (count) => `قائمة رغباتك (${count} منتج)`,
  wishlistDesc: (count) =>
      count > 0
        ? "هذه هي المنتجات التي حفظتها لاحقًا. هل أنت جاهز لامتلاكها؟"
        : "قائمة رغباتك فارغة. ابدأ بإضافة المنتجات التي تحبها!",
  emptyWishlist: "لا توجد منتجات في قائمة رغباتك.",
  modalConfirmDeleteTitle: "تأكيد الحذف",
  modalConfirmDeleteMessage: (item) => `هل أنت متأكد أنك تريد إزالة "${item}" من قائمة رغباتك؟`,
  cancel: "إلغاء",
  delete: "حذف",
  wishlistItemRemoved: "تمت إزالة المنتج من قائمة الرغبات.",
  //Footer
  siteName: "وودي",
  siteTagline: "لأثاث طبيعي",
  footerDescription: "الوصف",
  footerDescriptionText: "فريق صغير قام ببناء هذا الموقع لتجارة الأثاث العصري الصديق للبيئة والمستدام.",
  footerServices: "الخدمات",
  footerProducts: "المنتجات",
  footerAbout: "من نحن",
  footerCustomer: "العملاء",
  footerServicesItems: ["شراء وبيع", "الحجز", "سياسة الإرجاع"],
  copyrightText: "© 2025 وودي. جميع الحقوق محفوظة.",
  Selectyourrole: "اختر دورك",
  AccountExists: "هل لديك حساب بالفعل؟",
  Here: "سجل هنا",
  DontHaveAccount: "لا تمتلك حسابًا؟.",
// Dashboard Home
  dashboardWelcome: "مرحباً بعودتك، أيها المدير!",
  dashboardOverview: "إليك نظرة سريعة على أداء منصتك للتجارة الإلكترونية.",
  totalProducts: "إجمالي المنتجات",
  totalOrders: "إجمالي الطلبات",
  totalSales: "إجمالي المبيعات",
  activeUsers: "المستخدمون النشطون",
  fromLastMonth: "من الشهر الماضي"
};

export default ar;
