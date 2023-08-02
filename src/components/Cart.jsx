import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cancelIcon from '../assets/cancelIcon.png';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [loadingItemId, setLoadingItemId] = useState(null);

  // Calculate the total price of items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Remove an item from the cart
  const handleRemoveFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  return (
    <div className='flex-[2] p-5 border border-1 md:sticky md:h-[100vh] top-0'>
      <div className='h-[100%] overflow-auto'>
        <h1 className='text-[30px] font-bold'>My Cart</h1>
        {cartItems.length === 0 ? (
          // Display a message when cart is empty
          <p>Your cart is empty.</p>
        ) : (
          <div className='overflow-y-scroll'>
            {cartItems.map((item) => (
              <div className='flex gap-10 items-center justify-between' key={item.id}>
                {/* Cancel Icon */}
                <img
                  src={cancelIcon}
                  width={'30px'}
                  height={'30px'}
                  className='cursor-pointer'
                  onClick={() => handleRemoveFromCart(item.id)}
                />

                {/* Cart Item */}
                <div className='flex items-center my-4 border justify-between p-5 w-[100%]'>
                  <div className='p-5 bg-white'>
                    <img src={item.image} alt={item.title} width='50' height='50' />
                  </div>
                  <div className='ml-4 text-[12px] flex flex-col gap-5 text-start'>
                    <h3 className='font-bold'>{item.title.substring(0, 20)}...</h3>
                    <div className='flex flex-row justify-between'>
                      <p>
                        {item.quantity} * {item.price}
                      </p>
                      <p className='font-[600]'>${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Checkout Section */}
      {cartItems.length !== 0 && (
        <div className='flex flex-col lg:bottom-[170px] relative text-[30px] bg-black p-5 gap-10'>
          <div className='flex flex-row justify-between text-white'>
            <h2>Total Cart Price:</h2>
            <h2> ${getTotalPrice()}</h2>
          </div>
          <div className='w-[100%] flex justify-center'>
            <button className='bg-white px-3 py-2 min-w-[300px] w-[100%] m-auto'>Checkout</button>
          </div>
        </div>
      )}
      {/* Loading Indicator */}
      {loadingItemId && <div className='modal'>Loading...</div>}
    </div>
  );
};

export default CartPage;
