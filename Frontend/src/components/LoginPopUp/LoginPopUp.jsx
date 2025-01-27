import React, { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast, ToastContainer, Bounce } from "react-toastify";

const LoginPopUp = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up")

    const { url, setToken } = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;

        if (currState === "Login") {
            newUrl += "/user/login"
        } else {
            newUrl += "/user/register"
        }

        const res = await axios.post(newUrl, data)

        if (res.data.success) {
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setShowLogin(false)
            toast.success(res.data.message, {
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
        } else {
            toast.error(res.data.message, {
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
    }



    return (
        <div className='absolute z-10 bg-[#00000090] w-[100%] h-[100%] flex justify-center items-center'>
            <div className='bg-white h-fit login w-fit rounded-lg '>
                <form onSubmit={onLogin} action="" className='px-8 py-8 rounded-md'>
                    <div className='flex justify-between'>
                        <h2 className='text-[24px] font-semibold text-[#262626]'>{currState}</h2>
                        <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} className='cursor-pointer h-5' />
                    </div>

                    <div className='flex flex-col gap-5 mt-5'>

                        {currState === "Login"
                            ? <></>
                            : <input onChange={onChangeHandler} value={data.name} className='border rounded-md h-12 px-3 outline-none' type="text" placeholder='Your Name' name='name' required />}

                        <input onChange={onChangeHandler} value={data.email} className='border rounded-md h-12 px-3 outline-none' type="email" placeholder='Your Email' name='email' required />
                        <input onChange={onChangeHandler} value={data.password} className='border rounded-md h-12 px-3 outline-none' type="password" placeholder='Password' name='password' required />
                    </div>

                    <button type='submit' className='mt-5 bg-[tomato] w-full h-12 rounded-md text-white font-semibold'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>

                    <div className='flex gap-3 mt-5 text-sm text-[#666]'>
                        <input type="checkbox" required />
                        <p>By Continuing, i agree to the terms of use & privacy policy </p>
                    </div>

                    {currState === "Login"
                        ? <p className='mt-5 text-[#555] font-medium'>Create an account ? <span className='font-semibold text-[tomato] cursor-pointer underline' onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                        : <p className='mt-5 text-[#555] font-medium'>Already have an account ? <span className='font-semibold text-[tomato] cursor-pointer underline' onClick={() => setCurrState("Login")}>Login here</span></p>}


                </form>
            </div>
        </div>
    )
}

export default LoginPopUp
