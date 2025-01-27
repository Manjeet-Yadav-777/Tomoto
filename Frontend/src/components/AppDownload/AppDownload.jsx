import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
    return (
        <div className='m-auto mt-[100px] text-[3vw] text-center font-semibold'>
            <div>
                <p>For Better Experience  Download <br />TOMOTO APP</p>

                <div className='flex justify-center gap-[2vw] mt-[40px]'>
                    <img className='cursor-pointer' src={assets.play_store} alt="" />
                    <img className='cursor-pointer' src={assets.app_store} alt="" />
                </div>
            </div>
        </div>
    )
}

export default AppDownload
