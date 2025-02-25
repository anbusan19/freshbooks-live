import axios from 'axios';

const API_URL = import.meta.env.VITE_PROD_BACKEND_BASEURL;

export const couponService = {
    // Create new coupon
    createCoupon: async (couponData) => {
        const response = await axios.post(`${API_URL}/api/coupons`, couponData);
        return response.data;
    },

    // Get all coupons
    getAllCoupons: async () => {
        const response = await axios.get(`${API_URL}/api/coupons`);
        return response.data;
    },

    // Get single coupon
    getCoupon: async (id) => {
        const response = await axios.get(`${API_URL}/api/coupons/${id}`);
        return response.data;
    },

    // Update coupon
    updateCoupon: async (id, couponData) => {
        const response = await axios.put(`${API_URL}/api/coupons/${id}`, couponData);
        return response.data;
    },

    // Delete coupon
    deleteCoupon: async (id) => {
        const response = await axios.delete(`${API_URL}/api/coupons/${id}`);
        return response.data;
    },

    // Validate coupon code
    validateCoupon: async (code) => {
        const response = await axios.post(`${API_URL}/api/coupons/validate`, { code });
        return response.data;
    },

    // Use coupon code (increment usage count)
    useCoupon: async (code) => {
        const response = await axios.post(`${API_URL}/api/coupons/use`, { code });
        return response.data;
    }
}; 