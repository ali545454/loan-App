import { useState, useRef, useEffect } from "react";
import {
  UserRound,
  Search,
  Menu,
  X,
  LogOut,
  Settings,
  User,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // 1. تعريف الـ Refs (العلامات)
  const searchContainerRef = useRef(null); // علامة لصندوق البحث
  const userMenuRef = useRef(null); // علامة لقائمة المستخدم

  const logo =
    "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg";

  const navLinks = [
    { title: "الرئيسية", href: "#" },
    { title: "المباريات", href: "#" },
    { title: "الفريق", href: "#" },
    { title: "الأخبار", href: "#" },
    { title: "التذاكر", href: "#" },
  ];

  // 2. useEffect لمراقبة الضغط خارج العناصر
  useEffect(() => {
    // دالة بتشتغل لما تدوس في أي حتة
    function handleClickOutside(event) {
      // منطق إغلاق البحث
      // لو البحث مفتوح + والمكان اللي دوست عليه مش جوه صندوق البحث
      if (
        isSearchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }

      // منطق إغلاق قائمة المستخدم
      // لو القائمة مفتوحة + والمكان اللي دوست عليه مش جوه القائمة
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    // تشغيل المراقبة (Event Listener)
    document.addEventListener("mousedown", handleClickOutside);

    // تنظيف المراقبة لما المكون يختفي (عشان ميعملش مشاكل)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, isUserMenuOpen]); // بنعيد تشغيل المراقبة لما الحالة تتغير

  return (
    <header className="w-full h-[55px] bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 h-full flex justify-between items-center relative">
        {/* الشعار */}
        <div
          className={`flex items-center gap-2 cursor-pointer transition-opacity duration-300 ${
            isSearchOpen
              ? "opacity-0 pointer-events-none md:opacity-100"
              : "opacity-100"
          }`}
        >
          <img src={logo} alt="Barca Logo" className="h-[35px] w-auto" />
          <div className="hidden lg:flex flex-col">
            <span className="text-xl font-extrabold text-[#151e3d] leading-none tracking-tighter uppercase">
              FC Barcelona
            </span>
            <span className="text-[10px] text-[#A50044] font-bold tracking-widest uppercase">
              Mes Que Un Club
            </span>
          </div>
        </div>

        {/* الروابط */}
        {!isSearchOpen && (
          <nav className="hidden md:flex items-center gap-6 animate-fade-in">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[#151e3d] font-bold text-sm hover:text-[#A50044] transition-colors relative group py-2"
              >
                {link.title}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#A50044] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        )}

        {/* === شريط البحث المنبثق === */}
        {/* 3. ربطنا الـ Ref هنا (ref={searchContainerRef}) */}
        <div
          ref={searchContainerRef}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-4 transition-all duration-300 ${
            isSearchOpen
              ? "scale-100 opacity-100 visible"
              : "scale-90 opacity-0 invisible pointer-events-none"
          }`}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن لاعب، مباراة، خبر..."
              // autoFocus: عشان يكتب علطول أول ما يفتح
              autoFocus={isSearchOpen}
              className="w-full h-[40px] pl-10 pr-10 rounded-full border-2 border-[#151e3d] focus:outline-none focus:border-[#A50044] text-[#151e3d] shadow-lg"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            {/* زر X داخل البحث للإغلاق اليدوي */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* الأزرار الجانبية */}
        <div className="flex items-center gap-3 text-[#151e3d]">
          {/* زر فتح البحث */}
          {/* نستخدم (e.stopPropagation) عشان لما ندوس عليه ميحسبش إننا دوسنا بره ويقفل في نفس اللحظة */}
          {!isSearchOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchOpen(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition text-[#151e3d]"
            >
              <Search size={22} />
            </button>
          )}

          {/* === زر وقائمة المستخدم === */}
          {/* 4. ربطنا الـ Ref هنا (ref={userMenuRef}) */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#151e3d] text-white rounded-full font-bold hover:bg-[#A50044] transition shadow-md text-sm"
            >
              <UserRound size={18} />
              <span className="hidden lg:inline">حسابي</span>
            </button>

            {/* القائمة المنسدلة */}
            {isUserMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-[fadeInUp_0.2s_ease-out]">
                <div className="p-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm font-bold text-[#151e3d]">علي الحفني</p>
                  <p className="text-xs text-gray-500">ali@example.com</p>
                </div>
                <ul className="py-1">
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#A50044]"
                    >
                      <User size={16} /> الملف الشخصي
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#A50044]"
                    >
                      <Settings size={16} /> الإعدادات
                    </a>
                  </li>
                  <li className="border-t border-gray-100 mt-1">
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} /> تسجيل خروج
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* زر الموبايل */}
          <button
            className="md:hidden p-2 text-[#151e3d]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[60px] left-0 w-full bg-white border-t border-gray-100 shadow-xl z-50">
          <ul className="flex flex-col p-4">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                <a
                  href={link.href}
                  className="block py-3 font-bold text-[#151e3d]"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
