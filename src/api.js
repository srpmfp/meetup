
import mockData from "./mock-data";

export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location)
    const locations = [...new Set(extractedLocations)]
    return locations;

}




export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));


    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
            const response = await fetch(
                "https://a1owe4bufi.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
            );
            const result = await response.json();
            const { authUrl } = result;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
}
const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};
export const getEvents = async () => {
    if (window.location.href.startsWith('http://localhost')) {
        return mockData;
    }


    const token = await getAccessToken();


    if (token) {
        removeQuery();
        const url = "https://a1owe4bufi.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url" + "/" + token;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
            return result.events;
        } else return null;

    }
}
const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
        'https://a1owe4bufi.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url' + '/' + encodeCode
    );
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);


    return access_token;
};

export default { extractLocations, getEvents };