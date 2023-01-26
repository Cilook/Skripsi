/**
 *
 * OrderSummary
 *
 */

import React, { useState } from 'react';
import ReactWhatsapp from 'react-whatsapp';
import Button from '../../Common/Button';
import { Col, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Input from '../../Common/Input';

const OrderSummary = props => {
  const { order, orderChange, addImage, image } = props;
  console.log(order);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const chatMsg = `Hi WeddingKita, saya ingin memesan paket ini pada tanggal: ${order.weddingdate},Atas nama : ${order.firstName} ${order.lastName}, id pesanan saya adalah : ${order._id} `;

  const renderOrderAction = () => {
    const isWaitingforpayment =
      order.products.filter(i => i.status === 'Waiting for payment').length > 0;

    if (isWaitingforpayment) {
      return (
        <Button
          className='bag-btn'
          text='Upload Bukti Pembayaran'
          onClick={toggle}
        />
      );
    }
  };

  const renderChatAction = () => {
    const isNotProcessed =
      order.products.filter(i => i.status === 'Not processed').length > 0;

    if (isNotProcessed) {
      return (
        <ReactWhatsapp number='0895418013070' message={chatMsg}>
          <Button
            className='bag-btn'
            variant='primary'
            text='Konfirmasi Tanggal'
          />
        </ReactWhatsapp>
      );
    }
  };

  const formatRupiah = money => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(money);
  };
  const handleSubmit = event => {
    event.preventDefault();
    addImage();
  };

  return (
    <Col>
      <Col className='order-summary pt-3'>
        <h2>Order Summary</h2>
        {order.products.map((item, index) => (
          <div key={index} className='d-flex align-items-center summary-item'>
            <p className='summary-label'>{item.product?.name}</p>
            <p className='summary-value ml-auto'>{`${formatRupiah(
              item.totalPrice
            )}`}</p>
          </div>
        ))}
        <hr />
        <div className='d-flex align-items-center summary-item'>
          <p className='summary-label'>Total</p>
          <p className='summary-value ml-auto'>{` ${formatRupiah(
            order.totalWithTax
          )}`}</p>
        </div>
        <div className='d-flex align-items-center summary-item'>
          <p className='summary-label'>DP 5%</p>
          <p className='summary-value ml-auto'>{` ${formatRupiah(
            (order.totalWithTax / 100) * 5
          )}`}</p>
        </div>
      </Col>
      <Col className='mt-3 mb-2'>
        <div className='order-summary pt-3'>
          <div className='item-image-box'>
            <img className='item-image' src={order.imageUrl} />
          </div>
        </div>
      </Col>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Upload Bukti Pembayaran</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} noValidate>
            <Col xs='12' md='12'>
              <Input
                type={'file'}
                name={'image'}
                label={'file'}
                placeholder={'Please Upload Image'}
                value={image}
                onInputChange={(name, value) => {
                  orderChange(name, value);
                }}
              />
            </Col>
            <Button type='submit' />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Col xs='12' md='4' className='text-left mt-3 text-md-right'>
        {renderChatAction()}
      </Col>
      <Col xs='12' md='4' className='text-left mt-3 text-md-right'>
        {renderOrderAction()}
      </Col>
    </Col>
  );
};

export default OrderSummary;
