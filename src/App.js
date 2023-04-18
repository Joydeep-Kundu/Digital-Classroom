import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignPage from './route/signpage/signpage.component';
import ProfilePage from './route/profile-page/profile-page.component';

import './App.css';
import CoursePage from './route/course-page/course-page.componet';
import RoomPage from './route/room-page/room-page.component';
import Submit from './component/submit/submit.component';
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<SignPage />} />
        <Route path='/course' element={<CoursePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/room' element={<RoomPage />} />
        <Route path='/submit' element={<Submit/>}/>
      </Routes>
    </div>
  );
}
export default App;
