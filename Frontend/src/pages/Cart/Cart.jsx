import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems, food_list, removeItem, getTotal, removeCart } = useContext(StoreContext);
    const url = "http://localhost:5000";
    const navigate = useNavigate();

    if (!food_list.length) {
        return <p className="text-center mt-10">Loading cart...</p>;
    }

    return (
        <div className="mt-10">
            <div className="flex justify-center">
                <Link to="/myorders" className="bg-green-500 text-white font-semibold px-10 py-2 rounded-md">
                    Your Orders
                </Link>
            </div>
            <div className="px-28 cart">
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Items</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Decreas</p>
                    </div>
                    <br />
                    <hr />

                    {Object.keys(cartItems).length > 0 ? (
                        Object.keys(cartItems).map((itemId) => {
                            const item = food_list.find((food) => food._id === itemId);
                            if (!item) return null;

                            return (
                                <div key={itemId}>
                                    <div className="cart-items-title cart-items-item">
                                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                                        <p>{item.name}</p>
                                        <p>${item.price.toFixed(2)}</p>
                                        <p>{cartItems[itemId]}</p>
                                        <p>${(item.price * cartItems[itemId]).toFixed(2)}</p>
                                        <p onClick={() => removeCart(itemId)} className="cross text-xl">
                                            ➖
                                        </p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center mt-10">Your cart is empty!</p>
                    )}
                </div>

                <div className="mt-[80px]">
                    <h2 className="text-[24px] text-[#555] font-semibold">Cart Totals</h2>

                    <div className="cart-total flex gap-28">
                        <div className="w-[50%] mt-10">
                            <div className="flex justify-between text-[#999]">
                                <p>Subtotal</p>
                                <p>${getTotal().toFixed(2)}</p>
                            </div>
                            <hr className="my-[10px]" />

                            <div className="flex justify-between text-[#999]">
                                <p>Delivery Fee</p>
                                <p>${2.0.toFixed(2)}</p>
                            </div>
                            <hr className="my-[10px]" />

                            <div className="flex justify-between text-[#999]">
                                <p className="text-[#666] font-semibold">Total</p>
                                <p className="text-[#666] font-semibold">${(getTotal() + 2).toFixed(2)}</p>
                            </div>

                            <button
                                onClick={() => navigate("/order")}
                                className="border-none mt-5 text-sm font-semibold rounded-md px-10 text-white bg-[tomato] py-[12px]"
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>

                        <div className="w-[50%]">
                            <div className="flex flex-col">
                                <p className="text-md text-[#666]">If you have a promocode, Enter it here</p>

                                <div className="promo-input mt-5 flex">
                                    <input
                                        type="text"
                                        className="border h-12 px-5 w-[350px] rounded-l-md outline-none font-bold bg-[#f3f1f1]"
                                        placeholder="Promo Code"
                                    />
                                    <button className="bg-black font-semibold text-white px-10 rounded-r-md">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
