import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
{
  /* <Link to="/"><a className="active">Home</a></Link> */
}

const Sidebar = (props) => {

  const [slider, setslider] = useState(false)

  // var allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li ");

  //   allSideMenu.forEach((item) => {

  //     item.addEventListener("click", () => {

  //       allSideMenu.forEach((i) => {
  //         i.classList.remove("active");
  //       });

  //       item.classList.add("active");

  //     });

  //   });

  // setTimeout(() => {
  //   var btn = document.querySelector(".hamburger")
  //   var b = document.querySelector("#sidebar")
  //   btn.addEventListener("click" , () => {
  //     b.classList.toggle("hide")

  //   })
  // }, 0);

	const sliders = () => {
    
      if(slider == false) {setslider(true)}
      if(slider == true ) {setslider(false)}
    
	}
  return (
    <>
      {/* <Navbar/> */}
      <section id="content">
        <nav className={` ${slider ? "hides" : ""}`}>
          <button
            className="hamburger"
            onClick={() => {
              sliders();
              props.toggle();
            }}
          >
            <i className="fa fa-bars"></i>
          </button>
          <form action="#">
            <div className="position-relative">
              <input type="text" placeholder="Search" id="navSearch" />
              <i className="fa fa-search"></i>
            </div>
          </form>
        </nav>
      </section>
      <section id="sidebar" className={`${slider ? "hide" : ""}`}>
        <ul className="side-menu top">
          <li className="brand">
            <Link to="/">NYC INVESTOR</Link>
          </li>

          <li>
            <Link to="/">
              <span className="mr-3">
                <i class="fa fa-money " aria-hidden="true"></i>
              </span>
              <span className="text">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/propertiescreate">
              <span className="mr-3">
                <i class="fa fa-bolt" aria-hidden="true"></i>
              </span>
              <span className="text">Properties Create</span>
            </Link>
          </li>

          <li>
            <Link to="/properties">
              <span className="mr-3">
                <i class="fa fa-university" aria-hidden="true"></i>{" "}
              </span>
              <span className="text">Properties</span>
            </Link>
          </li>

          <li>
            <Link to="/calander">
              <span className="mr-3">
                <i class="fa fa-calendar" aria-hidden="true"></i>
              </span>
              <span className="text">Mortgage Calander</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};
export default Sidebar;
