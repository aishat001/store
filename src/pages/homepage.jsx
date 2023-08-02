import React from 'react'
import ProductList from '../components/ProductList'
import CartPage from '../components/Cart'

const Homepage = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row gap-10 justidy-between lg:max-w-[95%] m-auto'>
    <ProductList />
    <CartPage/>
    </div>  )
}

export default Homepage