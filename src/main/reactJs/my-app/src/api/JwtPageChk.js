import { useSnackbar } from "notistack";
import axiosIns from "./JwtConfig";
import { jwtHandleError } from "./JwtHandleError";
<<<<<<< HEAD
import jwt_decode from "jwt-decode";

export const JwtPageChk = async (navi, url) => {
  const accessToken = localStorage.getItem("accessToken");
  const memberType = jwt_decode(accessToken).type;
  let tokenUrl = "";

  if (memberType === "normal") {
    tokenUrl = "member";
  } else if (memberType === "company") {
    tokenUrl = "compmember";
  } else {
    return;
  }

  try {
    const res = await axiosIns({
      method: "post",
      url: `/api/${tokenUrl}/D1/check`,
    });
    if (res.status === 200) {
      navi(url);
    }
  } catch (error) {
    jwtHandleError(error);
  }
};
=======
import ToastAlert from "./ToastAlert";
import jwt_decode from "jwt-decode";

export const useJwtPageChk = () => {
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const JwtPageChk = async (navi, url) => {
        let role = '';
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if(accessToken && refreshToken) {
            const decodedToken = jwt_decode(accessToken);
            role=decodedToken.role;
        }

        try {
            const res = await axiosIns({
                method: 'post',
                url: '/api/member/D1/check',
            });
            if (res.status === 200) {
                if(!role || role.toLocaleLowerCase === 'guest') {
                    toastAlert(<>인증된 회원만 사용가능합니다.<br/>회원인증을 먼저 진행해주세요.</>,'warning')
                    return;
                }
                else {
                    console.log(role);
                    navi(url);
                }
            }
        } catch (error) {
            jwtHandleError(error, toastAlert);
        }
    }

    return JwtPageChk;
}
>>>>>>> JK
