import './404-page.sytles.scss'
import { useNavigate } from 'react-router-dom'

const Page404=()=>{
    const nav=useNavigate()
    const sign=()=>{
        nav('/')
    }
    return(
        <div className='page404'>
            {/* <h1>404</h1> */}
            <h3 onClick={sign}></h3>
        </div>
    )
}
export default Page404