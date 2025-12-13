import React from 'react'
import NavBar from '../Shared/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Shared/Footer'

export default function Main() {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}
