export const jwtHandleError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        alert("아이디와 비밀번호를 확인해주세요.");
        break;

      case 401:
        alert("로그인 후 이용 가능한 서비스입니다.");
        window.location.href = "/signin";
        break;

      case 403:
        alert(
          "해당 서비스에 대한 접근 권한이 없습니다.\n확인 후 다시 시도해주세요."
        );
        break;

      case 404:
        window.location.href = "/notfound";
        break;

      case 500:
        alert("서버에 문제가 발생했습니다.\n잠시 후 다시 이용해주세요.");
        break;

      case 503:
        alert("현재 서버가 바쁩니다.\n잠시 후 다시 이용해주세요.");
        break;
      default:
        alert(
          `알 수 없는 문제가 발생했습니다.\n문제가 계속될 경우 고객센터에 문의해주세요.\n(에러 코드: ${error.response.status})`
        );
    }
  } else if (error.request) {
    alert("서버로부터 응답이 없습니다.\n인터넷 연결을 확인해주세요.");
  } else {
    alert("요청을 처리하는 도중 문제가 발생했습니다.");
  }
};
