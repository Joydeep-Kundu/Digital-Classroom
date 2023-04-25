import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './signpage.style.scss';
import SignIn from "../../component/sign-in/sign-in.componet";
import SignUp from "../../component/signUp/signUp.component";
import Header from "../../component/header/header.component";


const SignPage = () => {
    return (
        <div>
            <Header />
            <div className="sign">
                <SignIn />
                <SignUp />

            </div>
        </div>

    )
}
export default SignPage;