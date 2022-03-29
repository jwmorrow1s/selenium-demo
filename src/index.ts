import express from 'express';
import { getResultSnapshotFilePaths } from './routes/views/snapshots';

const app = express();
const router = express.Router();
app.use(express.static('public'));
app.use('/', router);
router.get('/test/results/snapshots', getResultSnapshotFilePaths);
app.listen('3000')