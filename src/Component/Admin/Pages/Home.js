import React from "react";
import Sidebar from "../Layouts/Sidebar";
import Content from "../Layouts/Content";
import Navbar from "../Layouts/Navbar";
import Calander from "./Calander";
import Cards from "./Components/Cards";
import Portfolio from "./Components/Portfolio";

const Home = () => {

    return (
        <>
            <Cards />
            <Calander />
            <Portfolio />
        </>
    );
    
}
export default Home;