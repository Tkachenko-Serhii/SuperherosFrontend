import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <NavLink to='/' className='link'>
        Home
      </NavLink>
      <NavLink to='/superheros/create' className='link'>
        Add Superhero
      </NavLink>
    </nav>
  );
};

export default Navigation;
