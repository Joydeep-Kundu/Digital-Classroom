import './profile.styles.scss';
import { useState, useEffect } from 'react';
import FormInput from '../form-input/form-input.componet';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
    //style
    const cnfp = document.querySelector('.changepform');
    //
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //selector
    const user = useSelector((state) => state.email)
    //state
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('')
    const [profile, setProfile] = useState({});
    //effect
    useEffect(() => {
        fetch(`http://localhost:5000/dis/${user}`)
            .then((res) => res.json())
            .then((data) => setProfile(...data))
        console.log('render')
    }, [])
    console.log(user)
    console.log(profile)
    //function
    const handleChange = (e) => {
        setPassword(e.target.value)
    }
    const handleChange2 = (e) => {
        setCPassword(e.target.value)
    }
    const signOut = () => {
        dispatch({ type: 'signout' });
        navigate('/')
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (password === cPassword) {
            const body = { password: password }
            try {
                const res = await fetch(`http://localhost:5000/changepassword/${user}`, {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(body)
                });
                setCPassword('');
                setPassword('')
                changePassword();

            } catch (err) {
                console.log(err);
            }
        }
        else {
            console.log('wrong')
        }
    }
    const changePassword = () => {
        cnfp.classList.toggle('dis');

    }
    const back = () => {
        navigate('/course')
    }
    return (
        <div className="profile">
            <div id='back' onClick={back}></div>
            <h1>Profile</h1>
            {/* {console.log(profile.avater===undefined)} */}
            {profile.avater?<img src={require(`../../resourse/imageonline/${profile.avater}.jpg`)} alt="profile pic" width={100}/>:<img src='../../resourse/imageonline/img10.jpg' alt="profile pic" />}
            <h2>Name : {profile.u_name}</h2>
            <p>Email : {profile.u_email}</p>
            <p>Role : {profile.u_role}</p>
            <div>
                <span id='cnfp' onClick={changePassword}>Change Password</span>
                <form action="" onSubmit={handlesubmit} className='changepform dis'>
                    <FormInput type="password" value={password}
                        name='password'
                        handleChange={handleChange}
                        label='Enter Password'
                        required
                    />
                    <FormInput type="password" value={cPassword}
                        name='cpassword'
                        handleChange={handleChange2}
                        label='Enter Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>Change Password</CustomButton>
                </form>
            </div>
            <button id='sign-out' onClick={signOut}>Sign out</button>


        </div>
    )
}
export default Profile;