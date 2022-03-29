export const getSnapshotFilePaths: () => Promise<string[]> = async () => {
    try {
        const result: Response = await fetch('test/results/snapshots');
        const json: string = await result.json();
        return JSON.parse(json);
    } catch(err){
        console.log(err.message);
    }
};