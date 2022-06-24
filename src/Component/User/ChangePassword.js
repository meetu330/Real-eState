import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify'

const ChangePassword = () => {

  // =================================================== For change url ========================================================
  var answer = window.location.href;

  const answer_array = answer.split("/");

  // =========================================== For Redirect page after form submit ==========================================
  let history = useHistory();


  const [Password, setPassword] = useState('')
  const [PasswordError, setPasswordError] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')
  const [ConPassError, setConPassError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    var error = false;
    if(Password == ''){
      setPasswordError('Please enter password')
      var error = true;
    }else{
      setPasswordError('')
    }
    if(confirmPassword == ''){
      setConPassError('Please enter confirm password')
      var error = true;
    }else{
      setConPassError('')
    }

    if(Password != confirmPassword){
      setConPassError('Password & Confirmpassword has been not match')
      var error = true;
    }

    if(error == false){

      const email = localStorage.getItem('email');

      if (answer_array[2] == "localhost:3000") {
        var changepassword = `http://localhost:8000/api/changepassword/${email}`;
      }else{
        var changepassword = `https://realestatesbackend.ajcnctools.com/api/changepassword/${email}`;
      }

      const data = new FormData(e.target);

      await axios({
				method: 'post',
				url: changepassword,
				data: data,
				headers: {
					"Content-Type" : "application/json"
				}
			  }).then(res => {
						if(res.data.Status==1)
						{
							toast.success('Password change has been done !',{position: toast.POSITION.TOP_CENTER})
							setTimeout( function() {
                history.push('/')
							}, 3000);
						}else{
							toast.error('Password changes Faild !',{position: toast.POSITION.TOP_CENTER})
							setTimeout( function() {
							}, 3000);
						}
					})

    }

  }

  return (
    <>
      <section className="changePass">
      <ToastContainer autoClose={3000} />
        <div className='passWrapper animate__animated animate__bounceInUp'>
          <form onSubmit={handleSubmit}>
            <h1>Change Password</h1>
            <div className='changePassDiv'>
              <label htmlFor='newpass' >New Password</label>
              <input type="password" name="password" id="newpass" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
              <span className="error">{PasswordError}</span>
            </div>
            <div className='changePassDiv'>
              <label htmlFor="confirmpass">Confirm New Password</label>
              <input type="password" name="confirmpassword" id="confirmpass" placeholder='New Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
              <span className="error">{ConPassError}</span>
            </div>
            <button type="submit">CONFIRM</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default ChangePassword