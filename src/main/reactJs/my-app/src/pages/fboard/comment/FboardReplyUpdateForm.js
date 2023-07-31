import React, {useState} from 'react';
import axiosIns from "../../../api/JwtConfig";
import {checkToken} from "../../../api/checkToken";
import {jwtHandleError} from "../../../api/JwtHandleError";
import ToastAlert from "../../../api/ToastAlert";
import {useSnackbar} from "notistack";
function FboardReplyUpdateForm({fbc_idx,fb_idx,currentContent,fbc_ref}) {
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const [fbc_content, setFbc_content] = useState(currentContent);
    const de = checkToken();
    const m_idx = de.idx;

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            fbc_content: fbc_content,
            fb_idx :fb_idx,
            fbc_idx:fbc_idx,
            m_idx :m_idx
        };
        if (fbc_ref !== 0) { // rbc_ref 값이 필요한 경우에만 추가
            dto.fbc_ref = fbc_ref;
        }

        axiosIns.put(`/api/fboard/D1/comment/${fbc_idx}`, dto)
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
            <form className="f-detail-commnets-form" onSubmit={onSubmitEvent}>
                <div className="f-detail-commnets-form-bo" />
                <img
                    className="f-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="f-detail-reply-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={fbc_content} // reviewComment state 사용
                          onChange={(e)=>setFbc_content(e.target.value)}
                />
                <div className="f-detail-reply-form-su">
                    <button type='submit' className="f-detail-reply-form-su-text">답글수정</button>
                </div>
            </form>
        </div>
    );
}

export default FboardReplyUpdateForm;