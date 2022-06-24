import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Cards = () => {

  // =================================================== For change url ========================================================
  var answer = window.location.href;

  const answer_array = answer.split("/");

  let history = useHistory();

  // ===================================================== For logout ==========================================================

  const logout = () => {

    if (answer_array[2] == "localhost:3000") {
      var logout = "http://localhost:8000/api/logout";
    } else {
      var logout = "https://realestatesbackend.ajcnctools.com/api/logout";
    }

    axios.get(logout).then((res)=>{
      if (res.data.Status == 1) {
        toast.success("Logout Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(function () {
            localStorage.removeItem("userId");
            history.push("/");
        }, 2000);
      }else{

      }
    })
  }

  return (
    <>
    <ToastContainer autoClose={3000} />
      <div className="infos ">
        <div className="info row py-3">
          <div className="col-lg-6 col-md-6 col-6">
            <h2>DASHBOARD</h2>
            <p>Welcome to VeloPixel Panel</p>
          </div>
          <div className="buttons col-lg-6 col-md-6 col-6  ">
          
              <button className=" border-gradient border-gradient-purple mr-4" onClick={logout}>
                Logout
              </button>
          
            <Link to="/propertiescreate">
              <button className=" border-gradient border-gradient-purple mr-4">
                + Add Property
              </button>
            </Link>
            <Link to="/propertiescreate">
            <button className=" border-gradient border-gradient-purple">
              + Get Financing
            </button>
            </Link>
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <p>Est. Portfolio Value</p>
            <h5>$10,425,497</h5>
          </div>
          <div className="card">
            <p>Monthly Rent Roll</p>
            <h5>$100,425 </h5>
          </div>
          <div className="card">
            <p> Mortgage Debt</p>
            <h5>$1,425,497</h5>
          </div>
          <div className="card">
            <p>Monthly Mortgage Payments</p>
            <h5>$10,654</h5>
          </div>
          <div className="card">
            <p>Portfolio Avg. Rate</p>
            <h5>5.66%</h5>
          </div>
          <div className="card">
            <p>Lenders Rate</p>
            <h5>8.67%</h5>
          </div>
          <div className="card">
            <p>Treasury Rate</p>
            <h5>2.56%</h5>
          </div>
          <div className="card">
            <p>Properties</p>
            <h5>54</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
