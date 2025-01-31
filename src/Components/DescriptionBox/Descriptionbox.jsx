import React from 'react'
import './DescriptionBox.css'
const Descriptionbox = () => {
  return (
    <div className='descriptionbox'>
         <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box"> Description </div>
             <div className="descriptionbox-nav-boxf">Reviews (122)</div>
         </div>
         <div className="descriptionbox-description">
            <p> I. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            <p> it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
         </div>
    </div>
  )
}

export default Descriptionbox