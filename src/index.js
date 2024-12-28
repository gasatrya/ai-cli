#!/usr/bin/env node
import { startInteractiveSession } from './interactive.js'
import { program } from 'commander'
import { configMenu } from './configMenu.js'
import { loadConfig, saveConfig } from './config.js'
import readline from 'readline'
import chalk from 'chalk'

let config = loadConfig()

if (!config.apiKey) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  console.log(chalk.yellow('API key is not set. Please add your OpenAI API key to continue.'))
  rl.question('Enter your OpenAI API key: ', (apiKey) => {
    config.apiKey = apiKey
    saveConfig(config) // Save the updated config
    config = loadConfig() // Reload the config object
    console.log(chalk.green('API key saved successfully!'))
    rl.close()
    startInteractiveSession(config) // Pass the reloaded config
  })
} else {
  program
    .version('1.0.0')
    .description('An interactive AI-powered CLI tool')
    .action(() => startInteractiveSession(config))

  program.command('config').description('Configure API key and model').action(configMenu)

  program.parse(process.argv)
}
