import './studentcard.styles.scss';


const StudentCard =({ student }) => {
    console.log(student)
    return (
        <div className='studentcard'>
             {student.avater?<img src={require(`../../resourse/imageonline/${student.avater}.jpg`)} alt="profile pic" width={100}/>:<img src='../../resourse/imageonline/img10.jpg' alt="profile pic" />}
            <h4>{student.u_name}</h4>
            <span>{student.u_email}</span>
        </div>
    )
}
export default StudentCard;