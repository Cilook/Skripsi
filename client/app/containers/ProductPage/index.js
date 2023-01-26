/**
 *
 * ProductPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Input from '../../components/Common/Input';

import actions from '../../actions';

import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import ProductReviews from '../../components/Store/ProductReviews';
import SocialShare from '../../components/Store/SocialShare';
import ReactQuill from "react-quill";

import { BagIcon } from '../../components/Common/Icon';
import ReactWhatsapp from "react-whatsapp";

class ProductPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreProduct(slug);
    this.props.fetchProductReviews(slug);
    document.body.classList.add('product-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchStoreProduct(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('product-page');
  }

  render() {
    const {
      isLoading,
      product,
      shopFormErrors,
      itemInCart,
      productShopData,
      productShopChange,
      handleAddToCart,
      handleRemoveFromCart,
      addProductReview,
      reviewsSummary,
      reviews,
      reviewFormData,
      reviewChange,
      reviewFormErrors
    } = this.props;

    const chatMsg = `Hi WeddingKita, saya berminat untuk paket ini: ${
      product.name
    }produk di Wedding Kita, dengan link : ${
      window.location.protocol !== 'https' ? 'http' : 'https'
    }://${window.location.host}/product/${product.slug}`;

    const formatRupiah = (money) => {
      return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
      ).format(money);
   }

    return (
      <div className='product-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <>
            <Row className='flex-row'>
              <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
                <div className='position-relative'>
                  <img
                    className='item-image'
                    src={`${
                      product.imageUrl
                        ? product.imageUrl
                        : '/images/placeholder-image.png'
                    }`}
                  />
                  {product.inventory <= 0 && !shopFormErrors['quantity'] ? (
                    <p className='stock out-of-stock'>Out of stock</p>
                  ) : (
                    <p className='stock in-stock'>In stock</p>
                  )}
                </div>
              </Col>
              <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
                <div className='product-container'>
                  <div className='item-box'>
                    <div className='item-details'>
                      <h1 className='item-name'>
                        {product.name}
                      </h1>
                      {product.brand && (
                        <p className='by'>
                          from{' '}
                          <Link
                            to={`/shop/brand/${product.brand.slug}`}
                            className='default-link'
                          >
                            {product.brand.name}
                          </Link>
                        </p>
                      )}
                    <div className='my-4 item-share'>
                      <SocialShare product={product} />
                    </div>
                      <h1 className='price'>{`${formatRupiah(product.price)}`}</h1>
                      <p>Service Area : {product.location}</p>
                      <p>Package Pax : {product.pax} Pax</p>
                      <div>
                      <Input
                        type={'number'}
                        error={shopFormErrors['quantity']}
                        label={'Quantity'}
                        name={'quantity'}
                        decimals={false}
                        min={1}
                        max={product.inventory}
                        placeholder={'Product Quantity'}
                        disabled={
                          product.inventory <= 0 && !shopFormErrors['quantity']
                        }
                        value={productShopData.quantity}
                        onInputChange={(name, value) => {
                          productShopChange(name, value);
                        }}
                      />
                      </div>
                      <hr/>
                      <div className='item-customize'>
                    </div>
                      <div className='item-actions'>
                      {itemInCart ? (
                        <Button
                          variant='primary'
                          disabled={
                            product.inventory <= 0 &&
                            !shopFormErrors['quantity']
                          }
                          text='Remove From Bag'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => handleRemoveFromCart(product)}
                        />
                      ) : (
                        <Button
                          variant='primary'
                          disabled={
                            product.quantity <= 0 && !shopFormErrors['quantity']
                          }
                          text='Add To Bag'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => handleAddToCart(product)}
                        />
                      )}
                      <ReactWhatsapp number='0895418013070' message={chatMsg}>
                        <Button                       
                        className='bag-btn' 
                        variant='primary'
                        text='Chat'/>
                      </ReactWhatsapp>


                    </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="product-container">
            <Row className='flex-row'>
              <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
              <h2>PACKAGE DETAILS</h2>
  
  <ReactQuill
  value={product.description}
  readOnly={true}
  theme={"bubble"}
  /></Col>
            </Row>
            </div>
            <ProductReviews
              reviewFormData={reviewFormData}
              reviewFormErrors={reviewFormErrors}
              reviews={reviews}
              reviewsSummary={reviewsSummary}
              reviewChange={reviewChange}
              addReview={addProductReview}
            />
          </>
        ) : (
          <NotFound message='no product found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const itemInCart = state.cart.cartItems.find(
    item => item._id === state.product.storeProduct._id
  )
    ? true
    : false;

  return {
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    isLoading: state.product.isLoading,
    reviews: state.review.productReviews,
    reviewsSummary: state.review.reviewsSummary,
    reviewFormData: state.review.reviewFormData,
    reviewFormErrors: state.review.reviewFormErrors,
    itemInCart
  };
};

export default connect(mapStateToProps, actions)(ProductPage);
