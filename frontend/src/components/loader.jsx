import React from "react";
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'



const CustomLoader = () => {
  return (
    // Default values shown
        <Spiral
        size="40"
        speed="0.9"
        color="blue" 
        />  
  );
};

export default CustomLoader;
