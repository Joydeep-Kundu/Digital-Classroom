
import './course.style.scss';


import FormInput from "../../component/form-input/form-input.componet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../component/custom-button/custom-button.component";
import Header from "../../component/header/header.component";
import { CardList } from '../card-list/card-list.component';
import TeacherCardList from '../teacher card list/card-list.component';

const form1 = {
    cname: '',
    cdis: ''
}


const Course = () => {
    const nav = useNavigate();


    const sign = useSelector((state) => (state.sign));
    const semail = useSelector((state) => (state.email));
    const clickCourse = useSelector((state) => state.course);


    const [si, ssi] = useState(sign);
    //state
    const [uemail, setemail] = useState(semail);
    const [form1fields, setform1] = useState(form1);
    const { cname, cdis } = form1fields;
    const [form2res, setform2res] = useState(true);

    const [userd, setuser] = useState([]);
    const [role, setrole] = useState('true');
    const [form2, setform2] = useState('')
    const [courses, setcourses] = useState([]);
    const [course1, setcourse1] = useState([]);

    //style
    let p = document.querySelector('.join p');

    console.log(semail);
    //useeffect
    useEffect(() => {
        fetch(`http://localhost:5000/getjoins/${uemail}`)
            .then((res) => res.json())
            .then((data) => setcourse1(data));
    }, [])
    useEffect(() => {
        fetch(`http://localhost:5000/coursedis/${semail}`)
            .then((res) => res.json())
            .then((data) => setcourses(data));
    }, [semail]);
    console.log(courses);
    useEffect(() => {
        fetch(`http://localhost:5000/dis/${semail}`)
            .then((res) => res.json())
            .then((data) => setuser(...data));

    }, [semail]);
    useEffect(() => {
        if (userd.u_role === 'teacher') {
            setrole(false);
        }
    }, [userd])
    console.log(userd.u_role, role);

    const dispatch = useDispatch();
    console.log(sign);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setform1({ ...form1fields, [name]: value })
    };

    console.log(form1fields);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = form1fields;
            const res = await fetch('http://localhost:5000/coursepost', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(body)

            })
            setform1({ cname: '', cdis: '' })
            console.log(res);
            fetch(`http://localhost:5000/coursedis/${semail}`)
                .then((res) => res.json())
                .then((data) => setcourses(data));
        } catch (err) {
            console.log(err)
        }
        create();
    }

    const create = () => {
        let cre = document.querySelector('.create');
        cre.classList.toggle('dis');
    }
    const join = () => {
        let jn = document.querySelector('.join');
        jn.classList.toggle('dis');
        p.style.display = 'none';
        setform2('')
    }
    const getJoins = async () => {
        try {

            const res2 = await fetch(`http://localhost:5000/getjoins/${uemail}`)
            const data2 = await res2.json();
            setcourse1(data2);
        } catch (err) {
            console.log(err);
        }
    }
    const form2submit = async (e) => {
        e.preventDefault();
        const body = { cid: form2, uemail: uemail }
        console.log('form2 -', body);
        let res1 = await fetch(`http://localhost:5000/getjoins/${uemail}`)
        let data1 = await res1.json()
        console.log(data1);
        data1.map((d) => {
            if (d.c_id !== form2) {
                p.style.display = 'block'
            }
        })

        try {
            const res = await fetch('http://localhost:5000/joins', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(body)
            })
        } catch (err) {
            console.log(err)
        }
        setform2('')
        join();
        getJoins();
    }
    const handleChange2 = (e) => {
        setform2(e.target.value)
    }

    return (
        <div>

            <Header />
            <div className="course-page">
                {role ? (<h2 className="crejoin" onClick={join} >Join Course</h2>) : (<h2 className="crejoin" onClick={create}>Create Course</h2>)}
                <div className="create dis">
                    <h3>Add course</h3>
                    <form action="#" onSubmit={handleSubmit}>
                        <FormInput type="text" value={cname}
                            name='cname'
                            handleChange={handleChange}
                            label='Course Name'
                            required
                        />
                        <FormInput type="text" value={cdis}
                            name='cdis'
                            handleChange={handleChange}
                            label='Course Discription'
                            required
                        />
                        <CustomButton type='submit'>Create</CustomButton>
                    </form>
                </div>
                <div className="join dis">
                    <h3>Join Course</h3>
                    <p className='dis' >wrong course code!</p>
                    <form action="#" onSubmit={form2submit}>
                        <FormInput type="text" value={form2}
                            name='cid'
                            handleChange={handleChange2}
                            label='Enter Course Code'
                            required
                        />
                        <CustomButton type='submit'>Join</CustomButton>
                    </form>

                </div>
                <div>
                    <TeacherCardList data={courses} user={uemail} />
                    <CardList data={course1} user={uemail} />
                </div>
            </div >
        </div>
    )
}
export default Course;