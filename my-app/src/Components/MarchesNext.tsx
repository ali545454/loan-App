import { useState, useEffect } from "react";

export default function MatchesNext() {
  // 1. التاريخ المستهدف (عدلته لـ 2026 عشان العداد يشتغل)
  const matchDate = new Date("2027-06-30T21:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = matchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();

    return () => clearInterval(timer);
  }, []);

  const format = (n) => (n < 10 ? `0${n}` : n);

  return (
    // الحاوية الرئيسية
    // إضافة relative و overflow-hidden عشان الخلفية
    <div className="w-full py-10 relative overflow-hidden flex flex-col sm:flex-row items-center justify-around gap-8 border-t border-white/10 shadow-2xl">
      
      {/* === 1. صورة الخلفية (Champions League Theme) === */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
            // صورة ملعب ليلية توحي بجو دوري الأبطال
            backgroundImage: "url('https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=1920&auto=format&fit=crop')" 
        }}
      ></div>
      
      {/* === 2. طبقة تعتيم زرقاء (Overlay) === */}
      {/* bg-[#151e3d]/90: لون برشلونة الكحلي بس شفافية 90% عشان الصورة تبان خفيف والكلام يبقى واضح */}
      <div className="absolute inset-0 z-0 bg-[#151e3d]/90"></div>

      {/* === المحتوى (لازم z-10 عشان يظهر فوق الخلفية) === */}
      
      {/* 1. قسم الفريقين */}
      <div className="flex items-center gap-6 md:gap-10 order-1 md:order-2 z-10 text-white">
        {/* برشلونة */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" 
            alt="Barca" 
            className="w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl transform hover:scale-110 transition duration-300"
          />
          <span className="font-bold text-lg drop-shadow-md">برشلونة</span>
        </div>

        {/* VS */}
        <div className="text-3xl font-black text-[#EDBB00] italic animate-pulse drop-shadow-lg">
          VS
        </div>

        {/* أرسنال */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" 
            alt="Arsenal" 
            className="w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl transform hover:scale-110 transition duration-300"
          />
          <span className="font-bold text-lg drop-shadow-md">أرسنال</span>
        </div>
      </div>

      {/* 2. قسم العداد */}
      <div className="flex gap-4 text-center order-2 md:order-1 direction-ltr z-10 text-white">
        {/* الثواني */}
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#A50044] flex items-center justify-center text-xl md:text-2xl font-bold shadow-[0_0_20px_#A50044] rounded-lg border border-white/20">
                {format(timeLeft.seconds)}
            </div>
            <span className="text-xs text-gray-300 mt-2 font-bold uppercase">ثانية</span>
        </div>

        {/* الدقائق */}
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl md:text-2xl font-bold border border-white/10 rounded-lg">
                {format(timeLeft.minutes)}
            </div>
            <span className="text-xs text-gray-300 mt-2 font-bold uppercase">دقيقة</span>
        </div>

        {/* الساعات */}
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl md:text-2xl font-bold border border-white/10 rounded-lg">
                {format(timeLeft.hours)}
            </div>
            <span className="text-xs text-gray-300 mt-2 font-bold uppercase">ساعة</span>
        </div>

        {/* الأيام */}
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl md:text-2xl font-bold border border-white/10 rounded-lg">
                {format(timeLeft.days)}
            </div>
            <span className="text-xs text-gray-300 mt-2 font-bold uppercase">يوم</span>
        </div>
      </div>

      {/* 3. تفاصيل المباراة */}
      <div className="text-center md:text-right order-3 z-10">
        <div className="flex items-center justify-center md:justify-end gap-2 mb-1">
             {/* أيقونة كرة قدم صغيرة (اختياري) */}
             <span className="w-2 h-2 rounded-full bg-[#EDBB00] animate-pulse"></span>
             <h3 className="text-[#EDBB00] font-bold tracking-wider text-sm md:text-lg">
               دوري أبطال أوروبا
             </h3>
        </div>
        
        <p className="text-white text-xl md:text-3xl font-black mb-1 drop-shadow-lg tracking-tight">
          نصف النهائي
        </p>
        <p className="text-gray-300 text-sm flex items-center justify-center md:justify-end gap-2 font-medium">
          ملعب الكامب نو، برشلونة 📍
        </p>
      </div>

    </div>
  );
}