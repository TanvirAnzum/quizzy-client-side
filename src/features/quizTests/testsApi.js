import { apiSlice } from "../api/apiSlice";

export const testsApi = apiSlice.injectEndpoints({
  // endpoints
  endpoints: (builder) => ({
    fetchTest: builder.query({
      query: ({ id, email }) => {
        if (id) {
          return `/test?id=${id}`;
        }
        if (email) {
          return `/test?email=${email}`;
        }
      },
    }),
    createTest: builder.mutation({
      query: ({ data, email, quizId }) => ({
        url: `/test?email=${email}&quizId=${quizId}`,
        method: "POST",
        body: data,
      }),
    }),
    updateTest: builder.mutation({
      query: ({ id, data, question, email }) => ({
        url: `/test/${id}?question=${question}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(params, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "fetchTest",
            { id: params.id },
            (draft) => {
              const updatedContents = draft.contents.map((content, index) => {
                if (index === params.question) {
                  return {
                    ...content,
                    answered: true,
                  };
                }
                return content;
              });
              const updatedDraft = {
                ...draft,
                ...params.data,
                contents: updatedContents,
              };

              return updatedDraft;
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchTestQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
} = testsApi;
