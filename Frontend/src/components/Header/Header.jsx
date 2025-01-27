import React from 'react'
import '../../App.css'
import { assets } from '../../assets/frontend_assets/assets'

const Header = () => {
    return (
        <div className='header'>
            <div className="content absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]">
                <h2 className='font-semibold text-white text-[4.5vw]'>Order your <br /> favourite food here</h2>
                <p className='text-white text-[1vw]'>Savor every moment with fresh, delicious, and handcrafted dishes made to bring joy, comfort, and unforgettable flavors to life</p>

                <button className='border-none text-[#747474] font-semibold px-[2.3vw] py-[1vw] bg-white text-[1vw] rounded-[50px]'>View Menu</button>
            </div>
        </div>
    )
}

export default Header
