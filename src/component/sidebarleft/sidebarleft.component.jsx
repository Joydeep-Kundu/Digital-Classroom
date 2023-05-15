
import './sidebarleft.styles.scss';

const SideBarLeft = () => {
    const disc = document.querySelector('.discussion');
    const peop = document.querySelector('.people');
    const assign = document.querySelector('.assignment');
    const disclink = document.querySelector('.sidebarleft div');
    const peoplelink = document.querySelector('.sidebarleft div:nth-child(2)');
    const assignlink = document.querySelector('.sidebarleft div:nth-child(3)');

    const clickspan = () => {
        disclink.style.backgroundColor = '#dfdddd';
        assignlink.style.backgroundColor = '#6c757d';
        peoplelink.style.backgroundColor = '#6c757d';
        disc.style.display = 'block';
        peop.style.display = 'none';
        assign.style.display = 'none';

    }
    const clickspan2 = () => {
        peoplelink.style.backgroundColor = '#dfdddd';
        assignlink.style.backgroundColor = '#6c757d';
        disclink.style.backgroundColor = '#6c757d';
        disc.style.display = 'none';
        assign.style.display = 'none';
        peop.style.display = 'block';
    }
    const clickspan3 = () => {
        assignlink.style.backgroundColor = '#dfdddd';
        peoplelink.style.backgroundColor = '#6c757d';
        disclink.style.backgroundColor = '#6c757d';
        assign.style.display = 'block';
        disc.style.display = 'none';
        peop.style.display = 'none';
    }
    return (
        <div className="sidebarleft">
            <div>
                <span onClick={clickspan}>Discusion</span>
            </div>
            <div>
                <span onClick={clickspan2}>People</span>
            </div>
            <div>
                <span onClick={clickspan3}>Assignment</span>
            </div>
        </div>
    )
}
export default SideBarLeft;