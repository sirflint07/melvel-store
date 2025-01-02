import React from 'react'

const Button = ({title}) => {
  return (
    <button className='button text-base font-semibold button-text cursor-pointer'>
      {title}
    </button>
  )
}

export default Button;