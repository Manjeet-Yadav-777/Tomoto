import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext);

    return (
        <div className='px-28 mt-5'>
            <h2 className='text-[#262626] font-semibold text-[24px]'>Top dishes near you</h2>
            <div className='displayanim my-10 flex flex-wrap justify-between gap-10 transition-shadow'>
                {food_list.map((item, index) => {
                    if (category == "All" || category === item.category) {
                        return (
                            <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
