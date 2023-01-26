/**
 *
 * OrderItems
 *
 */

import React from 'react';
import ReactQuill from 'react-quill';

import { Link } from 'react-router-dom';
import { Row, Col, DropdownItem } from 'reactstrap';

import { ROLE_ADMIN } from '../../../constants';
import Button from '../../Common/Button';
import DropdownConfirm from '../../Common/DropdownConfirm';

const OrderItems = props => {
  const { order, user, updateOrderItemStatus } = props;

  const renderPopoverContent = item => {
    const statuses = [
      'Not processed',
      'Waiting for payment',
      'Processed',
      'Done',
      'Cancelled'
    ];

    return (
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {statuses.map((s, i) => (
          <DropdownItem
            key={`${s}-${i}`}
            className={s === item?.status ? 'active' : ''}
            onClick={() => updateOrderItemStatus(item._id, s)}
          >
            {s}
          </DropdownItem>
        ))}
      </div>
    );
  };

  const renderItemsAction = item => {
    const isAdmin = user.role === ROLE_ADMIN;

    if (item.status === 'Done') {
      return (
        <Link
          to={`/product/${item.product.slug}`}
          className='btn-link text-center py-2 fs-12'
          style={{ minWidth: 120 }}
        >
          Reivew Product
        </Link>
      );
    } else if (item.status !== 'Cancelled') {
      if (!isAdmin) {
        return (
          <DropdownConfirm label='Cancel'>
            <div className='d-flex flex-column align-items-center justify-content-center p-2'>
              <p className='text-center mb-2'>{`Are you sure you want to cancel ${item.product?.name}.`}</p>
              <Button
                variant='danger'
                id='CancelOrderItemPopover'
                size='sm'
                text='Confirm Cancel'
                role='menuitem'
                className='cancel-order-btn'
                onClick={() => updateOrderItemStatus(item._id, 'Cancelled')}
              />
            </div>
          </DropdownConfirm>
        );
      } else {
        return (
          <DropdownConfirm
            label={item.product && item.status}
            className={isAdmin ? 'admin' : ''}
          >
            {renderPopoverContent(item)}
          </DropdownConfirm>
        );
      }
    }
  };

  const formatRupiah = money => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(money);
  };
  return (
    <div className='order-items '>
      <h2>Order Items</h2>
      <Row>
        {order.products.map((item, index) => (
          <Col xs='12' key={index} className='item'>
            <div className='order-item-box'>
              <div className='d-flex justify-content-between flex-column flex-md-row'>
                <div className='d-flex align-items-center box'>
                  <img
                    className='item-image'
                    src={`${
                      item.product && item.product.imageUrl
                        ? item.product.imageUrl
                        : '/images/placeholder-image.png'
                    }`}
                  />
                  <div className='d-md-flex flex-1 align-items-start ml-4 item-box'>
                    <div className='item-details'>
                      {item.product ? (
                        <>
                          <Link
                            to={`/product/${item.product?.slug}`}
                            className='item-link'
                          >
                            <h4 className='d-block item-name one-line-ellipsis'>
                              {item.product?.name}
                            </h4>
                          </Link>
                          <div className='d-flex align-items-center justify-content-between'>
                            <span className='price'>
                              {`${formatRupiah(
                                item.purchasePrice || item.product.price
                              )}`}
                            </span>
                          </div>
                        </>
                      ) : (
                        <h4>Not Available</h4>
                      )}
                    </div>
                    <div className='d-flex justify-content-between flex-wrap d-md-none mt-1'>
                      <p className='mb-1 mr-4'>
                        Status
                        <span className='order-label order-status'>{` ${item.status}`}</span>
                      </p>
                      <p className='mb-1 mr-4'>
                        Quantity
                        <span className='order-label'>{` ${item.quantity}`}</span>
                      </p>
                      <p>
                        Total Price
                        <span className='order-label'>{` $${item.totalPrice}`}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className='d-none d-md-flex justify-content-between align-items-center box'>
                  <div className='text-center'>
                    <p className='order-label order-status'>{`${item.status}`}</p>
                    <p>Status</p>
                  </div>

                  <div className='text-center'>
                    <p className='order-label'>{` ${item.quantity}`}</p>
                    <p>Quantity</p>
                  </div>

                  <div className='text-center'>
                    <p className='order-label'>{`${formatRupiah(
                      item.totalPrice
                    )}`}</p>

                    <p>Total Price</p>
                  </div>
                </div>
              </div>
              {item.product && (
                <div className='text-right mt-2 mt-md-0'>
                  {renderItemsAction(item)}
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
      <br />
      <h2>Order Details</h2>
      {order.products.map((item, index) => (
        <Row key={index} className='flex-row'>
          <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
            <div className='product-container'>
              <div className='item-box'>
                <div>
                  <h1>{item.product?.name}</h1>
                  <br />
                  <Row>
                    <Col>
                      <h4>Service Area</h4>
                    </Col>
                    <Col>
                      <p>: {item.product?.location}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>Pax</h4>
                    </Col>
                    <Col>
                      <p>: {item.product?.pax}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>Inclusion</h4>
                    </Col>
                    <Col>
                      <p>:</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ReactQuill
                        value={item.product?.description}
                        readOnly={true}
                        theme={'bubble'}
                      />
                    </Col>
                  </Row>

                  <hr />
                  <div className='item-customize'></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default OrderItems;
