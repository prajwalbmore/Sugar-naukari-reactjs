import { baseQueryApi } from "./baseQueryApiSlice";

export const faqApi = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getFAQ: builder.query({
      query: (role) => ({
        url: `/get-faq?role=${role}`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getSubscriptions: builder.query({
      query: (employer_id) => ({
        url: `/get-subscriptions-plans-list?employer_id=${employer_id}`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getSubscriptionsForWebsite: builder.query({
      query: () => ({
        url: `/get-subscriptions-pricing`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    successPayment: builder.mutation({
      query: (session_id) => ({
        url: `/payment-success`,
        method: "POST",
        body: { session_id },
      }),
      invalidatesTags: ["FAQ"],
    }),
    cancelPayment: builder.mutation({
      query: (session_id) => ({
        url: `/payment-cancel?session_id=${session_id}`,
        method: "POST",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getCouponsList: builder.query({
      query: () => ({
        url: `/get-coupons-list`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getSchoolList: builder.query({
      query: () => ({
        url: `/get-school-list`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getTestimonials: builder.query({
      query: () => ({
        url: `/get-testimonials`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/get-terms-and-condition?role=employee`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getQuestionsForEmployeeRegistration: builder.query({
      query: () => ({
        url: `/get-que-for-employee-registration`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getWebsiteGeneralData: builder.query({
      query: () => ({
        url: `/get-website-general-data`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getSponsorsBannerList: builder.query({
      query: () => ({
        url: `/get-sponsors-banner-list?role=employer`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    getChatHistory: builder.query({
      query: ({ user_id, login_as }) => ({
        url: `/get-chat-history?user_id=${user_id}&login_as=${login_as}`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    viewSubscription: builder.query({
      query: (employer_id) => ({
        url: `/view-subscription?employer_id=${employer_id}`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    termsAndConditionPrivacy: builder.query({
      query: (page) => ({
        url: `/get-static-page-content?page=${page}`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    subscriptionHistory: builder.query({
      query: () => ({
        url: `/get-subscription-history`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    createPaymentLink: builder.mutation({
      query: (data) => ({
        url: `/create-checkout-session`,
        method: "POST",
        body: data,
      }),
    }),
    createPaymentSuccess: builder.mutation({
      query: (data) => ({
        url: `/employers-subscriptions-purchase`,
        method: "POST",
        body: data,
      }),
    }),
    contactUs: builder.mutation({
      query: (data) => ({
        url: `/contact-us`,
        method: "POST",
        body: data,
      }),
    }),
    newsletter: builder.mutation({
      query: (data) => ({
        url: `/newsletter/subscribe`,
        method: "POST",
        body: data,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (data) => ({
        url: `/update-notification-status`,
        method: "POST",
        body: data,
      }),
    }),
    saveChatHistory: builder.mutation({
      query: (data) => ({
        url: `/save-chat-history`,
        method: "POST",
        body: data,
      }),
    }),
    deleteApplicant: builder.mutation({
      query: ({ job_application_id }) => ({
        url: `/reject-hired-candidate?job_application_id=${job_application_id}`,
        method: "POST",
      }),
    }),
    deleteApplicantEmployee: builder.mutation({
      query: ({ job_application_id }) => ({
        url: `/employee/delete-job-application?job_application_id=${job_application_id}`,
        method: "POST",
      }),
    }),
    getCompanyDetails: builder.mutation({
      query: (data) => ({
        url: `/get-company-verification-info`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetFAQQuery,
  useGetSubscriptionsQuery,
  useGetCouponsListQuery,
  useCreatePaymentLinkMutation,
  useCancelPaymentMutation,
  useSuccessPaymentMutation,
  useCreatePaymentSuccessMutation,
  useViewSubscriptionQuery,
  useGetTestimonialsQuery,
  useContactUsMutation,
  useGetWebsiteGeneralDataQuery,
  useGetSponsorsBannerListQuery,
  useGetSubscriptionsForWebsiteQuery,
  useUpdateNotificationStatusMutation,
  useGetSchoolListQuery,
  useGetTermsAndConditionsQuery,
  useGetQuestionsForEmployeeRegistrationQuery,
  useNewsletterMutation,
  useGetChatHistoryQuery,
  useSaveChatHistoryMutation,
  useTermsAndConditionPrivacyQuery,
  useSubscriptionHistoryQuery,
  useDeleteApplicantMutation,
  useDeleteApplicantEmployeeMutation,
  useGetCompanyDetailsMutation,
} = faqApi;
