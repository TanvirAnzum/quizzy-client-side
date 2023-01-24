import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  // endpoints
  endpoints: (builder) => ({
    fetchQuizzes: builder.query({
      query: ({ email, page, limit, status }) =>
        `quizzes?email=${email}&page=${page}&limit=${limit}&status=${status}`,
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
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("fetchQuiz", data.id, (draft) => {
            if (data?.contents) {
              draft.contents.push(data.contents);
            }
            if (data?.participants) {
              draft.participants.push(data.participants);
            }
            if (!data?.participants && !data?.contents) {
              return {
                ...draft,
                ...data,
              };
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
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("fetchQuiz", id, (draft) => {
            return draft.filter((item) => item._id !== id);
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
