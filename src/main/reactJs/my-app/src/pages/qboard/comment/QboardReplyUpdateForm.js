import React, {useState} from 'react';
import axiosIns from "../../../api/JwtConfig";
import {checkToken} from "../../../api/checkToken";
import {jwtHandleError} from "../../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";


function QboardReplyUpdateForm({qbc_idx,qb_idx,currentContent,qbc_ref}) {
    
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const [qbc_content, setQbc_content] = useState(currentContent); // 상태를 정의합니다.

    const de = checkToken();
    const m_idx = de.idx;

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            qbc_content: qbc_content,
            qb_idx :qb_idx,
            qbc_idx:qbc_idx,
            m_idx :m_idx
        };
        if (qbc_ref !== 0) { // rbc_ref 값이 필요한 경우에만 추가
            dto.qbc_ref = qbc_ref;
        }
        console.log(dto)

        // PUT 요청으로 수정
        axiosIns.put(`/api/qboard/D1/comment/${qbc_idx}`, dto)
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
        <div>
            <form className="q-detail-commnets-form" onSubmit={onSubmitEvent}>
                <div className="q-detail-commnets-form-bo" />
                <img
                    className="q-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="q-detail-reply-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={qbc_content} // reviewComment state 사용
                          onChange={(e)=>setQbc_content(e.target.value)}
                />
                <div className="q-detail-reply-form-su">
                    <button type='submit' className="q-detail-reply-form-su-text">답글수정</button>
                </div>
            </form>
        </div>
    );
}

export default QboardReplyUpdateForm;
