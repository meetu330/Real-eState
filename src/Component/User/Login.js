import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect,useHistory } from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify'

const Login = () => {

	// =================================================== For change url ========================================================
    var answer = window.location.href;

    const answer_array = answer.split("/");

	// =========================================== For Redirect page after form submit ==========================================
    let history = useHistory();

	// =================================================== Define state ===========================================================

	const [Username, setUsername] = useState('');

	const [UsernameError, setUsernameError] = useState('');

	const [Password, setPassword] = useState('');

	const [PasswordError, setPasswordError] = useState('');

	const LoginSubmit = async (e) => {

		e.preventDefault();

		var error = true;

		if(Username){
			setUsernameError('');
		}else{
			var error = false;
			setUsernameError('Please enter email');
		}
		if(Password){
			setPasswordError('');
		}else{
			var error = false;
			setPasswordError('Please enter password');
		}

		const data = new FormData(e.target);

		if (answer_array[2] == "localhost:3000") {
            var login = 'http://localhost:8000/api/login';
        }else{
            var login = 'https://realestatesbackend.ajcnctools.com/api/login';
        }

		if(error == true)
		{
			// await axios.post(login, data)
			// 	.then(res => {
			// 		if(res.data.Status==1)
			// 		{
			// 			toast.success('Login Successfully !',{position: toast.POSITION.TOP_CENTER})
			// 			setTimeout( function() {
			// 				localStorage.setItem('userId',res.data.userId);
			// 				history.push("/dashboard");
			// 				window.location.reload();
			// 			}, 3000);
			// 		}else{
			// 			toast.error('Login Faild !',{position: toast.POSITION.TOP_CENTER})
			// 			setTimeout( function() {
			// 				// history.push("/");
			// 			}, 3000);
			// 		}
			// 	})
			await axios({
				method: 'post',
				url: login,
				data: data,
				headers: {
					"Content-Type" : "application/json"
				}
			  }).then(res => {
						if(res.data.Status==1)
						{
							toast.success('Login Successfully !',{position: toast.POSITION.TOP_CENTER})
							setTimeout( function() {
								localStorage.setItem('userId',res.data.userId);
								history.push("/dashboard");
								window.location.reload();
							}, 3000);
						}else{
							toast.error('Login Faild !',{position: toast.POSITION.TOP_CENTER})
							setTimeout( function() {
								// history.push("/");
							}, 3000);
						}
					})
		}
	
	}
  return (
    <>
     	<div className="limiter">
		<div className="container-login100 login">
		<ToastContainer autoClose={3000} />
			<div className="wrap-login100 animate__animated animate__fadeInLeft">
				<form className="login100-form validate-form" onSubmit={LoginSubmit}>
					<span className="login100-form-title ">
						Login
					</span>

					<div className="wrap-input100 validate-input " >
						<span className="label-input100">Email</span>
                        <i class="fa fa-user" aria-hidden="true"></i>
						<input className="input100" type="email" name="email" placeholder="Type your email" value={Username} onChange={(e) => setUsername(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="errormessage">{UsernameError}</span>
					</div>

					<div className="wrap-input100 validate-input" >
						<span className="label-input100">Password</span>
                        <i class="fa fa-lock" aria-hidden="true"></i>
						<input className="input100" type="password" name="password" placeholder="Type your password" value={Password} onChange={(e) => setPassword(e.target.value)}/>
						<span className="focus-input100"></span>
						<span className="errormessage">{PasswordError}</span>
					</div>

					<div className="forgotDiv text-right mb-4">
                <Link to="/register">
                  <a href="#" className="forgot">
                    Create Account
                  </a>
                </Link>
				<Link to="/forgotpassword">
                <a className="forgot">
                  Forgot password?
                </a>
				</Link>
              </div>

					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<button className="login100-form-btn">
								Login
							</button>
						</div>
					</div>

					{/* <div className="txt1 text-center p-t-54 p-b-20">
						<span>
							Or Sign Up Using
						</span>
					</div>

					<div className="flex-c-m">
						<a href="#" className="login100-social-item bg3">
							<i className="fa fa-google"></i>
						</a>
					</div> */}


				</form>
			</div>
		</div>
	</div>
    </>
  );
};

export default Login;
