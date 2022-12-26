import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  // endpoints
  endpoints: (builder) => ({
    fetchQuizzes: builder.query({
      query: ({ email, page, limit }) =>
        `quizzes?email=${email}&page=${page}&limit=${limit}`,
    }),
    fetchParticipatedQuizzes: builder.query({
      query: ({ email, page, limit }) =>
        `quizzes/${email}?page=${page}&limit=${limit}`,
    }),
    fetchQuiz: builder.query({
      query: (id) => `quiz/${id}`,
    }),
    getToken: builder.mutation({
      query: (data) => ({
        url: "jwt",
        method: "POST",
        body: data,
      }),
    }),
    createQuiz: builder.mutation({
      query: (data) => ({
        url: "quiz",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ data }, { queryFulfilled, dispatch }) {
        // pessimistic update
        try {
          const response = await queryFulfilled;
          const { data: quiz } = response;
          if (quiz._id) {
            dispatch(
              apiSlice.util.updateQueryData("fetchQuizzes", data, (draft) => {
                draft.push(quiz);
              })
            );
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),
    updateQuiz: builder.mutation({
      query: (data) => ({
        url: `quiz/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        // optimistic update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("fetchQuiz", data.id, (draft) => {
            if (data?.contents) {
              draft.contents.push(data.contents);
            }
            if (data?.participants) {
              draft.participants.push(data.participants);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `quiz/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useFetchQuizQuery,
  useFetchQuizzesQuery,
  useUpdateQuizMutation,
  useGetTokenMutation,
  useFetchParticipatedQuizzesQuery,
} = quizzesApi;
