import React, { forwardRef } from "react";
import Badge from "../../components/ui/Badge";
import IconInput from "../../components/ui/IconInput";
import IconTextarea from "../../components/ui/IconTextarea";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Mail, Pen, Phone, User } from "lucide-react";
import { useContactUsMutation } from "../../services/faqApiSlice";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactUsHome = forwardRef(({ data }, ref) => {
  const contactdetails = [
    {
      icon: "/assets/landingpage/Icons/home/FilledMapPin.png",
      alt: "Location Icon",
      content: data?.contact_location || "Switzerland",
    },
    {
      icon: "/assets/landingpage/Icons/home/FilledMail.png",
      alt: "Email Icon",
      content: data?.contact_email || "userexample@gmail.com",
    },
    {
      icon: "/assets/landingpage/Icons/home/FilledCallicon.png",
      alt: "Phone Icon",
      content: data?.contact_phone || "+91 567 456 7012",
    },
  ];

  const { t } = useTranslation();
  const [contactUs, { isLoading }] = useContactUsMutation();

  // Yup validation schema
  const validationSchema = Yup.object({
    full_name: Yup.string().required(t("Full Name is required")),
    email: Yup.string()
      .email(t("Invalid email address"))
      .required(t("Email is required")),
    phone: Yup.string()
      .matches(/^\+?\d{10,15}$/, t("Invalid phone number"))
      .required(t("Phone is required")),
    message: Yup.string().required(t("Message is required")),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await handleSubmit({ values, apiCall: contactUs });
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <section className="px-6 md:px-12 lg:px-24" ref={ref}>
      <div className="flex flex-col md:flex-row items-center mt-12 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="w-full md:w-1/2 px-6 md:px-12 py-8">
        <div className="text-center lg:text-left">

          <Badge text="Contact Us" />
        </div>
          <h1 className="text-4xl font-bold mt-4">{t("Have Questions?")}</h1>
          <h1 className="text-4xl font-bold text-[#CCB247] mt-2">
            {t("Get in Touch!")}
          </h1>
          <p className="text-gray-600 mt-4 leading-relaxed">
            {t(
              "Got Something to Say? We’re Listening. Contact us today and let’s stay connected."
            )}
          </p>

          <div className="mt-8 space-y-4">
            {contactdetails.map((detail, index) => {
              // Determine href for email, phone, or location
              let href = detail.content;
              if (detail.alt.toLowerCase().includes("email")) {
                href = `mailto:${detail.content}`;
              } else if (detail.alt.toLowerCase().includes("phone")) {
                href = `tel:${detail.content}`;
              } else if (detail.alt.toLowerCase().includes("location")) {
                href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  detail.content
                )}`;
              }

              return (
                <div key={index} className="flex items-center gap-3">
                  <img src={detail.icon} alt={detail.alt} className="h-10 w-10" />
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    {detail.content}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 rounded-xl flex items-center justify-center px-6 md:px-12 py-8">
          <Formik
            initialValues={{
              full_name: "",
              email: "",
              phone: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form className="space-y-7 w-full">
                <div>
                  <IconInput
                    placeholder={t("Full Name")}
                    icon={User}
                    name="full_name"
                    value={values.full_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="full_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <IconInput
                    placeholder={t("Email Address")}
                    icon={Mail}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <IconInput
                    placeholder={t("Phone")}
                    icon={Phone}
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <IconTextarea
                    placeholder={t("Write Message here...")}
                    icon={Pen}
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="my-3 flex justify-start">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-black text-white rounded-full flex gap-2 items-center disabled:opacity-60"
                  >
                    {isLoading ? t("Sending...") : t("Submit Message")}
                    {!isLoading && <ArrowRightIcon className="h-5 w-5" />}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
});

export default ContactUsHome;
