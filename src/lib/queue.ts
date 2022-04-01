export type QueueEvent = {
    data?: string,
    label: string,
};
export type QueueEventResponse = (event: QueueEvent) => void;

export type EventQueue = {
    publish: (event: QueueEvent) => void,
    subscribeOnce: (label: string, action: (event: QueueEvent) => void) => void,
    subscribe: (label: string, action: (event: QueueEvent) => void) => void,
}; 

export const EventQueue: EventQueue = (() => {
   const subscriptions: { [k in string]: QueueEventResponse[] } = {};
   return () => ({
    publish: (event: QueueEvent) => {
        if(subscriptions[event.label]){
            for(const subscription of subscriptions[event.label]){
                subscription(event);
            }
        }
    },
    subscribeOnce: (label: string, action: QueueEventResponse) => {
        if(!subscriptions[label]){
            subscriptions[label] = [action];
        }
    },
    subscribe: (label: string, action: QueueEventResponse) => {
        if(!subscriptions[label]){
            subscriptions[label] = [action];
        } else {
            subscriptions[label].push(action);
        }
    }
   });
})()();