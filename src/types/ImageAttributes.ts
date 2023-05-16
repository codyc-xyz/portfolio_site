import { Model } from 'sequelize';

export type ImageAttributes = {
  imageUid: string;
  title: string;
  imageUrl: string;
  text: string;
};

class FrontImage extends Model<ImageAttributes> {}

module.exports = FrontImage;
