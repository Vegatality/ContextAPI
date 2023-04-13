import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Header from "./Header";
import "./TuseContext.css";
import Content from "./Content";
import Footer from "./Footer";

const Page = () => {
    // const data = useContext(ThemeContext);
    // console.log("data: ", data);
    return (
        <div className="page">
            <Header />
            <Content />
            <Footer />
        </div>
    );
};

export default Page;
