import React from "react";
import "./style/Withdrawal.css";

function Withdrawal(props) {
  return (
    <div className="withrawal">
      <div className="content-withrawal">
        <b className="text-constent-withdrawal">계정 탈퇴</b>
        <b className="text-before-withdrawal">
          <p className="p">회원 탈퇴 전, 안내 사항을 꼭 확인해주세요.</p>
        </b>
        <b className="text-withdrawal-confirm-01">
          <ul className="ul">1) 탈퇴 아이디 복구 불가</ul>
        </b>
        <div className="text-withdrawal-confirm-conten">
          <p className="p">
            탈퇴 후에는 아이디와 데이터 복구가 불가능합니다. 신중하게
            선택해주세요.
          </p>
        </div>
        <b className="text-withdrawal-confirm-02">
          <ul className="ul">2) 서비스 이용기록 삭제</ul>
        </b>
        <div className="text-withdrawal-confirm-conten1">
          <p className="p">
            서비스 이용 기록이 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.
            필요한 데이터는 미리 백업을 해두시기 바랍니다.
          </p>
        </div>
        <div className="content-withrawal-child" />
        <b className="text-user-confirm">본인 확인</b>
        <div className="user-email-confirm">
          본인 확인을 위해 이메일을 입력해주세요.
        </div>
        <div className="text-content-withdrawal-email">이메일</div>
        <div className="email-confirm-box">
          <div className="email-input-box" />
          <button className="withrawal-button">
            <div className="text-go-withdrawal">탈퇴하기</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Withdrawal;
