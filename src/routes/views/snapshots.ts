import { promises as fs } from 'fs';
import Express from 'express';
import path from 'path';

export const getResultSnapshotFilePaths: (req: Express.Request, res: Express.Response) => Promise<void> = async (_req, res) => {
    try {
        const testImageResultsDirectory: string = path.join(process.cwd(), 'public',  'results', 'images');
        const testImageResultFilepaths: string[] = await fs.readdir(testImageResultsDirectory);
        const fullImagesPaths: string[] = testImageResultFilepaths.map(filepath => `/results/images/${filepath}`);
        const theJson = JSON.stringify(fullImagesPaths);
        res.status(200).json(theJson);
    } catch (err) {
        res.status(500).json('oopsie doodles');
    }

}
