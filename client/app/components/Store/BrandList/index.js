/**
 *
 * BrandList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const BrandList = props => {
  const { brands } = props;

  return (
    <div className='brand-list'>
      <h3 className='text-uppercase'>All Vendor</h3>
      <hr />
      <div className='brandss-list'>
      {brands.map((brand, index) => (
        <div className='mb-3 mb-md-0'>
          <div className='product-container'>
            <div className='item-box'>
              <div className='item-link'>
                <Link
                  to={`/shop/brand/${brand.slug}`}
                  className='d-flex flex-column h-100'
                >
                  <div className='item-image-container'>
                    <div className='item-image-box'>
                      <img
                        className='item-image'
                        src={brand.imageUrl}
                      />
                    </div>
                  </div>
                  <div className='item-body'>
                    <div className='item-details p-3'>
                      <h1 className='item-name'>{brand.name}</h1>
                    </div>
                  </div>
                  <div className='d-flex flex-row justify-content-between align-items-center px-4 mb-2'>
                  <p className='item-desc mb-0'>{brand.category}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BrandList;
