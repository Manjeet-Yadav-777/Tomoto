import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [load, setLoad] = useState(false)
    const url = "https://tomoto-backend.onrender.com/api";

    // Initial data load
    useEffect(() => {
        async function loadData() {
            try {
                await fetchFood();
                const savedToken = localStorage.getItem("token");
                if (savedToken) {
                    setToken(savedToken);
                    await loadCartData(savedToken);
                }
            } catch (error) {
                console.error("Error during initialization:", error);
            }
        }
        loadData();
    }, [load]);

    // Add item to cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
        }));

        if (token) {
            try {
                const response = await axios.post(`${url}/cart/add`, { itemId }, { headers: { token } });

                if (response.data.success) {
                    toast.success(response.data.message, {
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
                    toast.error(response.data.message, {
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
        }
    };

    // Decrease item quantity in cart
    const removeCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });

        if (token) {
            try {
                const response = await axios.post(`${url}/cart/remove`, { itemId }, { headers: { token } });

                if (response.data.success) {
                    toast.error(response.data.message, {
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
                    toast.error(response.data.message, {
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
                toast.error(response.data.message, {
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
    };

    // Calculate total cart value
    const getTotal = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const item = food_list.find((product) => product._id === itemId);
            return item ? total + item.price * quantity : total;
        }, 0);
    };

    // Fetch food list
    const fetchFood = async () => {
        try {
            const response = await axios.get(`${url}/food/list`);
            setFoodList(response.data.data || []);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Load cart data for logged-in user
    const loadCartData = async (token) => {
        try {
            const response = await axios.get(`${url}/cart/get`, { headers: { token } });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Context value
    const contextValue = {
        cartItems,
        food_list,
        url,
        token,
        setToken,
        addToCart,
        removeCart,
        getTotal,
        load,
        setLoad,
        loadCartData
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
