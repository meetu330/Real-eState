import { ContactsOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify'

const ForgotPassword = () => {
  
	// =================================================== For change url ========================================================
  var answer = window.location.href;

  const answer_array = answer.split("/");

  // =========================================== For Redirect page after form submit ==========================================
  let history = useHistory();


  const [hide, sethide] = useState(false);

  const [Email, setEmail] = useState('');

  const [EmailError, setEmailError] = useState('')

  const [Otp, setOtp] = useState('');

  const [one, setone] = useState('');

  const [two, settwo] = useState('');

  const [three, setthree] = useState('');

  const [four, setfour] = useState('');


  useEffect(() => {
    var codes = document.querySelectorAll(".code");

    codes.forEach((curr, index) => {
      curr.addEventListener("keydown", (e) => {
        if (e.key >= 0 && e.key <= 9) {
          curr.value = "";
          setTimeout(() => {
            if (index == 3) {
            } else {
              codes[index + 1].focus();
            }
          }, 10);
        }
        if (e.key == "Backspace") {
          setTimeout(() => {
            if (index == 0) {
            } else {
              codes[index - 1].focus();
            }
          }, 10);
        }
      });
    });
  });

  const handleSubmit = (e) => {
      e.preventDefault()
      
      var error = false;

      if(Email){
        setEmailError('')
      }else{
        setEmailError('Please enter email')
        var error = true;
      }

      if (answer_array[2] == "localhost:3000") {
        var checkemail = 'http://localhost:8000/api/checkemail';
      }else{
        var checkemail = 'https://realestatesbackend.ajcnctools.com/api/checkemail';
      }

      const data = new FormData(e.target)

      if(error == false){
        axios.post(checkemail, data).then((res)=>{
          if(res.data.Status == 1){
            toast.success('Please check your email !',{position: toast.POSITION.TOP_CENTER})
              setTimeout( function() {
                handleHide()
                setOtp(res.data.otp);
                localStorage.setItem('email',res.data.email);
              }, 3000);
            
          }else{
            toast.error('Email has been not match !',{position: toast.POSITION.TOP_CENTER})
              setTimeout( function() {
              }, 3000);
          }
        })
      }

  }
  const otpsubmit = (e) => {
    e.preventDefault()

    const otpvarification = one+two+three+four;
    if(Otp == otpvarification)
    {
      history.push("/changepassword");
    }else{
      toast.error('Otp has been not match! Try again.',{position: toast.POSITION.TOP_CENTER})
        setTimeout( function() {
      }, 3000);
    }

  }

  const handleHide = () => {
    if (hide == true) {
      sethide(false);
    }
    if (hide == false) {
      sethide(true);
    }
  };

  return (
    <>
    <ToastContainer autoClose={3000} />
      <section className="forgotPassword">
        {/* Forgot Password Design   */}
        <div
          className={`forgotDiv animate__animated animate__fadeInDown ${
            hide == true ? "d-none" : ""
          }`}
        >
          <form onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
            <div className="resetDiv">
              <label htmlFor="mail">Email</label>
              <input
                type="email"
                name="email"
                id="mail"
                placeholder="smith@example.com"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="error">{EmailError}</div>
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>

        {/* Verfiy OTP Design  */}

        <div
          className={`otpsection animate__animated animate__fadeInUp ${
            hide == false ? "d-none" : ""
          }`}
        >
          <div className="c-email">
            <div className="c-email__header">
              <h1 className="c-email__header__title">Your Verification Code</h1>
            </div>
            <form onSubmit={otpsubmit}>
            <div className="c-email__content">
              <p className="c-email__content__text ">Please Enter your OTP</p>
              <div className="c-email__code code-container">
                <input
                  id="otpdata0"
                  type="number"
                  className="code"
                  min="0"
                  max="9"
                  onChange={(e) => setone(e.target.value)}
                />
                <input
                  id="otpdata1"
                  type="number"
                  className="code"
                  min="0"
                  max="9"
                  onChange={(e) => settwo(e.target.value)}
                />
                <input
                  id="otpdata2"
                  type="number"
                  className="code"
                  min="0"
                  max="9"
                  onChange={(e) => setthree(e.target.value)}
                />
                <input
                  id="otpdata3"
                  type="number"
                  className="code"
                  min="0"
                  max="9"
                  onChange={(e) => setfour(e.target.value)}
                />
              </div>
              {/* <Link to="/changepassword" style={{ display: "contents" }}> */}
                <button className="c-email__footer">Verify OTP</button>
              {/* </Link> */}
            </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
