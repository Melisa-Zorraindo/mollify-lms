import type { Command } from 'commander';
import { spawn } from 'child_process';
import path from 'path';
import data from '../../package.json' assert { type: 'json' };

export function previewCommand(program: Command): void {
	program
		.command('preview')
		.description('Open a Svelte development server at the project root')
		.action(() => {
			const projectRoot = process.cwd();
			const packagePath = path.join(projectRoot, 'node_modules', data.name);

			const svelteKitDev = spawn('npx', ['vite', 'dev'], {
				stdio: 'inherit',
				shell: true,
				cwd: packagePath
			});

			svelteKitDev.on('error', (error) => {
				console.error('Failed to start SvelteKit development server:', error);
			});

			svelteKitDev.on('exit', (code) => {
				if (code !== 0) {
					console.error(`SvelteKit development server exited with code ${code}`);
				} else {
					console.log('SvelteKit development server exited successfully.');
				}
			});
		});
}
