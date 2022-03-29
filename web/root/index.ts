import { snapshots } from '../views/snapshots';

(function(){
    const startButton: HTMLButtonElement = document.querySelector('[data-selenium-start-btn]');
    startButton.addEventListener('click', async (_event: MouseEvent) => {
        const snapshotsElement: HTMLDivElement = document.querySelector('[data-selenium-snapshots]');
        const theSnapshots: HTMLUListElement = await snapshots();
        snapshotsElement.appendChild(theSnapshots)
    });
})();