import jwt_decode from "jwt-decode";

export const checkToken =()=> {
    let accessToken =localStorage.getItem('accessToken');
    if(accessToken) {
        let decodedToken = jwt_decode(accessToken);
        return decodedToken;
    } else {
        return;
    }
}