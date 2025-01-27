import React from "react";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
    return (
        <div className="text-[#d9d9d9] mt-20 bg-[#323232] flex flex-col items-center gap-[20px] px-28 py-[4vw] pt-[80px]">
            <div className="w-[100%] grid grid-cols-[2fr_1fr_1fr]">
                <div>
                    <img src={assets.logo} alt="" />
                    <p className="text-sm w-96 mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam soluta illo, impedit rem ullam adipisci, dolores, quae earum explicabo ducimus magni possimus similique veritatis nostrum cum quibusdam ex facilis dolor.
                    </p>

                    <div className="flex mt-5 gap-5">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <h2 className="text-[24px] font-semibold">Company</h2>

                    <ul className="flex flex-col gap-2">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-5">
                    <h2 className="text-[24px] font-semibold">GET IN TOUCH</h2>

                    <ul className="flex flex-col gap-2">
                        <li>+78367291836</li>
                        <li>Contact@email.com</li>
                    </ul>
                </div>
            </div>
            <hr />

            <p>Copyright 2025 © Tomoto.com All Right Reserved.</p>
        </div>
    );
};

export default Footer;
