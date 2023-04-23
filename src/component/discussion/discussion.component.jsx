import { useEffect, useState } from 'react';
import FormInput from '../form-input/form-input.componet';
import CustomButton from '../custom-button/custom-button.component';
import CommentCardList from '../commentcardlist/commentcardlist.component';

import './discussion.styles.scss';

const Discusion = ({ room, user }) => {
    //state
    let [comment, setcomment] = useState('');
    let [dcomment, setdcomment] = useState([]);
    //effect
    useEffect(() => {
        fetch(`http://localhost:5000/getcomment/${room}`)
            .then((res) => res.json())
            .then((data) => setdcomment(data))
    }, [room])
    console.log(dcomment)

    //func
    const rend = () => {
        console.log('render')
        try {
            fetch(`http://localhost:5000/getcomment/${room}`)
                .then((res) => res.json())
                .then((data) => setdcomment(data))

        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        let sec = today.getSeconds();
        let min = today.getMinutes();
        let hour = today.getHours();
        let date = `${year}-${month}-${day}`;
        let time = `${hour}:${min}:${sec}`;
        const body = { cm: comment, cmd: date, cmt: time, cid: room, cmemail: user };
        console.log(body)
        try {
            const res = await fetch('http://localhost:5000/postcomment', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });
            console.log(res);
            setcomment('');
            rend();
        } catch (err) {
            console.log(err);

        }
    }
    const handleChange = (e) => {
        const { value } = e.target;
        setcomment(value);
        console.log(value);
    }




    return (
        <div className='discussion'>
            <h2>Disscussion</h2>
            <div className='comment-form'>
                <form action="#" onSubmit={handleSubmit}>
                    <FormInput type='text'
                        value={comment}
                        name='comment'
                        handleChange={handleChange}
                        label='Enter your comment'
                        required
                    />
                    <CustomButton type='submit'>Post Comment</CustomButton>
                </form>
            </div>
            <div>
                <CommentCardList dcomment={dcomment} user={user} room={room} rend={rend} />
            </div>
        </div>
    )
}
export default Discusion;