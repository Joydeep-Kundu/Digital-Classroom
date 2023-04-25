import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from '../../component/submit/submit.component'
import './submit-page.styles.scss'
const SubmitPage=()=>{
    const sign =useSelector((state)=>(state.sign))
    const nav=useNavigate()
    useEffect(()=>{
        if(!sign){

            nav('/404');
        }
    },[sign])
    return(
        <Submit/>
    )
}