export const runTestDemo: () => Promise<void> = async () => {
    try {
        await fetch('/test/run/demo');
    } catch(err){
        console.log(err.message);
    }
};