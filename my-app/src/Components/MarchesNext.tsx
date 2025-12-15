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
    // التغيير الجوهري هنا:
    // 1. flex-col: الأساس عمودي (للشاشات < 400)
    // 2. min-[401px]:flex-row: بداية من 401px وطالع يتحول لأفقي
    // 3. قللنا الـ gap شوية عشان المساحة تكفي في الشاشات الـ 400px
    <div className="w-full py-6 relative overflow-hidden flex flex-col min-[401px]:flex-row items-center justify-around gap-4 min-[401px]:gap-2 md:gap-8 border-t border-white/10 shadow-2xl">
      
      {/* الخلفية والطبقة الزرقاء كما هي */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=1920&auto=format&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 z-0 bg-[#151e3d]/90"></div>

      {/* 1. قسم الفريقين */}
      {/* order-1: يظهر الأول في العمودي */}
      {/* min-[401px]:order-2: يرجع مكانه في النص/اليمين لما الشاشة توسع */}
      <div className="flex items-center gap-4 md:gap-10 order-1 min-[401px]:order-2 z-10 text-white transform scale-90 md:scale-100">
        {/* برشلونة */}
        <div className="flex flex-col items-center gap-1">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" 
            alt="Barca" 
            className="w-12 h-12 md:w-20 md:h-20 drop-shadow-2xl"
          />
          <span className="font-bold text-sm md:text-lg">برشلونة</span>
        </div>

        <div className="text-2xl font-black text-[#EDBB00] italic animate-pulse">VS</div>

        {/* أرسنال */}
        <div className="flex flex-col items-center gap-1">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" 
            alt="Arsenal" 
            className="w-12 h-12 md:w-20 md:h-20 drop-shadow-2xl"
          />
          <span className="font-bold text-sm md:text-lg">أرسنال</span>
        </div>
      </div>

      {/* 2. قسم العداد */}
      {/* order-2 في العمودي */}
      {/* min-[401px]:order-1 ييجي في الأول لما الشاشة توسع */}
      <div className="flex gap-2 md:gap-4 text-center order-2 min-[401px]:order-1 direction-ltr z-10 text-white transform scale-90 md:scale-100">
        {/* الثواني */}
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-[#A50044] flex items-center justify-center text-lg md:text-2xl font-bold rounded-lg border border-white/20">
                {format(timeLeft.seconds)}
            </div>
            <span className="text-[10px] md:text-xs text-gray-300 mt-1 font-bold">ثانية</span>
        </div>
        {/* الدقائق */}
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 flex items-center justify-center text-lg md:text-2xl font-bold border border-white/10 rounded-lg">
                {format(timeLeft.minutes)}
            </div>
            <span className="text-[10px] md:text-xs text-gray-300 mt-1 font-bold">دقيقة</span>
        </div>
        {/* الساعات */}
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 flex items-center justify-center text-lg md:text-2xl font-bold border border-white/10 rounded-lg">
                {format(timeLeft.hours)}
            </div>
            <span className="text-[10px] md:text-xs text-gray-300 mt-1 font-bold">ساعة</span>
        </div>
        {/* الأيام */}
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 flex items-center justify-center text-lg md:text-2xl font-bold border border-white/10 rounded-lg">
                {format(timeLeft.days)}
            </div>
            <span className="text-[10px] md:text-xs text-gray-300 mt-1 font-bold">يوم</span>
        </div>
      </div>

      {/* 3. تفاصيل المباراة */}
      {/* order-3 في الحالتين بس المحاذاة بتتغير */}
      <div className="text-center min-[401px]:text-right order-3 z-10 transform scale-90 md:scale-100">
        <div className="flex items-center justify-center min-[401px]:justify-end gap-2 mb-1">
             <span className="w-2 h-2 rounded-full bg-[#EDBB00] animate-pulse"></span>
             <h3 className="text-[#EDBB00] font-bold tracking-wider text-xs md:text-lg">
               دوري أبطال أوروبا
             </h3>
        </div>
        <p className="text-white text-lg md:text-3xl font-black mb-1 drop-shadow-lg">
          نصف النهائي
        </p>
        <p className="text-gray-300 text-[15px] md:text-sm font-medium">
          الكامب نو 🏟️
        </p>
      </div>

    </div>
  );
}