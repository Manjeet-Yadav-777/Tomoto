import React from 'react'
import { menu_list } from '../../assets/frontend_assets/assets'

const Explore = ({ category, setCategory }) => {
    return (
        <div className='px-28 flex flex-col gap-[20px]'>
            <h1 className='text-[#262626] font-semibold text-[24px]'>Explore Our Menu</h1>
            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rerum dolore impedit id, magnam a numquam culpa eos saepe voluptate aspernatur accusantium explicabo laudantium ex minima voluptas cum! Amet, tempore?</p>

            <div className='explore flex justify-between mt-[20px] items-center gap-[30px] text-center mx-[20px]'>
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index}>
                            <img className={`w-[7.5vw] mx-w-[80px] cursor-pointer rounded-full transition-all ${category === item.menu_name ? "active" : ""}`} src={item.menu_image} alt="" />
                            <p className='mt-[10px] text-[#747474] text-[1.4vw] cursor-pointer'>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr className='mx-[10px] h-[2px] bg-[#e2e2e2] border-none' />
        </div>
    )
}

export default Explore
