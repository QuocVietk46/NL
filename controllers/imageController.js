const fs = require('fs');
const Image = require('../models/imageModel');

const imageController = {
  createImage: async (images) => {
    try {
      const newImages = [];
      await Promise.all(
        images.map(async (image) => {
          const newImage = new Image({
            filename: image.filename,
            path: `/public/assets/${image.filename}}`,
          });
          await newImage.save();
          newImages.push(newImage);
        })
      );
      return newImages;
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllImage: async (req, res) => {
    try {
      const images = await Image.find({});
      res.status(200).json({
        images: images,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  removeImages: async (images) => {
    if (images) {
      await Promise.all(
        images.map(async (image) => {
          try {
            const name = image.filename ? image.filename : image;
            await Image.findOneAndDelete({
              filename: name,
            });
            fs.unlinkSync(`public\\assets\\${image.filename}`);
          } catch (error) {
            console.error({ error: error });
          }
        })
      );
    }
  },
};

module.exports = imageController;
