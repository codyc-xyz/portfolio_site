import FrontPage from './front_page/FrontPage';
import '../styles/global.css';

const { Sequelize, DataTypes } = require(`sequelize`);

// Create a new Sequelize instance
const sequelize = new Sequelize(
  `postgres://codyclifton:Tiggy285@localhost:5432/portfolio`,
);

// Define a model for the table
const MyTable = sequelize.define(`MyTable`, {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync();

// Query the database
MyTable.findAll().then((rows) => {
  // Log the results
  console.log(rows.map((row) => row.toJSON()));
});

export default function Home() {
  return (
    <main>
      <FrontPage />
    </main>
  );
}
