#!/usr/bin/env ts-node

import { Command } from 'commander';
// import inquirer from 'inquirer';
// import slugify from 'slugify';
import { initCommand } from './commands/init.js';
import { previewCommand } from './commands/preview.js';
import { unlinkCommand } from './commands/unlink.js';

export enum EntityType {
  Institution = 'institution',
  Programme = 'programme',
  Course = 'course',
  Module = 'module',
  Lesson = 'lesson',
  Assessment = 'assessment'
}

export interface Entity {
	type: EntityType;
	name: string;
	slug: string;
}

const program = new Command();
initCommand(program);
previewCommand(program);
unlinkCommand(program);
// program
// 	.command('create')
// 	.description('Start an interactive CLI wizard to create an entity')
// 	.action(async () => {
// 		const entity = await inquirer.prompt<Entity>([
// 			{
// 				type: 'list',
// 				name: 'type',
// 				message: 'What type of entity do you want to create?',
// 				choices: ['Institution', 'Programme', 'Course', 'Module', 'Lesson', 'Assessment']
// 			},
// 			{
// 				type: 'input',
// 				name: 'name',
// 				message: (answers) => `What is the name of the ${answers.type}?`
// 			},
//       {
//         type: 'input',
//         name: 'slug',
//         message: (answers) => `What is the slug of the ${answers.type}?`,
//         default: (answers: Entity) => slugify(answers.name || "404", { lower: true })
//       }
// 		]);

// 		// Your implementation for the create command goes here, based on entityType
// 	});

// program
// 	.command('format')
// 	.description('Convert instances of file.md to file/+page.md, etc.')
// 	.action(async () => {
// 		// Your implementation for the format command goes here
// 	});

program.parse(process.argv);