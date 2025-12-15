import { useState, useEffect } from "react";

export default function MatchesNext() {
  // 1. المتغيرات والمنطق (فوق الـ return)
  
  // تاريخ الماتش (مثلاً 15 يوم من دلوقتي)
  const matchDate = new Date("2027-05-30T21:00:00").getTime();

  // المخزن (State)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // المطبخ (Logic)
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
      }
    };

    // الزنان (يشتغل كل ثانية)
    const timer = setInterval(calculateTime, 1000);

    // تنظيف
    return () => clearInterval(timer);
  }, []);

  // دالة صغيرة عشان تحط صفر لو الرقم مفرد (9 تبقى 09)
  const format = (n) => (n < 10 ? `0${n}` : n);

  // 2. الرسم (الـ return)
  return (
    <div className="w-full py-8 bg-[#151e3d] text-white flex flex-col items-center justify-center gap-6 shadow-xl rounded-xl my-8">
      
      {/* قسم اللوجوهات */}
      <div className="flex items-center justify-center gap-8 md:gap-16">
        {/* برشلونة */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" 
            alt="Barca" 
            className="w-16 h-16 md:w-24 md:h-24 drop-shadow-lg"
          />
          <span className="font-bold">Barcelona</span>
        </div>

        {/* كلمة VS */}
        <div className="text-4xl font-black text-[#EDBB00] italic">VS</div>

        {/* الخصم (أرسنال) */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" 
            alt="Arsenal" 
            className="w-16 h-16 md:w-24 md:h-24 drop-shadow-lg"
          />
          <span className="font-bold">Arsenal</span>
        </div>
      </div>

      {/* قسم العداد (Boxes) */}
      <div className="flex gap-4 text-center direction-ltr">
        {/* الثواني */}
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-[#A50044] rounded-lg flex items-center justify-center text-2xl font-bold border border-white/20">
                {format(timeLeft.seconds)}
            </div>
            <span className="text-xs text-gray-400 mt-1">ثانية</span>
        </div>

        {/* الدقائق */}
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-2xl font-bold border border-white/20">
                {format(timeLeft.minutes)}
            </div>
            <span className="text-xs text-gray-400 mt-1">دقيقة</span>
        </div>

        {/* الساعات */}
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-2xl font-bold border border-white/20">
                {format(timeLeft.hours)}
            </div>
            <span className="text-xs text-gray-400 mt-1">ساعة</span>
        </div>

        {/* الأيام */}
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-2xl font-bold border border-white/20">
                {format(timeLeft.days)}
            </div>
            <span className="text-xs text-gray-400 mt-1">يوم</span>
        </div>
      </div>

      {/* تفاصيل المباراة */}
      <div className="text-center mt-2">
        <h3 className="text-[#EDBB00] font-bold tracking-wider text-sm md:text-base">CHAMPIONS LEAGUE</h3>
        <p className="text-gray-300 text-sm">Camp Nou, Barcelona</p>
      </div>
    </div>
  );
}