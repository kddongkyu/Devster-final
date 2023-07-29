import React, {useState} from 'react';
import axiosIns from "../../../api/JwtConfig";
import {checkToken} from "../../../api/checkToken";
import {jwtHandleError} from "../../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";


function AboardReplyUpdateForm({abc_idx,ab_idx,currentContent,abc_ref}) {

    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const [aboardComment, setAboardComment] = useState(currentContent); // 상태를 정의합니다.

    const de = checkToken();
    const m_idx = de.idx;

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            abc_content: aboardComment,
            ab_idx :ab_idx,
            abc_idx:abc_idx,
            m_idx :m_idx
        };
        if (abc_ref !== 0) { // rbc_ref 값이 필요한 경우에만 추가
            dto.abc_ref = abc_ref;
        }
        console.log(dto)

        // PUT 요청으로 수정
        axiosIns.put(`/api/academyboard/D1/comment/${abc_idx}`, dto)
            .then(res => {
                // 성공적으로 등록된 경우, 목록으로 이동
                window.location.reload();
            })
            .catch(error => {
                // 등록 실패 시 에러 처리
                jwtHandleError(error, toastAlert)
            });
    }


    return (
        <div className="aboard-detail-commnets-form">
            <form onSubmit={onSubmitEvent}>
                <div className="aboard-detail-commnets-form-bo" />
                <img
                    className="aboard-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="aboard-detail-commnets-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={aboardComment} // reviewComment state 사용
                          onChange={(e)=>setAboardComment(e.target.value)}
                />
                <div className="aboard-detail-commnets-form-su">
                    <button type='submit' className="aboard-detail-commnets-form-su-text">답글등록</button>
                </div>
            </form>
        </div>
    );
}

export default AboardReplyUpdateForm;