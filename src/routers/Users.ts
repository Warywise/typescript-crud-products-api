import express from 'express';

import User from '../controllers/Users';
import LoginVerifier from '../middlewares/LoginVerifier';
import UserVerifier from '../middlewares/UserVerifier';

const app = express();

// const router = Router();

app.route('/users').post(UserVerifier, User.Create);
app.route('/login').post(LoginVerifier, User.Login);

export default app;
