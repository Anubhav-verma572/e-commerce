import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  // all_product.map((value)=>{
  //   console.log("value", value.id)
  // })
  const {productid}= useParams();
  const product = all_product.find((e)=>e.id === Number(productid))
  console.log("m",product)
  return (
    <div>
      <Breadcrum product={product}/>
  </div> 
   )
}

export default Product

