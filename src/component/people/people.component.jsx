import { useState, useEffect } from 'react';
import StudentCardList from '../student-cardlist/studentcardlist.component';

import './people.styles.scss';



const People = ({ room, other }) => {
    //state
    const [peoples, setpeoples] = useState([]);
    //effect
    useEffect(async() => {
        await fetch(`http://localhost:5000/getpeoplestudent/${room}`)
            .then((res) => res.json())
            .then((data) => setpeoples(data))
    }, [])
    console.log(room)
    console.log(peoples)

    return (
        <div className='people'>
            <h2>Teacher</h2>
            <div className='teacher'>
            {console.log(peoples)}
            {other.avater?<img src={require(`../../resourse/imageonline/${other.avater}.jpg`)} alt="profile pic" width={100}/>:<img src='../../resourse/imageonline/img10.jpg' alt="profile pic1" />}
            <div>
            <h3>{other.u_name}</h3>
                <span>{other.owner_e}</span>
            </div>
            </div>
            <div>
                <h3>Student</h3>
                <StudentCardList students={peoples} />
            </div>
        </div>
    )
}
export default People;