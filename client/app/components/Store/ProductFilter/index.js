/**
 *
 * ProductFilter
 *
 */

 import { connect } from 'react-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'reactstrap';
import actions from '../../../actions';

import RangeSlider from '../../Common/RangeSlider';

const priceMarks = {
  1000000: { label: <p className='fw-normal text-black'>MIN</p> },
  500000000: { label: <p className='fw-normal text-black'>MAX</p> }
};

const rateMarks = {
  0: {
    label: (
      <span>
        <span className='mr-1'>5</span>
        <i
          className='fa fa-star fa-1x'
          style={{ display: 'contents' }}
          aria-hidden='true'
        ></i>
      </span>
    )
  },
  20: {
    label: (
      <span>
        <span className='mr-1'>4</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  40: {
    label: (
      <span>
        <span className='mr-1'>3</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  60: {
    label: (
      <span>
        <span className='mr-1'>2</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  80: {
    label: (
      <span>
        <span className='mr-1'>1</span>
        <i className='fa fa-star fa-1x' aria-hidden='true'></i>
      </span>
    )
  },
  100: { label: <span>Any</span> }
};

const rating = v => {
  switch (v) {
    case 100:
      return 0;
    case 80:
      return 1;
    case 60:
      return 2;
    case 40:
      return 3;
    case 20:
      return 4;
    default:
      0;
      return 5;
  }
};

const ProductFilter = props => {
  const { filterProducts , categories} = props;

  return (
    <div className='product-filter'>
      <Card className='mb-4'>
        <CardHeader tag='h3'>Price</CardHeader>
        <CardBody>
          <div className='mx-2 mb-3'>
            <RangeSlider
              marks={priceMarks}
              defaultValue={[1000000, 25000000]}
              max={500000000}
              onChange={v => {
                filterProducts('price', v);
              }}
            />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader tag='h3'>Rating</CardHeader>
        <CardBody>
          <div className='mx-2 mb-4'>
            <RangeSlider
              type='slider'
              marks={rateMarks}
              step={20}
              defaultValue={[100]}
              onChange={v => {
                filterProducts('rating', rating(v));
              }}
            />
          </div>
        </CardBody>
      </Card>
      <Card className='mt-4'>
        <CardHeader tag='h3'>Category</CardHeader>
        <CardBody>
          <div className='mx-2 mb-4'>
          <NavLink
                      to={'/shop/category/shop'}
                      activeClassName='active-link'
                      exact
                    >
                      All
                    </NavLink>
                    <br></br>
                    <hr></hr>
          {categories.map((link, index) => (
            <ul key={index}>
              <li >
              <NavLink
                      to={'/shop/category/' + link.slug}
                      activeClassName='active-link'
                      exact
                    >
                      {link.name}
                    </NavLink>
              </li>
              <hr/>
            </ul>

                ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    categories: state.category.storeCategories
  };
};

export default connect(mapStateToProps, actions)(ProductFilter);
