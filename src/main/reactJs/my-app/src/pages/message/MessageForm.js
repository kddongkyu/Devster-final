import React, {useState} from 'react';
import axiosIns from "../../api/JwtConfig";
import {useNavigate, useParams} from "react-router-dom";
import './style/MessageForm.css'

function MessageForm(props) {

    const [subject,setSubject] = useState(null);
    const [content,setContent] = useState(null);
    const {recv_nick} = useParams();
    const navi=useNavigate();

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            recv_nick: recv_nick,
            subject: subject,
            content: content
        };

        axiosIns.post("/api/message/D1", dto)
            .then(res => {
                // 성공적으로 등록된 경우, 목록으로 이동
                navi("/message");
            })
            .catch(error => {
                // 등록 실패 시 에러 처리
                console.error(error);
            });
    }

    return (
        <div className="textmsg-form-box">
            {/*<b>받는 사람 : {props.nickname}</b>*/}
            <form className="message-form" onSubmit={onSubmitEvent}>
                    <div className="message-form-header">
                        <div className="message-form-header-rec" />
                        <b className="message-form-header-name">쪽지 보내기</b>
                    </div>
                    <div className="message-form-content">
                        <textarea className="message-form-content-rec"
                                  placeholder="   내용을 입력해주세요."
                                  required value={content}
                                  onChange={(e)=>setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="message-form-subjec">
                        <input type="text" className="message-form-subject-rec" placeholder="제목을 입력해주세요."
                               required
                               onChange={(e)=>setSubject(e.target.value)} value={subject}/>
                    </div>
                    <button className="message-form-btn">
                        <div className="message-form-btn-outline" />
                        <div className="message-form-btn-text">쪽지 발송</div>
                        <img
                            className="message-form-btn-icon"
                            alt=""
                            src={require("./assets/message_form_btn_icon.svg").default}
                        />
                    </button>
            </form>
        </div>
    );
}

export default MessageForm;