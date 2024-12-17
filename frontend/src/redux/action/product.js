import axios from "axios"

import {
    PRODUCT_LIST_REQ,
    PRODUCT_LIST_REQ_SUCESS,
    PRODUCT_LIST_REQ_FAIL,
    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCESS,
    PRODUCT_DETAIL_REQ_FAIL,


} from '../constants/product'

export const productListAction=()=>async (dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQ})
    const data=await axios.get(`http://localhost:5000/api/products/all`)
    
    dispatch({type:PRODUCT_LIST_REQ_SUCESS,payload:data})
    } catch (error) {
      dispatch({
        type:PRODUCT_LIST_REQ_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message:error.message
      })  
    }
    
}
//product action
export const productAction=(id)=>async (dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAIL_REQ})
    const {data}=await axios.get(`http://localhost:5000/api/products/${id}`)
    dispatch({type:PRODUCT_DETAIL_REQ_SUCESS,payload:data})
    } catch (error) {
      dispatch({
        type:PRODUCT_DETAIL_REQ_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message:error.message
      })  
    }
    
}