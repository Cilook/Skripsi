/**
 *
 * EditBrand
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Switch from '../../Common/Switch';
import SelectOption from '../../Common/SelectOption';

const EditBrand = props => {
  const {
    brand,
    brandChange,
    formErrors,
    updateBrand,
    deleteBrand,
    image,
    addImagee,
    activateBrand
  } = props;

  const CategorySelect = [
    { value: 'Hotel Wedding Venue', label: 'Hotel Wedding Venue' },
    {
      value: 'Wedding Venue & Restaurant',
      label: 'Wedding Venue & Restaurant'
    },
    { value: 'Wedding Venue dan F&B', label: 'Wedding Venue dan F&B' },
    { value: 'Wedding Gown', label: 'Wedding Gown' },
    { value: 'Groom Suit', label: 'Groom Suit' },
    { value: 'Wedding Photo & Video', label: 'Wedding Photo & Video' },
    { value: 'Decoration & Stylish', label: 'Decoration & Stylish' },
    { value: 'Wedding Cake', label: 'Wedding Cake' },
    {
      value: 'Wedding Planner & Organiser',
      label: 'Wedding Planner & Organiser'
    },
    { value: 'MC & Entertainment', label: 'MC & Entertainment' },
    { value: 'Wedding Ring & Jewelry', label: 'Wedding Ring & Jewelry' }
  ];

  const handleSubmit = event => {
    event.preventDefault();
    updateBrand();
  };
  const handleSubmitt = event => {
    event.preventDefault();
    addImagee();
  };

  return (
    <div className='edit-brand'>
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Brand link </label>
        <Link to={`/shop/brand/${brand.slug}`} className='default-link'>
          {brand.slug}
        </Link>
      </div>
      <form onSubmit={handleSubmitt} noValidate>
        <Col xs='12' md='12'>
          <Input
            type={'file'}
            name={'image'}
            label={'file'}
            placeholder={'Please Upload Image'}
            value={image}
            onInputChange={(name, value) => {
              brandChange(name, value);
            }}
          />
        </Col>
        <Button
          type='submit'
          text='Upload'
          className='mb-3 mb-md-0 mr-0 mr-md-3'
        />
      </form>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Brand Name'}
              value={brand.name}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['slug']}
              label={'Slug'}
              name={'slug'}
              placeholder={'Brand Slug'}
              value={brand.slug}
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
              value={brand.description}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
            />
            <Col xs='12' md='12'>
              <SelectOption
                error={formErrors['category']}
                name={'category'}
                label={'Select Category'}
                value={brand.category}
                options={CategorySelect}
                handleSelectChange={value => {
                  brandChange('category', value);
                }}
              />
            </Col>
          </Col>
          <Col xs='6' md='6' className='mt-3 mb-2'>
            <div className='item-image-container'>
              <div className='item-image-box'>
                <img className='item-image' src={brand.imageUrl} />
              </div>
            </div>
          </Col>
          <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              style={{ width: 100 }}
              tooltip={brand.isActive}
              tooltipContent={`Disabling ${brand.name} will also disable all ${brand.name} products.`}
              id={`enable-brand-${brand._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={brand.isActive}
              toggleCheckboxChange={value => activateBrand(brand._id, value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteBrand(brand._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditBrand;
