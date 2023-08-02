import React, { useState } from 'react';
import ProductItem from './ProductItem';
import useFetch from '../hooks/useFetch';

const ProductList = () => {
    // Fetch products using custom useFetch hook
    const { products, loading, error } = useFetch('/products');
    
    // State to manage the number of displayed products
    const [displayed, setDisplayed] = useState(8);

    // Slice the products array to show only the displayed number
    const displayedProducts = products.slice(0, displayed);

    return (
        <div className='flex flex-[3] flex-col md:p-5'>
            <div className="bg-[grey] px-5 pt-[30px] pb-[120px] sm:px-10 bg-[url('/bg-.jpg')] bg-bottom bg-cover bg-no-repeat flex flex-col gap-10">
                {/* Search input */}
                <input type='search' className='bg-white w-[100%] md:w-[90%] h-[50px] rounded py-2 pl-5' placeholder='search' />

                <div className='bg-[black] text-white p-[30px]'>
                    {/* Discount banner */}
                    <h1 className='text-[36px] lg:text-[56px]'>50% off all products</h1>
                </div>
            </div>
            <div className='flex flex-[3] flex-row gap-5 flex-wrap z-[1] overflow-auto relative top-[-70px]'>
                {/* Loading state */}
                {loading ? (
                    <p>Loading...</p>
                ) : 
                // Error state
                error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className='flex flex-wrap gap-4 sm:gap-10 justify-center'>
                        {/* Displayed products */}
                        {displayedProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                )}
                {/* Load More button */}
                {products.length === 0 ? null : (
                    <button
                        onClick={() => setDisplayed(displayed + 3)}
                        data-aos="fade-up"
                        className='bg-black text-white p-2 flex m-auto my-14'
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductList;
