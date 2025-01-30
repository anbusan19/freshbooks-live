const getBaseUrl = () => {
    if (import.meta.env.VITE_NODE_ENV === 'production') {
        return "https://appsail-50024742513.development.catalystappsail.in";
    }
    return "http://localhost:5000";
}

export default getBaseUrl;