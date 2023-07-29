import jwt_decode from 'jwt-decode';
import axios from 'axios';

function isTokenExpired(token) {
    if (!token) {
        return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const expTime = jwt_decode(token).exp;
    return currentTime >= expTime - 300;
}

async function refreshAccessToken(refreshToken) {
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
        const res = await axios({
            method: 'post',
            url: `/api/${tokenUrl}/D1/check`,
            headers: {'Authorization-refresh': `Bearer ${refreshToken}`},
        });

        if (res.status === 200) {
            const newAccessToken = res.headers.authorization;
            const newRefreshToken = res.headers['authorization-refresh'];
            const newDecodedToken = jwt_decode(newAccessToken);

            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            // localStorage.setItem('expiredTime', newDecodedToken.exp);

            return newAccessToken;
        }
    } catch (error) {
        throw error;
    }
}

const axiosIns = axios.create();

axiosIns.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (isTokenExpired(refreshToken) && refreshToken) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // localStorage.removeItem('expiredTime');
            alert('세션이 만료되었습니다.\n로그아웃 되었습니다.');
            window.location.reload();
        } else if (isTokenExpired(accessToken) && refreshToken) {
            try {
                accessToken = await refreshAccessToken(refreshToken);
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            } catch (error) {
                throw error;
            }
        } else if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        throw error;
    }
);

axiosIns.interceptors.response.use(
    (response) => response,
    (error) => {
        throw error;
    }
);

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        throw error;
    }
);

export default axiosIns;