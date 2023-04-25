import React from "react";
import Profile from "../../component/profile/profile.component";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './profile-page.styles.scss';

const ProfilePage = () => {
    const sign =useSelector((state)=>(state.sign))
    const nav=useNavigate()
    useEffect(()=>{
        if(!sign){

            nav('/404');
        }
    },[sign])
    return (
        <div>
            <Profile />
        </div>
    )
}
export default ProfilePage;