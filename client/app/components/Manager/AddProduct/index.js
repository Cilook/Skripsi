/**
 *
 * AddProduct
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';


const locationSelect = [
  { value: 'Banyumas', label: 'Banyumas' },
  { value: 'Banjarnegara', label: 'Banjarnegara' },
  { value: 'Purbalingga', label: 'Purbalingga' },
  { value: 'Cilacap', label: 'Cilacap' }
];

const AddProduct = props => {
  const {
    user,
    productFormData,
    formErrors,
    productChange,
    addProduct,
    brands,
    image
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addProduct();
  };

  return (
    <div className='add-product'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Product Name'}
              value={productFormData.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              label={'Pax'}
              error={formErrors['name']}
              decimals={false}
              name={'pax'}
              placeholder={'Package Pax'}
              value={productFormData.pax}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              label={'Quantity'}
              name={'quantity'}
              error={formErrors['name']}
              decimals={false}
              placeholder={'quantity'}
              value={productFormData.quantity}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
            type={'react-quill'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Product Description'}
              value={productFormData.description}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Price'}
              name={'price'}
              min={1}
              placeholder={'Product Price'}
              value={productFormData.price}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['location']}
              label={'Location'}
              name={'location'}
              options={locationSelect}
              value={productFormData.location}
              handleSelectChange={value => {
                productChange('location', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              disabled={user.role === 'ROLE_MERCHANT'}
              error={formErrors['brand']}
              name={'brand'}
              label={'Select Brand'}
              value={
                user.role === 'ROLE_MERCHANT'
                  ? brands[1]
                  : productFormData.brand
              }
              options={brands}
              handleSelectChange={value => {
                productChange('brand', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'file'}
              error={formErrors['file']}
              name={'image'}
              label={'file'}
              placeholder={'Please Upload Image'}
              value={image}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-product'}
              name={'isActive'}
              label={'Active?'}
              checked={productFormData.isActive}
              toggleCheckboxChange={value => productChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-product-actions'>
          <Button type='submit' text='Add Product' />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
