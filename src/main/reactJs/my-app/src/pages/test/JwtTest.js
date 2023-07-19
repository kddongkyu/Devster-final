import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";

function JwtTest(props) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const navi = useNavigate();
  let de = jwt_decode(localStorage.getItem("accessToken"));

  const jwtTest = () => {
    const idx = 69;
    axiosIns.get(`/member/${idx}`).then((res) => {
      console.log(res + "from ins");
    });
  };

=======
  const navi = useNavigate();
  if (localStorage.getItem("accessToken")) {
    let de = jwt_decode(localStorage.getItem("accessToken"));
  }
  const jwtTest = () => {
    const idx = 69;
    axiosIns.get(`/member/${idx}`).then((res) => {
      console.log(res);
    });
  };

>>>>>>> a5b8dd57d05ab43c0dbad67e9314cac840d9062f
  const axiosTest = () => {
    const idx = 69;
    axios.get(`/member/${idx}`).then((res) => {
      console.log(res + "from axios");
    });
  };
  return (
    <div>
      <button onClick={jwtTest} style={{ width: "500px", height: "500px" }}>
        Jwt - Test
      </button>
      <button onClick={axiosTest} style={{ width: "500px", height: "500px" }}>
        Axios - Test
      </button>
<<<<<<< HEAD
      {de.idx}
      <ResizeCrop />
    </div>
  );
=======
=======

>>>>>>> 5d8fde681ddff91b994e919ff0ca10d66c3e3867
    const navi = useNavigate();
    if(localStorage.getItem('accessToken')) {
        let de = jwt_decode(localStorage.getItem('accessToken'));
    }
    const jwtTest = () => {
        const idx = 69;
        axiosIns.get(`/member/${idx}`)
            .then(res => {
                console.log(res);
            });
    }

    const axiosTest=() =>{
        const idx = 69;
        axios.get(`/member/${idx}`)
            .then(res =>{
                console.log(res + "from axios")
            })
    }
    return (
        <div>
            <button onClick={jwtTest} style={{width: '500px', height: '500px'}}>Jwt - Test</button>
            <button onClick={axiosTest} style={{width: '500px', height: '500px'}}>Axios - Test</button>
        </div>
    );
>>>>>>> 6970148441e0c9b0667171cc35a64498800d229c
=======
    </div>
  );
>>>>>>> a5b8dd57d05ab43c0dbad67e9314cac840d9062f
}

export default JwtTest;
