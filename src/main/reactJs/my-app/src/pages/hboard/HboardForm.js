import "./style/HboardForm.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const HboardForm = () => {
  const [hb_subject, setHb_subject] = useState("");
  const [hb_photo, setHb_photo] = useState("");
  const [hb_content, setHb_content] = useState("");

  const navi = useNavigate();

  const cm_idx = 14;

  const onSubmitEvent = (e) => {
    e.preventDefault();
    Axios.post("/hboard/insert", {
      cm_idx,
      hb_subject,
      hb_content,
      hb_photo,
    }).then((res) => {
      navi("/hboard");
    });
  };

  const onUploadEvent = (e) => {
    const uploadFile = new FormData();
    uploadFile.append("upload", e.target.files[0]);
    Axios({
      method: "post",
      url: "/hboard/upload",
      data: uploadFile,
      headers: { "Content-type": "multipart/form-data" },
    }).then((res) => {
      setHb_photo(res.data);
    });
  };

  return <div></div>;
};

export default HboardForm;
