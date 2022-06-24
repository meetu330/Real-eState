import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import FullCalendar, { allowContextMenu } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import axios from "axios";
import dateFormat, { masks } from "dateformat";
import $ from 'jquery';

const Calander = () => {
  // ======================================================= Change url for API ===============================================
  var answer = window.location.href;
  const answer_array = answer.split("/");

  // =================================================== Start states ========================================================
  const [events, setEvent] = React.useState([]);
  
  const [Getdata, setGetdata] = useState([]);

  const [Getdatedata, setGetdatedata] = useState([]);

  const [slide, setslide] = useState(false);

  const [Search, setSearch] = React.useState("");

  const [Currentdate, setCurrentdate] = React.useState([]);

  const [SelectDate, setSelectDate] = React.useState('');

  // ============================================== Get all events ==========================================================
  React.useEffect(() => {
    // For get current date

    var userId = localStorage.getItem('userId');

    if (answer_array[2] == "localhost:3000") {
      var calendarevent = `http://localhost:8000/api/getcurrentdate`;
    } else {
      var calendarevent = `https://realestatesbackend.ajcnctools.com/api/getcurrentdate`;
    }

    fetch(calendarevent)
      .then((res) => res.json())
      .then((json) => {
        setCurrentdate(json);
      });
      
      
    // Show Calendar event in calendar

    if (answer_array[2] == "localhost:3000") {
      var calendarevent = `http://localhost:8000/api/calendars/${userId}`;
    } else {
      var calendarevent = `https://realestatesbackend.ajcnctools.com/api/calendars/${userId}`;
    }

    fetch(calendarevent)
      .then((res) => res.json())
      .then((json) => {
        setEvent(json);
      });
    // Show default today's event
    // if (answer_array[2] == "localhost:3000") {
    //   var calendartodayevent = `http://localhost:8000/api/gettodaysevent`;
    // } else {
    //   var calendartodayevent = `https://realestatesbackend.ajcnctools.com/api/gettodaysevent`;
    // }

    // fetch(calendartodayevent)
    // .then((res) => res.json())
    // .then((json) => {
    //   setGetdata(json);
    // });

    // Get all event data
    if (answer_array[2] == "localhost:3000") {
      var calendartodayevent = `http://localhost:8000/api/getallcalendarevent/${userId}`;
    } else {
      var calendartodayevent = `https://realestatesbackend.ajcnctools.com/api/getallcalendarevent/${userId}`;
    }

    fetch(calendartodayevent)
      .then((res) => res.json())
      .then((json) => {
        setGetdata(json);
      });
  }, []); // <-- Have to pass in [] here!     

// ============================================ Get event on change event ==================================================

// ====================== For scroll record ======================
  React.useEffect(() => {
    setTimeout(function () {
      autoscroll();
    }, 1000);
    setTimeout(function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  }, []);

  const autoscroll = () => {
    var elem = document.getElementById("scroll");
    elem.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  };

  const autoscroll2 = () => {
    var elem = document.getElementById("scroll");
    elem.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    setTimeout(function () {
      window.scrollTo({ top: 250, behavior: "smooth" });
    }, 1000);
  };

  const selecteddate = () => {

    var userId = localStorage.getItem('userId');

    if (SelectDate != "") {
      
      if (answer_array[2] == "localhost:3000") {
        var calendartodayevent = `http://localhost:8000/api/getallcalendarevent/${userId}`;
      } else {
        var calendartodayevent = `https://realestatesbackend.ajcnctools.com/api/getallcalendarevent/${userId}`;
      }
  
      fetch(calendartodayevent)
        .then((res) => res.json())
        .then((json) => {
          setGetdata(json);
          
      });
      autoscroll()

    }
  };
  // ============================================ Get event on change event ==================================================

  const changeevent = async (e) => {

    var userId = localStorage.getItem('userId');

    if (answer_array[2] == "localhost:3000") {
      var calendareventget = `http://localhost:8000/api/getevent/${userId}/?color=${e.target.value}`;
    } else {
      var calendareventget = `https://realestatesbackend.ajcnctools.com/api/getevent/${userId}/?color=${e.target.value}`;
    }

    const productdata = await axios.post(calendareventget);

      // =================== data get time so i can use this ===============

    console.log(productdata.data);

    if (productdata.data) {
      setGetdata(productdata.data);
    }

  };
  // ============================================= For Get Today's Event ======================================================
  const todayevent = async () => {

    var userId = localStorage.getItem('userId');

    if (answer_array[2] == "localhost:3000") {
      var calendartodayevent = `http://localhost:8000/api/gettodaysevent/${userId}`;
      } else {
      var calendartodayevent = `https://realestatesbackend.ajcnctools.com/api/gettodaysevent/${userId}`;
    }

    const productdata = await axios.get(calendartodayevent);

    if (productdata.data) {
      setGetdata(productdata.data);
    }

    // Trigger on current select today

    var currentselecteddate = new Date().getFullYear();

    var current = $('.fc-toolbar-title').text();
    var lastFive = current.substr(current.length - 4);

    if (currentselecteddate > lastFive)
    { 
      var diff = currentselecteddate - lastFive;

      for (var i = 0; i < diff; i++)
      {
         $('.fc-nextYear-button').trigger("click");
      }
    }
    else
    {
      
      var diff = lastFive - currentselecteddate;

      for (var i = 0; i < diff; i++) {
        $('.fc-prevYear-button').trigger("click");
      }
    }

    // For month trigger
    const currentmonth = new Date().getMonth()+1;

    var monthtitle = $('.fc-toolbar-title').text();

    var month1 = monthtitle.substring(0, monthtitle.indexOf(' '));

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    month1 = months.indexOf(month1)+1;

    if (month1 > currentmonth)
    { 
      var diff = month1 - currentmonth;

      for (var i = 0; i < diff; i++)
      {
         $('.fc-prev-button').trigger("click");
      }
    }
    else
    {
      
      var diff = currentmonth - month1;

      for (var i = 0; i < diff; i++) {
        $('.fc-next-button').trigger("click");
      }
    }

  };
  // ================================================ For slide side bar =========================================================
  const show = () => {
    if (slide == false) {
      setslide(true);
    }
    if (slide == true) {
      setslide(false);
    }
  };

  // ================================================= For Trigger year ==========================================================
  const changedate = (e) => {
    var currentselecteddate = e.target.value;

    var current = $('.fc-toolbar-title').text();
    var lastFive = current.substr(current.length - 4);

    if (currentselecteddate > lastFive)
    { 
      var diff = currentselecteddate - lastFive;

      for (var i = 0; i < diff; i++)
      {
         $('.fc-nextYear-button').trigger("click");
      }
    }
    else
    {
      
      var diff = lastFive - currentselecteddate;

      for (var i = 0; i < diff; i++) {
        $('.fc-prevYear-button').trigger("click");
      }
    }

  }
  
  return (
    <>
      {/* <Cards/> */}
      <div className=" calender ">
        <div className="sideDiv">{/* <Sidebar toggle = {show}  /> */}</div>
        <div className={` calDiv ${slide ? "slides" : ""}`}>

          <div className="row mt-3">
            <div className="col-xl-5 col-lg-11 col-11 ">
              <div className="my-3">
                <h5 className="txt">MORTGAGE CALANDER</h5>
              </div>

              <div className="  mb-3">
                <input
                  type="text"
                  placeholder="Type to Search"
                  className="form-control custom"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="  calen p-3 mb-3sti">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="eventTxt" style={{ color: "black" }}>
                      <b>Events Viewer</b>
                    </h4>
                  </div>
                  <div className="col-md-4">
                    <select className="form-control" onChange={changedate} >
                      <option value={new Date().getFullYear()}>Select Year</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                      <option value="2014">2014</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                      <option value="2035">2035</option>
                      <option value="2036">2036</option>
                      <option value="2037">2037</option>
                      <option value="2038">2038</option>
                      <option value="2039">2039</option>
                      <option value="2040">2040</option>
                      <option value="2041">2041</option>
                      <option value="2042">2042</option>
                      <option value="2043">2043</option>
                      <option value="2044">2044</option>
                      <option value="2045">2045</option>
                      <option value="2046">2046</option>
                      <option value="2047">2047</option>
                      <option value="2048">2048</option>
                      <option value="2049">2049</option>
                      <option value="2050">2050</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3 position-relative">
                  <FullCalendar
                    plugins={[dayGridPlugin]} 
                    initialView="dayGridMonth"
                    eventClick={async function (e) {

                      var month = e.event.start.getMonth() + 1;
                      if(month == 10 || month == 11 ||month == 12){
                        month = month;
                      }else{
                        month = '0'+month;
                      }

                      var date =
                        e.event.start.getFullYear() +
                        "-" +
                        month +
                        "-" +
                        e.event.start.getDate();

                        setCurrentdate(date);

                        selecteddate()

                        autoscroll2()

                        $('.fc-day-today').trigger("click");

                      // if (answer_array[2] == "localhost:3000") {
                      //   var calendareventdate = `http://localhost:8000/api/geteventdate?date=${date}`;
                      // } else {
                      //   var calendareventdate = `https://realestatesbackend.ajcnctools.com/api/geteventdate?date=${date}`;
                      // }

                      // const productdatedata = await axios.post(
                      //   calendareventdate
                      // );

                      // // console.log(productdatedata);
                      // if (productdatedata.data) {
                      //   setGetdata(productdatedata.data);
                      // }
                    }}

                    events={events}
                    customButtons={{
                      today: {
                        text: "Select Today",
                        click() {
                          todayevent();
                        },
                      },
                    }
                    }
                    headerToolbar={{
                      left: "prev,next",
                      center: "title",
                      right: 'today prevYear,nextYear'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="view col-xl-7 col-lg-11 col-11">
              <div className="my-3">
                <h5 className="txt">VIEWING OPTION</h5>
              </div>
              <div className="mb-3">
                <div className="some-class">
                  <label>
                    <input
                      onClick={changeevent}
                      type="radio"
                      className="radio"
                      name="x"
                      value="all"
                      id="a"
                    />

                    <span>
                      <i className="fa fa-check"></i>Show All
                    </span>
                  </label>
                  <label>
                    <input
                      onClick={changeevent}
                      type="radio"
                      className="radio"
                      name="x"
                      value="white"
                      id="b"
                    />

                    <span>
                      <i className="fa fa-check"></i> Maturity
                    </span>
                  </label>
                  <label>
                    <input
                      onClick={changeevent}
                      type="radio"
                      className="radio"
                      name="x"
                      value="green"
                      id="c"
                    />

                    <span>
                      <i className="fa fa-check"></i> Pre-Pay Penalty
                    </span>
                  </label>
                  <label>
                    <input
                      onClick={changeevent}
                      type="radio"
                      className="radio"
                      name="x"
                      value="grey"
                      id="d"
                    />

                    <span>
                      <i className="fa fa-check"></i> Rate Change
                    </span>
                  </label>
                  <label>
                    <input
                      onClick={changeevent}
                      type="radio"
                      className="radio"
                      name="x"
                      value="lightblue"
                      id="e"
                    />

                    <span>
                      <i className="fa fa-check"></i> Renewal
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <div className="num"> 
                  
                  {Getdata.filter((val) => {
                    if (Search == "") {
                      return val;
                    } else if (
                      val.date
                        .toLowerCase()
                        .includes(Search.toLocaleLowerCase()) ||
                      val.description
                        .toLowerCase()
                        .includes(Search.toLocaleLowerCase()) ||
                      val.property
                        .toLowerCase()
                        .includes(Search.toLocaleLowerCase()) ||
                      val.bank
                        .toLowerCase()
                        .includes(Search.toLocaleLowerCase())
                    ) {
                      return val;
                    }
                  }).map(function (event, index) {
                    if (event.date === Currentdate) {
                      var j = "";
                      var j = "scroll";
                    } else {
                      var j = "";
                      var j = "scrollelse";
                    }
                    
                    return (
                      <>
                      
                        <b id={`${j}`}>
                          {dateFormat(event.date, "mmmm dd, yyyy")}
                        </b>
                        <div className={`p-3`}>
                          <h5 className={`c_${event.backgroundColor}`}>
                            {event.label}
                          </h5>
                          <h3 className="calenTxt">{event.title}</h3>
                          <h6 className="comment">{event.description}</h6>
                          <h6>{event.property}</h6>
                          <h6>{event.bank}</h6>
                        </div>
                        <hr></hr>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Calander;
