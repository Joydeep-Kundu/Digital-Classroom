import './submitcardlist.component'
import SubmitCard from '../submitcard/submitcard.component'
const SubmitCardList=({props})=>{
    console.log("hiada")
    return(
        <div className='submitcardlist'>
            {
                props.map((data)=>(
                    <SubmitCard props={data}/>
                ))
            }
        </div>
    )
}
export default SubmitCardList