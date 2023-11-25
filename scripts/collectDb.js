const dotenv = require('dotenv');
const { Client } = require('pg');
const uuid = require('uuid');

dotenv.config();

const createCarts = `
  INSERT INTO carts (user_id, created_at, updated_at, status)
  VALUES
      ('550e8400-e29b-41d4-a716-446655440001', '2023-11-18 12:00:00', '2023-11-18 12:00:00', 'OPEN'),
      ('550e8400-e29b-41d4-a716-446655440002', '2023-11-18 12:30:00', '2023-11-18 12:30:00', 'ORDERED');
`;

const getAllCarts = `
  SELECT * FROM carts;
`;


async function collectDb() {
  console.log('collectDb is running');

  const client = new Client({
    host: process.env.POSTGRESQL_HOST || 'localhost',
    user: process.env.POSTGRESQL_USER || 'username',
    password: process.env.POSTGRESQL_PASSWORD || 'password',
    database: process.env.POSTGRESQL_DATABASE || 'database_name',
    port: parseInt(process.env.POSTGRESQL_PORT || '5432', 10),
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    let carts = await client.query(getAllCarts);
    console.log(carts)

    if (!carts.rows.length) {
      await client.query(createCarts);
      carts = await client.query(getAllCarts);
    }

    let cartsIds = carts.rows.map(cart => cart.id);
    
    function generateCartsItems(cartsIds, itemsPerCart) {
      const values = [];
      cartsIds.forEach((cartId, index) => {
        for (let i = 0; i < itemsPerCart; i++) {
          values.push(`('${cartId}', '${uuid.v4()}', ${index + 1})`);
        }
      });
    
      return `
        INSERT INTO cart_items (cart_id, product_id, count)
        VALUES
          ${values.join(',\n')}
      `;
    }

    await client.query(generateCartsItems(cartsIds, 2));

    console.log('Test data collect successfully!');
  } catch (error) {
    console.error('Error initializing DB:', error);
  } finally {
    await client.end();
    console.log('DB connection closed');
  }
}

collectDb();
