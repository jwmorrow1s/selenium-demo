import { ChildProcess, exec } from 'child_process';
import { promises as fs } from 'fs'

export const demo = async () => {
    const script: string = await extractScript();
    const theProcess: ChildProcess = exec(script);
    theProcess.stdout.on('data', console.log);
    theProcess.stderr.on('data', console.log);
    theProcess.on('exit', code => console.log(`test run subprocess terminated with code: ${code}`));
}; 

const extractScript: () => Promise<string> = async () => {
    const packageJson: string = await fs.readFile(`${process.cwd()}/package.json`, 'utf-8');
    const parsed = JSON.parse(packageJson);
    const script: string = parsed?.scripts?.test ?? '';
    return script;
}
