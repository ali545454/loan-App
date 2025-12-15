import { useState, useEffect, useRef } from "react";
import { X, ChevronRight } from "lucide-react";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import BarcaAnthem from "../../src/assets/9JdugskAcS0.mp3"; // تأكد من المسار

// === بيانات البطولات (الـ 5 ألقاب دوري أبطال + السداسية) ===
const trophies = [
  {
    year: "1992",
    title: "ويمبلي: الحلم الأول",
    desc: "صاروخية كومان التي أهدت برشلونة أول لقب دوري أبطال في التاريخ.",
    image:
      "https://www.newsletter.co.uk/webimg/TUFZMTIyNTIxNjU1.jpg?crop=3:2,smart&trim=&width=990&quality=65&enable=upscale", // صورة احتفال قديم
  },
  {
    year: "2006",
    title: "باريس: عودة الملوك",
    desc: "إيتو وبيليتي يقلبان الطاولة على أرسنال تحت المطر في باريس.",
    image:
      "https://i.guim.co.uk/img/media/219628abb20fcf768b38439d0a46b8f7e58be8e5/0_91_3504_2102/master/3504.jpg?width=1300&dpr=1&s=none&crop=none",
  },
  {
    year: "2009",
    title: "روما: السداسية التاريخية",
    desc: "رأسية ميسي الأسطورية وجيل بيب جوارديولا الذي أكل الأخضر واليابس.",
    image:
      "https://editorial.uefa.com/resources/01d9-0e73980558a2-1ed9f22cd07e-1000/format/wide1/lionel_messi_parades_his_second_uefa_champions_league_trophy_after_barcelona_won_the_2009_showpiece_against_manchester_united.jpeg?imwidth=988",
  },
  {
    year: "2011",
    title: "ويمبلي: الكرة المثالية",
    desc: "المباراة التي قال عنها فيرجسون: لم أواجه فريقاً كهذا طوال حياتي.",
    image:
      "https://static.independent.co.uk/2023/05/28/06/57f47fe560a0c75d062212090a288a8cY29udGVudHNlYXJjaGFwaSwxNjg1MjU3NjAx-2.10857015.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp",
  },
  {
    year: "2015",
    title: "برلين: MSN المرعب",
    desc: "ميسي، سواريز، ونيمار.. الثلاثي الأقوى في التاريخ يحسم الخامسة.",
    image:
      "https://editorial.uefa.com/resources/025b-0f016a80e794-ecd533ba0f63-1000/format/wide1/2015_fc_barcelona.jpeg?imwidth=988",
  },
  {
    year: "FOREVER",
    title: "أكثر من مجرد نادٍ",
    desc: "125 عاماً من التاريخ، المجد، والكرة الجميلة.",
    image:
      "https://images.unsplash.com/photo-1540979836376-21015f626127?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function Home() {
  // مراحل العرض:
  // 1. 'intro': شاشة الشعار الثابتة
  // 2. 'showcase': عرض البطولات (52 ثانية)
  // 3. 'home': الموقع الرئيسي
  const [viewState, setViewState] = useState("intro");

  // حالة للتحكم في الشريحة الحالية في عرض البطولات
  const [currentTrophy, setCurrentTrophy] = useState(0);

  // مرجع الصوت
  const audioRef = useRef(new Audio(BarcaAnthem));

  // === منطق عرض البطولات ===
  useEffect(() => {
    if (viewState === "showcase") {
      const audio = audioRef.current;
      audio.volume = 0.6;
      audio.play().catch((e) => console.log("Audio block", e));

      // مدة العرض الكلية 52 ثانية
      // عدد الشرائح = 6
      // زمن الشريحة الواحدة = 52 / 6 = 8.6 ثانية تقريباً (8600 مللي ثانية)
      const slideDuration = 52000 / trophies.length;

      const interval = setInterval(() => {
        setCurrentTrophy((prev) => {
          if (prev === trophies.length - 1) {
            // لو وصلنا لآخر شريحة، ننهي العرض ونذهب للموقع
            setViewState("home");
            audio.pause(); // نوقف الصوت
            return prev;
          }
          return prev + 1;
        });
      }, slideDuration);

      return () => {
        clearInterval(interval);
        audio.pause(); // تنظيف عند الخروج
      };
    }
  }, [viewState]);

  // دالة لتخطي العرض (Skip)
  const skipIntro = () => {
    audioRef.current.pause();
    setViewState("home");
  };

  return (
    <>
      {/* ==========================================
          1. شاشة البداية (اضغط للدخول)
      ========================================== */}
      {viewState === "intro" && (
        <div
          onClick={() => setViewState("showcase")} // عند الضغط نذهب لعرض البطولات
          className="fixed inset-0 z-[9999] bg-[#151e3d] flex flex-col justify-center items-center cursor-pointer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
            alt="FC Barcelona"
            className="w-40 h-40 animate-pulse drop-shadow-[0_0_50px_rgba(165,0,68,0.5)]"
          />
          <p className="mt-8 text-[#EDBB00] text-sm tracking-[0.3em] font-bold animate-bounce uppercase">
            Click to Start the Journey
          </p>
        </div>
      )}

      {/* ==========================================
          2. معرض البطولات (Trophy Showcase - 52s)
      ========================================== */}
      {viewState === "showcase" && (
        <div className="fixed inset-0 z-[9998] bg-black overflow-hidden">
          {/* زر تخطي (Skip) - مهم جداً لليوزر */}
          <button
            onClick={skipIntro}
            className="absolute top-8 right-8 z-50 text-white/50 hover:text-white flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition hover:bg-[#A50044]"
          >
            تخطي العرض <ChevronRight size={20} />
          </button>

          {/* خلفية الصورة مع تأثير الزووم المستمر */}
          {trophies.map(
            (trophy, index) =>
              index === currentTrophy && (
                <div
                  key={index}
                  className="absolute inset-0 w-full h-full animate-[kenBurns_10s_ease-out_forwards]"
                >
                  {/* الصورة */}
                  <img
                    src={trophy.image}
                    className="w-full h-full object-cover opacity-60"
                    alt={trophy.title}
                  />
                  {/* طبقة تعتيم متدرجة */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151e3d] via-[#151e3d]/80 to-transparent"></div>
                </div>
              )
          )}

          {/* النصوص والمعلومات */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            {trophies.map(
              (trophy, index) =>
                index === currentTrophy && (
                  <div key={index} className="flex flex-col items-center">
                    {/* السنة - تظهر بتأثير قوي */}
                    <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#EDBB00] to-transparent leading-none animate-[fadeInUp_1s_ease-out] opacity-50 select-none">
                      {trophy.year}
                    </h1>

                    {/* العنوان */}
                    <h2 className="z-40 text-4xl md:text-6xl font-bold text-white mt-[-40px] md:mt-[-60px] drop-shadow-2xl animate-[fadeInUp_1.2s_ease-out_0.3s_forwards]">
                      {trophy.title}
                    </h2>

                    {/* الوصف */}
                    <p className="text-xl text-gray-300 mt-6 max-w-2xl font-light animate-[fadeInUp_1.5s_ease-out_0.5s_forwards] ">
                      {trophy.desc}
                    </p>
                  </div>
                )
            )}
          </div>

          {/* شريط التقدم (Progress Bar) */}
          <div
            className="absolute bottom-0 left-0 h-1 bg-[#A50044] transition-all duration-[1000ms] ease-linear"
            style={{
              width: `${((currentTrophy + 1) / trophies.length) * 100}%`,
            }}
          ></div>
        </div>
      )}

      {/* ==========================================
          3. الموقع الرئيسي (يظهر فقط في النهاية)
      ========================================== */}
      {/* نستخدم class مخفي بدلاً من عدم الرندر عشان الصور تحمل في الخلفية */}
      <div className={viewState !== "home" ? "hidden" : "animate-fade-in"}>
        <Header />
        <HeroSection />
      </div>

      {/* إضافة Keyframes للأنيميشن في نفس الملف (للتسهيل عليك) */}
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}
