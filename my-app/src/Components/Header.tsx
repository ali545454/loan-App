import { UserRound, Globe } from "lucide-react"; // Globe icon for language
// import { Link } from "react-router-dom"; // فعل هذا السطر لاحقاً عند استخدام الراوتر
import "../../src/App.css";

export default function Header() {
  // مصفوفة الروابط لتسهيل التعديل لاحقاً
  const navLinks = [
    { title: "المباريات الحالية", href: "#" },
    { title: "التشكيلة", href: "#" },
    { title: "البطولات", href: "#" },
    { title: "الأخبار", href: "#" },
    { title: "من نحن؟", href: "#" },
  ];

  return (
    // 1. Semantic Tag: header
    // 2. Used Tailwind for colors instead of inline styles
    <header className="w-full flex justify-around items-center h-[60px] bg-[var(--primary)] text-[var(--text)] shadow-md">
      {/* Logo Area */}
      <div className="text-2xl font-bold tracking-wider uppercase cursor-pointer">
        Barcelona
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-6">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="hover:text-yellow-400 transition-colors duration-200 font-medium"
          >
            {link.title}
          </a>
        ))}
      </nav>

      {/* Actions Area (Lang + Profile) */}
      <div className="flex items-center gap-4">
        {/* Language Button */}
        <button className="flex items-center gap-1 hover:text-gray-300 transition">
          <Globe size={18} />
          <span className="text-sm font-bold">EN</span>
        </button>

        {/* User Icon */}
        <div className="bg-white rounded-full flex justify-center items-center w-[40px] h-[40px] cursor-pointer hover:bg-gray-100 transition">
          {/* استخدمت لون ثابت للكود ليكون أوضح، أو يمكنك جعله متغيراً */}
          <UserRound size={24} className="text-[#A50044]" />
        </div>
      </div>
    </header>
  );
}
