import { baseQueryApi } from "./baseQueryApiSlice";

export const jobApi = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({
        salary_min,
        salary_max,
        experience_level,
        vacancy,
        job_date_filter,
        sort_by,
        rating,
        latitude,
        longitude,
        skill,
        radius,
        startTime,
        endTime,
      } = {}) => {
        const params = new URLSearchParams();

        if (salary_min) params.append("salary_min", salary_min);
        if (salary_max) params.append("salary_max", salary_max);
        if (experience_level)
          params.append("experience_level", experience_level);
        if (vacancy) params.append("vacancy", vacancy);
        if (job_date_filter) params.append("job_date_filter", job_date_filter);
        if (sort_by) params.append("sort_by", sort_by);
        if (rating) params.append("rating", rating);
        if (latitude) params.append("latitude", latitude);
        if (longitude) params.append("longitude", longitude);
        if (skill) params.append("skill", skill); // will come as "1,5,8"
        if (radius) params.append("radius", radius);
        if (startTime) params.append("startTime", startTime);
        if (endTime) params.append("endTime", endTime);

        return {
          // url: `/get-job-listing?${params.toString()}`,
          url: `/api/v1/jobs`,
          method: "GET",
        };
      },
      invalidatesTags: ["FAQ"],
    }),
    getJobswithoutlogin: builder.query({
      query: ({
        salary_min,
        salary_max,
        experience_level,
        vacancy,
        job_date_filter,
        sort_by,
        rating,
        latitude,
        longitude,
        skill,
        radius,
        startTime,
        endTime,
      } = {}) => {
        const params = new URLSearchParams();
        console.log("vacancy", vacancy);
        // console.log("endTime", endTime);
        if (salary_min) params.append("salary_min", salary_min);
        if (salary_max) params.append("salary_max", salary_max);
        if (experience_level)
          params.append("experience_level", experience_level);
        if (vacancy) params.append("vacancy", vacancy);
        if (job_date_filter) params.append("job_date_filter", job_date_filter);
        if (sort_by) params.append("sort_by", sort_by);
        if (rating) params.append("rating", rating);
        if (latitude) params.append("latitude", latitude);
        if (longitude) params.append("longitude", longitude);
        if (skill) params.append("skill", skill); // will come as "1,5,8"
        if (radius) params.append("radius", radius);
        if (startTime) params.append("startTime", startTime);
        if (endTime) params.append("endTime", endTime);

        return {
          url: `/api/v1/jobs`,
          method: "GET",
        };
      },
      invalidatesTags: ["FAQ"],
    }),
    getJobsdashboardEmployee: builder.query({
      query: ({
        salary_min,
        salary_max,
        experience_level,
        vacancy,
        job_date_filter,
        sort_by,
        rating,
        latitude,
        longitude,
        skill,
        radius,
        startTime,
        endTime,
      } = {}) => {
        const params = new URLSearchParams();
        console.log("vacancy", vacancy);
        // console.log("endTime", endTime);
        if (salary_min) params.append("salary_min", salary_min);
        if (salary_max) params.append("salary_max", salary_max);
        if (experience_level)
          params.append("experience_level", experience_level);
        if (vacancy) params.append("vacancy", vacancy);
        if (job_date_filter) params.append("job_date_filter", job_date_filter);
        if (sort_by) params.append("sort_by", sort_by);
        if (rating) params.append("rating", rating);
        if (latitude) params.append("latitude", latitude);
        if (longitude) params.append("longitude", longitude);
        if (skill) params.append("skill", skill); // will come as "1,5,8"
        if (radius) params.append("radius", radius);
        if (startTime) params.append("startTime", startTime);
        if (endTime) params.append("endTime", endTime);

        return {
          url: `/api/v1/jobs/dashboard/employee`,
          method: "GET",
        };
      },
      invalidatesTags: ["FAQ"],
    }),

    getJobsbyLocation: builder.query({
      query: ({ employee_id, status = "all", latitude, longitude }) => ({
        url: `/get-employee-jobs-listing?employee_id=${employee_id}&status=${status}&latitude=${latitude}&longitude=${longitude}`,
        method: "GET",
      }),
      invalidatesTags: ["FAQ"],
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: `/api/v1/jobs`,
        method: "POST",
        body: data,
      }),
    }),
    editJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    saveDraftJob: builder.mutation({
      query: (data) => ({
        url: `/create-draft-job`,
        method: "POST",
        body: data,
      }),
    }),
    applyAndSaveJob: builder.mutation({
      query: (data) => ({
        url: `/api/v1/applicants`,
        method: "POST",
        body: data,
      }),
    }),
    reviewEmployeeJob: builder.mutation({
      query: (data) => ({
        url: `/post-review-for-employer`,
        method: "POST",
        body: data,
      }),
    }),
    reviewEmployerJob: builder.mutation({
      query: (data) => ({
        url: `/post-review-for-employee`,
        method: "POST",
        body: data,
      }),
    }),
    employeeJobWorkTrack: builder.mutation({
      query: (data) => ({
        url: `/employee-job-work-track`,
        method: "POST",
        body: data,
      }),
    }),
    hireAndRejectApplication: builder.mutation({
      query: (data) => ({
        url: `/update-job-application-status`,
        method: "POST",
        body: data,
      }),
    }),
    activeAndCloseJob: builder.mutation({
      query: (data) => ({
        url: `/close-job`,
        method: "POST",
        body: data,
      }),
    }),
    markAsUnusedJob: builder.mutation({
      query: (data) => ({
        url: `/mark-as-unused-job`,
        method: "POST",
        body: data,
      }),
    }),
    getMyApplications: builder.query({
      query: ({ status }) => ({
        url: `/api/v1/applicants/my-applications`,
        method: "GET",
        params: { status }, // 👈 pass status as query param
      }),
    }),
    getJobDetails: builder.query({
      query: (job_id) => ({
        url: `/get-job-details?job_id=${job_id}`,
        method: "GET",
      }),
    }),
    getOngoingJobs: builder.query({
      query: () => ({
        url: `/get-employee-ongoing-job-list`,
        method: "GET",
      }),
    }),
    getWorkHistoryJobs: builder.query({
      query: () => ({
        url: `/get-work-history-at-employee-side`,
        method: "GET",
      }),
    }),
    getOngoingforEmployerJobs: builder.query({
      query: () => ({
        url: `/get-ongoing-job-list-web`,
        method: "GET",
      }),
    }),
    getEmployerJobListing: builder.query({
      query: (status) => ({
        url: `/api/v1/jobs/employer?status=${status}`,
        method: "GET",
      }),
    }),
    getEmployerJobData: builder.query({
      query: ({ job_id, tab_name }) => ({
        url: `/api/v1/jobs/get-employer-job-data-web?job_id=${job_id}&tab_name=${tab_name}`,
        method: "GET",
      }),
    }),
    getJobByID: builder.query({
      query: (job_id) => ({
        url: `/api/v1/jobs/${job_id}`,
        method: "GET",
      }),
    }),
    getApplicantsForEmployer: builder.query({
      query: (job_id) => ({
        url: `/api/v1/applicants/employer`,
        method: "GET",
      }),
    }),
    getApplicantsForOngoingEmployer: builder.query({
      query: (job_id) => ({
        url: `/get-job-ongoing-employees?job_id=${job_id}`, // ✅ fixed `?` instead of `/`
        method: "GET",
      }),
    }),
    getJobHistoryEmployer: builder.query({
      query: () => ({
        url: `/get-work-history-at-employer-side`, // ✅ fixed `?` instead of `/`
        method: "GET",
      }),
    }),
    getDashboardForEmployer: builder.query({
      query: ({ allFlag }) => ({
        url: `/api/v1/employer/dashboard-overview?allFlag=${allFlag}`,
        method: "GET",
      }),
    }),
    getDashboardForEmployeee: builder.query({
      query: ({ latitude = "", longitude = "" }) => ({
        url: `/api/v1/employee/dashboard-overview?latitude=${latitude}&longitude=${longitude}`,
        method: "GET",
      }),
    }),
    completeJob: builder.mutation({
      query: ({ id, enddate }) => ({
        url: `/api/v1/jobs/${id}/complete`,
        method: "PUT",
        body: { enddate },
      }),
    }),
    completeJobApplications: builder.mutation({
      query: (jobId) => ({
        url: `/api/v1/applicants/job/${jobId}/complete`,
        method: "PUT",
      }),
    }),
    calculateAndAddExperience: builder.mutation({
      query: ({ jobId, userId }) => ({
        url: `/api/v1/applicants/experience/${jobId}/${userId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetJobswithoutloginQuery,
  useSaveDraftJobMutation,
  useGetJobsbyLocationQuery,
  useGetMyApplicationsQuery,
  useGetJobDetailsQuery,
  useApplyAndSaveJobMutation,
  useGetOngoingJobsQuery,
  useGetWorkHistoryJobsQuery,
  useReviewEmployeeJobMutation,
  useReviewEmployerJobMutation,
  useGetOngoingforEmployerJobsQuery,
  useGetEmployerJobListingQuery,
  useGetEmployerJobDataQuery,
  useHireAndRejectApplicationMutation,
  useEditJobMutation,
  useGetJobByIDQuery,
  useActiveAndCloseJobMutation,
  useGetApplicantsForEmployerQuery,
  useGetApplicantsForOngoingEmployerQuery,
  useEmployeeJobWorkTrackMutation,
  useGetJobHistoryEmployerQuery,
  useGetDashboardForEmployerQuery,
  useGetDashboardForEmployeeeQuery,
  useMarkAsUnusedJobMutation,
  useGetJobsdashboardEmployeeQuery,
  useCompleteJobMutation,
  useCompleteJobApplicationsMutation,
  useCalculateAndAddExperienceMutation,
} = jobApi;
