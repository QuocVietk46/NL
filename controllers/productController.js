const Image = require('../models/imageModel');
const Product = require('../models/productModel');
const imageController = require('./imageController');
const { removeImages } = require('./imageController');

const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, price, describe } = req.body;
      const images = req.files;

      const newImage = await imageController.createImage(images);

      if (!name) {
        await removeImages(images);
        return res.status(400).json({
          error: 'Please enter product name',
        });
      }
      if (!price) {
        await removeImages(images);
        return res.status(400).json({
          error: 'Please enter product price',
        });
      }
      if (!describe) {
        await removeImages(images);
        return res.status(400).json({
          error: 'Please enter product describe',
        });
      }

      const newProduct = new Product({
        name,
        image: newImage,
        price,
        describe,
        status: 'available',
      });

      await newProduct.save();

      return res
        .status(200)
        .json({ message: 'Add product success', product: newProduct });
    } catch (error) {
      if (req.files) {
        removeImages(req.files);
      }
      return res.status(500).json({ error: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json({
        message: 'Get all product success',
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { status, name, price, describe } = req.body;
      if (status || name || price || describe) {
        const product = await Product.findByIdAndUpdate(
          req.params.id,
          {
            name,
            status,
            price,
            describe,
          },
          {
            new: true,
          }
        );

        return res.status(200).json({
          message: 'Information product change success',
          product: product,
        });
      } else {
        return res.status(400).json({
          error: 'Please enter need change content',
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateProductImage: async (req, res) => {
    try {
      //images is array the image name must remove
      const { status, name, price, describe, imagesDelete } = req.body;
      const images = req.files;

      if (!images) {
        return res.status(400).json({
          error: 'Please enter need change content',
        });
      }

      const newImage = await imageController.createImage(images);

      await removeImages(imagesDelete);

      if (!newImage) {
        await Product.findByIdAndUpdate(
          req.params.id,
          {
            $pull: {
              image: imagesDelete,
            },
            name,
            status,
            price,
            describe,
          },
          {
            new: true,
          }
        );
      } else {
        await Product.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              image: newImage,
            },
            $pull: {
              image: imagesDelete,
            },
            name,
            status,
            price,
            describe,
          },
          {
            new: true,
          }
        );
      }
      const product = await Product.findById(req.params.id);
      return res.status(200).json({
        message: 'Information product change success',
        product: product,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('image');

      await removeImages(product.image);
      await product.deleteOne();
      res.status(200).json({
        message: 'Delete all success',
        product: product,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productController;
