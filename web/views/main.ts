import { DOMInitialization } from "../../src/lib/types/ui";
import { runTestDemo } from '../api/testing/demo';
import { snapshots } from '../views/snapshots';

export const initRunTestsButton: () => DOMInitialization<'button'> = () => {
    const runTestsBtn: HTMLButtonElement = document.querySelector('#test-run-tests-btn');
    runTestsBtn.className = 'primary-btn';
    runTestsBtn.addEventListener('click', async (_event: MouseEvent) => await runTestDemo());
}

export const initShowSnapshotsButton: () => DOMInitialization<'button'> = () => {
    const showSnapshotsBtn: HTMLButtonElement = document.querySelector('#test-show-snapshots-btn');
    showSnapshotsBtn.className = 'primary-btn';
    showSnapshotsBtn.addEventListener('click', async (_event: MouseEvent) => {
        const snapshotsElement: HTMLDivElement = document.querySelector('#selenium-snapshots');
        const theSnapshots: HTMLUListElement = await snapshots();
        if(snapshotsElement.firstChild){
            snapshotsElement.removeChild(snapshotsElement.firstChild);
            snapshotsElement.appendChild(theSnapshots);
        } else {
            snapshotsElement.appendChild(theSnapshots);
        }
    });
};