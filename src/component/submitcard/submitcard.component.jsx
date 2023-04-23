import './submitcard.styles.scss'

const SubmitCard = ({props})=>{

    return(
        <div className='submitcard'>

            <h3>{props.s_email}</h3>
            <p>{props.u_name}</p>
            <p>{props.submit}</p>
            <p>{props.s_d.substring(0, 10)}</p>
            <p>{props.s_t}</p>
        </div>
    )
}
export default SubmitCard