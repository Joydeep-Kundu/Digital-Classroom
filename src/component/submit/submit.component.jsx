import './submit.styles.scss'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import FormInput from '../form-input/form-input.componet'
import CustomButton from '../custom-button/custom-button.component'
import SubmitCardList from '../submitCardlist/submitcardlist.component'

import SubmitCard from '../submitcard/submitcard.component'
const Submit=()=>{
    const submitData=useSelector((state)=>state.assignment)
    const user=useSelector((state)=>state.email)
    //useState
    const [submit,setSubmit]=useState({});
    const [dis,setDis]=useState('')
    const [rendt,setRendt]=useState(true)
    const [assign,setAssign]=useState(true);
    const [assignSubmit,setAssignSubmit]=useState([]);
    const [checkSubmit,setCheckSubmit]=useState([]);

    //useEffect 
    useEffect(()=>{
        if (assignSubmit.length && assignSubmit[0].checks){
            setAssign(false)
            console.log(assignSubmit)
        }
    },[assignSubmit])
    useEffect(()=>{
        if (user===submit.a_email){
            setRendt(false)
        }
    },[submit.a_email])
    useEffect(()=>{
        fetch(`http://localhost:5000/getsubmit/${submitData}`)
        .then((res)=>(res.json()))
        .then((data)=>setSubmit(...data))
    }
    ,[submitData])

    useEffect(()=>{
        fetch(`http://localhost:5000/getassignsubmit/${user}/${submitData}`)
        .then((res)=>res.json())
        .then((data)=>setAssignSubmit(data))
        .catch((error)=>console.log(error))
        console.log(assignSubmit)
    },[user,submitData])

    useEffect(()=>{
        fetch(`http://localhost:5000/getassignsubmit1/${submitData}`)
        .then((res)=>res.json())
        .then((data)=>setCheckSubmit(data))
        console.log(checkSubmit)
    },[submitData])

    //function
    const handleSubmit=async(e)=>{
        try {
            let today = new Date();
            let day = today.getDate();
            let month = today.getMonth();
            let year = today.getFullYear();
            let sec = today.getSeconds();
            let min = today.getMinutes();
            let hour = today.getHours();
            let date = `${year}-${month}-${day}`;
            let time = `${hour}:${min}:${sec}`;
            const body={A_id:submit.a_id,submit:dis,s_email:user,s_d:date,s_t:time}
            const res=fetch(`http://localhost:5000/setassignsubmit`,
                {
                    method:"POST",
                    headers:{"content-type":"application/json"},
                    body:JSON.stringify(body)
                }
            )

            console.log(res)
            setAssign(false)
        } catch (error) {
            console.log(error)
        }
        e.preventDefault();
        fetch(`http://localhost:5000/getassignsubmit/${user}/${submitData}`)
        .then((res)=>res.json())
        .then((data)=>setAssignSubmit(data))
        .catch((error)=>console.log(error))
    }

    const handleChange=(e)=>{
        setDis(e.target.value)
    }


    return(
        <div className='submit'>
            <div id='submitheader'>
                <h1>{submit.assignment}</h1>
                <p>{submit.dis}</p>
            </div>
            {rendt?(assign?

                (<div id='submitBody'>
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="tarea">Enter</label>
                        <textarea id='tarea' type='text' name='dis' value={dis}
                        onChange={handleChange}
                        required
                        rows='4'
                        cols='120'
                        />
                        <CustomButton>Submit</CustomButton>
                    </form>
                </div>):(<div><h4>{assignSubmit.length?(assignSubmit[0].submit):null}</h4><div className='submitted'>Submitted</div></div>)
            ) :(<SubmitCardList props={checkSubmit}/>)

            }


        </div>
    )
}
export default Submit