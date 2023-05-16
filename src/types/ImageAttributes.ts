import { Model } from 'sequelize';

export type ImageAttributes = {
  image_uid: string;
  title: string;
  image_url: string;
  text: string;
};

class FrontImage extends Model<ImageAttributes> {}

module.exports = FrontImage;
