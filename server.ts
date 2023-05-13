import express from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const dbUrl: string = process.env.DB_URL || ``;

const db = new Sequelize(dbUrl, {
  host: `localhost`,
  dialect: `postgres`,
});

interface ImageAttributes {
  image_uid: string;
  title: string;
  image_url: string;
  text: string;
}

class Image extends Model<ImageAttributes> implements ImageAttributes {
  public image_uid!: string;
  public title!: string;
  public image_url!: string;
  public text!: string;
}

Image.init(
  {
    image_uid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: `image` },
);

export async function getImages(): Promise<ImageAttributes[]> {
  const images = await Image.findAll({ attributes: [`title`, `image_url`] });
  return images;
}
module.exports = { getImages };

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
