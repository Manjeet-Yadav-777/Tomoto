import React, { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { toast, ToastContainer, Bounce } from "react-toastify";

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home")
    const { token, setToken } = useContext(StoreContext)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        setToken("")
        navigate("/")
        toast.success("Logout Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    return (
        <div className='h-[12vh] w-[100vw] shadow-md flex justify-between items-center px-28 navbar'>
            <Link to="/"><img src={assets.logo} alt="logo" className='h-[30px]' /></Link>

            <ul className='flex gap-5 text-[#555] font-medium'>
                <Link to="/"><li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</li></Link>
                <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
                <li onClick={() => setMenu("mobile")} className={menu === "mobile" ? "active" : ""}>mobile app</li>
                <li onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>contact us</li>
            </ul>

            <div className='flex gap-10 items-center relative'>

                <img src={assets.search_icon} alt="" />


                <div className='h-10 flex justify-center items-center'>
                    <Link to="/cart"><img className='' src={assets.basket_icon} alt="" /></Link>
                    <div className='dot absolute left-[92px] bottom-8 bg-red-500 cursor-pointer h-3 w-3 rounded-full'></div>
                </div>
                {!token ? <Link to="" onClick={() => setShowLogin(true)} className='border px-8 py-3 rounded-full border-[#777] text-[#555]' >sign in</Link>
                    :
                    <Link to="" onClick={() => logout()} className='border px-8 py-3 rounded-full border-[#777] text-[#555]'>Logout</Link>

                }


            </div>
        </div>
    )
}

export default Navbar
