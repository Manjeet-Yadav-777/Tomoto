import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer, Bounce } from "react-toastify";

const PlaceOrder = () => {

    const { cartItems, food_list, removeItem, url, getTotal, token, load, setLoad } = useContext(StoreContext)
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault();
        try {
            let orderItems = [];
            food_list.forEach((item) => {
                if (cartItems[item._id] > 0) {
                    let itemInfo = { ...item, quantity: cartItems[item._id] };
                    orderItems.push(itemInfo);
                }
            });


            if (orderItems.length === 0) {
                return alert("Cart is empty! Please add items to place an order.");
            }

            let orderData = {
                address: data,
                items: orderItems, // Ensure the key matches the backend
                amount: getTotal() + 2,
            };


            const response = await axios.post(url + "/order/place", orderData, {
                headers: { token },
            });

            if (response.data.success) {

                setData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    street: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    country: "",
                    phone: ""
                })

                toast.success("Order Placed Successfully", {
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
        } catch (error) {
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
    };


    useEffect(() => {
        if (!token) {
            navigate('/cart')
            toast.error("Login First", {
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
        } else if (getTotal() === 0) {
            navigate('/cart')
            toast.error("Add Items To Proceedd", {
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
    }, [token])


    return (
        <form onSubmit={placeOrder} className='place-order flex px-28 py-10'>
            <div className="place-left w-[60%]">
                <p className='title text-[24px] text-[#555] font-semibold mb-10'>Delivery Information</p>

                <div className="multi flex gap-3">
                    <input name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" className='border h-10 w-[250px] rounded-md px-5' placeholder='First Name' />
                    <input name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" className='border h-10 w-[250px] rounded-md px-5' placeholder='Last Name' />
                </div>

                <input name='email' onChange={onChangeHandler} value={data.email} type="email" className='w-[512px] rounded-md mt-4 px-5 h-10 border' placeholder='Email address' />
                <input name='street' onChange={onChangeHandler} value={data.street} type="text" className='w-[512px] rounded-md mt-4 px-5 h-10 border' placeholder='Street' />

                <div className="multi flex gap-3 mt-4">
                    <input name='city' onChange={onChangeHandler} value={data.city} type="text" className='border h-10 w-[250px] rounded-md px-5' placeholder='City' />
                    <input name='state' onChange={onChangeHandler} value={data.state} type="text" className='border h-10 w-[250px] rounded-md px-5' placeholder='State' />
                </div>

                <div className="multi flex gap-3 mt-4">
                    <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" className='border h-10 w-[250px] rounded-md px-5' placeholder='Zip Code' />
                    <input name='country' onChange={onChangeHandler} value={data.country} type="text" className='border h-10 w-[250px] rounded-md px-5' placeholder='Country' />
                </div>

                <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' className='w-[512px] rounded-md mt-4 px-5 h-10 border' />
            </div>

            <div className="place-right w-[40%]">
                <div>
                    <h2 className='text-[24px] text-[#555] font-semibold'>Cart Details</h2>
                    <div className=' mt-10'>
                        <div className="flex justify-between text-[#999]">
                            <p>Subtotal</p>
                            <p>${getTotal()}</p>
                        </div>
                        <hr className='my-[10px]' />

                        <div className="flex justify-between text-[#999]">
                            <p>Delivery Fee</p>
                            <p>${2}</p>
                        </div>
                        <hr className='my-[10px]' />

                        <div className="flex justify-between text-[#999]">
                            <p className='text-[#666] font-semibold'>Total</p>
                            <p className='text-[#666] font-semibold'>${getTotal() + 2}</p>
                        </div>


                        <div className='my-5'>
                            <h1 className='text-[24px] text-[#555] font-semibold'>Payment Method</h1>

                            <div className='flex gap-5'>
                                <div className='border flex items-center justify-center rounded-lg border-red-400 cursor-pointer w-48 h-16 mt-5'>
                                    <p className='text-[12px] font-bold text-[#555]'>CASH ON DELIVERY</p>
                                </div>
                                <div className='border rounded-lg border-[#999] w-60 h-16 mt-5 cursor-pointer flex justify-center items-center'>
                                    <p className='text-[12px] font-bold text-[#555]'>UPI NOT AVAILABLE CURRENTLY !</p>
                                </div>
                            </div>

                        </div>

                        <button type='submit' onClick={() => navigate("/myorders")} className='border-none mt-5 text-sm font-semibold rounded-md px-10 text-white bg-[tomato] py-[12px]'>PROCEED TO CHEAKOUT</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
