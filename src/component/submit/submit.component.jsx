import './submit.styles.scss'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import FormInput from '../form-input/form-input.componet'
import CustomButton from '../custom-button/custom-button.component'
const Submit=()=>{
    const submitData=useSelector((state)=>state.assignment)
    const user=useSelector((state)=>state.email)
    //useState
    const [submit,setSubmit]=useState({});
    const [dis,setDis]=useState('')
    const [rendt,setRendt]=useState(true)
    const [assign,setAssign]=useState({});

    //useEffect 
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
    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    const handleChange=(e)=>{
        setDis(e.target.value)
    }
    return(
        <div className='Submit'>
            <div id='sumitHeader'>
                
            adffffff{submit.dis} {submit.due_d}
            </div>
            {rendt?(

                <div id='submitBody'>
                    <form action="" onSubmit={handleSubmit}>

                        <FormInput type='text' name='dis' value={dis}
                        handleChange={handleChange}
                        label='enter'
                        required
                        />
                        <CustomButton>Submit</CustomButton>
                    </form>
                </div>
            ):null

            }

        </div>
    )
}
export default Submit