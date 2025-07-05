import express from 'express';
import adminAuthroutes from './routes/admin/adminAuth.routes.js';
import storyPostRoutes from './routes/admin/post/storyPost.routes.js';
import subStoryPostRoutes from './routes/admin/post/substoryPost.routes.js';
import categoryRoutes from './routes/admin/post/category.routes.js';
import cookie from 'cookie-parser';

const app = express();
app.use(express.json());

app.use(cookie());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminAuthroutes);
app.use('/story', storyPostRoutes);
app.use('/substory',subStoryPostRoutes)
app.use('/category', categoryRoutes);

export default app;