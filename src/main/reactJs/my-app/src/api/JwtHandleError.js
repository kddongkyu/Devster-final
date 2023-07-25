export const jwtHandleError = (error,toastAlert) => {
    if (error?.response) {
        switch (error.response.status) {
            case 400:
                toastAlert('아이디와 비밀번호를 확인해주세요.','warning');
                break;

            case 401:
                // toastAlert('로그인 후 이용 가능한 서비스입니다.','warning');
                alert('로그인 후 이용 가능한 서비스입니다.');
                window.location.href='/signin';
                break;

            case 403:
                toastAlert(<>해당 서비스에 대한 접근 권한이 없습니다.<br/>확인 후 다시 시도해주세요.</>,'warning');
                break;

            case 404:
                window.location.href = "/notfound";
                break;

            case 500:
                toastAlert(<>서버에 문제가 발생했습니다.<br/>잠시 후 다시 이용해주세요.</>,'warning');
                break;

            case 503:
                toastAlert(<>현재 서버가 바쁩니다.<br/>잠시 후 다시 이용해주세요.</>,'warning');
                break;
            default:
                toastAlert(<>알 수 없는 문제가 발생했습니다.<br/>문제가 계속될 경우 고객센터에 문의해주세요.<br/>(에러 코드: {error.response.status})</>,'warning');
        }
    } else if (error.request) {
        toastAlert(<>서버로부터 응답이 없습니다.<br/>인터넷 연결을 확인해주세요.</>,'warning');
    }
};
