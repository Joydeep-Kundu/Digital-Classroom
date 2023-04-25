import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import './assignment_card.styles.scss'


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
            <div>
                <p>{props.a_d.substring(0,10)}</p>
                <p>Due data : {props.due_d.substring(0,10)}</p>
            </div>
        </div>
    )
}
export default AssignmentCard;