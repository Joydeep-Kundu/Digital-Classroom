import './submitcard.styles.scss'

const SubmitCard = ({props})=>{

    return(
        <div className='submitcard'>
            <div>
            <h3>{props.u_name}</h3>
            <p>{props.s_email}</p>
            </div>
            <p className='subdis'>{props.submit}</p>
            <div>

            <p>{props.s_d.substring(0, 10)}</p>
            <p>{props.s_t.substring(0,5)}</p>
            </div>
        </div>
    )
}
export default SubmitCard