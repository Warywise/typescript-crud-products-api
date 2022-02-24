import express from 'express';

import Order from '../controllers/Orders';
import TokenVerifier from '../middlewares/TokenVerifier';
import OrderVerifier from '../middlewares/OrderVerifier';

const app = express();

app.route('/orders')
  .get(TokenVerifier, Order.GetAll)
  .post(TokenVerifier, OrderVerifier, Order.Create);

app.route('/orders/:id')
  .get(TokenVerifier, Order.GetById);

export default app;
