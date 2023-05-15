import { useNavigate } from 'react-router-dom';
import './avatar.styles.scss';

const Avatar=(user)=>{
    const l=[1,2,3,4,5,6,7,8,9,10]
    const changeAvater=async(e)=>{
        const res=await fetch('http://localhost:5000/avater',
        {
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({email:user.props,av:`img${e.target.name}`})
        }
        )
        user.avt(true);
        user.togg()
    }
    return(
        <div className='avater'>
                <h1>Avatar</h1>
            <div className='img'>
                {
                    l.map((data)=>(<img name={data}onClick={changeAvater}src={require(`../../resourse/imageonline/img${data}.jpg`)} alt="image" width="150px" height='150px' />))
                }

            </div>
        </div>

    )
}
export default Avatar