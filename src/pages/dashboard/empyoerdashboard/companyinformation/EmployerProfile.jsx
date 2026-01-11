import React from "react";
import { Formik, Form } from "formik";
import Input from "../../../../components/ui/Input";
import FileInput from "../../../../components/ui/FileInput";
import Textarea from "../../../../components/ui/Textarea";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";
import { IMAGEBASEURL } from "../../../../constants/app.constant";
import { handleSubmit } from "../../../../utils/useHandleSubmit";
import { useUpdateCompanyMutation } from "../../../../services/authApiSlice";
import { useTranslation } from "react-i18next";
import { useRefreshToken } from "../../../../utils/refreshToken";

export default function EmployerProfile({ userData, refetch }) {
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();
  const data = userData?.data;
  const { t } = useTranslation();
  const refreshUser = useRefreshToken();

  const initialValues = {
    // Personal Info
    fullName: data?.fullName || "",
    email: data?.email || "",
    mobile: data?.mobile || "",

    // Company Info
    companyName: data?.companyName || "",
    companyEmail: data?.companyEmail || "",
    companyLogo: data?.companyLogo
      ? { name: data?.companyLogo, islocal: true }
      : null,
    profile_photo: data?.profile_photo
      ? { name: data?.profile_photo, islocal: true }
      : null,
    companyAddress: data?.companyAddress || "",
    companyDescription: data?.companyDescription || "",
    companyWebsite: data?.companyWebsite || "",
    industryType: data?.industryType || "",
    noOfEmployees: data?.noOfEmployees || "",
    registrationNumber: data?.registrationNumber || "",
    gstNumber: data?.gstNumber || "",
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-10 space-y-10">
      {/* ---------- DISPLAY SECTION LIKE LINKEDIN ---------- */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden border">
        {/* Cover Banner */}
        <div className="h-36 bg-gradient-to-r from-blue-600 to-purple-600" />

        {/* Profile Head */}
        <div className="p-6 flex items-start gap-6 -mt-16">
          {/* Company Logo */}
          <div className="w-32 h-32 rounded-xl border-4 border-white shadow-lg overflow-hidden bg-white">
            {data?.companyLogo ? (
              <img
                src={`${IMAGEBASEURL}/${data.companyLogo}`}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Logo
              </div>
            )}
          </div>

          {/* Company Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900">
              {data?.companyName}
            </h1>

            <p className="text-gray-600">{data?.industryType}</p>

            <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
              <span>Email: {data?.companyEmail}</span>
              <span>•</span>
              <span>Website: {data?.companyWebsite || "N/A"}</span>
              <span>•</span>
              <span>Employees: {data?.noOfEmployees}</span>
            </div>
          </div>
        </div>

        {/* About Company */}
        <div className="px-6 pb-6">
          <h2 className="text-lg font-semibold mb-2">About Company</h2>
          <p className="text-gray-600 leading-relaxed">
            {data?.companyDescription || "No description added"}
          </p>
        </div>

        {/* Stats Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t">
          <div className="p-4 text-center border-r">
            <p className="text-xl font-semibold">{data?.noOfEmployees}</p>
            <p className="text-gray-600 text-sm">Employees</p>
          </div>
          <div className="p-4 text-center border-r">
            <p className="text-xl font-semibold">{data?.industryType}</p>
            <p className="text-gray-600 text-sm">Industry</p>
          </div>
          <div className="p-4 text-center border-r">
            <p className="text-xl font-semibold">{data?.registrationNumber}</p>
            <p className="text-gray-600 text-sm">Registration No</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xl font-semibold">{data?.gstNumber}</p>
            <p className="text-gray-600 text-sm">GST Number</p>
          </div>
        </div>
      </div>

      {/* ---------- PERSONAL INFO SECTION ---------- */}
      <div className="px-6 pb-6 mt-6 border-t pt-6">
        <h2 className="text-lg font-semibold mb-3">Personal Details</h2>

        <div className="flex items-start gap-6">
          {/* Profile Photo */}
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border shadow">
            {data?.profile_photo ? (
              <img
                src={`${IMAGEBASEURL}/${data?.profile_photo}`}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Photo
              </div>
            )}
          </div>

          {/* Personal Info */}
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Full Name:</span> {data?.fullName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {data?.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>
              {data?.mobile || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- FORM SECTION (EDIT MODE) ---------- */}
      <div className="bg-white p-8 shadow rounded-xl border">
        <h2 className="text-2xl font-semibold mb-6">Edit Information</h2>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
              // If field is a file (FileInput structure)
              if (key === "companyLogo") {
                if (value && value instanceof File) {
                  // new uploaded file
                  formData.append(key, value);
                } else if (value && value.islocal) {
                  // existing server stored file
                  formData.append(key, value.name);
                } else {
                  formData.append(key, "");
                }
              } else {
                // normal text fields
                formData.append(key, value ?? "");
              }
            });

            handleSubmit({
              apiCall: updateCompany,
              values: { data: formData, id: data?._id },
              refetch: () => {
                refetch();
                refreshUser();
              },
            });
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form className="space-y-10">
              {/* PERSONAL INFO */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Input
                    label="Mobile Number"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <FileInput
                    label="Profile Photo"
                    name="profile_photo"
                    value={values.profile_photo}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>

              {/* COMPANY INFO */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Company Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Company Name"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Input
                    label="Company Email"
                    name="companyEmail"
                    value={values.companyEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Textarea
                    label="Company Description"
                    name="companyDescription"
                    value={values.companyDescription}
                    rows={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <FileInput
                    label="Company Logo"
                    name="companyLogo"
                    value={values.companyLogo}
                    setFieldValue={setFieldValue}
                  />

                  <Input
                    label="Company Website"
                    name="companyWebsite"
                    value={values.companyWebsite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Input
                    label="Company Address"
                    name="companyAddress"
                    value={values.companyAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Select
                    label="Industry Type"
                    name="industryType"
                    value={values.industryType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[
                      { label: "IT Consultancy", value: "IT Consultancy" },
                      { label: "Software", value: "Software" },
                      { label: "Manufacturing", value: "Manufacturing" },
                      { label: "BPO", value: "BPO" },
                    ]}
                  />

                  <Select
                    label="Company Size"
                    name="noOfEmployees"
                    value={values.noOfEmployees}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[
                      { label: "1-10", value: "1-10" },
                      { label: "10-50", value: "10-50" },
                      { label: "50-200", value: "50-200" },
                      { label: "200-1000", value: "200-1000" },
                      { label: "5000+", value: "5000+" },
                    ]}
                  />

                  <Input
                    label="Registration Number"
                    name="registrationNumber"
                    value={values.registrationNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Input
                    label="GST Number"
                    name="gstNumber"
                    value={values.gstNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="flex justify-end">
                <Button
                  className="px-6 py-3 bg-black text-white rounded-lg"
                  type="submit"
                  loading={isLoading}
                >
                  {!isLoading && t("Save")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
