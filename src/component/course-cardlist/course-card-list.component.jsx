import React from "react";
// import TeacherCard from "../teacher card/card.components";
import './course-card-list.component'
import CourseCard from "../course-card/Course-card.components";

const CourseCardList = props => {

    return (<div className="card-list">
        {props.data.map(datas => (
            <CourseCard datas={datas} user={props.user} />
        ))}
    </div>
    )
}
export default CourseCardList;