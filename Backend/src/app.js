import express from 'express';
import adminAuthroutes from './routes/admin/adminAuth.routes.js';
import adminPostRoutes from './routes/admin/adminPost.routes.js';
import cookie from 'cookie-parser';

const app = express();
app.use(express.json());

app.use(cookie());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminAuthroutes);
app.use('/story',adminPostRoutes)
app.use('/substory',adminPostRoutes)

export default app;