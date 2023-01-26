/**
 *
 * AddMerchant
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';




const AddMerchant = props => {
  const {
    merchantFormData,
    formErrors,
    isSubmitting,
    submitTitle = 'Submit',
    merchantChange,
    addMerchant
  } = props;

  const CategorySelect = [
    { value: 'Hotel Wedding Venue', label: 'Hotel Wedding Venue' },
    { value: 'Wedding Venue & Restaurant', label: 'Wedding Venue & Restaurant' },
    { value: 'Wedding Venue dan F&B', label: 'Wedding Venue dan F&B' },
    { value: 'Wedding Gown', label: 'Wedding Gown' },
    { value: 'Groom Suit', label: 'Groom Suit' },
    { value: 'Wedding Photo & Video', label: 'Wedding Photo & Video' },
    { value: 'Decoration & Stylish', label: 'Decoration & Stylish' },
    { value: 'Wedding Cake', label: 'Wedding Cake' },
    { value: 'Wedding Planner & Organiser', label: 'Wedding Planner & Organiser' },
    { value: 'MC & Entertainment', label: 'MC & Entertainment' },
    { value: 'Wedding Ring & Jewelry', label: 'Wedding Ring & Jewelry' }
  ];
  
  const handleSubmit = event => {
    event.preventDefault();
    addMerchant();
  };


  return (
    <div className='add-merchant'>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Your Full Name'}
              value={merchantFormData.name}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['email']}
              label={'Email Address'}
              name={'email'}
              placeholder={'Your Email Address'}
              value={merchantFormData.email}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['phoneNumber']}
              label={'Phone Number'}
              name={'phoneNumber'}
              placeholder={'Your Phone Number'}
              value={merchantFormData.phoneNumber}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['brand']}
              label={'Brand'}
              name={'brand'}
              placeholder={'Your Business Brand'}
              value={merchantFormData.brand}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['category']}
              name={'category'}
              label={'Select Category'}
              value={merchantFormData.category
              }
              options={CategorySelect}
              handleSelectChange={ value => {
                merchantChange('category', value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'textarea'}
              error={formErrors['business']}
              label={'Business'}
              name={'business'}
              placeholder={'Please Describe Your Business'}
              value={merchantFormData.business}
              onInputChange={(name, value) => {
                merchantChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-merchant-actions'>
          <Button type='submit' text={submitTitle} disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default AddMerchant;
