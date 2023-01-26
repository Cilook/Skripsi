const express = require('express');
const router = express.Router();
const multer = require('multer');

// Bring in Models & Utils
const Brand = require('../../models/brand');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const store = require('../../utils/store');
const { s3Upload } = require('../../utils/storage');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/add',
  auth,
  role.checkRole(role.ROLES.Admin),
  upload.single('image'),
  async (req, res) => {
    try {
      const name = req.body.name;
      const category = req.body.category;
      const description = req.body.description;
      const isActive = req.body.isActive;
      const image = req.file;

      if (!description || !name) {
        return res
          .status(400)
          .json({ error: 'You must enter description & name.' });
      }

      const { imageUrl, imageKey } = await s3Upload(image);

      const brand = new Brand({
        name,
        category,
        description,
        isActive,
        imageUrl,
        imageKey
      });

      const brandDoc = await brand.save();

      res.status(200).json({
        success: true,
        message: `Brand has been added successfully!`,
        brand: brandDoc
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.post(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  upload.single('image'),
  async (req, res) => {
    try {
      const image = req.file;
      const brandId = req.params.id;
      const query = { _id: brandId };

      const { imageUrl, imageKey } = await s3Upload(image);
      const update = { imageKey, imageUrl };
      await Brand.findOneAndUpdate(query, update);

      res.status(200).json({
        success: true,
        message: `Brand has been added successfully!`
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch store brands api
router.get('/list', async (req, res) => {
  try {
    const brands = await Brand.find({
      isActive: true
    }).populate('merchant', 'name');

    res.status(200).json({
      brands
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch brands api
router.get(
  '/',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      let brands = null;

      if (req.user.merchant) {
        brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', 'name');
      } else {
        brands = await Brand.find({}).populate('merchant', 'name');
      }

      res.status(200).json({
        brands
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.get('/:id', async (req, res) => {
  try {
    const brandId = req.params.id;

    const brandDoc = await Brand.findOne({ _id: brandId });

    if (!brandDoc) {
      res.status(404).json({
        message: `Cannot find brand with the id: ${brandId}.`
      });
    }

    res.status(200).json({
      brand: brandDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get(
  '/list/select',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      let brands = null;

      if (req.user.merchant) {
        brands = await Brand.find(
          {
            merchant: req.user.merchant
          },
          'name'
        );
      } else {
        brands = await Brand.find({}, 'name');
      }

      res.status(200).json({
        brands
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  upload.single('image'),
  async (req, res) => {
    try {
      const brandId = req.params.id;
      const query = { _id: brandId };
      const { slug } = req.body.brand;
      const update = req.body.brand;

      const foundBrand = await Brand.findOne({
        $or: [{ slug }]
      });

      if (foundBrand && foundBrand._id != brandId) {
        return res.status(400).json({ error: 'Slug is already in use.' });
      }

      await Brand.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Brand has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const brandId = req.params.id;
      const update = req.body.brand;
      const query = { _id: brandId };

      // disable brand(brandId) products
      if (!update.isActive) {
        const products = await Product.find({ brand: brandId });
        store.disableProducts(products);
      }

      await Brand.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Brand has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin),
  async (req, res) => {
    try {
      const brand = await Brand.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Brand has been deleted successfully!`,
        brand
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;
