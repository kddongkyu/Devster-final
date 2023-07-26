import axiosIns from "./JwtConfig";
import {jwtHandleError} from "./JwtHandleError";
import jwt_decode from "jwt-decode";

export const JwtPageChk = async (navi, url) => {
    const accessToken = localStorage.getItem('accessToken');
    const memberType = jwt_decode(accessToken).type;
    let tokenUrl = '';

    if (memberType === 'normal') {
        tokenUrl = 'member';
    } else if (memberType === 'company') {
        tokenUrl = 'compmember';
    } else {
        return;
    }

    try {
        const res = await axiosIns({
            method: 'post',
            url: `/api/${tokenUrl}/D1/check`,
        });
        if (res.status === 200) {
            navi(url);
        }
    } catch(error) {
        jwtHandleError(error);
    }
}