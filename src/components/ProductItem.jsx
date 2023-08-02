import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  // Check if the product is already in the cart
  const isProductInCart = cartItems.some((item) => item.id === product.id);
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  const quantityInCart = existingCartItem ? existingCartItem.quantity : 0;

  // Add product to cart
  const handleAddToCart = useCallback(() => {
    if (!isProductInCart) {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    }
  }, [dispatch, isProductInCart, product]);

  // Increase product quantity in cart
  const handleIncreaseQuantity = () => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: product.id });
  };

  // Decrease product quantity in cart or remove if last item
  const handleDecreaseQuantity = () => {
    if (quantityInCart > 1) {
      dispatch({ type: 'DECREASE_QUANTITY', payload: product.id });
    } else {
      dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
    }
  };

  return (
    <div className='p-2 w-[145px] sm:w-[170px] lg:w-[210px] xl:w-[220px] min-h-[100px] hover:scale-[1.01] bg-white rounded-[15px]'>
      <div>
        {/* Product name */}
        <h3>{product.name}</h3>
        {/* Product image */}
        <img src={product.image} alt={product.name} className='w-[100px] !h-[80px] m-auto' />

        <div className='bg-[#f6f6f6] p-2 rounded-[15px] mt-5'>
          <div className='bg-white p-2 rounded-[15px]'>
            {/* Product title */}
            <h4 className='text-[14px] bold my-2'>{product.title.substring(12, 0)}</h4>

            <div className='flex flex-col xl:flex-row justify-between xl:items-center my-2 xl:my-4'>
              {/* Product price */}
              <p className='my-3 xl:my-0'>${product.price}</p>
              <div onClick={handleAddToCart}>
                {/* Add to cart button or quantity controls */}
                {!isProductInCart ? (
                  <button className='bg-black text-[13px] sm:text-base text-white py-2 px-3 hover:bg-[#000000a8]'>
                    {isAddingToCart ? 'Adding...' : 'Add to cart'}
                  </button>
                ) : (
                  <div>
                    <span
                      className='w-[40px] h-[40px] text-3xl text-center cursor-pointer'
                      onClick={handleDecreaseQuantity}
                    >
                      -
                    </span>
                    <input
                      type='number'
                      className='w-[40px] h-[40px] border text-center'
                      value={quantityInCart}
                      readOnly
                    />
                    <span
                      className='w-[50px] h-[50px] text-3xl text-center cursor-pointer'
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
