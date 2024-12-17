import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { product_get } from '../redux/counter/productById'
import { useParams } from 'react-router-dom'
import Review from './Review'
import ReviewCard from './ReviewCard'
import axios from 'axios'
import { cart_add } from '../redux/counter/addToCart'
import { IoCheckmark } from "react-icons/io5";
function ProductDetail() {
  const dispatch = useDispatch()
  const { id } = useParams();
  const [color,setColor]=useState("grey")
  const [size,setSize]=useState("small")
  const [text,setText]=useState("Add to Cart")
  const detail={
    quantity:1,
    variant:{
      color:color,
      size:size
    }
  }
  const headers={
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTI5OThmZWVkZWE5OGQ5NmFhMDYwZCIsImlhdCI6MTczNDAyNDcwOCwiZXhwIjoxNzM2NjE2NzA4fQ.3gkuzPhm18OGWe4AgNMkCkIG3qc_AMnLI7OQLkMLHVI"
  }
  const add_cart=async ()=>{
    try {
      axios.put(`http://localhost:5000/api/cart/add/${id}`, detail,{headers})
      .then((response) => {
          
          return response.data.sucess;
      })
      .catch((e) => console.log('something went wrong :(', e))
    } catch (error) {
      console.log(error)
    }
   
    
  }
  
  useEffect(() => {
    dispatch(product_get(id))

  }, [dispatch])
  const { data, error } = useSelector((state) => state.product_id)

  const product_data = data?.product
  
  return (
    <>

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/3 w-full lg:h-[30rem] h-96 object-fill object-center rounded" src={product_data?.image} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product_data?.name}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">{product_data?.reviews.length} Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product_data?.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                
                <div className="flex flex-wrap gap-3">
                  
                  <label htmlFor="grey" className="block size-6 cursor-pointer rounded-full bg-gray-600 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-gray-700 has-[:checked]:ring-offset-2"><input type="radio" name="ColorOption" value="grey" id="grey" className="sr-only" onChange={(e)=>{setColor(e.target.value)}} checked={color==="grey"}/>
                  </label>
                  <label htmlFor="orange" className="block size-6 cursor-pointer rounded-full bg-orange-400 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-orange-500 has-[:checked]:ring-offset-2">
                    <input type="radio" name="ColorOption" value="orange" id="orange" checked={color==="orange"} onChange={(e)=>{setColor(e.target.value)}} className="sr-only" />
                  </label>
                  <label htmlFor="blue" className="block size-6 cursor-pointer rounded-full bg-blue-500 shadow-sm has-[:checked]:ring-2 has-[:checked]:ring-blue-500 has-[:checked]:ring-offset-2">
                    <input type="radio" name="ColorOption" value="blue" id="blue" checked={color==="blue"} className="sr-only" onChange={(e)=>{setColor(e.target.value)}}/>
                  </label>
                </div>
                
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10" onChange={(e)=>{setSize(e.target.value)}} defaultValue={size}>
                      <option value="small">SM</option>
                      <option value="medium">M</option>
                      <option value="large">L</option>
                      <option value="xl">XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">${product_data?.price}.00</span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => {
                 
                  
                  add_cart()
                  setText("Item Added")


                }} disabled={text!=="Item Added"?false:true}>{text}<IoCheckmark className={`mt-1 ml-2 ${text!=="Item Added"?"hidden":""} scale-110`}/></button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Review />
      <ReviewCard />
    </>
  )
}

export default ProductDetail
