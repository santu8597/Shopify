import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../redux/counter/productDetailSlice'
import { Link } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])
  const { data, loading, error } = useSelector((state) => state.product_all)


  return (
    <>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">


          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data?.map((product, id) => (
              <div key={id} className="group relative">
                <img
                  alt={product?.imageAlt}
                  src={product?.image}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/${product?._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product?.name}
                      </Link>
                    </h3>

                  </div>
                  <p className="text-sm font-medium text-gray-900">{product?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )



}

export default Home
