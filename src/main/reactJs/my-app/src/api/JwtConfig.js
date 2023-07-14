import jwt_decode from "jwt-decode";
import axios from "axios";

function isTokenExpired(token) {
    if (!token) {
        return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const expTime = jwt_decode(token).exp;

    return currentTime >= expTime;
    // return currentTime >= expTime-300;  //5분 여유시간
}

async function refreshAccessToken(refreshToken) {
    try {
        await axios({
            method: 'post',
            url: '/member/check',
            headers: {'Authorization-refresh': `Bearer ${refreshToken}`},
        })
            .then(res => {
                if (res.status === 200) {
                    const newAccessToken = res.headers.authorization;
                    const newRefreshToken = res.headers['authorization-refresh'];
                    const newExpiredTime = jwt_decode(newAccessToken);

                    localStorage.setItem('accessToken', newAccessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                    localStorage.setItem('expiredTime', newExpiredTime.exp);

                    return newAccessToken;
                } else {
                    switch (res.status) {
                        case 401:
                            throw new Error('로그인이 필요한 서비스 입니다.');
                        case 403:
                            throw new Error('세션이 만료되었습니다.');
                        default:
                            throw new Error('An unexpected error has occurred');
                    }
                }
            });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const axiosIns = axios.create();

axiosIns.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (isTokenExpired(accessToken) && refreshToken) {
            try {
                accessToken = await refreshAccessToken(refreshToken);
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                alert('New Token => accessToken + refreshToken');
            } catch (error) {
                console.error(error);
            }
        } else if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            alert('Token available');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosIns.interceptors.response.use(
    response => response,
    error => {
        // if(error.response.status === 401) {
        //     alert('로그인이 필요한 서비스입니다.')
        // }
        alert('로그인이 필요한 서비스입니다');
        return Promise.reject(error);
    }
);

export default axiosIns;