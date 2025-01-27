import React from 'react'
import { assets } from '../../assets/admin_assets/assets'
const Navbar = () => {
    return (
        <div className='flex justify-between px-20 h-[13vh] items-center'>
            <img className='h-[60px]' src={assets.logo} alt="" />
            <img src={assets.profile_image} className='h-14' alt="" />
        </div>
    )
}

export default Navbar
