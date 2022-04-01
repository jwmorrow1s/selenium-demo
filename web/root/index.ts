import { initRunTestsButton, initShowSnapshotsButton } from '../views/main';

type AppEnvironment = {};
type AppLogic = (environment: AppEnvironment) => Promise<void>;

appStart(async () => {
    initRunTestsButton();
    initShowSnapshotsButton();
});

function appStart(logic: AppLogic): void  { 
    const setupServerSideEventSourceForUrl: (
        url: string, 
        openEventFunction: (e: Event) => void
    ) => EventSource = (url, openEventFunction) => {
        const eventSource: EventSource = new EventSource(url);
        eventSource.addEventListener('open', openEventFunction);
        return eventSource;
    };
    const registerEventSource: (source: EventSource) => void = source => {
        const supportedHandler = 'onvisibilitychange' in window.document ? 'visibilitychange' : 'pagehide';
        window.addEventListener(supportedHandler, (_event: Event) => {
            source.close();
        });
    };
    const initGlobalListeners: () => void = () => {
        registerEventSource(
            setupServerSideEventSourceForUrl('/update_snapshots', () => console.log('received!'))
        );
    };
    const cleanup: () => void  = () => { /* no op for now. Add clean up logic here. */ }

    initGlobalListeners(); 
    logic({}).then(() => cleanup());
}; 