import React, { useState } from "react";
import axiosIns from "../../../api/JwtConfig";
import ToastAlert from "../../../api/ToastAlert";
import { useSnackbar } from "notistack";
import { checkToken } from "../../../api/checkToken";
import { jwtHandleError } from "../../../api/JwtHandleError";

function FboardCommentForm({ fb_idx }) {
  const [fboardComment, setFboardComment] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
  const de = checkToken();

  const onSubmitEvent = (e) => {
    if (!de) {
      toastAlert(
        <>
          댓글 작성은 로그인 회원만 이용 가능합니다.
          <br />
          댓글을 작성하시려면 로그인해주세요.
        </>,
        "warning"
      );
      return;
    }
    e.preventDefault();

    const dto = {
      fbc_content: fboardComment,
      m_idx: de.idx,
      fb_idx: fb_idx,
    };

    axiosIns
      .post("/api/fboard/D1/comment", dto)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        jwtHandleError(error, toastAlert);
      });
  };

  return (
    <div className="fboard-detail-comment-form">
      <form onSubmit={onSubmitEvent}>
        <div className="fboard-detail-commnets-form-bo" />
        <textarea
          className="fboard-detail-commnets-form-te"
          placeholder="내용을 입력해주세요"
          required
          value={fboardComment}
          onChange={(e) => setFboardComment(e.target.value)}
        ></textarea>
        <b>000</b>
        <button type="submit" className="fboard-detail-commnets-form-su">
          <div className="fboard-detail-commnets-form-su1" />
          <b className="fboard-detail-commnets-form-su2">댓글 쓰기</b>
        </button>
      </form>
    </div>
  );
}

export default FboardCommentForm;
