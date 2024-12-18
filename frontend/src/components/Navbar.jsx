import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import {Link,useNavigate} from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { BsBox } from "react-icons/bs";
import { IoLogInOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { cart_get } from "../redux/counter/cartDetail";

export default function Navbar() {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(cart_get())
  },[])
  const { data, error } = useSelector((state) => state.cart_all)
  const [isMobile, setIsmobile] = useState(false);
  const s1 =
    "w-screen h-12 flex items-center justify-start md:w-fit md:h-fit md:p-2 cursor-pointer text-md pl-12 md:pl-0";
    

  return (
    <>
      <nav className="h-16 bg-slate-50 w-screen flex items-center justify-between sticky top-0 z-50 shadow-md transition-all">
        <div className="flex items-center ml-4">
          <img
            src="https://cdn.vectorstock.com/i/500p/99/22/eco-friendly-green-circle-badge-with-tree-leaf-vector-29079922.jpg"
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <p className="ml-4 text-lg text-slate-800 min-w-fit font-mono">Eco Wrap</p>
        </div>
        <ul className={
            isMobile
              ? "items-center justify-evenly flex-col md:bg-slate-50 absolute right-0 top-[4rem] w-screen h-screen md:flex-row md:static md:w-[40rem] md:h-16 md:bg-transparent md:flex bg-white pt-4 md:pt-0"
              : "items-center justify-evenly flex-col md:bg-slate-50 absolute right-0 top-[4rem] w-screen h-screen md:flex-row md:static md:w-[40rem] md:h-16 md:bg-transparent hidden md:flex bg-white pt-4 md:pt-0" }
             
              >
          <li className={s1} onClick={() => {
            navigate('/')
            setIsmobile(false);

           
          }}><p className="mr-2 md:hidden font-mono"><GrHomeRounded/></p>Home
            </li>
<li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
  <p role="button" className="relative flex" onClick={()=>{navigate('/cart')}}>
    <svg className="flex-1 w-8 h-8 fill-current" viewBox="0 0 24 24" >
      <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
      </svg>
    <span className={`${data?.length===0?"hidden":""} absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center`}>{data?.length}
    </span>
  </p>
</li>
          <li className="w-screen cursor-pointer h-12 flex items-center justify-start md:w-fit md:h-16 md:p-2 peer/product pl-12 md:pl-0">
          Product<MdOutlineArrowDropDown />
          </li>
          <ul className="hidden z-50 peer-hover/product:block md:absolute md:z-20 md:top-16 md:right-[12rem] hover:block md:border md:border-zinc-200 md:bg-white w-[12rem] md:rounded-md">
            <Link to="/paperBag" className="w-screen cursor-pointer h-12 flex items-center md:justify-center pl-20 md:pl-0 md:w-full md:h-fit md:p-2 md:bg-white md:hover:bg-slate-100 md:rounded-t-md" onClick={() => {
            setIsmobile(false);
          }}>Paper Bag</Link>
            <Link to="/honeyComb" className="w-screen cursor-pointer h-12 flex items-center md:justify-center pl-20 md:pl-0 md:w-full md:h-fit md:p-2 md:bg-white md:hover:bg-slate-100" onClick={() => {
            setIsmobile(false);
          }}>Honeycomb wrap</Link>
            <Link to="/paperTapes" className="w-screen cursor-pointer h-12 flex items-center md:justify-center pl-20 md:pl-0 md:w-full md:h-fit md:p-2 md:bg-white md:hover:bg-slate-100" onClick={() => {
            setIsmobile(false);
          }}>Paper Adhesive</Link>
           <Link to="/foodPack" className="w-screen cursor-pointer h-12 flex items-center md:justify-center pl-20 md:pl-0 md:w-full md:h-fit md:p-2 md:bg-white md:hover:bg-slate-100 text-center md:rounded-b-md" onClick={() => {
            setIsmobile(false);
          }}>Food Grade Package</Link>
          </ul>

           
           <li className={s1}  onClick={() => {
            setIsmobile(false);
            
          }}>
            <p className="mr-2 md:hidden font-mono"><IoLogInOutline /></p>Sign in
          </li>

        </ul>
        <button
          className="md:hidden text-xl mr-4 scale-150"
          onClick={() => {
            setIsmobile(!isMobile);
          }}
        >
          {isMobile ? <RxCross2 /> : <RxHamburgerMenu />}
        </button>
      </nav>
    </>
  );
}
