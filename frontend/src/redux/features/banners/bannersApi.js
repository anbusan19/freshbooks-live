import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const bannersApi = createApi({
    reducerPath: 'bannersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: getBaseUrl(),
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Banners'],
    endpoints: (builder) => ({
        getAllBanners: builder.query({
            query: () => '/api/banners/admin',
            providesTags: ['Banners'],
        }),
        getActiveBanners: builder.query({
            query: () => '/api/banners/active',
            providesTags: ['Banners'],
        }),
        createBanner: builder.mutation({
            query: (data) => ({
                url: '/api/banners',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Banners'],
        }),
        updateBanner: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/api/banners/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Banners'],
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/api/banners/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Banners'],
        }),
        toggleBannerStatus: builder.mutation({
            query: (id) => ({
                url: `/api/banners/${id}/toggle`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Banners'],
        }),
    }),
});

export const {
    useGetAllBannersQuery,
    useGetActiveBannersQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
    useToggleBannerStatusMutation,
} = bannersApi;

export default bannersApi; 