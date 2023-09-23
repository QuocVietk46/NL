const fs = require('fs');
const Product = require('../models/productModel');

const productController = {
  // GET - Return products with query in the DB
  find: async (req, res) => {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';
      const status = req.query.status || 'available';
      let sort = req.query.sort || 'price';
      let category = req.query.category || 'all';

      let cateArr = ['shorts', 'pants', 't-shirts', 'jackets'];

      category === 'all'
        ? (category = [...cateArr])
        : (category = req.query.category.split(','));

      let sortBy = {};
      if (sort === 'price') {
        sortBy.price = 1;
      } else if (sort === '-price') {
        sortBy.price = -1;
      } else if (sort === 'title') {
        sortBy.title = 1;
      } else if (sort === '-title') {
        sortBy.title = -1;
      } else {
        sortBy.createdAt = -1;
      }

      const products = await Product.find()
        .where('status')
        .equals(status)
        .where('title')
        .regex(new RegExp(search.trim(), 'i'))
        .where('category')
        .in(category)
        .sort(sortBy)
        .select('title price images status rate category')
        .skip(page * limit)
        .limit(limit);

      const total = await Product.countDocuments({
        status: status,
        title: { $regex: search.trim(), $options: 'i' },
        category: { $in: category },
      });

      return res.status(200).json({
        total: total,
        page: page + 1,
        limit: limit,
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET - Return a Product with specified ID
  findById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      return res.status(200).json({ product: product });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET - Return a Product with product title $in req.params.title
  fastSearch: async (req, res) => {
    try {
      const query = req.query.title;
      const products = await Product.find({
        title: { $regex: query.trim(), $options: 'i' },
        status: 'available',
      })
        .limit(10)
        .select('title images');
      return res.status(200).json({ products: products });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // POST - Insert a new Product in the DB
  create: async (req, res) => {
    try {
      const { title, describe, price, category } = req.body;
      const files = req.files;

      if (!title) {
        try {
          removeImage(files);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Title is required' });
      }
      if (!describe) {
        try {
          removeImage(files);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Describe is required' });
      }
      if (!price) {
        try {
          removeImage(files);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Price is required' });
      }
      if (!category) {
        try {
          removeImage(files);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Category is required' });
      }
      if (!files) {
        return res.status(400).json({ error: 'Image is required' });
      }

      const images = files.map((file) => {
        return { filename: file.filename, path: file.path };
      });

      console.log(images);

      const product = await Product.create({
        title: title.trim(),
        describe: describe.trim(),
        price,
        category,
        images,
        status: 'available',
      });
      return res.status(201).json({ product: product });
    } catch (error) {
      try {
        removeImage(req.files);
      } catch (err) {
        return res.status(500).json({ err: err.message, error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  // DELETE - Delete a Product with specified ID
  delete: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(400).json({ error: 'Product not found' });
      }
      try {
        removeImage(product.images);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // PUT - Update a Product with specified ID and delete image
  update: async (req, res) => {
    try {
      // imagesDelete is array of image name
      const { title, describe, price, status, imagesDelete } = req.body;
      const files = req.files;

      // Check if product is changed
      if (title || describe || price || status || imagesDelete || files) {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(400).json({ error: 'Product not found' });
        }
        // change product title
        if (title) {
          product.title = title;
        }
        // change product describe
        if (describe) {
          product.describe = describe;
        }
        // change product price
        if (price) {
          product.price = price;
        }
        // change product status
        if (status) {
          product.status = status;
        }
        // change product images
        if (imagesDelete) {
          // check if imagesDelete is array
          if (!Array.isArray(imagesDelete)) {
            return res
              .status(400)
              .json({ error: 'imagesDelete must be array' });
          }
          product.images = product.images.filter((image) => {
            return !imagesDelete.includes(image.filename);
          });
          try {
            removeImage(files);
          } catch (error) {
            return res.status(400).json({ error: error.message });
          }
        }

        // add new images
        if (files) {
          const images = files.map((file) => {
            return { filename: file.filename, path: file.path };
          });
          product.images.push(...images);
        }

        await product.save();
        return res.status(200).json({ product: product });
      } else {
        return res.status(400).json({ error: 'Nothing to update' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

const removeImage = (images) => {
  images.forEach((image) => {
    if (fs.existsSync(`public/images/${image.filename}`)) {
      fs.unlinkSync(`public/images/${image.filename}`);
    } else {
      console.log(`public/images/${image.filename} not found`);
      throw new Error(`public/images/${image.filename} not found`, 404);
    }
  });
  return true;
};

module.exports = productController;
