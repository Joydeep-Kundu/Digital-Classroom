import './assignment.styles.scss';

import { useEffect, useState } from 'react';
import FormInput from '../form-input/form-input.componet';
import CustomButton from '../custom-button/custom-button.component';
import AssignmentCardList from '../assignment_cardlist/assignment_cardlist.component';

let form2={
    assignmentTytle:"",
    discreption:"",
    dueDate:""
}
const Assignment = ({ user, room, other }) => {
    //state
    const [formfields,setForm]=useState(form2);
    const {assignmentTytle,discreption,dueDate}=formfields;
    const [dis, setDis] = useState(false);
    const [assignment,setAssignment]=useState([])

    //effect
    useEffect(()=>{
        try {
            console.log(other)
            fetch(`http://localhost:5000/getassignment/${other.c_id}`)
            .then((res) => res.json())
            .then((data) => setAssignment(data))
            .catch((error)=>console.log(error))
            console.log(assignment);
        } catch (error) {
            console.log(error)
        }
    },[other.c_id])
    
    useEffect(() => {
        if (user === other.owner_e) {
            setDis(true);
        }
        else {
            setDis(false);
        }
    }, [user, other.owner_e])
    const handleChange = (e) => {
        const {name,value}=e.target;
        setForm({...formfields,[name]:value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        let date = `${year}-${month}-${day}`;
        const body={u_id:other.owner_e,a_d:date,c_id:other.c_id,a_t:assignmentTytle,dis:discreption,due_D:dueDate};
        try {
            const res=await fetch(`http://localhost:5000/setassignment`,
            {method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(body)
        }
        )    
        fetch(`http://localhost:5000/getassignment/${other.c_id}`)
            .then((res) => res.json())
            .then((data) => setAssignment(data))
            .catch((error)=>console.log(error))
            setForm(form2)
            formDisplay()
        } catch (error) {
            console.log(error)
        }
    }
    const formDisplay=()=>{
        let form12=document.querySelector('#form12');
        form12.classList.toggle('dip');
    }
    return (
        <div className='assignment'>
            <h2>Assignment</h2>
            {dis ? (<div>
                <div className='assign' onClick={formDisplay}>
                    Create Assignment
                </div>
            <div id='form12' className='dip' >
                <form onSubmit={handleSubmit}>
                    <FormInput type="text" value={assignmentTytle}
                        name='assignmentTytle'
                        handleChange={handleChange}
                        label='Assingment Title'
                        required
                    />
                    <FormInput type="text" value={discreption}
                    name='discreption'
                    handleChange={handleChange}
                    label="Assigment Discription"
                    required
                    />
                    {/* <FormInput type="date" value={dueDate}
                    name='dueDate'
                    handleChange={handleChange}
                    label="Due date"
                    required
                    />      */}
                    <input type="date" name="data" value={dueDate} 
                        onChange={handleChange}
                        required
                    />   
                    <br/>  
                    <CustomButton type='submit'>Post</CustomButton>
                </form>
            </div></div>) : null}
            <AssignmentCardList props={assignment}/>
        </div>
    )
}
export default Assignment;