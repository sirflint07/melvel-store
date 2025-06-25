import { Check, X } from 'lucide-react';
import React from 'react'

export const PasswordMeterBar = ({password}) => {

const passwordStrength = (pass) => {
  let strength = 0
  if (pass.length >=6) strength++;
  if (pass.match(/[A-Z]/) && password.match(/[a-z]/)) strength++
  if (pass.match(/\d/)) strength++
  if (pass.match(/[^a-zA-Z\d]/)) strength++

  return strength
}

let getStrengthtext = (strength) => {
  switch (strength) {
    case 0:
      return 'Very Weak'
    case 1:
      return 'Weak'
    case 2:
      return 'Medium'
    case 3:
      return 'Strong'
    case 4:
      return 'Very Strong'
    default:
      return ''
  }
}

const strengthText = getStrengthtext(passwordStrength(password))

const getStrengthColor = (strength) => {
  switch (strength) {
    case 0:
      return 'bg-red-500'
    case 1:
      return 'bg-red-500'
    case 2:
      return 'bg-yellow-500'
    case 3:
      return 'bg-green-500'
    case 4:
      return 'bg-green-700'
    default:
      return ''
  }
}

let numStrength = passwordStrength(password)

  return (
    <div>
      <div className='flex justify-between items-center'>
        <p className='font-light text-sm'>Password Strength</p>
        <p className='text-sm font-semibold'>{strengthText}</p>
      </div>
      <div className='flex space-x-1 m-3'>
        {Array.from({length: 4}).map((_, index) => (
          <div key={index} className={`h-2 w-1/4 transition-colors ${index < passwordStrength(password) ? getStrengthColor(numStrength) : 'bg-gray-300'} rounded mb-1`}></div>
        ))}
      </div>
    </div>
  )
}

const PasswordMeter = ({password}) => {
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contains upper case", met: /[A-Z]/.test(password) },
        { label: "Contains lower case", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        { label: "Contains a special character", met: /[^a-zA-Z0-9]/.test(password) }]
    
  return (
    <div>
      <div><PasswordMeterBar password={password}/></div>
      <div>
        {
          criteria.map((item, index) => (
            <div key={index} className='flex items-center mb-2'>
              {item.met ? (
                <span><Check className={`text-green-600 mr-2`}/></span>
              ) : (
                <span><X className={`text-gray-600 mr-2`}/></span>
              )}
              <span className='text-sm text-gray-700'>{item.label}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PasswordMeter
