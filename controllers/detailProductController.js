const Detail = require('../models/detailProductModel');
const detailProductController = {
  // POST - Insert a new Detail in the DB
  create: async (req, res) => {
    try {
      const { productId, size, color, quantity, price } = req.body;

      if (!productId) {
        return res.status(400).json({ error: 'Product is required' });
      }
      if (!size) {
        return res.status(400).json({ error: 'Size is required' });
      }
      if (!color) {
        return res.status(400).json({ error: 'Color is required' });
      }
      if (!quantity) {
        return res.status(400).json({ error: 'Quantity is required' });
      }
      if (!price) {
        return res.status(400).json({ error: 'Price is required' });
      }

      const detail = await Detail.create({
        product: productId,
        size,
        color,
        quantity,
      });
      return res.status(201).json({ detail: detail, success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // PATCH - Update a Detail with specified ID
  update: async (req, res) => {
    try {
      const { size, color, quantity, sale, price } = req.body;
      if (size || color || quantity || sale || price) {
        const detail = await Detail.findByIdAndUpdate(
          req.params.id,
          { size, color, quantity, sale, price },
          { new: true }
        );
        if (!detail) {
          return res.status(400).json({ error: 'Detail not found' });
        }
        return res.status(200).json({ detail: detail, success: true });
      }
      return res.status(400).json({ error: 'Nothing to update' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // DELETE - Delete a Detail with specified ID
  delete: async (req, res) => {
    try {
      const detail = await Detail.findByIdAndDelete(req.params.id);
      if (!detail) {
        return res.status(400).json({ error: 'Detail not found' });
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = detailProductController;
