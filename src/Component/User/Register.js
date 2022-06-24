import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "animate.css";

const Register = () => {
  // =================================================== For change url ========================================================
  var answer = window.location.href;

  const answer_array = answer.split("/");

  // =========================================== For Redirect page after form submit ==========================================
  let history = useHistory();
  
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focused, setFocused] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^([A-Za-z0-9]){3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answer_array[2] == "localhost:3000") {
      var register = "http://localhost:8000/api/registration";
    } else {
      var register =
        "https://realestatesbackend.ajcnctools.com/api/registration";
    }

    var error = false;

    if (
      values.username &&
      values.email &&
      values.password &&
      values.confirmPassword
    ) {
    } else {
      var error = true;
      toast.warn("All Field are required !", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(function () {}, 3000);
    }
    if (error == false) {
      axios.post(register, values).then((res) => {
        if (res.data.Status == 1) {
          toast.success("Registration Successfully !", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(function () {
            // window.location.reload();
            history.push("/");
          }, 3000);
        } else {
          toast.error("Email address already exist !", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(function () {
            // history.push("/");
          }, 3000);
        }
      });
    }
  };
  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer autoClose={3000} />

      <div className="form register ">
        <form
          onSubmit={handleSubmit}
          className="registerForm animate__animated animate__fadeInRight"
        >
          <h1 className="registerH1  ">Register</h1>
          {inputs.map((curr) => (
            <div className="form-input" key={curr.id}>
              <label className="regisLabel" htmlFor={curr.name}>
                {curr.label}
              </label>
              <input
                type={curr.type}
                placeholder={curr.placeholder}
                id={curr.name}
                pattern={curr.pattern}
                onFocus={() =>
                  curr.name == "confirmPassword" && setFocused(true)
                }
                onBlur={handleFocus}
                focused={focused.toString()}
                name={curr.name}
                className="register-input"
                onChange={handleChange}
              />
              <span className="regisSpan">{curr.errorMessage}</span>
            </div>
          ))}
          <Link to="/login">
            <a href="#" className="forgot">
              Already Have an Account?
            </a>
          </Link>
          <button type="submit" className="submtBtn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
