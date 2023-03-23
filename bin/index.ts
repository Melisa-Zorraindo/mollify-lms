#!/usr/bin/env ts-node

import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { initCommand } from './commands/init.js';
import { previewCommand } from './commands/preview.js';
import { unlinkCommand } from './commands/unlink.js';

const program = new Command();

initCommand(program);
previewCommand(program);
unlinkCommand(program);
createCommand(program);

program.parse(process.argv);