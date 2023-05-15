import './studentcardlist.component';
import StudentCard from '../student-card/studentcard.component';

const StudentCardList = ({ students,srend,rend}) => {

    console.log(students);
    return (
        <div className='studentcardlist'>
            {
                students.map((student) =>
                    <StudentCard student={student} srend={srend} rend={rend}/>)
            }
        </div>
    )
}
export default StudentCardList;