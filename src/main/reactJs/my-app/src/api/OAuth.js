import { useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const OAuth = () => {
    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'post',
                    url: '/api/member/login/kakao',
                    data: JSON.stringify({ 'code': code }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (res.status === 200) {
                    // 성공적으로 로그인 된 경우의 처리
                    let decodedToken = jwt_decode(res.headers.authorization);
                    console.log(decodedToken);
                    localStorage.setItem('accessToken', res.headers.authorization);
                    localStorage.setItem(
                        'refreshToken',
                        res.headers['authorization-refresh']
                    );
                    localStorage.setItem('expiredTime', decodedToken.exp);
                    return res;
                } else if (res.status === 202) {
                    console.log(res); // 존재하지 않는 사용자인 경우의 처리
                } else {
                    // 그 외의 경우의 처리
                }
            } catch (error) {
                // 에러 처리
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return null; // 또는 컴포넌트가 렌더링해야 하는 내용
};

export default OAuth;
