import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/admin_assets/assets'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Add = () => {

    const url = 'http://localhost:5000/api'

    const { addItem } = useContext(AdminContext)

    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onchangeHandler = async (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(data => ({
            ...data, [name]: value
        }))
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("image", image)

        const response = await axios.post(`${url}/food/add`, formData);


        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })

            setImage(false)

            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }

    }


    return (
        <div className='w-[70%] ml-[5vw] mt-[20px] text-[#6d6d6d] text-[16px]'>
            <form onSubmit={onSubmitHandler} action="" className='flex flex-col gap-[20px]'>
                <div className='flex flex-col gap-2'>
                    <p>Upload Image</p>
                    <label htmlFor="image" className='w-fit'>
                        <img className='w-[120px]' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>

                    <input className='' id='image' name='image' onChange={(e) => setImage(e.target.files[0])} type="file" hidden required />
                </div>

                <div className='flex flex-col gap-2 w-[70%]'>
                    <p>Product Name</p>
                    <input onChange={onchangeHandler} value={data.name} name='name' className='border rounded-sm h-10 px-5 outline-none border-[#a9a9a9]' type="text" placeholder='Write Name' />
                </div>

                <div className='flex flex-col gap-2 w-[70%]'>
                    <p>Product Description</p>
                    <textarea onChange={onchangeHandler} name='description' value={data.description} className='border rounded-sm px-5 py-2 outline-none border-[#a9a9a9] resize-none' rows="4" placeholder='Write description here' />
                </div>

                <div className='flex gap-10'>
                    <div className='flex flex-col gap-2'>
                        <p>Product Category</p>
                        <select onChange={onchangeHandler} value={data.category} name="category" id="" className='border h-10 px-3 outline-none rounded-sm border-[#a9a9a9]'>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p>Product Price</p>
                        <input value={data.price} onChange={onchangeHandler} className='border rounded-sm h-10 w-[130px] px-3 outline-none border-[#a9a9a9]' type="Number" name='price' placeholder='$20' />
                    </div>

                </div>


                <button type='submit' className='bg-[#111] w-fit px-10 py-3 mt-2 text-white font-semibold'>ADD PRODUCT</button>
            </form>
        </div>
    )
}

export default Add
