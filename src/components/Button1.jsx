import React from 'react';

const Button1 = ({styles, buttontext}) => {
  return (
    <button type = "button" className = {`py-4 px-6 bg-blue-gradient font-medium text-[18px] text-black outline-none ${styles} rounded-[10px]`}>
        {buttontext}
    </button>
  )
}

export default Button1