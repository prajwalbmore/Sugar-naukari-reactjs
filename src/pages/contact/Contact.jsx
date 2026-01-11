import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  Users,
  Award,
  Zap,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-center mb-24">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:100px_100px]" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 backdrop-blur-sm px-6 py-3 rounded-2xl mb-8 text-emerald-800 font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            We're here to help you 24/7
          </div>
          <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 bg-clip-text text-transparent mb-6 leading-tight">
            Get In Touch
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you're a job seeker or employer, our team is ready to help
            you succeed.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-24">
          {/* Contact Form */}
          <section className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 p-8 lg:p-12 sticky top-24">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              Send us a message
            </h2>
            <p className="text-slate-600 mb-12 leading-relaxed">
              We'll respond within 24 hours
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-slate-500 text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-slate-500 text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg">
                  <option>Job Application Issue</option>
                  <option>Employer Account Help</option>
                  <option>Technical Support</option>
                  <option>Feature Request</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your issue..."
                  className="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-vertical placeholder-slate-500 text-lg"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black py-6 px-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:-translate-y-0.5">
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </section>

          {/* Contact Info */}
          <div className="space-y-12">
            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-1">Email Us</h3>
                    <p className="opacity-90">Fastest response time</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a
                    href="mailto:support@jobportal.com"
                    className="block text-lg font-semibold hover:text-white/80 transition-colors"
                  >
                    support@jobportal.com
                  </a>
                  <a
                    href="mailto:jobs@jobportal.com"
                    className="block text-lg font-semibold hover:text-white/80 transition-colors"
                  >
                    jobs@jobportal.com
                  </a>
                  <a
                    href="mailto:sales@jobportal.com"
                    className="block text-lg font-semibold hover:text-white/80 transition-colors"
                  >
                    sales@jobportal.com
                  </a>
                </div>
              </div>

              <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-1">Call Us</h3>
                    <p className="opacity-90">Mon-Fri 9AM-7PM IST</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a
                    href="tel:+919876543210"
                    className="block text-lg font-semibold hover:text-white/80 transition-colors"
                  >
                    +91 98765 43210
                  </a>
                  <a
                    href="tel:+919123456789"
                    className="block text-lg font-semibold hover:text-white/80 transition-colors"
                  >
                    +91 91234 56789
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200 shadow-xl">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mt-1 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Visit Us
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    3rd Floor, Tech Tower,
                    <br />
                    Bandra Kurla Complex, Mumbai,
                    <br />
                    Maharashtra 400051
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-slate-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">
                    Support Hours
                  </h4>
                  <p className="text-slate-700">24/7 Email • 9AM-7PM Phone</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find answers quickly before contacting us
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-black text-slate-900 mb-3">
                How long does it take to get a response?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Email responses within 24 hours, phone support during business
                hours.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-black text-slate-900 mb-3">
                Do you offer premium support?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Yes! Priority support available for enterprise employers and
                premium job seekers.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-black text-slate-900 mb-3">
                Can I schedule a demo?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Absolutely! Book a personalized demo with our team to explore
                all features.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <h3 className="text-xl font-black text-slate-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Credit/Debit cards, UPI, Net Banking, and monthly invoicing for
                enterprises.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;

// import React from "react";
// import Badge from "../../components/ui/Badge";
// import MailLogo from "/assets/landingpage/mail.png";
// import SocialLogo from "/assets/landingpage/socialmedia.png";
// import PhoneLogo from "/assets/landingpage/phone.png";
// import ContactImage from "/assets/landingpage/contactUs.png";
// import { Facebook, Instagram, Mail, Pen, Phone, User } from "lucide-react";
// import IconInput from "../../components/ui/IconInput";
// import IconTextarea from "../../components/ui/IconTextarea";
// import { ArrowRightIcon } from "@heroicons/react/24/solid";
// import {
//   useContactUsMutation,
//   useGetWebsiteGeneralDataQuery,
// } from "../../services/faqApiSlice";
// import { handleSubmit } from "../../utils/useHandleSubmit";
// import Spinner from "../../components/ui/Spinner";
// import { Select, MenuItem, FormHelperText } from "@mui/material";
// import { Formik, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useTranslation } from "react-i18next";

// export default function Contact() {
//   const { data, isLoading: detailLoading } = useGetWebsiteGeneralDataQuery();
//   const { t } = useTranslation();
//   // const contactItems = [
//   //   {
//   //     icon: MailLogo,
//   //     text: data?.data?.contact_email,
//   //     onClick: () =>
//   //       (window.location.href = `mailto:${data?.data?.contact_email}`),
//   //   },
//   //   { icon: PhoneLogo, text: data?.data?.contact_phone },
//   //   {
//   //     icon: SocialLogo,
//   //     icons: [Instagram, Facebook],
//   //     instaOnClick: () => window.open(data?.data?.insta_link, "_blank"),
//   //     fbOnClick: () => window.open(data?.data?.fb_link, "_blank"),
//   //   },
//   // ];
//   const contactItems = [
//     {
//       icon: MailLogo,
//       text: data?.data?.contact_email,
//       onClick: () => {
//         if (data?.data?.contact_email) {
//           window.open(
//             `https://mail.google.com/mail/?view=cm&to=${data.data.contact_email}`,
//             "_blank"
//           );
//         }
//       },
//     },
//     {
//       icon: PhoneLogo,
//       text: data?.data?.contact_phone,
//       onClick: () => {
//         if (data?.data?.contact_phone) {
//           window.location.href = `tel:${data.data.contact_phone}`;
//         }
//       },
//     },
//     {
//       icon: SocialLogo,
//       icons: [Instagram, Facebook],
//       instaOnClick: () => window.open(data?.data?.insta_link, "_blank"),
//       fbOnClick: () => window.open(data?.data?.fb_link, "_blank"),
//     },
//   ];

//   const [contactUs, { isLoading }] = useContactUsMutation();

//   const validationSchema = Yup.object({
//     full_name: Yup.string().required("Full Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     phone: Yup.string()
//       .matches(/^\+?\d{10,15}$/, "Invalid phone number")
//       .required("Phone is required"),
//     subject: Yup.string().required("Subject is required"),
//     message: Yup.string().required("Message is required"),
//   });

//   if (detailLoading) {
//     return <Spinner />;
//   }

//   return (
//     <section className="py-8 px-4 sm:px-6 md:px-12 lg:px-24">
//       {/* Header Section */}
//       <div className="text-center max-w-2xl mx-auto">
//         <Badge text="Contact Us" />
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
//           {t("Reach Out – We’re Here to Help")}
//         </h2>
//         <p className="mt-4 text-gray-600 text-base sm:text-lg">
//           {t(
//             "Have a question, suggestion, or feedback? Send us a message and we’ll get back shortly."
//           )}
//         </p>
//       </div>

//       {/* Contact Items */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-12 max-w-7xl mx-auto">
//         {contactItems.map((item, idx) => (
//           <div
//             key={idx}
//             className="bg-appcolor rounded-2xl py-8 sm:py-10 px-4 sm:px-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex flex-col items-center"
//           >
//             <div className="flex justify-center">
//               <img
//                 src={item.icon}
//                 alt="contact icon"
//                 className="h-12 sm:h-16 w-12 sm:w-16"
//               />
//             </div>

//             {item.text ? (
//               <p
//                 className="text-center text-lg sm:text-xl font-semibold mt-4 sm:mt-6 cursor-pointer hover:underline"
//                 onClick={item.onClick}
//               >
//                 {item.text}
//               </p>
//             ) : item.icons ? (
//               <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
//                 {item.icons.map((Icon, i) => (
//                   <div className="bg-white p-2 rounded-full" key={i}>
//                     <Icon
//                       className="h-6 sm:h-8 w-6 sm:w-8 text-gray-800 cursor-pointer"
//                       onClick={i === 0 ? item.instaOnClick : item.fbOnClick}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         ))}
//       </div>

//       {/* Contact Form */}
//       <Formik
//         initialValues={{
//           full_name: "",
//           email: "",
//           phone: "",
//           subject: "",
//           message: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={async (values, { resetForm }) => {
//           try {
//             await handleSubmit({ values, apiCall: contactUs });
//             resetForm();
//           } catch (err) {
//             console.error(err);
//             alert("Something went wrong ❌");
//           }
//         }}
//       >
//         {({ values, handleChange, handleBlur, touched, errors }) => (
//           <Form className="flex flex-col md:flex-row items-center mt-12 max-w-7xl mx-auto gap-6 md:gap-12">
//             {/* Left Section */}
//             <div className="w-full md:w-1/2 px-4 sm:px-6 py-6 sm:py-8">
//               <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold">
//                 {t("Have Questions?")}
//               </h1>
//               <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#CCB247] mt-2">
//                 {t("Get in Touch!")}
//               </h1>
//               <p className="text-gray-600 mt-4 leading-relaxed text-sm sm:text-base">
//                 {t(
//                   "Got Something to Say? We’re Listening. Contact us today and let’s stay connected."
//                 )}
//               </p>
//               <img
//                 src={ContactImage}
//                 alt="Contact Us"
//                 className="w-full mt-4 sm:mt-6 rounded-xl"
//               />
//             </div>

//             {/* Right Section */}
//             <div className="w-full md:w-1/2 rounded-xl flex flex-col items-center px-4 sm:px-6 py-6 sm:py-8">
//               <div className="space-y-4 sm:space-y-6 w-full">
//                 <div>
//                   <IconInput
//                     placeholder={t("Full Name")}
//                     icon={User}
//                     name="full_name"
//                     value={values.full_name}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   <div className="text-red-500 text-sm mt-1">
//                     {touched.full_name && t(errors.full_name)}
//                   </div>
//                 </div>

//                 <div>
//                   <IconInput
//                     placeholder={t("Email Address")}
//                     icon={Mail}
//                     name="email"
//                     value={values.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   <div className="text-red-500 text-sm mt-1">
//                     {touched.email && t(errors.email)}
//                   </div>
//                 </div>

//                 <div>
//                   <IconInput
//                     placeholder={t("Phone")}
//                     icon={Phone}
//                     name="phone"
//                     value={values.phone}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   <div className="text-red-500 text-sm mt-1">
//                     {touched.phone && t(errors.phone)}
//                   </div>
//                 </div>

//                 <div className="px-3">
//                   {/* <Select
//                     name="subject"
//                     value={values.subject}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     displayEmpty
//                     variant="standard"
//                     fullWidth
//                     sx={{ color: "gray.200", fontSize: "1rem", py: 0.5 }}
//                   >
//                     <MenuItem value="" disabled>
//                       {t("Select subject")}
//                     </MenuItem>
//                     <MenuItem value="AccountLogin">
//                       {t("Account/Login")}
//                     </MenuItem>
//                     <MenuItem value="JobsApplications">
//                       {t("Jobs/Applications")}
//                     </MenuItem>
//                     <MenuItem value="PaymentsPayouts">
//                       {t("Payments/Payouts")}
//                     </MenuItem>
//                     <MenuItem value="TechnicalIssue">
//                       {t("Technical Issue")}
//                     </MenuItem>
//                     <MenuItem value="Feedback">{t("Feedback")}</MenuItem>
//                     <MenuItem value="Other">{t("Other")}</MenuItem>
//                   </Select> */}
//                   <Select
//                     name="subject"
//                     value={values.subject}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     displayEmpty
//                     variant="standard"
//                     fullWidth
//                     sx={(theme) => ({
//                       color: values.subject
//                         ? theme.palette.text.primary
//                         : theme.palette.text.secondary, // main text color
//                       fontSize: "1rem",
//                       py: 0.5,
//                       "& .MuiSelect-nativeInput": {
//                         color: theme.palette.text.secondary, // fallback for native input
//                       },
//                       "& .MuiSelect-display": {
//                         color: values.subject
//                           ? theme.palette.text.primary
//                           : theme.palette.text.secondary,
//                       },
//                       "& .MuiInputBase-input": {
//                         color: values.subject
//                           ? theme.palette.text.primary
//                           : "rgba(0, 0, 0, 0.5)", // lighter gray for placeholder
//                       },
//                     })}
//                   >
//                     <MenuItem
//                       value=""
//                       disabled
//                       sx={{ color: "rgba(0, 0, 0, 0.4)" }}
//                     >
//                       {t("Select subject")}
//                     </MenuItem>
//                     <MenuItem value="AccountLogin">
//                       {t("Account/Login")}
//                     </MenuItem>
//                     <MenuItem value="JobsApplications">
//                       {t("Jobs/Applications")}
//                     </MenuItem>
//                     <MenuItem value="PaymentsPayouts">
//                       {t("Payments/Payouts")}
//                     </MenuItem>
//                     <MenuItem value="TechnicalIssue">
//                       {t("Technical Issue")}
//                     </MenuItem>
//                     <MenuItem value="Feedback">{t("Feedback")}</MenuItem>
//                     <MenuItem value="Other">{t("Other")}</MenuItem>
//                   </Select>

//                   {touched.subject && errors.subject && (
//                     <FormHelperText error>{t(errors.subject)}</FormHelperText>
//                   )}
//                 </div>

//                 <div>
//                   <IconTextarea
//                     placeholder={t("Write Message here...")}
//                     icon={Pen}
//                     name="message"
//                     value={values.message}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   <div className="text-red-500 text-sm mt-1">
//                     {touched.message && t(errors.message)}
//                   </div>
//                 </div>

//                 <div className="flex justify-start mt-2 sm:mt-3">
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-full flex gap-2 items-center disabled:opacity-60"
//                   >
//                     {isLoading ? t("Sending...") : t("Submit Message")}
//                     {!isLoading && (
//                       <ArrowRightIcon className="h-4 sm:h-5 w-4 sm:w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>

//       {/* Google Map */}
//       <div className="w-full mt-8">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=..."
//           width="100%"
//           height="400"
//           style={{ borderRadius: "20px" }}
//           allowFullScreen=""
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         ></iframe>
//       </div>
//     </section>
//   );
// }
// // import React, { useState } from "react";
// // import Badge from "../../components/ui/Badge";
// // import MailLogo from "/assets/landingpage/mail.png";
// // import SocialLogo from "/assets/landingpage/socialmedia.png";
// // import PhoneLogo from "/assets/landingpage/phone.png";
// // import ContactImage from "/assets/landingpage/contactUs.png";
// // import {
// //   Facebook,
// //   Instagram,
// //   Mail,
// //   Pen,
// //   Phone,
// //   User,
// //   Hash,
// // } from "lucide-react";
// // import IconInput from "../../components/ui/IconInput";
// // import IconSelect from "../../components/ui/IconSelect";
// // import IconTextarea from "../../components/ui/IconTextarea";
// // import { ArrowRightIcon } from "@heroicons/react/24/solid";
// // import {
// //   useContactUsMutation,
// //   useGetWebsiteGeneralDataQuery,
// // } from "../../services/faqApiSlice";
// // import { handleSubmit } from "../../utils/useHandleSubmit";
// // import Spinner from "../../components/ui/Spinner";
// // import { Select, MenuItem } from "@mui/material";

// // export default function Contact() {
// //   const { data, isLoading: detailLoading } = useGetWebsiteGeneralDataQuery();
// //   const contactItems = [
// //     { icon: MailLogo, text: data?.data?.contact_email },
// //     { icon: PhoneLogo, text: data?.data?.contact_phone },
// //     {
// //       icon: SocialLogo,
// //       icons: [Instagram, Facebook],
// //       instaOnClick: () => window.open(data?.data?.insta_link, "_blank"),
// //       fbOnClick: () => window.open(data?.data?.fb_link, "_blank"),
// //     },
// //   ];

// //   const [form, setForm] = useState({
// //     full_name: "",
// //     email: "",
// //     phone: "",
// //     subject: "",
// //     message: "",
// //   });

// //   const [contactUs, { isLoading, isSuccess, isError }] = useContactUsMutation();

// //   const handleChange = (field, value) => {
// //     setForm((prev) => ({ ...prev, [field]: value }));
// //   };

// //   const onSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // await contactUs(handleSubmit).unwrap();
// //       handleSubmit({
// //         values: form,
// //         apiCall: contactUs,
// //       });
// //       setForm({
// //         full_name: "",
// //         email: "",
// //         phone: "",
// //         subject: "",
// //         message: "",
// //       });
// //     } catch (err) {
// //       console.error(err);
// //       alert("Something went wrong ❌");
// //     }
// //   };
// //   if (detailLoading) {
// //     return <Spinner />;
// //   }
// //   return (
// //     <section className="py-8 px-4 sm:px-6 md:px-12 lg:px-24">
// //       {/* Header Section */}
// //       <div className="text-center max-w-2xl mx-auto">
// //         <Badge text="Contact Us" />
// //         <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
// //           Reach Out – We’re Here to Help
// //         </h2>
// //         <p className="mt-4 text-gray-600 text-base sm:text-lg">
// //           Have a question, suggestion, or feedback? Send us a message and we’ll
// //           get back shortly.
// //         </p>
// //       </div>

// //       {/* Contact Items */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-12 max-w-7xl mx-auto">
// //         {contactItems.map((item, idx) => (
// //           <div
// //             key={idx}
// //             className="bg-appcolor rounded-2xl py-8 sm:py-10 px-4 sm:px-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex flex-col items-center"
// //           >
// //             <div className="flex justify-center">
// //               <img
// //                 src={item.icon}
// //                 alt="contact icon"
// //                 className="h-12 sm:h-16 w-12 sm:w-16"
// //               />
// //             </div>

// //             {item.text ? (
// //               <p className="text-center text-lg sm:text-xl font-semibold mt-4 sm:mt-6">
// //                 {item.text}
// //               </p>
// //             ) : item.icons ? (
// //               <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
// //                 {item.icons.map((Icon, i) => (
// //                   <div className="bg-white p-2 rounded-full" key={i}>
// //                     <Icon
// //                       className="h-6 sm:h-8 w-6 sm:w-8 text-gray-800 cursor-pointer"
// //                       onClick={i === 0 ? item.instaOnClick : item.fbOnClick}
// //                     />
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : null}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Contact Form */}
// //       <form
// //         onSubmit={onSubmit}
// //         className="flex flex-col md:flex-row items-center mt-12 max-w-7xl mx-auto gap-6 md:gap-12"
// //       >
// //         {/* Left Section */}
// //         <div className="w-full md:w-1/2 px-4 sm:px-6 py-6 sm:py-8">
// //           <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold">
// //             Have Questions?
// //           </h1>
// //           <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#CCB247] mt-2">
// //             Get in Touch!
// //           </h1>
// //           <p className="text-gray-600 mt-4 leading-relaxed text-sm sm:text-base">
// //             Got Something to Say? We’re Listening. Contact us today and let’s
// //             stay connected.
// //           </p>
// //           <img
// //             src={ContactImage}
// //             alt="Contact Us"
// //             className="w-full mt-4 sm:mt-6 rounded-xl"
// //           />
// //         </div>

// //         {/* Right Section */}
// //         <div className="w-full md:w-1/2 rounded-xl flex flex-col items-center px-4 sm:px-6 py-6 sm:py-8">
// //           <div className="space-y-4 sm:space-y-6 w-full">
// //             <IconInput
// //               placeholder="Full Name"
// //               icon={User}
// //               value={form.full_name}
// //               onChange={(e) => handleChange("full_name", e.target.value)}
// //             />
// //             <IconInput
// //               placeholder="Email Address"
// //               icon={Mail}
// //               value={form.email}
// //               onChange={(e) => handleChange("email", e.target.value)}
// //             />
// //             <IconInput
// //               placeholder="Phone"
// //               icon={Phone}
// //               value={form.phone}
// //               onChange={(e) => handleChange("phone", e.target.value)}
// //             />
// //             <Select
// //               value={form.subject}
// //               onChange={(e) => handleChange("subject", e.target.value)}
// //               displayEmpty
// //               variant="standard"
// //               fullWidth
// //               sx={{
// //                 color: "gray.700",
// //                 fontSize: "1rem",
// //                 py: 0.5,
// //               }}
// //             >
// //               <MenuItem value="" disabled>
// //                 Select subject
// //               </MenuItem>

// //               <MenuItem value="AccountLogin">Account/Login</MenuItem>
// //               <MenuItem value="JobsApplications">Jobs/Applications</MenuItem>
// //               <MenuItem value="PaymentsPayouts">Payments/Payouts</MenuItem>
// //               <MenuItem value="TechnicalIssue">Technical Issue</MenuItem>
// //               <MenuItem value="Feedback">Feedback</MenuItem>
// //               <MenuItem value="Other">Other</MenuItem>
// //             </Select>
// //             <IconTextarea
// //               placeholder="Write Message here..."
// //               icon={Pen}
// //               value={form.message}
// //               onChange={(e) => handleChange("message", e.target.value)}
// //             />
// //             <div className="flex justify-start mt-2 sm:mt-3">
// //               <button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-full flex gap-2 items-center disabled:opacity-60"
// //               >
// //                 {isLoading ? "Sending..." : "Submit Message"}
// //                 {!isLoading && (
// //                   <ArrowRightIcon className="h-4 sm:h-5 w-4 sm:w-5" />
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </form>

// //       {/* Google Map */}
// //       <div className="w-full mt-8">
// //         <iframe
// //           src="https://www.google.com/maps/embed?pb=..."
// //           width="100%"
// //           height="400"
// //           style={{ borderRadius: "20px" }}
// //           allowFullScreen=""
// //           loading="lazy"
// //           referrerPolicy="no-referrer-when-downgrade"
// //         ></iframe>
// //       </div>
// //     </section>
// //   );
// // }
// // import React from "react";
// // import Badge from "../../components/ui/Badge";
// // import MailLogo from "/assets/landingpage/mail.png";
// // import SocialLogo from "/assets/landingpage/socialmedia.png";
// // import PhoneLogo from "/assets/landingpage/phone.png";
// // import ContactImage from "/assets/landingpage/contactUs.png";
// // import {
// //   Facebook,
// //   Instagram,
// //   Mail,
// //   Pen,
// //   Phone,
// //   User,
// //   Hash,
// // } from "lucide-react";
// // import IconInput from "../../components/ui/IconInput";
// // import IconSelect from "../../components/ui/IconSelect";
// // import IconTextarea from "../../components/ui/IconTextarea";
// // import { ArrowRightIcon } from "@heroicons/react/24/solid";

// // export default function Contact() {
// //   const contactItems = [
// //     { icon: MailLogo, text: "contact@fastaff.ch" },
// //     { icon: PhoneLogo, text: "0789656694" },
// //     { icon: SocialLogo, icons: [Instagram, Facebook] },
// //   ];

// //   return (
// //     <section className="py-8 px-4 sm:px-6 md:px-12 lg:px-24">
// //       {/* Header Section */}
// //       <div className="text-center max-w-2xl mx-auto">
// //         <Badge text="Contact Us" />
// //         <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4">
// //           Reach Out – We’re Here to Help
// //         </h2>
// //         <p className="mt-4 text-gray-600 text-base sm:text-lg">
// //           Have a question, suggestion, or feedback? Send us a message and we’ll
// //           get back shortly.
// //         </p>
// //       </div>

// //       {/* Contact Items */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-12 max-w-7xl mx-auto">
// //         {contactItems.map((item, idx) => (
// //           <div
// //             key={idx}
// //             className="bg-appcolor rounded-2xl py-8 sm:py-10 px-4 sm:px-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex flex-col items-center"
// //           >
// //             {/* Main Icon */}
// //             <div className="flex justify-center">
// //               <img
// //                 src={item.icon}
// //                 alt="contact icon"
// //                 className="h-12 sm:h-16 w-12 sm:w-16"
// //               />
// //             </div>

// //             {/* Text or Social Icons */}
// //             {item.text ? (
// //               <p className="text-center text-lg sm:text-xl font-semibold mt-4 sm:mt-6">
// //                 {item.text}
// //               </p>
// //             ) : item.icons ? (
// //               <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
// //                 {item.icons.map((Icon, i) => (
// //                   <div className="bg-white p-2 rounded-full" key={i}>
// //                     <Icon className="h-6 sm:h-8 w-6 sm:w-8 text-gray-800 cursor-pointer" />
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : null}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Contact Form Section */}
// //       <div className="flex flex-col md:flex-row items-center mt-12 max-w-7xl mx-auto gap-6 md:gap-12">
// //         {/* Left Section */}
// //         <div className="w-full md:w-1/2 px-4 sm:px-6 py-6 sm:py-8">
// //           <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold">
// //             Have Questions?
// //           </h1>
// //           <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#CCB247] mt-2">
// //             Get in Touch!
// //           </h1>
// //           <p className="text-gray-600 mt-4 leading-relaxed text-sm sm:text-base">
// //             Got Something to Say? We’re Listening. Contact us today and let’s
// //             stay connected.
// //           </p>
// //           <img
// //             src={ContactImage}
// //             alt="Contact Us"
// //             className="w-full mt-4 sm:mt-6 rounded-xl"
// //           />
// //         </div>

// //         {/* Right Section */}
// //         <div className="w-full md:w-1/2 rounded-xl flex flex-col items-center px-4 sm:px-6 py-6 sm:py-8">
// //           <div className="space-y-4 sm:space-y-6 w-full">
// //             <IconInput placeholder="Full Name" icon={User} />
// //             <IconInput placeholder="Email Address" icon={Mail} />
// //             <IconInput placeholder="Phone" icon={Phone} />
// //             <IconSelect
// //               label="Subject"
// //               icon={Hash}
// //               options={[
// //                 { value: "AccountLogin", label: "Account/Login" },
// //                 { value: "JobsApplications", label: "Jobs/Applications" },
// //                 { value: "PaymentsPayouts", label: "Payments/Payouts" },
// //                 { value: "TechnicalIssue", label: "Technical Issue" },
// //                 { value: "Feedback", label: "Feedback" },
// //                 { value: "Other", label: "Other" },
// //               ]}
// //             />
// //             <IconTextarea placeholder="Write Message here..." icon={Pen} />
// //             <div className="flex justify-start mt-2 sm:mt-3">
// //               <button
// //                 type="submit"
// //                 className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-full flex gap-2 items-center"
// //               >
// //                 Submit Message{" "}
// //                 <ArrowRightIcon className="h-4 sm:h-5 w-4 sm:w-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Google Map */}
// //       <div className="w-full mt-8">
// //         <iframe
// //           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.519183232078!2d73.78079327758287!3d18.460127626233092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2959ea35a3195%3A0xebde5bfe65f63f20!2sCompumatrix%20Technologies.Pvt.Ltd!5e0!3m2!1sen!2sin!4v1757048991362!5m2!1sen!2sin"
// //           width="100%"
// //           height="400"
// //           style={{ borderRadius: "20px" }}
// //           allowFullScreen=""
// //           loading="lazy"
// //           referrerPolicy="no-referrer-when-downgrade"
// //         ></iframe>
// //       </div>
// //     </section>
// //   );
// // }
// // import React from "react";
// // import Badge from "../../components/ui/Badge";
// // import MailLogo from "/assets/landingpage/mail.png";
// // import SocialLogo from "/assets/landingpage/socialmedia.png";
// // import PhoneLogo from "/assets/landingpage/phone.png"; // corrected
// // import ContactImage from "/assets/landingpage/contactUs.png";
// // import {
// //   Facebook,
// //   Instagram,
// //   Mail,
// //   Pen,
// //   Phone,
// //   User,
// //   Hash,
// // } from "lucide-react";
// // import IconInput from "../../components/ui/IconInput";
// // import IconSelect from "../../components/ui/IconSelect";
// // import IconTextarea from "../../components/ui/IconTextarea";
// // import { ArrowRightIcon } from "@heroicons/react/24/solid";

// // export default function Contact() {
// //   const contactItems = [
// //     { icon: MailLogo, text: "contact@fastaff.ch" },
// //     { icon: PhoneLogo, text: "0789656694" },
// //     { icon: SocialLogo, icons: [Instagram, Facebook] },
// //   ];

// //   return (
// //     <section className="py-8 px-24">
// //       {/* Header Section */}
// //       <div className="text-center max-w-2xl mx-auto">
// //         <Badge text="Contact Us" />
// //         <h2 className="text-4xl md:text-5xl font-semibold mt-4">
// //           Reach Out – We’re Here to Help
// //         </h2>
// //         <p className="mt-4 text-gray-600 text-lg">
// //           Have a question, suggestion, or feedback? Send us a message and we’ll
// //           get back shortly.
// //         </p>
// //       </div>

// //       {/* Contact Items */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-8xl mx-auto px-2">
// //         {contactItems.map((item, idx) => (
// //           <div
// //             key={idx}
// //             className="bg-appcolor rounded-2xl py-10 px-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full flex flex-col items-center"
// //           >
// //             {/* Main Icon */}
// //             <div className="flex justify-center">
// //               <img src={item.icon} alt="contact icon" className="h-16 w-16" />
// //             </div>

// //             {/* Text or Social Icons */}
// //             {item.text ? (
// //               <p className="text-center text-xl font-semibold mt-6">
// //                 {item.text}
// //               </p>
// //             ) : item.icons ? (
// //               <div className="flex justify-center gap-4 mt-4">
// //                 {item.icons.map((Icon, i) => (
// //                   <div className="bg-white p-2 rounded-full -mt-2" key={i}>
// //                     <Icon className="h-8 w-8 text-gray-800 cursor-pointer" />
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : null}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Contact Form Section */}
// //       <div className="flex flex-col md:flex-row items-center mt-12 max-w-7xl mx-auto">
// //         {/* Left Section */}
// //         <div className="w-full md:w-1/2 px-6 md:px-12 py-8">
// //           <h1 className="text-4xl font-bold">Have Questions?</h1>
// //           <h1 className="text-4xl font-bold text-[#CCB247] mt-2">
// //             Get in Touch!
// //           </h1>
// //           <p className="text-gray-600 mt-4 leading-relaxed">
// //             Got Something to Say? We’re Listening. Contact us today and let’s
// //             stay connected.
// //           </p>
// //           <img
// //             src={ContactImage}
// //             alt="Contact Us"
// //             className="w-full mt-6 rounded-xl"
// //           />
// //         </div>

// //         {/* Right Section */}
// //         <div className="w-full md:w-1/2 rounded-xl flex items-center justify-center px-6 md:px-12 py-8">
// //           <div className="space-y-7 w-full">
// //             <IconInput placeholder="Full Name" icon={User} />
// //             <IconInput placeholder="Email Address" icon={Mail} />
// //             <IconInput placeholder="Phone" icon={Phone} />
// //             <IconSelect
// //               label="Subject"
// //               icon={Hash}
// //               options={[
// //                 { value: "AccountLogin", label: "Account/Login" },
// //                 { value: "JobsApplications", label: "Jobs/Applications" },
// //                 { value: "PaymentsPayouts", label: "Payments/Payouts" },
// //                 { value: "TechnicalIssue", label: "Technical Issue" },
// //                 { value: "Feedback", label: "Feedback" },
// //                 { value: "Other", label: "Other" },
// //               ]}
// //             />
// //             <IconTextarea placeholder="Write Message here..." icon={Pen} />
// //             <div className="my-3 flex justify-start">
// //               <button
// //                 type="submit"
// //                 className="px-6 py-2 bg-black text-white rounded-full flex gap-2 items-center"
// //               >
// //                 Submit Message <ArrowRightIcon className="h-5 w-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="w-full mt-8">
// //         <iframe
// //           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.519183232078!2d73.78079327758287!3d18.460127626233092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2959ea35a3195%3A0xebde5bfe65f63f20!2sCompumatrix%20Technologies.Pvt.Ltd!5e0!3m2!1sen!2sin!4v1757048991362!5m2!1sen!2sin"
// //           width="100%"
// //           height="400"
// //           style={{borderRadius:"20px"}}
// //           allowfullscreen=""
// //           loading="lazy"
// //           referrerpolicy="no-referrer-when-downgrade"
// //         ></iframe>
// //       </div>
// //     </section>
// //   );
// // }
