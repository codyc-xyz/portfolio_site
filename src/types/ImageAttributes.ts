'use strict';

const { Model } = require(`sequelize`);

type ImageAttributes = {
  image_uid: string;
  title: string;
  image_url: string;
  text: string;
};

module.exports = class FrontImage extends Model<ImageAttributes> {};
