import { useEffect, useState } from 'react';
import './studentcard.styles.scss';
import { useSelector } from 'react-redux';


const StudentCard =({ student,srend,rend}) => {
    
    const users=useSelector((state)=>state.email)
    const [userdis,setUserdis]=useState({})
    const [checkS,setCheckS]=useState(true);
    useEffect(()=>{
        fetch(`http://localhost:5000/dis/${users}`)
        .then((res)=>res.json())
        .then((body)=>setUserdis(...body))
        .catch((error)=>{console.log(error)})
    },[users])
    useEffect(()=>{
        console.log(userdis)
        if(userdis.u_role==='teacher'){
            setCheckS(false)
        }
        else{
            setCheckS(true)
        }
    },[userdis])
    const deleteStudent=()=>{
        try {
            fetch('http://localhost:5000/deletestudent',
            {
                method:"DELETE",
                headers:{"content-type":"application/json"},
                body:JSON.stringify({cid:student.c_id,uemail:student.u_email})
            }
            )
        } catch (error) {
            console.log(error)
        }
        srend(!rend)
        // console.log(rend)
    }
    console.log(student)
    return (
        <div className='studentcard'>
             {student.avater?<img src={require(`../../resourse/imageonline/${student.avater}.jpg`)} alt="profile pic" width={100}/>:<img src='../../resourse/imageonline/img10.jpg' alt="profile pic" />}
            <div>
            <h4>{student.u_name}</h4>
            <span>{student.u_email}</span>
            {
                checkS?null:(<div id='deleteIcon' onClick={deleteStudent}>
                </div>)
            }
            
            </div>
        </div>
    )
}
export default StudentCard;