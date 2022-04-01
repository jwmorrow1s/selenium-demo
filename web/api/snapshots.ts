import { ImageRef } from "../../src/lib/types/ui";

export const getSnapshotFilePaths: () => Promise<ImageRef[]> = async () => {
    try {
        const result: Response = await fetch('test/results/snapshots');
        const json: string = await result.json();
        return JSON.parse(json);
    } catch(err){
        console.log(err.message);
    }
};