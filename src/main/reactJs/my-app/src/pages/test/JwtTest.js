import React, { useEffect } from "react";
import axios from "axios";

function JwtTest(props) {

  const handler =()=>{
    axios.get("/oauth2/authorization/naver")
        .then(res=>{
          console.log(res.data);
        })
  }
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
        <br/><br/><br/><br/><br/><br/>
      <div onClick={handler}>
        가나다라
      </div>
    </div>
  );
}

export default JwtTest;