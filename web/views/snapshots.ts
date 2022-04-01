import { getSnapshotFilePaths } from '../api/snapshots';
import { runTestDemo } from '../api/testing/demo';
import type { ImageRef } from '../../src/lib/types/ui';

const snapshot: (src: string, title: string) => HTMLLIElement = (src, title) => {

    const theSnapshotContainer: HTMLLIElement = document.createElement('li');
    theSnapshotContainer.className = 'test-result-snapshot-child';

    const text: HTMLParagraphElement = document.createElement('p');
    text.className = 'test-result-snapshot-child-text';
    text.innerText = title;

    const theSnapshot: HTMLImageElement = document.createElement('img');
    theSnapshot.className = 'test-result-snapshot-child-image';
    theSnapshot.src = src;

    theSnapshotContainer.appendChild(text);
    theSnapshotContainer.appendChild(theSnapshot);

    return theSnapshotContainer;
};

export const snapshots: () => Promise<HTMLUListElement> = async () => {
    const theSnapshots: HTMLUListElement = document.createElement('ul');
    theSnapshots.className = `test-result-snapshots-list`;

    const snapshotFilepaths: ImageRef[] = await getSnapshotFilePaths();
    for(const snapshotFilepath of snapshotFilepaths){
        const theSnapshot: HTMLLIElement = snapshot(snapshotFilepath.ref, snapshotFilepath.title);
        theSnapshots.appendChild(theSnapshot);
    }
    
    return theSnapshots;
};