const express = require('express');
const app = express();
const cors = require('cors');

const pool = require('./db');
//middle ware
app.use(cors());
app.use(express.json());
//routes--
//insert
app.post("/signup", async (req, res) => {
    try {
        const { name, email, role, password } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO users (u_name,u_email,u_role,u_password) VALUES($1,$2,$3,$4) returning *",
            [name, email, role, password]);
        res.json(newTodo.rows);
        console.log('insert request');

    } catch (err) {
        console.error(err.message);
    }
});
app.put('/avater',async(req,res)=>{
    try {
        const {email,av}=req.body;
        const avater= await pool.query("update users set avater=$1 where u_email=$2",[av,email])
        res.json(avater.rows)
        console.log('avater set',av,email)
    } catch (error) {
        console.log(error.message)

    }
})

//get all
app.get("/disall", async (req, res) => {
    try {
        const disall = await pool.query(
            "SELECT * FROM users"
        );
        res.json(disall.rows);
        console.log('display request');
    } catch (err) {
        console.error(err.message);

    }
});
app.get('/coursedis/:id', async (req, res) => {
    let { id } = req.params;
    console.log('id=', id)
    try {
        const disall = await pool.query(
            "SELECT * FROM course,users where course.owner_e=users.u_email and users.u_email=$1", [id]
        );
        res.json(disall.rows);
        console.log('display request');
    } catch (err) {
        console.error(err.message);

    }
})
let em;
app.get('/dis/:id', async (req, res) => {
    let { id } = req.params;
    em = id;
    console.log(id)
    try {
        const dis = await pool.query(
            "SELECT * FROM users WHERE u_email=$1", [id]
        );
        res.json(dis.rows);
        console.log('display request');
    } catch (err) {
        console.error(err.message);

    }
});
app.post('/coursepost', async (req, res) => {
    let body = req.body;
    cid = Math.random() * 0.3;
    let { cname, cdis, cowner } = body;
    console.log(cowner, cname, cdis, em);
    try {
        const course = await pool.query(
            "INSERT INTO course (c_name,c_id,c_dis,owner_e) VALUES ($1,$2,$3,$4)",
            [cname, cid, cdis, em]
        )
        res.json(course.rows)
        console.log('course insert request')
    } catch (err) {
        console.log(err)

    }
})
app.get('/coursesel/:id', async (req, res) => {
    let { id } = req.params;
    console.log('id=', id)
    try {
        const disall = await pool.query(
            "SELECT * FROM course,users where course.owner_e=users.u_email and course.c_id=$1", [id]
        );
        res.json(disall.rows);
        console.log('single course display request');
    } catch (err) {
        console.log(err.message);

    }
})
app.post('/postcomment', async (req, res) => {
    let { cm, cmd, cmt, cid, cmemail } = req.body;
    console.log('insert comment req', cid, cmd, cmemail, cmt, cm)
    try {
        const postcomment = await pool.query(
            "INSERT INTO comment (cm_d,cm,cm_t,c_id,cm_email) VALUES ($1,$2,$3,$4,$5)",
            [cmd, cm, cmt, cid, cmemail]
        )
        res.json(postcomment.rows);
    } catch (err) {
        console.log(err);
    }
})
app.get('/getcomment/:id', async (req, res) => {
    let { id } = req.params;
    console.log('commment', id);
    try {
        const getcommet = await pool.query(
            "SELECT * FROM comment,users WHERE c_id=$1 and cm_email=u_email ORDER BY cm_d DESC,cm_t DESC", [id]
        )
        res.json(getcommet.rows);
        console.log('get comment req')

    } catch (err) {
        console.log(err)
    }
});
app.post('/joins', async (req, res) => {
    let { cid, uemail } = req.body;
    console.log('joins', cid, uemail);
    try {
        let joins = await pool.query(
            "INSERT INTO joins (u_email,c_id) VALUES ($1,$2) ", [uemail, cid]
        )
        res.json(joins.rows);
    } catch (err) {
        console.log(err)
    }
});
app.get('/getjoins/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let getJoin = await pool.query(
            'select * from joins,course,users where course.owner_e=users.u_email and joins.c_id=course.c_id and joins.u_email=$1', [id]
        )
        res.json(getJoin.rows);

    } catch (err) {
        console.log(err)
    }
})
app.get('/getjoin/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let getJoin = await pool.query(
            'select * from joins where u_email=$1', [id]
        )
        res.json(getJoin.rows);

    } catch (err) {
        console.log(err)
    }
})
app.get('/getpeoplestudent/:id', async (req, res) => {
    let { id } = req.params;
    console.log(id);
    try {
        let getPeopleStudent = await pool.query(
            'select * from joins,users where joins.u_email=users.u_email and joins.c_id=$1', [id]
        )
        res.json(getPeopleStudent.rows);
        console.log('get people student req')
    } catch (err) {
        console.log(err)
    }
})
app.delete('/deletestudent', async(req,res)=>{
    let {cid,uemail}=req.body;
    try {
        const deleteStudent=await pool.query(
            "DELETE FROM joins WHERE c_id=$1 and u_email=$2",[cid,uemail]
        )
        console.log('deleteStudent',uemail,cid)
    } catch (error) {
        console.log(error.message)
    }
})
app.delete('/deletecomment', async (req, res) => {
    let { cmemail, cid, cmt, cmd } = req.body;
    console.log(cmemail, cid, cmt, cmd)
    try {
        const deleteComment = pool.query(
            "DELETE FROM comment WHERE c_id=$1 and cm_email=$2 and cm_d=$3 and cm_t=$4",
            [cid, cmemail, cmd, cmt]
        )
        console.log('delete comment')

    } catch (err) {
        console.log(err);
    }
})
app.put('/changepassword/:id', async (req, res) => {
    let { id } = req.params;
    let { password } = req.body;
    console.log('change', id, password)
    try {
        let changePassword = await pool.query(
            'UPDATE users SET u_password=$1 WHERE u_email=$2',
            [password, id]
        )
        res.json(changePassword.rows);
        console.log('change password')
    } catch (err) {
        console.log(err)
    }
});

app.get('/upload', async (req, res) => {
    let { file } = req.body;
    console.log(file)
    try {

    } catch (err) {
        console.log(err);
    }
})
app.post('/setassignment',async (req,res)=>{
    console.log('setassignment req',req.body)
    let {u_id,a_d,c_id,a_t,dis,due_D}=req.body;
    const a_id=`${c_id}${Math.random()}`;
    try {
        const setAssignment=await pool.query("Insert into Assignment values($1,$2,$3,$4,$5,$6,$7)",[a_d,a_t,a_id,c_id,u_id,due_D,dis])
        res.json(setAssignment.rows);
    } catch (error) {
        console.log(error)
    }
});
app.get('/getassignment/:id',async (req,res)=>{
    console.log('get assingment');
    let { id } = req.params;
    console.log(id)
    try {
        let getAssignment= await pool.query("Select * from assignment where c_id=$1 order by a_d desc",[id]);
        res.json(getAssignment.rows);
        // console.log(res.json(getAssignment.rows))
    } catch (error) {
        console.log(error)
        
    }
    
})
app.get('/getsubmit/:id',async(req,res)=>{
    let {id}=req.params;
    console.log('get submit',id)
    try {
        let getSubmit=await pool.query(
            "select * from assignment where a_id=$1",[id]
        );
        res.json(getSubmit.rows);
    } catch (error) {
        console.log(error)
    }
})
app.post('/setassignsubmit',async(req,res)=>{
    let {A_id,submit,s_email,s_d,s_t}=req.body;
    console.log(req.body)
    try {
        let setAssignSubmit =await pool.query(
            "insert into submit values ($1,$2,$3,$4,$5,$6)",[A_id,submit,s_email,s_d,s_t,true]
        );
    } catch (error) {
        console.log(error)
    }
})
app.get('/getassignsubmit/:id/:id2',async (req,res)=>{
    let id=req.params.id
    let id2=req.params.id2

    console.log('getassignsubmit',id,id2)

    try{
        let getAssignmentSubmit=await pool.query(
            "select * from submit where a_id=$1 AND s_email=$2",[id2,id]
        )
        res.json(getAssignmentSubmit.rows)
        console.log(getAssignmentSubmit.rows)
    }
    catch(error){
        console.log(error)
    }
});

app.get('/getassignsubmit1/:id',async (req,res)=>{
    let {id}=req.params;
    
    console.log('getassignsubmit1',id)
    try{
        let getAssignmentSubmit1=await pool.query(
            "select a_id,submit,s_email,s_d,s_t,u_name,avater from submit,users where a_id=$1 and s_email=u_email",[id]
        )
        res.json(getAssignmentSubmit1.rows)
        console.log(getAssignmentSubmit1.rows)
    }
    catch(error){
        console.log(error)
    }
});
app.listen(5000, () => {
    console.log('server is listening to port 5000');
})