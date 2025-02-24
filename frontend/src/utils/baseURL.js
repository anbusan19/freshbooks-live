const getBaseUrl = () => {
    if (import.meta.env.VITE_NODE_ENV === 'production') {
        return `${import.meta.env.VITE_PROD_BACKEND_BASEURL}`;
    }
    return "http://localhost:5000";
}

export default getBaseUrl;