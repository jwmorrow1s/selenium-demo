import { demo } from '../../lib/external-test-runners/demo';
import Express from 'express';

export const runTestDemo: (req: Express.Request, res: Express.Response) => Promise<void> = async (_req, res) => {
    try {
        await demo();
        res.status(200).json('{ "message": "test run successfully" }');
    } catch(err){
        res.status(500).json(`{ "message": "test faled to run because: ${err.message}" }`);
    }
};