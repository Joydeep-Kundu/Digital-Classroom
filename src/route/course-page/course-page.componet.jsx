import React, { useEffect } from "react";
import Course from "../../component/course/course.component";
import './course-page.componet';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CoursePage = () => {
    const sign =useSelector((state)=>(state.sign))
    const nav=useNavigate()
    useEffect(()=>{
        if(!sign){

            nav('/404');
        }
    },[sign])
    return (
        <Course />
    )
}
export default CoursePage;