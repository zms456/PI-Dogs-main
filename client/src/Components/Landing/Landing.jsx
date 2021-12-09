import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";


const Landing = () => {
    return (
        <div className="landing_container">
            <div className="conteiner_welcome">
                <h1>friends best dogs </h1>
                <Link to="/home"><button className="button" type="button">Ingresa ya!!</button></Link>
            </div>
        </div>
    );
};

export default Landing;