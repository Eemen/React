import React from 'react';

const Header = () => {
    return (
        <div id="header-wrapper" className="w-full p-[40px_50px]">
            <div id="img-wrapper" className="absolute z-[1000]">
                <img src="/public/Logo.png" alt="WolfFlix" className="w-[300px] h-auto bg-gradient-to-l from-black to-transparent" />
            </div>
            <div id="search-wrapper" className="absolute w-full flex justify-center top-12 z-[1000]">
                <input
                    type="text"
                    id="search"
                    placeholder="Search in WolfFlix"
                    className="border-none rounded-[10px] text-white bg-black h-12 w-80 text-2xl mt-[18px] focus:outline-none"
                />
                <button id="search-btn" className="mt-[18px] h-[70px] w-[70px] bg-black ml-[-10px]">Search</button>
            </div>
        </div>
    );
};

export default Header;