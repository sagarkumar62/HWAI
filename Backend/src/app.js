import express from 'express';
import adminAuthroutes from './routes/adminAuth.routes.js';

const app = express();
app.use(express.json());

app.use('/admin', adminAuthroutes);

export default app;