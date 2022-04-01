import Express from 'express';
import type { Mutates } from './lib/types/common';
import { EventQueue } from './lib/queue';

export const eventsHandler: (req: Express.Request, 
    res: Express.Response, 
    next: Express.NextFunction
) => Promise<void> = async (_req, res, _next) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    });
    res.flushHeaders();
    res.status(200);
    setupRetry(res, 10);

    EventQueue.subscribeOnce('test-run', event => {
        res.write(event.data);
    });
    const clientId = Date.now().toLocaleString();

    writeServerSendEvent(res, clientId, 'blah')
};

const writeServerSendEvent: (
    res: Express.Response, 
    id: string, data: string
) => Mutates<'res'> = (res, id, data) => {
    res.write(`id: ${id}\n`);
    res.write(`data: new server event ${data}`);
};

const setupRetry: (res: Express.Response, seconds?: number) => Mutates<'res'> = (res, seconds = 10) => {
    const retryInMs = Math.floor(seconds) * 1000;
    res.write(`retry: ${retryInMs}\n`);
};