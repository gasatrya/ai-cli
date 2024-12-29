import inquirer from 'inquirer'
import { loadConfig, saveConfig } from './config.js'
import chalk from 'chalk'

export async function configMenu() {
  const config = loadConfig()

  console.log(chalk.green('Welcome to the configuration menu!'))

  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Choose an option:',
      choices: [
        { name: 'Add API Key', value: '1' },
        { name: 'Choose Model', value: '2' },
        { name: 'Exit', value: '3' },
      ],
    },
  ])

  switch (option) {
    case '1':
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
      break

    case '2':
      const { model } = await inquirer.prompt([
        {
          type: 'list',
          name: 'model',
          message: 'Choose a model:',
          choices: [
            { name: 'gpt-4o-2024-11-20', value: 'gpt-4o-2024-11-20' },
            { name: 'gpt-4o-mini-2024-07-18', value: 'gpt-4o-mini-2024-07-18' },
          ],
        },
      ])
      config.model = model
      saveConfig(config)
      console.log(chalk.green('Model saved successfully!'))
      break

    case '3':
      break
  }
}
