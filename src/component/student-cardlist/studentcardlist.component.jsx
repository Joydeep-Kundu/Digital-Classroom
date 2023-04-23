import './studentcardlist.component';
import StudentCard from '../student-card/studentcard.component';

const StudentCardList = ({ students }) => {

    console.log(students);
    return (
        <div className='studentcardlist'>
            {
                students.map((student) =>
                    <StudentCard student={student} />)
            }
        </div>
    )
}
export default StudentCardList;