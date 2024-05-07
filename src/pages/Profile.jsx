import React from 'react'
import Navbar from '../components/Navbar'
import Barcharts from '../components/Barcharts/Barcharts'

const Profile = () => {
  return (
    <div className='container-ag' style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <Barcharts />
    </div>
  )
}

export default Profile
