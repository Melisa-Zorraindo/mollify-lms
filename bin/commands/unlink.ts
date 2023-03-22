import type { Command } from 'commander';
import path from 'path';
import { removeSymlink } from '../utilities/symlink.js';

export function unlinkCommand(program: Command): void {
  program
    .command('unlink')
    .description('Remove the symlink between /node_modules/mollify/src/routes and /src/routes')
    .action(async () => {
      const projectRoot = process.cwd();
      const symlinkPath = path.join(projectRoot, 'src', 'routes');
      await removeSymlink(symlinkPath)
    });
}