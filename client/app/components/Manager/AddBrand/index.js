/**
 *
 * AddBrand
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

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


const AddBrand = props => {
  const { 
    brandFormData,
    formErrors, 
    brandChange, 
    addBrand, 
    image } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addBrand();
  };

  return (
    <div className='add-brand'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Brand Name'}
              value={brandFormData.name}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Brand Description'}
              value={brandFormData.description}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['category']}
              name={'category'}
              label={'Select Category'}
              value={brandFormData.category}
              options={CategorySelect}
              handleSelectChange={ value => {
                brandChange('category', value);
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
                brandChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-brand'}
              name={'isActive'}
              label={'Active?'}
              checked={brandFormData.isActive}
              toggleCheckboxChange={value => brandChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-brand-actions'>
          <Button type='submit' text='Add Brand' />
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
