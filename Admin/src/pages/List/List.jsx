import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { assets } from '../../../../Frontend/src/assets/frontend_assets/assets';

const List = () => {

    const url = 'https://tomoto-backend.onrender.com/api'
    const urlForImage = 'https://tomoto-backend.onrender.com'

    const [list, setList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const fetchProducts = async () => {
        const res = await axios.get(`${url}/food/list`);

        if (res.data.success) {
            setList(res.data.data);
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }
    }

    const deleteProduct = async (id) => {
        const res = await axios.post(`${url}/food/remove`, { id });

        if (res.data.success) {
            // Use filter to remove the deleted item from the state
            setList(prevList => prevList.filter(item => item._id !== id));
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }
    }

    const confirmation = (id) => {
        const res = window.confirm("Are You Sure ?");
        if (res) {
            deleteProduct(id);
        }

        setRefresh(!refresh); // Refresh the list
    }

    useEffect(() => {
        fetchProducts();
    }, [refresh]);

    return (
        <div className='px-10 w-[70%]'>
            <div>
                <p className='my-10 text-2xl font-semibold text-[#555]'>All Foods List</p>
            </div>

            <div className='flex flex-wrap gap-10'>
                {list.map((item, index) => (
                    <div key={index} className='w-fit shadow-md rounded-md'>
                        <div className='overflow-hidden relative'>
                            <img src={`${urlForImage}/images/` + item.image} className='w-[250px] rounded-tl-md rounded-tr-md' alt="" />
                        </div>

                        <div className='py-1 px-2'>
                            <div className='flex justify-between items-center'>
                                <p className='text-[#262626] font-semibold text-lg'>{item.name}</p>
                                <img src={assets.rating_starts} className='h-4' alt="" />
                            </div>

                            <div className='flex justify-between items-center'>
                                <p className='py-1 text-[#888]'>{item.category}</p>
                                <p className='text-md font-bold text-red-500'>${item.price}</p>
                            </div>
                        </div>

                        <button className='mx-2 w-[235px] mb-4 my-2 text-white font-semibold py-1 bg-red-500' onClick={() => confirmation(item._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List;
