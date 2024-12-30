#!/usr/bin/env node
import { startInteractiveSession } from './interactive.js'
import { program } from 'commander'
import { configMenu } from './configMenu.js'
import { loadConfig, saveConfig } from './config.js'
import inquirer from 'inquirer'
import chalk from 'chalk'

let config = loadConfig()

if (!config.apiKey) {
  console.log(chalk.yellow('API key is not set. Please add your OpenAI API key to continue.'))
  const { apiKey } = await inquirer.prompt([
    {
      type: 'password',
      name: 'apiKey',
      message: 'Enter your OpenAI API key:',
      mask: '*',
    },
  ])

  config.apiKey = apiKey
  saveConfig(config)
  console.log(chalk.green('API key saved successfully!'))
  startInteractiveSession(config)
} else {
  program
    .version('1.0.0')
    .description('An interactive AI-powered CLI tool')
    .action(() => startInteractiveSession(config))

  program.command('config').description('Configure API key and model').action(configMenu)

  program.parse(process.argv)
}
