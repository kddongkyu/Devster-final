import { useSnackbar } from "notistack";
import axiosIns from "./JwtConfig";
import { jwtHandleError } from "./JwtHandleError";
import ToastAlert from "./ToastAlert";
import jwt_decode from "jwt-decode";

export const useJwtPageChk = () => {
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const JwtPageChk = async (navi, url) => {
        let role = '';
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
            const decodedToken = jwt_decode(accessToken);
            role = decodedToken.role;
            
            try {
                const res = await axiosIns({
                    method: 'post',
                    url: '/api/member/D1/check',
                });
                if (res.status === 200) {
                    if (!role || role === 'GUEST') {
                        toastAlert(<>인증된 회원만 사용가능합니다.<br />회원인증을 먼저 진행해주세요.</>, 'warning');
                        return;
                    }
                    else {
                        navi(url);
                    }
                }
            } catch (error) {
                toastAlert(<>로그인이 필요한 서비스입니다.<br />로그인을 먼저 해주세요.</>, 'warning');
                return;
            }
        }

        if (!accessToken || !refreshToken) {
            toastAlert(<>로그인이 필요한 서비스입니다.<br />로그인을 먼저 해주세요.</>, 'warning');
            return;
        }
    }

    return JwtPageChk;
}
