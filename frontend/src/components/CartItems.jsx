import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AiOutlineDelete } from "react-icons/ai";

function CartItems(props) {
  
  const [itemCount,setItemCount]=useState(props.count)
  const [deleted,setDeleted]=useState(false)
  const updateQuantity=async (itemQuantity)=>{
    const detail={quantity:itemQuantity}
    const headers={
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTI5OThmZWVkZWE5OGQ5NmFhMDYwZCIsImlhdCI6MTczNDAyNDcwOCwiZXhwIjoxNzM2NjE2NzA4fQ.3gkuzPhm18OGWe4AgNMkCkIG3qc_AMnLI7OQLkMLHVI"
    }
    const id=props.itemId
   const response=await axios.put(`http://localhost:5000/api/cart/${id}/updateQuantity`, detail,{headers})
  }
  const deleteItem=async()=>{
    const detail={}
    const id=props.itemId
    const headers={
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTI5OThmZWVkZWE5OGQ5NmFhMDYwZCIsImlhdCI6MTczNDAyNDcwOCwiZXhwIjoxNzM2NjE2NzA4fQ.3gkuzPhm18OGWe4AgNMkCkIG3qc_AMnLI7OQLkMLHVI"
    }
   const response=await axios.put(`http://localhost:5000/api/cart/${id}/delete`,detail,{headers})
   if(response.data.sucess){setDeleted(true)}
  }
  return (
    <>
      <div className={`${deleted?"hidden":"flex"} flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group`}>
                <div className="w-full md:max-w-[126px]">
                    <Link to={`/${props.linkToItem}`}>
                  <img src={props.image} alt="paper bag"
                    className="mx-auto rounded-xl object-cover"/></Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                  <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                      <h6 className="font-semibold text-base leading-7 text-black">{props.name}</h6>
                      <h6 className="font-normal text-base leading-7 text-gray-500 -mt-4">{`[Color:${props.variant.color},Size:${props.variant.size}]`}</h6>
                      <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">{props.price}</h6>
                      <button onClick={()=>{deleteItem()}}>{<AiOutlineDelete/>}</button>
                    </div>
                  </div>
                  <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <div className="flex items-center h-full">
                      <button
                        className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300" disabled={itemCount==1} onClick={()=>{
                          if(itemCount>1){
                            setItemCount(itemCount-1)
                            updateQuantity(itemCount-1)
                          }}}>
                        <svg className={itemCount==1?'stroke-gray-200 transition-all duration-500':'stroke-gray-800 transition-all duration-500'}
                          xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                          viewBox="0 0 22 22" fill="none">
                          <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6"
                            strokeLinecap="round" />
                          <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                            strokeLinecap="round" />
                          <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                            strokeLinecap="round" />
                        </svg>
                        </button>
                      <p
                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent">{itemCount} </p>
                      <button
                        className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300" onClick={()=>{
                          setItemCount((itemCount)=>itemCount+1)
                            updateQuantity(itemCount+1)
                        }}>
                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                          viewBox="0 0 22 22" fill="none">
                          <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                            strokeLinecap="round" />
                          <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                            strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                            strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">₹{(props.price)*itemCount}</p>
                  </div>
                </div>
              </div>
               
    </>
  )
}

export default CartItems
