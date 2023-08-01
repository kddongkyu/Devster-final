import React, {useState, useEffect} from 'react';
import axiosIns from "../../api/JwtConfig";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import "./style/TransltaeModal.css";

function MyResumeTranslate({isTransOpen, setIsTransOpen, transConent}) {

    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const content= transConent;
    const [translatedContent,setTranslatedContent] = useState("");

    useEffect(() => {
        if (isTransOpen) {
            getTranslatedContent();
        }
    }, [isTransOpen]);

    const closeModal = () => {
        setIsTransOpen(false);
    };

    if (!isTransOpen) {
        return null;
    }

    const getTranslatedContent = () => {
        const json = {
            text : content
        }
        axiosIns({
            method:'post',
            url:'/api/resume/D1/translate',
            data:json,
            headers:{"Content-Type":"application/json"}
        })
            .then(response => {
                setTranslatedContent(response.data);
            })
            .catch(error => {
                toastAlert('요청실패', 'warning');
            });
    }

    return (
        <div className="translate modal-backdrop"
             onClick={closeModal}>
            <div className="translate-rec"
                 onClick={e => e.stopPropagation()}/>
            <div className="translate-top-rec" />
            <img className="translate-close-icon"
                 alt=""
                 src={require("./assets/translate_close.svg").default}
                 onClick={closeModal}
            />
            <img className="trans-logo-icon"
                 alt=""
                 src={require("./assets/logo_modal.svg").default}
            />
            <div className="translate-title">간단 자기소개 AI 영문 번역본</div>
            <div className="translate-text">
                {translatedContent}
            </div>
            <div className="translate-bottom-text">
                번역된 영문 자기소개를 복사해서 사용하세요.
            </div>
        </div>
    );
}

export default MyResumeTranslate;