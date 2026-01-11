import React, { useState } from "react";
import Badge from "../../components/ui/Badge";
import MailLogo from "/assets/landingpage/mail.png";
import SocialLogo from "/assets/landingpage/socialmedia.png";
import PhoneLogo from "/assets/landingpage/phone.png";
import ContactImage from "/assets/landingpage/contactUs.png";
import {
  Facebook,
  Instagram,
  Mail,
  Pen,
  Phone,
  User,
  Hash,
} from "lucide-react";
import IconInput from "../../components/ui/IconInput";
import IconSelect from "../../components/ui/IconSelect";
import IconTextarea from "../../components/ui/IconTextarea";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import {
  useContactUsMutation,
  useGetWebsiteGeneralDataQuery,
} from "../../services/faqApiSlice";
import { handleSubmit } from "../../utils/useHandleSubmit";
import Spinner from "../../components/ui/Spinner";

const ContactDashboard = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [contactUs, { isLoading, isSuccess, isError }] = useContactUsMutation();
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // await contactUs(handleSubmit).unwrap();
      handleSubmit({
        values: form,
        apiCall: contactUs,
      });
      setForm({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row items-center mt-12 max-w-7xl mx-auto gap-6 md:gap-12"
      >
        {/* Left Section */}
        <div className="w-full md:w-1/2 px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold">
            Have Questions?
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#CCB247] mt-2">
            Get in Touch!
          </h1>
          <p className="text-gray-600 mt-4 leading-relaxed text-sm sm:text-base">
            Got Something to Say? We’re Listening. Contact us today and let’s
            stay connected.
          </p>
          <img
            src={ContactImage}
            alt="Contact Us"
            className="w-full mt-4 sm:mt-6 rounded-xl"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 rounded-xl flex flex-col items-center px-4 sm:px-6 py-6 sm:py-8">
          <div className="space-y-4 sm:space-y-6 w-full">
            <IconInput
              placeholder="Full Name"
              icon={User}
              value={form.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
            />
            <IconInput
              placeholder="Email Address"
              icon={Mail}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <IconInput
              placeholder="Phone"
              icon={Phone}
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <IconSelect
              label="Subject"
              icon={Hash}
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              options={[
                { value: "AccountLogin", label: "Account/Login" },
                { value: "JobsApplications", label: "Jobs/Applications" },
                { value: "PaymentsPayouts", label: "Payments/Payouts" },
                { value: "TechnicalIssue", label: "Technical Issue" },
                { value: "Feedback", label: "Feedback" },
                { value: "Other", label: "Other" },
              ]}
            />
            <IconTextarea
              placeholder="Write Message here..."
              icon={Pen}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
            <div className="flex justify-start mt-2 sm:mt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-full flex gap-2 items-center disabled:opacity-60"
              >
                {isLoading ? "Sending..." : "Submit Message"}
                {!isLoading && (
                  <ArrowRightIcon className="h-4 sm:h-5 w-4 sm:w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactDashboard;
