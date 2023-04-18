import { useEffect, useState } from "react";
import Assignment from "../assignment/assignment.component";
import People from "../people/people.component";
import Discusion from "../discussion/discussion.component";

import './middlebar.styles.scss';

const Middlebar = ({ room, user, other }) => {
    console.log('room', room, user);

    return (
        <div className="middlebar">
            <Discusion room={room} user={user} />
            <People room={room} other={other} />
            <Assignment room={room} user={user} other={other} />
        </div>
    )
}
export default Middlebar;