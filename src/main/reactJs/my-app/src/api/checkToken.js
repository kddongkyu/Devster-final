import jwt_decode from "jwt-decode";

export const checkToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
        const decodedToken = jwt_decode(accessToken);
        return decodedToken;
    } else {
        return;
    }
}