import Room from "../../component/room/room.component";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './room-page.stytles.scss';

const RoomPage = () => {
    const sign =useSelector((state)=>(state.sign))
    const nav=useNavigate()
    useEffect(()=>{
        if(!sign){

            nav('/404');
        }
    },[sign])
    return (
        <div className="room page">
            <Room />
        </div>
    )
}
export default RoomPage;