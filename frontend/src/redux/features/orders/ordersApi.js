import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";


const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: getBaseUrl(),
        credentials: 'include'
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/orders",
                method: "POST",
                body: newOrder,
                credentials: 'include',
            })
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/orders/email/${email}`
            }),
            providesTags: ['Orders']
        })
    })
})

export const {useCreateOrderMutation, useGetOrderByEmailQuery} = ordersApi;

export default ordersApi;