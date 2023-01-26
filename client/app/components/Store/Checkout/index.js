/**
 *
 * Checkout
 *
 */

import React from 'react';

import Button from '../../Common/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody, Col } from 'reactstrap';
import Input from '../../Common/Input';

const Checkout = props => {
  const {
    authenticated,
    handleShopping,
    handleCheckout,
    placeOrder,
    user,
    accountChange,
    updateProfile
  } = props;

  // Modal open state
  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  const handleSubmit = event => {
    event.preventDefault();
    updateProfile();
  };

  return (
    <div className='easy-checkout'>
      <div className='checkout-actions'>
        <Button
          variant='primary'
          text='Continue shopping'
          onClick={() => handleShopping()}
        />
        <Button
          variant='primary'
          text='Place Order'
          onClick={() => toggle()}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Input Wedding Date</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Col xs='12' md='12'>
              <Input
                type={'date'}
                label={'Wedding Date'}
                name={'weddingdate'}
                value={user.weddingdate ? user.weddingdate : ''}
                onInputChange={(name, value) => {
                  accountChange(name, value);
                }}
              />
            </Col>
            <Button
              variant='primary'
              className='mt-3'
              type='sumbit'
              text='Lock Date'
            />
          </form>
        </ModalBody>
        <ModalFooter>
          {authenticated ? (
            <Button
              variant='primary'
              text='Checkout '
              onClick={() => placeOrder()}
            />
          ) : (
            <Button
              variant='primary'
              text='Proceed To Checkout'
              onClick={() => handleCheckout()}
            />
          )}
          <Button variant='primary' text='Close' onClick={toggle} />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Checkout;
