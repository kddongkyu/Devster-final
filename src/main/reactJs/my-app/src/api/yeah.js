import jwt_decode from "jwt-decode";
import axios from "axios";

function isTokenExpired(token) {
    if(!token) return true;
    const currentTime=Math.floor(Date.now()/1000);
    const expTime = jwt_decode(token).exp;

    return currentTime >= expTime;
}

async function refreshAccessToken(refreshToken) {
    try {
        await axios({
            method:'post',
            url:`/member/check`,
            headers:{'Authorization-refresh': `Bearer ${refreshToken}`},
        })
            .then(res=>{
                if(res.status === 200) {
                    const newToken = res.headers.authorization;
                    localStorage.setItem('accessToken',newToken);
                    localStorage.setItem('refreshToken',res.headers['Authorization-refresh']);
                    return newToken;
                }
            });
    } catch(error) {
        throw error;
    }
}

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        console.log(accessToken);
        console.log(refreshToken);

        if(isTokenExpired(accessToken) && refreshToken) {
            try {
                accessToken = await refreshAccessToken(refreshToken);
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                alert('new Token => accessToken')
            } catch (error) {
                console.error(error+"무슨에러야");
            }
        } else if(accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            alert('Token available');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;