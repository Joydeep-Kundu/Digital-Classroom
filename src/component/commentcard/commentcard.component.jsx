import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import './commentcard.styles.scss';

const CommentCard = ({ data, user, room, rend }) => {
    console.log(rend)
    //state

    //other
    let date = data.cm_d;
    date = date.substring(0, 10);
    let date1 = parseInt(date.substring(date.length - 2)) + 1;
    let date2 = date.substring(0, date.length - 2);
    date = date2 + date1;
    let nav = useNavigate()
    const deleteComment = async () => {
        const body = { cmt: data.cm_t, cmd: date, cmemail: data.cm_email, cid: room };
        console.log('render')
        try {
            const res = await fetch('http://localhost:5000/deletecomment', {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(body)
            })

        } catch (err) {
            console.log(err);
        }
        console.log('render')
    }
    const [check, setCheck] = useState(false)
    useEffect(() => {

        if (user === data.cm_email) {
            setCheck(true)
        }
    }, [data, user])

    return (

        <div className='commentcard'>
            <p id='comment'> <span>{data.u_name}</span><span><span>date:{date} </span> <span>time:{data.cm_t.slice(0,5)} </span></span></p>
            <p id='comment2'>{data.cm}</p>

            {
                // check ? (<CustomButton onClick={deleteComment}>Remove</CustomButton>) : (null)
            }
        </div>
    )
}
export default CommentCard;