import { baseQueryApi } from "./baseQueryApiSlice";

export const authApi = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    socialLogin: builder.mutation({
      query: (credentials) => ({
        url: "/social-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    socialRegistration: builder.mutation({
      query: (credentials) => ({
        url: "/social-registration",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    sendOtp: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/send-otp",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password-otp",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetForgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/reset-password",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    resendOtp: builder.mutation({
      query: (payload) => ({
        url: "/resend-otp",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOtp: builder.mutation({
      query: (verificationDetails) => ({
        url: "/verify-otp",
        method: "POST",
        body: verificationDetails,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/change-password",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    createProfile: builder.mutation({
      query: (userData) => ({
        url: "/create-employee-profile",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    createProfileEmployer: builder.mutation({
      query: (userData) => ({
        url: "/create-employer-profile",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateuser: builder.mutation({
      query: ({ userData, id }) => ({
        url: `/api/v1/users/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    editEmployeePersonalInfo: builder.mutation({
      query: (userData) => ({
        url: `/edit-employee-personal-info`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    deleteCertificate: builder.mutation({
      query: (userData) => ({
        url: `/delete-certifications-file`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    saveEmployeeEducation: builder.mutation({
      query: (userData) => ({
        url: `/save-employee-education`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    getSkills: builder.query({
      query: () => ({
        url: `/get-job-skills`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getLanguage: builder.query({
      query: () => ({
        url: `/get-language-list`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getApplicantsDetails: builder.query({
      query: ({ emp_id, job_id }) => ({
        url: `/api/v1/users/applicant/${emp_id}?job_id=${job_id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    refreshToken: builder.query({
      query: () => ({
        url: `/api/v1/auth/refersh`,
        method: "GET",
      }),
      invalidatesTags: ["Auth"],
    }),

    //Employer
    getEmployerByID: builder.query({
      query: (employer_id) => ({
        url: `/get-employer-profile?employer_id=${employer_id}`,
        method: "GET",
      }),
      invalidatesTags: ["Auth"],
    }),
    editCompanyPersonalInfo: builder.mutation({
      query: (userData) => ({
        url: `/edit-employer-profile`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    getEmployeeNotifications: builder.query({
      query: ({ employee_id, status = "all" }) => ({
        url: `/get-employee-notification-list`,
        method: "GET",
        params: { employee_id, status },
      }),
      // you can provide transformResponse, or tags for caching etc
    }),
    getEmployerNotifications: builder.query({
      query: ({ employer_id, status = "all" }) => ({
        url: `/get-employer-notification-list`,
        method: "GET",
        params: { employer_id, status },
      }),
      // you can provide transformResponse, or tags for caching etc
    }),
    updateCompany: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/v1/users/employer/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateEmployee: builder.mutation({
      query: ({ userData, id }) => ({
        url: `/api/v1/users/employee/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSocialLoginMutation,
  useRegisterMutation,
  useSocialRegistrationMutation,
  useVerifyOtpMutation,
  useCreateProfileMutation,
  useGetSkillsQuery,
  useGetLanguageQuery,
  useCreateProfileEmployerMutation,
  useGetUserDetailsQuery,
  useEditEmployeePersonalInfoMutation,
  useLazyRefreshTokenQuery,
  useDeleteCertificateMutation,
  useSaveEmployeeEducationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResetForgotPasswordMutation,
  useResendOtpMutation,
  //
  useGetEmployerByIDQuery,
  useEditCompanyPersonalInfoMutation,

  //notification
  useGetEmployeeNotificationsQuery,
  useGetEmployerNotificationsQuery,
  useGetApplicantsDetailsQuery,

  //update
  useUpdateCompanyMutation,
  useUpdateEmployeeMutation,
} = authApi;
