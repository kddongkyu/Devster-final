import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const userSignIn = async (userSignInInfo, signInUrl) => {
    try {
        const res = await axios({
            method: 'post',
            url: signInUrl,
            data: JSON.stringify(userSignInInfo),
            headers: {'Content-Type': 'application/json'},
        });

        if (res?.status === 200) {
            // let decodedToken = jwt_decode(res.headers.authorization);
            localStorage.setItem('accessToken', res.headers.authorization);
            localStorage.setItem(
                'refreshToken',
                res.headers['authorization-refresh']
            );
            // localStorage.setItem('expiredTime', decodedToken.exp);
            return res;
        }
    } catch (error) {
        throw error;
    }
};
