import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./style/MemberList.css";

function MemberList(props) {
  const [memberList, setMemberList] = useState([]);

  const list = async () => {
    const listUrl = "/member/list";
    const token = sessionStorage.token;
    try {
      const response = await Axios.get(listUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMemberList(response.data);
      //console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //처음 시작시 목록 가져오기
  useEffect(() => {
    list();
  }, []);

  const deleteMember = async (num) => {
    const deleteUrl = `/member/delete/${num}`;
    const token = sessionStorage.token;

    if (window.confirm("삭제하시겠습니까?")) {
      try {
        const response = await Axios.delete(deleteUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data); // 서버에서 응답한 데이터를 콘솔에 출력
        list(); // 데이터가 성공적으로 삭제된 후에 예약목록 페이지 다시 출력
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="memberlist">
      <h1>회원 목록</h1>

      <h5>총 {memberList.length}명의 회원이 있습니다</h5>
      <table className="table table-bordered" style={{ width: "900px" }}>
        <thead>
          <tr style={{ backgroundColor: "skyblue" }}>
            <th>번호</th>
            <th>이름</th>
            <th>아이디</th>
            <th>주소</th>
            <th>가입일</th>
            <th>탈퇴</th>
          </tr>
        </thead>
        <tbody>
          {memberList.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.myname}</td>
              <td>{item.myid}</td>
              <td>{item.myaddress}</td>
              <td>{item.gaipday}</td>
              <td>
                <button type="button" onClick={() => deleteMember(item.num)}>
                  탈퇴
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberList;
