import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superheroApi = createApi({
  reducerPath: "superheroApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/superheros",
  }),

  tagTypes: ["Superheros"],

  endpoints: (builder) => ({
    fetchSuperheros: builder.query({
      query: (page = "") => `/?${page && `page=${page}`}`,
      providesTags: ["Superheros"],
    }),

    fetchSuperheroById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Superheros"],
    }),

    updateSuperhero: builder.mutation({
      query: ({ id, ...rest }) => {
        return {
          url: `${id}/update`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: ["Superheros"],
    }),

    createSuperhero: builder.mutation({
      query({
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        avatarURL,
      }) {
        return {
          url: "/create",
          method: "POST",
          body: {
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
            avatarURL,
          },
        };
      },
      invalidatesTags: ["Superheros"],
    }),

    deleteSuperhero: builder.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["Superheros"],
    }),
  }),
});

export const {
  useFetchSuperherosQuery,
  useFetchSuperheroByIdQuery,
  useCreateSuperheroMutation,
  useUpdateSuperheroMutation,
  useDeleteSuperheroMutation,
} = superheroApi;
