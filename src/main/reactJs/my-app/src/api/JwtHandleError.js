export const jwtHandleError = (error) => {
    if(error.response) {
        switch(error.response.status) {
            case 400:
                alert('아이디와 비밀번호를 확인해주세요.');
                break;

            case 401:
                alert('로그인이 필요한 서비스 입니다.');
                break;

            case 403:
                alert('세션이 만료되었습니다.');
                break;

            default:
                alert('An unexpected error has occurred');
        }
    }
    else if(error.request) {
        alert('No response from server');
    } else {
        alert('Error in setting up the request');
    }
}