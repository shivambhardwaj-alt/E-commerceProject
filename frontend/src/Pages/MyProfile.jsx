import {React ,useState } from 'react'
import MyProfileSidebar from '../Components/MyProfileSidebar'
import PersonalInfo from '../Components/PersonalInfo';
import { Outlet } from 'react-router-dom';
const MyProfile = () => {

  const[isEdit,setIsEdit] = useState(false);
  return (
    <div className='md:flex md:flex-row md:gap-4'>
    <MyProfileSidebar />
    <div>
      <Outlet />
    </div>



    </div>
  )
}

export default MyProfile