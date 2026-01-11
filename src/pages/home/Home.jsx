import React from 'react';
import { 
  MapPin, Clock, Briefcase, ChevronRight, Search, Building2, Users, Award, Zap,
  TrendingUp, Shield, Globe, Star, UserCheck, Calendar, MessageCircle 
} from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: Users, label: 'Active Jobs', value: '50K+', color: 'from-blue-500 to-indigo-600' },
    { icon: Building2, label: 'Companies', value: '10K+', color: 'from-emerald-500 to-teal-600' },
    { icon: Award, label: 'Hires Made', value: '95%', color: 'from-purple-500 to-pink-600' },
    { icon: Zap, label: 'Response Time', value: '24h', color: 'from-orange-500 to-red-500' }
  ];

  const featuredJobs = [
    {
      id: 1,
      jobTitle: 'Full Stack Flutter Developer',
      companyName: 'TechRide Solutions',
      location: 'Mumbai, MH',
      salary: '15',
      jobRole: 'Full Stack',
      exp_level: '3-5 Yrs',
      skills: ['Flutter', 'Firebase', 'React', 'Node.js', 'MongoDB'],
      vacancy: 5,
      createdAt: '2026-01-10'
    },
    {
      id: 2,
      jobTitle: 'Senior React Developer',
      companyName: 'UrbanMove',
      location: 'Bangalore, KA',
      salary: '22',
      jobRole: 'Frontend',
      exp_level: '5+ Yrs',
      skills: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
      vacancy: 3,
      createdAt: '2026-01-09'
    },
    {
      id: 3,
      jobTitle: 'Backend Engineer',
      companyName: 'SwiftDelivery',
      location: 'Remote',
      salary: '18',
      jobRole: 'Backend',
      exp_level: '2-4 Yrs',
      skills: ['Node.js', 'Express', 'MongoDB', 'Redis'],
      vacancy: 8,
      createdAt: '2026-01-11'
    },
    {
      id: 4,
      jobTitle: 'DevOps Engineer',
      companyName: 'CloudScale',
      location: 'Pune, MH',
      salary: '20',
      jobRole: 'DevOps',
      exp_level: '4-7 Yrs',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      vacancy: 2,
      createdAt: '2026-01-10'
    }
  ];

  const benefits = [
    { icon: TrendingUp, title: 'Fast Hiring', desc: 'Companies hire 3x faster with our AI matching' },
    { icon: Shield, title: 'Verified Jobs', desc: 'All jobs verified by our team' },
    { icon: UserCheck, title: 'Profile Boost', desc: 'Get 5x more views with profile optimization' },
    { icon: Calendar, title: 'Weekly Payouts', desc: 'Freelancers get paid every Friday' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Flutter Developer',
      company: 'TechRide Solutions',
      quote: 'Found my dream job in 3 days! The matching algorithm is incredible.',
      avatar: 'P'
    },
    {
      name: 'Rahul Mehta',
      role: 'HR Manager',
      company: 'UrbanMove',
      quote: 'Hired 15 developers in a month. Best ROI on any hiring platform.',
      avatar: 'R'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:100px_100px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-800 mb-8">
              <Zap className="w-4 h-4" />
              Join 10K+ companies hiring top talent
            </div>
            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight">
              Jobs that 
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {' '}change
              </span>
              careers
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Simple. Fast. Effective. Find great jobs or hire great talent in minutes.
            </p>
          </div>

          {/* Minimal Search */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-xl p-1 flex gap-2">
              <div className="flex-1 relative group">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-2 focus:ring-blue-500/20 rounded-2.5xl text-lg placeholder-slate-500 focus:outline-none focus:placeholder-slate-400"
                />
              </div>
              <button className="group bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2.5xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                Find Jobs
              </button>
            </div>
          </div>

          {/* Dual CTA */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-blue-300/50 px-8 py-4 rounded-2xl text-lg font-semibold text-slate-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 min-w-[200px] justify-center">
              <Users className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              For Job Seekers
            </button>
            <div className="w-px h-10 bg-slate-200 hidden sm:block" />
            <button className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 min-w-[200px] justify-center">
              <Building2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              For Employers
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${stat.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
                Featured Jobs
              </h2>
              <p className="text-xl text-slate-600">Latest opportunities from top companies</p>
            </div>
            <button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap flex items-center gap-2">
              View All Jobs
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <JobCardSimplified key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why companies love us
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Trusted by 10K+ businesses worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="group p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-200 hover:border-emerald-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:bg-white">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl mb-6 group-hover:scale-110 transition-all duration-300 mx-auto">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600">Real people, real results</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group p-10 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5" />
                <div className="relative">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-2xl flex-shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 mb-1">{testimonial.name}</h4>
                      <p className="text-slate-600 flex items-center gap-2">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg">{testimonial.role}</span>
                        <span>•</span>
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl mb-8">
            <Globe className="w-5 h-5" />
            <span>Available in 50+ countries</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-lg">
            Ready to get started?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals finding their next opportunity or employers hiring top talent.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-slate-900 font-black px-12 py-6 rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 text-lg flex items-center gap-3">
              Start Job Search
              <Search className="w-5 h-5" />
            </button>
            <button className="border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white font-semibold px-12 py-6 rounded-3xl hover:bg-white/20 hover:border-white transition-all duration-300 text-lg flex items-center gap-3">
              Post a Job
              <Building2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Your JobCardSimplified component (same as before)
const JobCardSimplified = ({ job }) => {
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group w-full bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
      <div className="p-6 pb-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center min-w-0 flex-1">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl mr-4 flex-shrink-0 group-hover:scale-105 transition-all duration-300">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-black text-slate-900 truncate">
                {job.companyName}
              </h3>
              <p className="text-sm text-slate-500 mt-1">Posted {postedDate}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg">
            ₹{job.salary} LPA
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-black text-slate-900 mb-4 line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
          {job.jobTitle}
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-all">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-800">{job.jobRole}</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-all">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-800 truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100 hover:bg-orange-100 transition-all">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="font-semibold text-slate-800">{job.exp_level}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 hover:border-emerald-300 transition-all hover:scale-105">
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold border border-slate-200 rounded-xl">
              +{job.skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-sm text-slate-600 font-medium">{job.vacancy} openings</span>
          <button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5">
            Apply Now
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Home;


// import React, { useRef } from "react";
// import HeaderSection from "./HeaderSection";
// import Categories from "./Categories";
// import BannerHome from "./BannerHome";
// import FeaturedJobsHome from "./FeaturedJobsHome";
// import OurSponsors from "./OurSponsors";
// import ContactUsHome from "./ContactUsHome";
// import SuccessStories from "./SuccessStories";
// import EmployeeHome from "./EmployeeHome";
// import EmployerHome from "./EmployerHome";
// import EmployeeHomeSM from "./EmployeeHomeSM";
// import EmployerHomeSM from "./EmployerHomeSM";
// import HeaderSectionSM from "./HeaderSectionSM";
// import { useGetWebsiteGeneralDataQuery } from "../../services/faqApiSlice";
// import Spinner from "../../components/ui/Spinner";
// import TestHeaderSection from "./TestHeaderSection";

// // "contact_email": "contact@fastaff.ch",
// // "contact_phone": "0789656694",
// // "contact_location": "Switzerland",

// // "insta_link": "https://www.instagram.com/fastaff_ch/",
// // "fb_link": "https://www.facebook.com/people/Fastaff/61566892058268/?is_tour_dismissed",
// const Home = () => {
//   const bannerRef = useRef(null);
//   const contactRef = useRef(null);
//   const { data, isLoading } = useGetWebsiteGeneralDataQuery();
//   if (isLoading) {
//     return <Spinner />; // or a loading spinner
//   }
//   const scrollToBanner = () => {
//     bannerRef.current?.scrollIntoView({ behavior: "smooth" });
//     console.log("scrolling to banner");
//   };
//   const scrollToContactBanner = () => {
//     contactRef.current?.scrollIntoView({ behavior: "smooth" });
//     console.log("scrolling to contact");
//   };
//   return (
//     <section className="pt-0 lg:pt-12 space-y-4 lg:space-y-20">
//       <TestHeaderSection
//         data={data?.data}
//         onDownloadClick={scrollToBanner}
//         onContactClick={scrollToContactBanner}
//       />
//       {/* <HeaderSection
//         data={data?.data}
//         onDownloadClick={scrollToBanner}
//         onContactClick={scrollToContactBanner}
//       />
//       <HeaderSectionSM
//         onDownloadClick={scrollToBanner}
//         onContactClick={scrollToContactBanner}
//       /> */}

//       <Categories />

//       <FeaturedJobsHome />

//       <OurSponsors />

//       <EmployeeHome />

//       <EmployerHome />

//       <SuccessStories />

//       <BannerHome data={data?.data} ref={bannerRef} />

//       <ContactUsHome data={data?.data} ref={contactRef} />
//     </section>
//   );
// };

// export default Home;
