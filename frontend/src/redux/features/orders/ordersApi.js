import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";


const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: 'include',
            }),
            invalidatesTags: ['Orders']
        }),
        getOrderByEmail: builder.query({
            query: (email) => `/${email}`,
            providesTags: ['Orders']
        }),
        getAllOrders: builder.query({
            query: () => "/",
            providesTags: ['Orders']
        }),
        updateDeliveryStatus: builder.mutation({
            query: ({ orderId, status, note }) => ({
                url: `/${orderId}/delivery-status`,
                method: 'PUT',
                body: { status, note },
            }),
            invalidatesTags: ['Orders']
        }),
        getDeliveryUpdates: builder.query({
            query: (orderId) => `/${orderId}/delivery-updates`,
            providesTags: ['Orders']
        })
    })
})

export const {
    useCreateOrderMutation,
    useGetOrderByEmailQuery,
    useGetAllOrdersQuery,
    useUpdateDeliveryStatusMutation,
    useGetDeliveryUpdatesQuery
} = ordersApi;

export default ordersApi;