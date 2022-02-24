import express from 'express';

import Product from '../controllers/Products';
import TokenVerifier from '../middlewares/TokenVerifier';
import ProductVerifier from '../middlewares/ProductVerifier';

const app = express();

app.route('/products')
  .get(TokenVerifier, Product.GetAll)
  .post(TokenVerifier, ProductVerifier, Product.Create);

export default app;
