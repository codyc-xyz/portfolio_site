import { Model } from 'sequelize';

export type AuthorAttributes = {
  author_uid: string;
  author_name: string;
  date_author_born: Date;
  date_author_deceased: Date;
  author_biography: string;
  author_image: string;
};

class AuthorClass extends Model<AuthorAttributes> {}

module.exports = AuthorClass;
