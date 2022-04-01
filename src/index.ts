import express from 'express';
import { getResultSnapshotFilePaths } from './routes/views/snapshots';
import { runTestDemo } from './routes/testing/demo';
import { eventsHandler } from './sse';

const app = express();
const router = express.Router();
app.use(express.static('public'));
app.use('/', router);
router.get('/test/results/snapshots', getResultSnapshotFilePaths);
router.get('/test/run/demo', runTestDemo);
router.get('/update_snapshots', eventsHandler);
app.listen('3000')