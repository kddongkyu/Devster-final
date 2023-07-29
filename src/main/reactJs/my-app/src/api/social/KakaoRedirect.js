import {useEffect} from "react";
import axios from "axios";
import {jwtHandleError} from "../JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../ToastAlert";
import {useNavigate} from "react-router-dom";

function KakaoRedirect() {
    const code = new URL(window.location.href).searchParams.get('code');
    const navi=useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'post',
                    url: '/api/member/login/kakao',
                    data:JSON.stringify({code}),
                    headers: {'Content-Type':'application/json'}
                });

                if(res?.status === 200) {
                    localStorage.setItem('accessToken', res.headers.authorization);
                    localStorage.setItem(
                        'refreshToken',
                        res.headers['authorization-refresh']
                    );
                    navi('/home',{replace:true});
                } else if(res?.status === 202) {
                    navi('/social',{replace:true, state:{
                        resData:res.data,
                        type:'KAKAO',
                        }
                    });
                } else if(res?.status === 226) {
                    alert('일반회원으로 가입된 이메일입니다.\n확인 후 다시 시도해주세요.');
                    navi('/home',{replace:true});
                } else {
                    console.log(res);
                }
            } catch (error) {
                jwtHandleError(error,toastAlert);
            }
        }
        fetchData();
    },[]);

    return null;
}

export default KakaoRedirect