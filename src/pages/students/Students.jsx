import React from "react";
import Badge from "../../components/ui/Badge";
import FeatureSection from "./FeatureSection";
import StepsSection from "./StepsSection";
import BenefitsSection from "./BenefitsSection";
import StudentFAQs from "./StudentFAQs";

const Students = () => {
  return (
    <section className="py-4 lg:py-8 space-y-20 ">
      <FeatureSection />

      <StepsSection />

      <BenefitsSection />

      <StudentFAQs />
    </section>
  );
};

export default Students;

// import React from "react";
// import Badge from "../../components/ui/Badge";

// const Students = () => {
//   const studentCards = [
//     {
//       title: "Jobs near you",
//       description:
//         "Our geo-matching ensures that you only see relevant, nearby jobs.",
//       icon: "/assets/landingpage/mapPin.png",
//     },
//     {
//       title: "Total flexibility",
//       description:
//         "Choose the missions that suit you and adapt your schedule over the weeks.",
//       icon: "/assets/landingpage/businessBag.png",
//     },
//     {
//       title: "Assessment and progression",
//       description:
//         "After each assignment, receive a company rating, allowing you to build a trusted profile and attract more assignments.",
//       icon: "/assets/landingpage/starThumpsUp.png",
//     },
//     {
//       title: "No constraints",
//       description:
//         "Fastaff is committed to never making the basic use of its platform paid for people looking for work.",
//       icon: "/assets/landingpage/disableIcon.png",
//     },
//   ];
//   const contactItems = [
//     {
//       icon: "/assets/landingpage/Icons/CheckSheild.png",
//       text: "Financial support",
//       description:
//         "Temporary assignments allow you to finance your studies and daily needs without a long-term commitment.",
//     },
//     {
//       icon: "/assets/landingpage/Icons/Thunder.png",
//       text: "Professional experience",
//       description:
//         "Each mission is an opportunity to acquire new skills in various fields (events, catering, commerce, etc.)",
//     },
//     {
//       icon: "/assets/landingpage/Icons/Thunder.png",
//       text: "Balance between studies and work",
//       description:
//         "FASTAFF's flexibility helps you find assignments that respect your academic pace and priorities.",
//     },
//   ];
//   return (
//     <section className="py-12 space-y-20">
//       {/* Header 1*/}
//       <div className="text-center">
//         <Badge text="Why Choose Fastaff" />
//         <h2 className="text-5xl font-semibold mt-4">
//           What Makes Us Different?
//         </h2>
//       </div>
//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {studentCards.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl px-6 py-8 space-y-4 shadow-md
//                        hover:bg-dark hover:text-appcolor
//                        transition-all duration-300 ease-in-out
//                        transform hover:-translate-y-2 hover:shadow-xl"
//           >
//             <img src={item.icon} alt={item.title} className="h-16 w-16" />
//             <h3 className="text-lg font-semibold">{item.title}</h3>
//             <p className="text-sm hover:text-inherit">{item.description}</p>
//           </div>
//         ))}
//       </div>

//       {/* Header 2 */}
//       <div className="text-center">
//         <Badge text="How it works" />
//         <h2 className="text-5xl font-medium mt-4 mb-5">
//           <span className="italic font-extrabold"> Download the app</span> on
//           your mobile store for{" "}
//           <span className="italic font-extrabold">FREE</span>
//         </h2>
//         <p>(available on iOS and Android)</p>
//       </div>

//       {/* Cards 2 */}
//       <div className="space-y-16">
//         {/* Create Profile */}
//         <div className="w-full bg-CardPhoneBg bg-cover bg-no-repeat flex">
//           {/* content */}
//           <div className="w-1/2 my-24 mx-10 px-10 space-y-3">
//             <div className="flex justify-center">
//               <img
//                 src="/assets/landingpage/Phones/CreateprofileUser.png"
//                 className="h-20 w-20"
//               />
//             </div>
//             <div className="space-y-2">
//               <h1 className="text-3xl text-center font-semibold">
//                 Create Profile
//               </h1>
//               <p className="text-center text-lg ">
//                 Add your name, skills, preferred job type, location, and
//                 availability to help employers discover you faster.
//               </p>
//             </div>
//           </div>
//           {/* image */}
//           <div className="mt-[51px] mx-32">
//             <img
//               src="/assets/landingpage/Phones/CreateProfile.png"
//               className="h-[350px] w-full"
//             />
//           </div>
//         </div>
//         {/*  Browse Jobs Near You */}
//         <div className="w-full bg-dark text-appcolor flex rounded-3xl">
//           {/* image */}
//           <div className="mt-[51px] mx-32">
//             <img
//               src="/assets/landingpage/Phones/BrowseJobs.png"
//               className="h-[350px] w-full"
//             />
//           </div>
//           {/* content */}
//           <div className="w-1/2 my-24 mx-10 px-10 space-y-3">
//             <div className="flex justify-center">
//               <img
//                 src="/assets/landingpage/Phones/CreateprofileUser.png"
//                 className="h-20 w-20"
//               />
//             </div>
//             <div className="space-y-2">
//               <h1 className="text-3xl text-center font-semibold">
//                 Browse Jobs Near You
//               </h1>
//               <p className="text-center text-lg ">
//                 Explore jobs tailored to your skills and location — filter by
//                 category, timing, or pay.
//               </p>
//             </div>
//           </div>
//         </div>
//         {/* Apply in One Tap */}
//         <div className="w-full bg-CardPhoneBg bg-cover bg-no-repeat flex">
//           {/* content */}
//           <div className="w-1/2 my-24 mx-10 px-10 space-y-3">
//             <div className="flex justify-center">
//               <img
//                 src="/assets/landingpage/Phones/CreateprofileUser.png"
//                 className="h-20 w-20"
//               />
//             </div>
//             <div className="space-y-2">
//               <h1 className="text-3xl text-center font-semibold">
//                 Apply in One Tap
//               </h1>
//               <p className="text-center text-lg px-4">
//                 Instantly apply to jobs you’re interested in — no long forms,
//                 just a simple click to express interest.
//               </p>
//             </div>
//           </div>
//           {/* image */}
//           <div className="mt-[51px] mx-32">
//             <img
//               src="/assets/landingpage/Phones/ApplyJobs.png"
//               className="h-[350px] w-full"
//             />
//           </div>
//         </div>

//         <div className="flex gap-5">
//           <div className="w-full bg-dark text-appcolor rounded-[34px]">
//             {/* content */}
//             <div className="space-y-3 ">
//               <div className="space-y-2 mx-20 mt-10">
//                 <h1 className="text-3xl text-center font-semibold">
//                   Start Working
//                 </h1>
//                 <p className="text-center text-lg ">
//                   Once selected, follow the job instructions, check-in as
//                   required, and complete your task on time.
//                 </p>
//               </div>
//             </div>
//             {/* image */}
//             <div className="mt-[40px] mx-36">
//               <img
//                 src="/assets/landingpage/Phones/StartWorking.png"
//                 className="h-[350px] w-full"
//               />
//             </div>
//           </div>
//           <div className="w-full bg-CardPhoneBg bg-cover bg-no-repeat rounded-[34px]">
//             {/* content */}
//             <div className="space-y-3">
//               <div className="space-y-2 mx-20 mt-10">
//                 <h1 className="text-3xl text-center font-semibold">
//                   Get Paid Securely
//                 </h1>
//                 <p className="text-center text-lg ">
//                   After job completion, receive payment directly in your wallet
//                   or bank — quick, safe, and trackable.
//                 </p>
//               </div>
//             </div>
//             {/* image */}
//             <div className="mt-[40px] mx-36">
//               <img
//                 src="/assets/landingpage/Phones/StartWorking.png"
//                 className="h-[350px] w-full"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Header 3*/}
//       <div className="text-center">
//         <Badge text="Benefits for you" />
//         <h2 className="text-5xl font-semibold mt-4">Why choose us?</h2>
//       </div>
//       <div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-8xl mx-auto px-2">
//           {contactItems.map((item, idx) => (
//             <div
//               key={idx}
//               className="border-2 border-appcolor rounded-2xl py-6 px-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex flex-col items-center"
//             >
//               {/* Main Icon */}
//               <div className="flex justify-center">
//                 <img src={item.icon} alt="contact icon" className="h-16 w-16" />
//               </div>

//               {/* Text or Social Icons */}

//               <p className="text-center text-xl font-semibold mt-6">
//                 {item.text}
//               </p>
//               <p className="text-[#706183] text-sm text-center mt-6">
//                 {item.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Students;
