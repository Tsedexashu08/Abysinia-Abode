import React from 'react'
import style from '../styles/propertyCard.module.css'

function PropertyInformation(props) {/*small card with amount of property owned and sold.*/
  return (
    <div className={style.propInfo}>
      <h3>Property owned: {props.propertyAmount}</h3>
      <h3>Property sold: {props.propertySold}</h3>
    </div>
  )
}
PropertyInformation.defaultProps={
  propertyAmount:0,
  propertySold:0
 
};

export default PropertyInformation
