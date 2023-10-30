import React from "react";

const Navbar = () => {
  return (
    <nav className='bg-violet-500 w-full h-16 flex items-center px-5 fixed top-0 left-0 z-10'>
      <h2 className='text-white text-4xl font-semibold tracking-wider'>
        TaskTrack
      </h2>
    </nav>
  );
};

export default Navbar;
