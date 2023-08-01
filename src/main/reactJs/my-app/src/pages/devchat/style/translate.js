import React, {useState} from 'react';
import axiosIns from "../../api/JwtConfig";

function Translate(props) {
    const [content,setContent] = useState("");
    const [translatedContent,setTranslatedContent] = useState("");

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
    }

    return (
        <div>
            <textarea onChange={(e)=>{
                setContent(e.target.value);
            }}></textarea>
            <div>
                {translatedContent}
            </div>
            <button onClick={getTranslatedContent}>
                번역하기
            </button>
        </div>
    );
}

export default Translate;