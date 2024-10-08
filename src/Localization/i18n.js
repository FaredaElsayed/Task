import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      search_individuals: "Search Individuals",
      first_name: "First Name",
      middle_name: "Middle Name",
      last_name: "Last Name",
      nationality: "Nationality",
      description: "Description",
      place_of_birth: "Place of Birth",
      score: "Score",
      search: "Search",
      loading: "Loading...",
      results: "Results",
      search_again: "Search Again",
      error_message: "Error fetching results. Please try again.",
      search_history: "Search History",
      clear_history: "Clear Search History",
      name: "Full Name",
      Dates: "Dates",
      profile_notes: "Profile Notes",
      watch_list: "Watch List",
      date_of_birth: "Date OF Birth",
      gender: "Gender",
      address:"Address",
    },
  },
  ar: {
    translation: {
      search_individuals: "بحث الأفراد",
      first_name: "الاسم الأول",
      middle_name: "اسم الأب",
      last_name: "اسم العائلة",
      nationality: "الجنسية",
      search: "بحث",
      description: "الوصف",
      place_of_birth: "مكان الولادة",
      score: "الدرجة",
      loading: "جار التحميل...",
      search_again: "بحث مرة أخرى",
      results: "النتائج",
      search_history: "تاريخ البحث",
      clear_history: "مسح تاريخ البحث",
      error_message: "حدث خطأ أثناء جلب النتائج. يرجى المحاولة مرة أخرى.",
      name: "الاسم الكامل",
      Dates: "التواريخ",
      profile_notes: "ملاحظات الملف الشخصي",
      watch_list: "قائمة المراقبة",
      date_of_birth: "تاريخ الميلاد",
      gender: "النوع",
      address: "العنوان",
    },
  },
};
const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
