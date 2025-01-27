import React, { useState } from 'react'
import { assets } from '../../assets/admin_assets/assets'
import { Link } from 'react-router-dom'
import "../../App.css"

const Sidebar = () => {

    const [option, setOption] = useState("")

    return (
        <div className='w-[18%] h-[100vh] border-r-[1.5px] border-solid border-[#a9a9a9]'>
            <div className='flex flex-col gap-5 pt-10 items-center'>
                <Link to="/add" onClick={() => setOption("add")} className={`${option === "add" ? "active" : ""} flex gap-5 border border-[#a9a9a9] w-[70%] px-5 py-2 cursor-pointer`}
                >
                    <img src={assets.add_icon} alt="" />
                    <p className='font-semibold text-[#555]'>Add Items</p>
                </Link>

                <Link to="/list" onClick={() => setOption("list")} className={`${option === "list" ? "active" : ""} flex gap-5 border border-[#a9a9a9] w-[70%] px-5 py-2 cursor-pointer`}
                >
                    <img src={assets.order_icon} alt="" />
                    <p className='font-semibold text-[#555]'>List Items</p>
                </Link>

                <Link to="/orders" onClick={() => setOption("orders")} className={`${option === "orders" ? "active" : ""} flex gap-5 border border-[#a9a9a9] w-[70%] px-5 py-2 cursor-pointer`}
                >
                    <img src={assets.order_icon} alt="" />
                    <p className='font-semibold text-[#555]'>Orders</p>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
