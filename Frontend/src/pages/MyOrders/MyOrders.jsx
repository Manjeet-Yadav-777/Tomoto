import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(url + "/order/userorders", { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);


    return (
        <div className='px-10 py-10'>
            <h2 className='text-2xl mb-4 font-semibold'>My Orders</h2>

            <div className='flex flex-col gap-[20px]'>
                {data.map((order, index) => {
                    return (
                        <div className='grid grid-flow-row gap-[30px] grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] border border-[#ffe1e1e1] items-center px-10 py-5'>
                            <img src={assets.parcel_icon} alt="" className='h-10' />
                            <p className='text-sm font-semibold text-wrap text-[#555555]'>{order.items.map((items, index) => {
                                if (index === order.items.length - 1) {
                                    return items.name + " x " + items.quantity
                                } else {
                                    return items.name + " x " + items.quantity + " | "
                                }
                            })}</p>

                            <p className='font-bold text-green-500'>${order.amount}</p>
                            <p className='font-semibold text-[#555555]'>Items : {order.items.length}</p>
                            <p className='text-[#555555]'><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={() => fetchOrders()} className='px-8 py-3 font-semibold text-[#555555] text-sm bg-[#ffe1e1]'>Track</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
