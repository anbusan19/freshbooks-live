const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return "https://appsail-50024742513.development.catalystappsail.in/api";
    }
    return "http://localhost:5000/api";
}

export default getBaseUrl;