import "./assingment_cardlist.styles.scss"
import AssignmentCard from "../assignment_card/assignment_card.component"

const AssignmentCardList=(props)=>{
    const {data}=props
    console.log(props.props)
    return (<div className="assigment-card-list">
        
    {
    props.props.map((datas) => (
        <AssignmentCard props={datas} />
    ))
    }
</div>
    )
}
export default AssignmentCardList;