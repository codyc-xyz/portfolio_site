'use strict';

const express = require(`express`);
const { Sequelize, DataTypes } = require(`sequelize`);
const dotenv = require(`dotenv`);
const cors = require(`cors`);
const FrontImage = require(`./src/types/ImageAttributes.ts`);

dotenv.config();
const app = express();
app.use(cors());

let dbUrl;
if (process.env.DB_URL) {
  dbUrl = process.env.DB_URL;
} else {
  dbUrl = `default_db_url`;
}

const db = new Sequelize(dbUrl, {
  host: `localhost`,
  dialect: `postgres`,
});

FrontImage.init(
  {
    imageUid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: `front_page_image` },
);

app.get(`/images`, async (req: typeof Request, res: typeof Response) => {
  try {
    const images = await FrontImage.findAll({
      attributes: [`image_uid`, `title`, `image_url`, `text`],
      tableName: `front_page_image`,
    });
    console.log(images);
    (res as any).status(200).send(images);
  } catch (error) {
    console.error(error);
    (res as any).status(500).send(`Internal Server Error`);
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
