import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import "./assignment_card.list.scss"


const AssignmentCard=({props})=>{
    const dispatch=useDispatch();
    const navigate = useNavigate();

    
    const assignmentData=()=>{
        dispatch({type:'Sassignment',payload:props.a_id})
        navigate('/submit')
    }



    console.log(props.dis)
    return(
        <div className="AssignmentCard" onClick={assignmentData}>
            <h3>{props.assignment}</h3>
            <span>{props.a_d}{typeof(props.a_id)}</span>
        </div>
    )
}
export default AssignmentCard;