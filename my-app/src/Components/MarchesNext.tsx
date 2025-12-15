import { useState, useEffect } from "react";

export default function MatchesNext() {
  // 1. التاريخ المستهدف (تاريخ الماتش)
  const matchDate = new Date("2025-06-30T21:00:00").getTime();

  // 2. المخزن (State) للوقت المتبقي
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 3. المطبخ (Logic) - العداد
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
        // لو الماتش بدأ نصفر العداد
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // تشغيل العداد كل ثانية
    const timer = setInterval(calculateTime, 1000);
    calculateTime(); // تشغيل فوري عشان ميبقاش فيه تأخير ثانية

    return () => clearInterval(timer);
  }, []);

  // دالة لتنسيق الأرقام (تضيف صفر لو الرقم أقل من 10)
  const format = (n) => (n < 10 ? `0${n}` : n);

  return (
    // الحاوية الرئيسية
    // flex-col: في الموبايل العناصر فوق بعض
    // md:flex-row: في الشاشات الأكبر العناصر جنب بعض
    // removed: rounded-xl, my-8 (عشان التصميم يكون حاد ومفيهوش هوامش)
    <div className="w-full py-10 bg-[#151e3d] text-white flex flex-col md:flex-row items-center justify-around gap-8 border-t border-white/10 shadow-2xl">
      
      {/* 1. قسم الفريقين (يمين الشاشة في الكبير / فوق في الموبايل) */}
      <div className="flex items-center gap-6 md:gap-10 order-1 md:order-2">
        {/* برشلونة */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" 
            alt="Barca" 
            className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transform hover:scale-110 transition duration-300"
          />
          <span className="font-bold text-lg">برشلونة</span>
        </div>

        {/* علامة VS */}
        <div className="text-3xl font-black text-[#EDBB00] italic animate-pulse">
          VS
        </div>

        {/* الخصم */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" 
            alt="Arsenal" 
            className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transform hover:scale-110 transition duration-300"
          />
          <span className="font-bold text-lg">أرسنال</span>
        </div>
      </div>

      {/* 2. قسم العداد (في النص) */}
      <div className="flex gap-4 text-center order-2 md:order-1 direction-ltr">
        {/* الثواني */}
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#A50044] flex items-center justify-center text-xl md:text-2xl font-bold shadow-[0_0_15px_#A50044]">
                {format(timeLeft.seconds)}
            </div>
            <span className="text-xs text-gray-400 mt-2 font-bold">ثانية</span>
        </div>

        {/* الدقائق */}
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 flex items-center justify-center text-xl md:text-2xl font-bold border border-white/10">
                {format(timeLeft.minutes)}
            </div>
            <span className="text-xs text-gray-400 mt-2 font-bold">دقيقة</span>
        </div>

        {/* الساعات */}
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 flex items-center justify-center text-xl md:text-2xl font-bold border border-white/10">
                {format(timeLeft.hours)}
            </div>
            <span className="text-xs text-gray-400 mt-2 font-bold">ساعة</span>
        </div>

        {/* الأيام */}
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 flex items-center justify-center text-xl md:text-2xl font-bold border border-white/10">
                {format(timeLeft.days)}
            </div>
            <span className="text-xs text-gray-400 mt-2 font-bold">يوم</span>
        </div>
      </div>

      {/* 3. تفاصيل المباراة (يسار الشاشة / تحت في الموبايل) */}
      <div className="text-center md:text-right order-3">
        <h3 className="text-[#EDBB00] font-bold tracking-wider text-sm md:text-lg mb-1">
          دوري أبطال أوروبا
        </h3>
        <p className="text-white text-xl md:text-2xl font-bold mb-1">
          نصف النهائي
        </p>
        <p className="text-gray-400 text-sm flex items-center justify-center md:justify-end gap-2">
          ملعب الكامب نو، برشلونة 📍
        </p>
      </div>

    </div>
  );
}