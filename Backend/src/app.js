import express from 'express';
import cors from 'cors';
import adminAuthroutes from './routes/admin/adminAuth.routes.js';
import storyPostRoutes from './routes/post/storyPost.routes.js';
import subStoryPostRoutes from './routes/post/substoryPost.routes.js';
import categoryRoutes from './routes/post/newsCategory.routes.js';
import userAuthroutes from './routes/user/userAuth.routes.js';
import taskRoutes from './routes/post/task.routes.js'; 
import intiativeRoutes from './routes/post/initiative.routes.js';
import resourceRoutes from './routes/post/resource.routes.js';
import researchPaperRoutes from './routes/post/reseachPaper.routes.js';
import podcastRoutes from './routes/post/podcast.routes.js';
import caseStudiesRoutes from './routes/post/caseStudies.routes.js';
import videoTutorialRoutes from './routes/post/videoTutorial.routes.js';
import missionRoutes from './routes/post/mission.routes.js';
import cookie from 'cookie-parser';

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());

app.use(cookie());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminAuthroutes);
app.use('/story', storyPostRoutes);
app.use('/substory',subStoryPostRoutes)
app.use('/category', categoryRoutes);
app.use('/user', userAuthroutes);
app.use('/task', taskRoutes);
app.use('/initiative', intiativeRoutes);
app.use('/resource', resourceRoutes);
app.use('/researchpaper', researchPaperRoutes);
app.use('/podcast', podcastRoutes);
app.use('/casestudies', caseStudiesRoutes);
app.use('/videotutorial', videoTutorialRoutes);
app.use('/mission', missionRoutes);


export default app;