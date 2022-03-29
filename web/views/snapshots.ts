import { getSnapshotFilePaths } from '../api/snapshots';

const snapshot: (src: string) => HTMLLIElement = src => {

    const theSnapshotContainer: HTMLLIElement = document.createElement('li');
    theSnapshotContainer.className = `${theSnapshotContainer.className} test-result-snapshot-child`;

    const theSnapshot: HTMLImageElement = document.createElement('img');
    theSnapshot.className = `${theSnapshot.className} test-result-snapshot-child-image`;
    theSnapshot.src = src;

    theSnapshotContainer.appendChild(theSnapshot);
    return theSnapshotContainer;
};

export const snapshots: () => Promise<HTMLUListElement> = async () => {
    const theSnapshots: HTMLUListElement = document.createElement('ul');
    theSnapshots.className = `${theSnapshots.className} test-result-snapshots-list`;

    // get the image bytes from server fs 'src/results/images'
    const snapshotFilepaths: string[] = await getSnapshotFilePaths();
    for(const snapshotFilepath of snapshotFilepaths){
        const theSnapshot: HTMLLIElement = snapshot(snapshotFilepath);
        theSnapshots.appendChild(theSnapshot);
    }
    
    return theSnapshots;
};