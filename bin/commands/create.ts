import type { Command } from 'commander';
import inquirer from 'inquirer';
import slugify from 'slugify';
import { EntityType } from '../models/index.js';
import type { Entity } from '../models/index.js';
import { createEntity } from '../utilities/createEntity.js';

export function createCommand(program: Command) {
	return program
		.command('create')
		.description('Start an interactive CLI wizard to create an entity')
		.action(async () => {
			const entity = await inquirer.prompt<Entity>([
				{
					type: 'list',
					name: 'type',
					message: 'What type of entity do you want to create?',
					choices: Object.keys(EntityType),
					default: 'Course'
				},
				{
					type: 'input',
					name: 'name',
					message: (answers) => `What is the name of the ${answers.type}?`,
					validate(input) {
						return input.length > 0;
					}
				},
				{
					type: 'input',
					name: 'slug',
					message: (answers) => `What is the slug of the ${answers.type}?`,
					default: (answers: Entity) =>
						slugify(answers.name || 'new-course', { lower: true, strict: true })
				}
			]);

			console.table(entity);

			const { confirmation } = await inquirer.prompt<{ confirmation: boolean }>([
				{
					type: 'confirm',
					name: 'confirmation',
					message: 'Is this correct?',
					default: true
				}
			]);

      if (confirmation) {
        await createEntity(entity)
      }
		});
}
