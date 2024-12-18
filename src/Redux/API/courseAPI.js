import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const courseAPISlice = createApi({
  reducerPath: "courseAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Ratings", "Students"],
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (formData) => ({
        url: "/admin/courses",
        method: "POST",
        body: formData,
      }),
    }),
    getCourse: builder.mutation({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/enrollment",
        method: "POST",
        body: data,
      }),
    }),
    getTotalStudents: builder.mutation({
      query: () => ({
        url: "/enrollment/total-students",
        method: "GET",
      }),
    }),
    addRating: builder.mutation({
      query: (data) => ({
        url: "/rating",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ratings", "Students"],
    }),
    getAllRatings: builder.query({
      query: (courseID) => `/rating/${courseID}`,
      providesTags: ["Ratings"],
    }),
    getSingleStudent: builder.query({
      query: ({ id }) => ({
        url: `/enrollment/total/${id}`,
        method: "GET",
      }),
      providesTags: ["Students"],
    }),
  }),
});

export const {
  useGetSingleStudentQuery,
  useAddCourseMutation,
  useGetCourseMutation,
  useAddStudentMutation,
  useGetTotalStudentsMutation,
  useAddRatingMutation,
  useGetAllRatingsQuery,
} = courseAPISlice;
