import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../assets/admin_assets/assets';
import { toast, ToastContainer, Bounce } from "react-toastify";

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list");

        if (response.data.success) {
            setOrders(response.data.data)
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

    const statusHandler = async (e, orderId) => {
        const response = await axios.post(url + "/order/status", { orderId, status: e.target.value })
        if (response.data.success) {
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();
    })

    return (
        <div className='p-10 w-[80%]'>
            <h2 className='text-2xl text-[#555] font-semibold mb-10'>Order Page</h2>
            <div className='flex flex-col gap-[20px]'>
                {orders.map((order, index) => {
                    return (
                        <div key={index} className='grid gap-[30px] grid-cols-[0.5fr_2fr_1fr_1fr_1fr] border border-[#ffe1e1e1] items-start px-10 py-5'>
                            <img src={assets.parcel_icon} alt="" />

                            <div className='flex flex-col gap-2'>
                                <p className='text-sm font-semibold text-wrap text-[#555555]'>
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        } else {
                                            return item.name + " x " + item.quantity + " | "
                                        }
                                    })}
                                </p>

                                <p className='text-sm font-semibold text-wrap text-[#555555]'>{order.address.firstname + " " + order.address.lastname}</p>
                                <div>
                                    <p className='text-sm font-semibold text-wrap text-[#555555]'>{order.address.street + ", "}</p>
                                    <p className='text-sm font-semibold text-wrap text-[#555555]'>{order.address.city + ", " + order.address.state + ", " + order.address.country + "," + order.address.zipcode}</p>
                                </div>

                                <p className='text-sm font-semibold text-wrap text-[#555555]'>{order.address.phone}</p>
                            </div>
                            <p className='font-semibold text-[#555555]'>Items : {order.items.length}</p>
                            <p className='text-green-500 font-bold'>${order.amount}</p>

                            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} name="" id="" className='border border-black px-2 py-3 font-bold text-[#555] outline-none bg-[#ffe1e1] border-none'>
                                <option value="Processing">Processing</option>
                                <option value="Out For Delivery">Out For Delivery</option>
                                <option value="Deliverd">Deliverd</option>
                            </select>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders
