import React from 'react'
import '../components/NavBar'
import NavBar from '../components/NavBar'
import CustomDatePicker from '../components/datePicker'

const HomePage = () => {
  return (
    <div className='h-screen w-full bg-[#0A1429]'>
      <NavBar />
      <CustomDatePicker />
    </div>
  )
}

export default HomePage
