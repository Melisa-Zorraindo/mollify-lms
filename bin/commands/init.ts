import type { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import data from '../../package.json' assert { type: 'json' };
import { countMarkdownFiles, moveMarkdownFile, recursivelyFindMarkdown } from '../utilities/markdown.js';
import { ensureSymlink, hasSymlink } from '../utilities/symlink.js';

export function initCommand(program: Command) {
	return program
		.command('init')
		.description('Initialize a new Mollify project and symlink src/routes with project root')
		.action(async () => {
			const projectRoot = process.cwd();
			const srcRoutesPath = path.join(projectRoot, 'content');
			const symlinkPath = path.join(projectRoot, 'node_modules', data.name, 'src', 'routes');
      const hasLink = await hasSymlink(symlinkPath);
      const count = countMarkdownFiles(projectRoot)

			const { permission, convert } = await inquirer.prompt<{ permission: boolean, convert: boolean }>([
				{
					type: 'confirm',
					name: 'permission',
					message: `Create symlink from ${srcRoutesPath} to ${symlinkPath}?`,
          when: !hasLink,
					default: true
				},
        {
          type: 'confirm',
          name: 'convert',
          message: 'Convert existing Markdown files to Mollify content?',
          when: count > 0,
          default: true
        }
			]);

			if (permission) {
        await ensureSymlink(srcRoutesPath, symlinkPath);
			}

      if (convert) {
        for await (const markdownFile of recursivelyFindMarkdown(projectRoot)) {
          await moveMarkdownFile(markdownFile);
        }
      }
		});
}
