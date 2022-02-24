import express from 'express';

import UserRouter from './routers/Users';
import ProductRouter from './routers/Products';
import OrderRouter from './routers/Orders';

const app = express();

app.use(express.json());

app.use(UserRouter);
app.use(ProductRouter);
app.use(OrderRouter);

export default app;
