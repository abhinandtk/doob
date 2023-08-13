import React, { useEffect, useState } from "react";
import constants from "@/public/data/my-constants/Constants";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import apis from "@/public/data/my-constants/Apis";
import Axios from "axios";
import { toast } from "react-toastify";
// import {auth} from "../../pages/firebase"
// import {signInWithPopup,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth"
// import {useAuthState} from 'react-firebase-hooks/auth'
import { message, notification } from "antd";
import { useRouter } from "next/router";
function Login({ setActiveModal }) {
  const router = useRouter();
  const { locale } = router;
  const [error, setError] = useState("");

  // const [user,setUser] = useAuthState(auth);
  // const googleAuth = new GoogleAuthProvider();
  // const facebookAuthProvider = new FacebookAuthProvider();

  // const ssoLoginApi = (authProvider,id) =>{
  //   Axios.post(apis.ssologin,{
  //     social_authId:id,
  //     platform:"0",
  //     fcm_token:"fromweb"
  //   }).then((res)=>{
  //     if (res.data.status===0){
  //       setActiveModal('ssoregister')

  //     }else{
  //       localStorage.setItem('user-login-tokens',res.data.data.token)
  //       console.log('successssssssssssssssssssssssss')
  //     }
  //   })
  // }

  // const facebookLogin = () => {
  //   signInWithPopup(auth, facebookAuthProvider)
  //     .then((result) => {
  //       localStorage.setItem('sso-user-id',result.user.uid)
  //       ssoLoginApi("facebook",result.user.uid)
  //     })
  //     .catch((error) => {
  //       // Handle sign-in error
  //       if (error.code === "auth/cancelled-popup-request") {
  //         setError("Sign-in cancelled. Please try again.");
  //       } else {
  //         setError(error.message);
  //       }
  //     });

  // };

  // const googleLogin=async()=>{
  //   // await auth.signOut();
  //   const result=await signInWithPopup(auth,googleAuth);
  //   localStorage.setItem('sso-user-id',user.uid)
  //   ssoLoginApi("google",user.uid)

  // }

  const handleClick = () => {
    setActiveModal("register");
  };
  const handleforgetpsw = () => {
    setActiveModal("forgetemail");
  };

  const [shows, setShows] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    Axios.post(apis.login, {
      email: email,
      password: password,
      platform: "0",
      // fcm_token:''
    }).then((res) => {
      if (res.data.status === 1) {
        notification.success({
          message: " Success",
          description: "Login Successfully",
        });
        setErrorMsg("");
        localStorage.setItem("user-login-tokens", res.data.data.token);
        localStorage.setItem("login-userId", res.data.data.user_id);
        window.location.reload(false);
        setActiveModal("");
        console.log("login success ");
        toast.success("successinfo");
      } else if (res.data.status === 0) {
        setErrorMsg(
          locale === "en" ? res.data.message_en : res.data.message_ar
        );
      } else if (res.data.status === 2) {
        setErrorMsg(
          locale === "en" ? res.data.message_en : res.data.message_ar
        );
      } else {
        setErrorMsg(
          locale === "en" ? res.data.message_en : res.data.message_ar
        );
      }
    });
  };
  return (
    <Modal
      show={shows}
      // onHide={()=>setShows(false)}
    >
      <Modal.Header></Modal.Header>
      <Modal.Title className="title">Login</Modal.Title>
      <Modal.Body>
        <Form onSubmit={(e) => loginSubmitHandler(e)}>
          <Form.Group className="mb-1 pop ">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="passwordHelpBlock"
            />
          </Form.Group>

          <Form.Group className="mb-3 pop1" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="forget" onClick={handleforgetpsw}>
              {" "}
              Forgot Password
            </div>
          </Form.Group>
          <Modal.Footer>
            <Button type="submit" className="mx-auto text-white submit1 ">
              Login
            </Button>
          </Modal.Footer>
          <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>
          <Form.Group
            className="mb-1 text-center"
            controlId="formBasicPassword"
          >
            {/* <Form.Label >Or Login with</Form.Label> */}
          </Form.Group>
          {/* <Form.Group className=" text-center" controlId="formBasicPassword">
        <Form.Label >
          <span>
            <a onClick={googleLogin}><img src='../images/Google__G__Logo.svg.png'  className='mb-1' style={{width:'20px',height:'20px'}}></img></a>
            <a ><img src='../images/Apple_logo_black.svg.png' className='mx-3 mb-2' style={{width:'20px',height:'23px' }}></img></a>
            <a onClick={facebookLogin}><img src='../images/f_logo_RGB-Blue_1024.png' className='mb-2' style={{width:'23px',height:'22px' }}></img></a>
          </span>
        </Form.Label>
    
      </Form.Group> */}

          <Form.Group
            className="mb-1 text-center"
            controlId="formBasicPassword"
          >
            <Form.Label style={{ color: "#17A803" }} onClick={handleClick}>
              Don&apos;t have an account? Register
            </Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
