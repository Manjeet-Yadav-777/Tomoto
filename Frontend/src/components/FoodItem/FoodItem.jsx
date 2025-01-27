import React, { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {

    const { addToCart, removeCart, cartItems } = useContext(StoreContext);
    const url = "https://tomoto-backend.onrender.com"


    return (
        <div className='w-[300px] shadow-md rounded-md'>
            <div className='overflow-hidden relative'>
                <img src={url + "/images/" + image} className='rounded-tl-md rounded-tr-md' alt="" />

                {
                    !cartItems[id] ? <img onClick={() => addToCart(id)} src={assets.add_icon_white} className='w-[50px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-full' /> :

                        <div className='flex absolute bottom-[15px] right-[15px] items-center gap-3 cursor-pointer rounded-full p-[6px] bg-white'>
                            <img onClick={() => removeCart(id)} className='cursor-pointer' src={assets.remove_icon_red} alt="" />

                            <p className='font-semibold'>{cartItems[id]}</p>

                            <img onClick={() => addToCart(id)} className='cursor-pointer' src={assets.add_icon_green} alt="" />
                        </div>
                }





            </div>

            <div className='my-5 px-5'>
                <div className='flex justify-between'>
                    <p className='text-[#262626] font-semibold text-lg'>{name}</p>
                    <img src={assets.rating_starts} className='h-4' alt="" />
                </div>

                <p className='mt-3 text-sm text-[#666]'>{description}</p>
                <p className='text-2xl mt-3 font-bold text-red-500'>${price}</p>
            </div>
        </div>
    )
}

export default FoodItem
