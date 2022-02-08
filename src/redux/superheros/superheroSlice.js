import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superheroApi = createApi({
  reducerPath: "superheroApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/superheros",
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
          },
        };
      },
      invalidatesTags: ["Superheros"],
    }),

    uploadAvatar: builder.mutation({
      query: ({ id }) => {
        return {
          url: `${id}/upload`,
          method: "POST",
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
  useUploadAvatarMutation,
  useDeleteSuperheroMutation,
} = superheroApi;
