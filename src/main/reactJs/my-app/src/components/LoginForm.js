import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function LoginForm(props) {
  const [myid, setMyid] = useState("");
  const [mypass, setMypass] = useState("");
  const navi = useNavigate();

  //submit 이벤트
  // const onSubmitLogin = (e) => {
  //   e.preventDefault();
  //   const url = `/member/login?myid=${myid}&mypass=${mypass}`;
  //   Axios.get(url).then((res) => {
  //     if (res.data.success === "yes") {
  //       /*
  //           localStorage:직접 지우기전에는 브라우저에 남아있음
  //           sessionStorage:브라우저 닫으면 지워짐
  //           */
  //       sessionStorage.loginok = "yes";
  //       sessionStorage.myname = res.data.myname;
  //       sessionStorage.myid = myid;
  //       navi("/");
  //     } else {
  //       alert("아이디나 비밀번호가 맞지 않습니다");
  //       sessionStorage.loginok = "no";
  //       sessionStorage.myname = "";
  //       sessionStorage.myid = "";
  //     }
  //   });
  // };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    const url = `/member/login?myid=${myid}&mypass=${mypass}`;
    Axios.get(url).then((res) => {
      if (res.data.success === "yes") {
        /*
            localStorage:직접 지우기전에는 브라우저에 남아있음
            sessionStorage:브라우저 닫으면 지워짐
            */
        sessionStorage.token = res.data.token;
        console.log("res.data.token=" + res.data.token);
        //sessionStorage.loginok="yes";
        sessionStorage.myname = res.data.myname;
        sessionStorage.myid = myid;
        navi("/");
        window.location.reload(); //새로고침
      } else {
        alert("아이디나 비밀번호가 맞지 않습니다");
        //sessionStorage.loginok="no";
        sessionStorage.myname = "";
        sessionStorage.myid = "";
      }
    });
  };

  return (
    <div className="login" style={{ marginTop: "100px" }}>
      <form onSubmit={onSubmitLogin}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th
                style={{
                  width: "100px",
                  backgroundColor: "#ddd",
                  textAlign: "center",
                }}
              >
                아이디
              </th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="아이디"
                  required
                  autoFocus
                  value={myid}
                  onChange={(e) => setMyid(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <th
                style={{
                  width: "100px",
                  backgroundColor: "#ddd",
                  textAlign: "center",
                }}
              >
                비밀번호
              </th>
              <td>
                <input
                  type="password"
                  className="form-control"
                  placeholder="비밀번호"
                  required
                  value={mypass}
                  onChange={(e) => setMypass(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} align="center" className="table-danger">
                <button
                  type="submit"
                  className="btn btn-default"
                  style={{ width: "150px" }}
                >
                  회원로그인
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
}

export default LoginForm;
