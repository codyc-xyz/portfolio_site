import { Model } from 'sequelize';

export type BookAttributes = {
  book_uid: string;
  book_title: string;
  book_description: string;
  date_book_published: Date;
  pages: Number;
  book_subjects: string[];
  isbn: string;
  book_cover_image: string;
  goodreads_link: string;
  author_uid: string;
};

class BookClass extends Model<BookAttributes> {}

module.exports = BookClass;
