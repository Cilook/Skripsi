/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import {  Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';

class Homepage extends React.PureComponent {
  render() {
    const { brands } = this.props;
    console.log(brands);
    const text1 = brands.filter(data => data.category == "Hotel Wedding Venue");
    const text2 = brands.filter(data => data.category == "Wedding Venue & Restaurant");
    const text3 = brands.filter(data => data.category == "Wedding Venue dan F&B");
    const text4 = brands.filter(data => data.category == "Wedding Gown");
    const text5 = brands.filter(data => data.category == "Groom Suit");
    const text6 = brands.filter(data => data.category == "Wedding Photo & Video");
    const text7 = brands.filter(data => data.category == "Decoration & Stylish");
    const text8 = brands.filter(data => data.category == "Wedding Cake");
    const text9 = brands.filter(data => data.category == "Wedding Planner & Organiser");
    const text10 = brands.filter(data => data.category == "MC & Entertainment");
    const text11 = brands.filter(data => data.category == "Wedding Ring & Jewelry");
    return (
      <div className='homepage'>
          <Col xs='12'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col>
          <h1 className='m-4'>Hotel Wedding Venue</h1>
          <div className='brandss-list'>
      {text1.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>Wedding Venue & Restaurant</h1>
    <div className='brandss-list'>
      {text2.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>Wedding Venue dan F&B</h1>
    <div className='brandss-list'>
      {text3.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>Wedding Gown</h1>
    <div className='brandss-list'>
      {text4.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>Groom Suit</h1>
    <div className='brandss-list'>
      {text5.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>Wedding Photo & Video</h1>
    <div className='brandss-list'>
      {text6.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>Decoration & Stylish</h1>
    <div className='brandss-list'>
      {text7.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>Wedding Cake</h1>
    <div className='brandss-list'>
      {text8.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>Wedding Planner & Organiser</h1>
    <div className='brandss-list'>
      {text9.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>MC & Entertainment</h1>
    <div className='brandss-list'>
      {text10.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    <h1 className='m-4'>Wedding Ring & Jewelry</h1>
    <div className='brandss-list'>
      {text11.slice(0, 5).map((brand, index) => (
        <div key={index} className='mb-3 mb-md-0'>
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
    </Col>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    brands: state.brand.storeBrands,
  };
};

export default connect(mapStateToProps, actions)(Homepage);
