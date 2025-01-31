import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Descriptionbox from '../Components/DescriptionBox/Descriptionbox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  // all_product.map((value)=>{
  //   console.log("value", value.id)
  // })
  const {productid}= useParams();
  // console.log("sdcfvgbhjn",product);
  const product = all_product.find((e)=>e.id === Number(productid));
  console.log("m",product)
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <Descriptionbox/>
      <RelatedProducts/>

  </div> 
   )
}

export default Product;

