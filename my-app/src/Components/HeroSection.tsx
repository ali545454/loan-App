import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import BarcaAnthem from "../../src/assets/9JdugskAcS0.mp3";
const slides = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1521504846809-c3746c1fbf67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "إسباي بارسا: ثورة الكامب نو الجديد",
    category: "مستقبل النادي",
    text: "مشروع القرن في برشلونة ليس مجرد تجديد للملعب، بل هو تحول كامل للمنطقة المحيطة. سيصبح الكامب نو الجديد الأحدث تكنولوجياً في أوروبا بسعة تتجاوز 105 ألف متفرج، مع سقف مغطى بالكامل وشاشات 360 درجة، ليكون حصناً مرعباً للخصوم ومصدر دخل اقتصادي ضخم للنادي.",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1667983091544-b7520ce94de8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "لامين يامال: خليفة ميسي المنتظر",
    category: "الفتى الذهبي",
    text: "في سن السادسة عشرة فقط، حطم لامين يامال كل الأرقام القياسية الممكنة. بمهارات تذكرنا بالأسطورة ليو ميسي، ورؤية للملعب تسبق سنه بسنوات، أصبح يامال العنصر الذي لا يمكن الاستغناء عنه في تشكيلة البلوغرانا ومنتخب إسبانيا. العالم كله يترقب ما سيقدمه هذا الساحر الصغير.",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "ماكينة الأهداف: روبرت ليفاندوفسكي",
    category: "الفريق الأول",
    text: "البيتشيتشي لا يشبع من الأهداف. يواصل النجم البولندي قيادة خط الهجوم ببراعة وخبرة كبيرة. بفضل تحركاته الذكية وإنهاء الهجمات القاتل، يعتبر ليفاندوفسكي المعلم والقائد للاعبين الشباب في غرفة الملابس، وهدف النادي الأول لاستعادة لقب دوري أبطال أوروبا.",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1920&auto=format&fit=crop",
    title: "سيدات برشلونة يحكمن العالم",
    category: "كرة القدم النسائية",
    text: "فريق سيدات برشلونة ليس مجرد فريق، بل هو ظاهرة عالمية. بقيادة أيتانا بونماتي وأليكسيا بوتياس، سيطر الفريق على الكرة الأوروبية والمحلية بأداء مذهل وأرقام فلكية، واكتسح الملاعب بحضور جماهيري غير مسبوق في تاريخ الكرة النسائية.",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1599863836746-834c83226a45?q=80&w=1920&auto=format&fit=crop",
    title: "أكاديمية اللاماسيا: منجم الذهب",
    category: "مواهب",
    text: "عندما يعاني النادي اقتصادياً، تنقذه اللاماسيا دائماً. جيل جديد من المواهب الشابة مثل باو كوبارسي، هيكتور فورت، وفيرمين لوبيز أثبتوا أن هوية برشلونة لا تموت. هؤلاء الشباب يلعبون بروح وشغف لا يمتلكه أغلى نجوم العالم.",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=2023&auto=format&fit=crop",
    title: "هانسي فليك: عقلية ألمانية بقلب كتالوني",
    category: "الجهاز الفني",
    text: "منذ وصوله، فرض هانسي فليك انضباطاً تكتيكياً وبدنياً صارماً. المدرب الذي حقق السداسية التاريخية سابقاً يسعى لبناء فريق مرعب يعتمد على الضغط العالي واللعب المباشر، ليعيد لبرشلونة هيبته في المنافسات الأوروبية الكبرى.",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1920&auto=format&fit=crop",
    title: "بيدري وجافي: سحرة خط الوسط",
    category: "محرك الفريق",
    text: "لا يمكن تخيل برشلونة بدون خط وسط مبدع. الثنائية بين بيدري بلمساته الساحرة وجافي بروحه القتالية تعيد للأذهان ثنائية تشافي وإنييستا. هما القلب النابض الذي يتحكم في إيقاع اللعب ويصنع الفارق في المباريات الصعبة.",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1504159506876-f8338247a14a?q=80&w=1920&auto=format&fit=crop",
    title: "الجماهير: أكثر من مجرد نادٍ",
    category: "المدرجات",
    text: "شعار 'Mes Que Un Club' ليس مجرد كلمات، بل هو واقع يعيشه الملايين. جماهير البلوغرانا حول العالم تظل وفية للنادي في السراء والضراء، وتنتظر بفارغ الصبر العودة للكامب نو لرسم أجمل اللوحات الفنية ودعم الفريق حتى الدقيقة الأخيرة.",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1920&auto=format&fit=crop",
    title: "الكلاسيكو: معركة الأرض والشرف",
    category: "مباريات نارية",
    text: "المواجهة ضد ريال مدريد ليست مجرد مباراة بـ 3 نقاط، بل هي صراع تاريخي وثقافي. الاستعداد للكلاسيكو القادم يجري على قدم وساق، حيث يسعى برشلونة لتأكيد تفوقه المحلي وإثبات أن مشروعه الجديد قادر على إسقاط الغريم التقليدي.",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1920&auto=format&fit=crop",
    title: "تاريخ من الذهب: 125 عاماً من المجد",
    category: "الذكرى السنوية",
    text: "يحتفل نادي برشلونة بمرور 125 عاماً على تأسيسه. قرن وربع من الكرة الجميلة، الأساطير، والبطولات. النادي يخطط لاحتفالات ضخمة تليق بتاريخ هذا الكيان العظيم الذي ألهم الملايين وغير مفهوم كرة القدم للأبد.",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);
  // مرجع لملف الصوت حتى لا يعاد إنشاؤه مع كل Render
  const audioRef = useRef(new Audio(BarcaAnthem));

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.4;

    // متغير لحفظ رقم العداد عشان نقدر نلغيه لو حصل أي تغيير
    let timerId;

    const stopAudio = () => {
      audio.pause();
      audio.currentTime = 0;
      // تنظيف العداد للتأكد
      if (timerId) clearTimeout(timerId);
    };

    const playAnthem = async () => {
      try {
        await audio.play();
        console.log("Audio started automatically");

        // الحالة الأولى: اشتغل تلقائي -> نوقف بعد 15 ثانية
        timerId = setTimeout(() => {
          stopAudio();
        }, 15000);
      } catch (error) {
        console.log("Autoplay blocked. Waiting for click...");

        // الحالة الثانية: منع المتصفح -> ننتظر الضغطة
        const playOnClick = () => {
          audio.play();
          console.log("Audio started after click");

          // === التصحيح هنا ===
          // لازم نستدعي stopAudio() بالأقواس، أو نمرر اسمها فقط
          timerId = setTimeout(stopAudio, 52000.5);

          document.removeEventListener("click", playOnClick);
        };

        document.addEventListener("click", playOnClick);
      }
    };

    playAnthem();

    // تنظيف عند الخروج من الصفحة (Unmount)
    return () => {
      stopAudio();
      if (timerId) clearTimeout(timerId);
    };
  }, []);
  return (
    <div className="w-full h-[calc(100vh-55px)] relative group overflow-hidden bg-gray-900">
      {/* 5. الصورة الخلفية مع تأثير الحركة */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        // إضافة animate-pulse-slow أو scale بسيط لجعل الصورة حية
        className="w-full h-full bg-center bg-cover duration-700 ease-in-out transition-all relative transform scale-105 hover:scale-100"
      >
        {/* === التحسين الأول: تدرج لوني سينمائي === 
           بدلاً من السواد الكامل، تدرج من الأسود تحت إلى الشفاف فوق
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      {/* === التحسين الثاني: النصوص والأنيميشن === 
          أضفنا key={currentIndex}
          هذه خدعة مهمة جداً! تجعل الرياكت يعيد تشغيل الأنيميشن في كل مرة تتغير الصورة
      */}
      <div
        key={currentIndex}
        className="absolute inset-0 flex flex-col justify-end pb-24 items-center text-center text-white px-6 md:px-20"
      >
        {/* تصنيف الخبر (فوق العنوان) */}
        <span className="text-[#EDBB00] font-bold tracking-widest uppercase mb-2 animate-[fadeInDown_0.5s_ease-out]">
          {slides[currentIndex].category}
        </span>

        {/* العنوان الرئيسي - خط كبير وجريء */}
        <h2 className="text-4xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl tracking-tight leading-tight animate-[fadeInUp_0.8s_ease-out]">
          {slides[currentIndex].title}
        </h2>

        {/* الوصف */}
        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mb-8 leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
          {slides[currentIndex].text}
        </p>

        {/* الأزرار */}
        <div className="flex gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
          <button className="flex items-center gap-2 px-8 py-3 bg-[#A50044] hover:bg-[#800033] text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(165,0,68,0.5)] hover:shadow-[0_0_30px_rgba(165,0,68,0.8)] transform hover:-translate-y-1">
            اقرأ المزيد <ArrowRight size={20} />
          </button>
          <button className="px-8 py-3 border-2 border-white/30 hover:bg-white hover:text-black text-white font-bold rounded-full transition-all duration-300 backdrop-blur-sm">
            شاهد الفيديو
          </button>
        </div>
      </div>

      {/* أزرار التنقل الجانبية (محسنة) */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:flex items-center justify-center absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/30 hover:bg-[#A50044] hover:border-[#A50044] text-white transition-all duration-300 backdrop-blur-md z-20"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden group-hover:flex items-center justify-center absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/30 hover:bg-[#A50044] hover:border-[#A50044] text-white transition-all duration-300 backdrop-blur-md z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* النقاط (Dots) */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              currentIndex === slideIndex
                ? "w-8 bg-[#EDBB00]" // الخط الأصفر المميز لبرشلونة
                : "w-2 bg-white/40 hover:bg-white"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
