import {
  BanknotesIcon,
  BellIcon,
  CheckCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useRef } from "react";

const SWIPE_THRESHOLD = 50;

const EmployeeHomeSM = () => {
  const steps = [
    {
      title: "Create Your Profile",
      description:
        "Add your skills, interests, preferred job types, and availability.",
      icon: UserIcon,
      selectStep: "/assets/landingpage/Phones/home/tab1.png",
    },
    {
      title: "Get Real-Time Job Alerts",
      description:
        "Get instantly notified when relevant jobs are posted nearby.",
      icon: BellIcon,
      selectStep: "/assets/landingpage/Phones/home/tab2.png"
    },
    {
      title: "Apply & Get Hired",
      description:
        "Browse, apply with one click, and get hired based on your profile match and ratings.",
      icon: CheckCircleIcon,
      selectStep: "/assets/landingpage/Phones/home/tab3.png"
    },
    {
      title: "Complete Job & Get Paid Securely",
      description:
        "After the job is done, receive your payment directly via the app quickly and safely.",
      icon: BanknotesIcon,
      selectStep: "/assets/landingpage/Phones/home/tab4.png"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const lastSwipeTime = useRef(0); // debounce swipes

  // Handle touch start
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  // Handle touch end
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;

    const now = Date.now();
    if (now - lastSwipeTime.current < 300) {
      // Debounce swipe: ignore if less than 300ms from last swipe
      return;
    }

    const diff = touchStartX.current - touchEndX.current;

    if (diff > SWIPE_THRESHOLD) {
      // Swiped left → go next
      setActiveIndex((prev) => (prev + 1) % steps.length);
      lastSwipeTime.current = now;
    } else if (diff < -SWIPE_THRESHOLD) {
      // Swiped right → go previous
      setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
      lastSwipeTime.current = now;
    }
  };

  const activeStep = steps[activeIndex];

  return (
    <section className="space-y-10 px-4 sm:px-6 block lg:hidden bg-[#FCF6DF] min-h-screen pb-12">
      <div className="flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center space-y-2 mt-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            How It Works here.
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl">
            For <span className="italic font-bold">Employee</span>
          </h2>
          <p className="text-gray-700 max-w-md mx-auto text-base sm:text-lg">
            With FastAff, daily wage jobs are just a few taps away. No long
            forms. No waiting.
          </p>
        </div>

        {/* Slider */}
        <div
          className="flex flex-col items-center space-y-6 w-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Phone Image */}
          <img
            src={activeStep.selectStep}
            alt={activeStep.title}
            className="h-72 sm:h-96 object-contain rounded-xl mx-auto drop-shadow"
          />

          {/* Step Card */}
          <div className="bg-[#FFF6DA] rounded-xl shadow p-6 mx-auto max-w-lg w-full flex flex-row items-center gap-4">
            <div className="p-3 bg-[#FDEFB2] rounded-full">
              <activeStep.icon className="h-8 w-8 text-appcolor" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {activeStep.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                {activeStep.description}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex gap-3 mt-2 justify-center">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full inline-block transition-all ${
                  idx === activeIndex ? "bg-appcolor scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeHomeSM;
// import {
//   BanknotesIcon,
//   BellIcon,
//   CheckCircleIcon,
//   UserIcon,
// } from "@heroicons/react/24/solid";
// import React, { useState, useEffect } from "react";

// const EmployeeHomeSM = () => {
//   const steps = [
//     {
//       title: "Create Your Profile",
//       description:
//         "Add your skills, interests, preferred job types, and availability.",
//       icon: UserIcon,
//       selectStep: "/assets/landingpage/Phones/HomeCategory1.png",
//     },
//     {
//       title: "Get Real-Time Job Alerts",
//       description:
//         "Get instantly notified when relevant jobs are posted nearby.",
//       icon: BellIcon,
//       selectStep: "/assets/landingpage/Phones/HomeCategory1.png",
//     },
//     {
//       title: "Apply & Get Hired",
//       description:
//         "Browse, apply with one click, and get hired based on your profile match and ratings.",
//       icon: CheckCircleIcon,
//       selectStep: "/assets/landingpage/Phones/HomeCategory1.png",
//     },
//     {
//       title: "Complete Job & Get Paid Securely",
//       description:
//         "After the job is done, receive your payment directly via the app quickly and safely.",
//       icon: BanknotesIcon,
//       selectStep: "/assets/landingpage/Phones/HomeCategory1.png",
//     },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % steps.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [steps.length]);

//   const activeStep = steps[activeIndex];

//   return (
//     <section className="space-y-10 px-2 sm:px-6 block lg:hidden bg-[#FCF6DF] min-h-screen pb-12">
//       <div className="flex flex-col items-center gap-8">
//         {/* Header */}
//         <div className="text-center space-y-2 mt-8">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
//             How It Works here.
//           </h2>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl">
//             For <span className="italic font-bold">Employee</span>
//           </h2>
//           <p className="text-gray-700 max-w-md mx-auto text-base sm:text-lg">
//             With FastAff, daily wage jobs are just a few taps away. No long
//             forms. No waiting.
//           </p>
//         </div>

//         {/* Phone mockup & active step */}
//         <div className="flex flex-col items-center space-y-6 w-full">
//           {/* Phone Image */}
//           <img
//             src={activeStep.selectStep}
//             alt={activeStep.title}
//             className="h-72 sm:h-96 object-contain rounded-xl mx-auto drop-shadow"
//           />

//           {/* Step Card */}
//           <div className="bg-[#FFF6DA] rounded-xl shadow p-6 mx-auto max-w-lg w-full flex flex-row items-center gap-4">
//             <div className="p-3 bg-[#FDEFB2] rounded-full">
//               <activeStep.icon className="h-8 w-8 text-appcolor" />
//             </div>
//             <div>
//               <h3 className="text-lg sm:text-xl font-semibold mb-2">
//                 {activeStep.title}
//               </h3>
//               <p className="text-sm sm:text-base text-gray-700">
//                 {activeStep.description}
//               </p>
//             </div>
//           </div>

//           {/* Dots */}
//           <div className="flex gap-3 mt-2 justify-center">
//             {steps.map((_, idx) => (
//               <span
//                 key={idx}
//                 className={`w-3 h-3 rounded-full inline-block transition-all ${
//                   idx === activeIndex ? "bg-appcolor scale-125" : "bg-gray-300"
//                 }`}
//               ></span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmployeeHomeSM;
