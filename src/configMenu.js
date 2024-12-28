import readline from 'readline'
import { loadConfig, saveConfig } from './config.js'
import chalk from 'chalk'

export function configMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const config = loadConfig()

  console.log(chalk.green('Welcome to the configuration menu!'))
  console.log(chalk.blue('1. Add API Key'))
  console.log(chalk.blue('2. Choose Model'))
  console.log(chalk.blue('3. Exit'))

  rl.question('Choose an option: ', (option) => {
    switch (option) {
      case '1':
        rl.question('Enter your OpenAI API key: ', (apiKey) => {
          config.apiKey = apiKey
          saveConfig(config)
          console.log(chalk.green('API key saved successfully!'))
          rl.close()
        })
        break
      case '2':
        console.log(chalk.blue('Choose a model:'))
        console.log(chalk.blue('1. gpt-4o-2024-11-20'))
        console.log(chalk.blue('2. gpt-4o-mini-2024-07-18'))
        rl.question('Enter your choice (1 or 2): ', (choice) => {
          if (choice === '1') {
            config.model = 'gpt-4o-2024-11-20'
          } else if (choice === '2') {
            config.model = 'gpt-4o-mini-2024-07-18'
          } else {
            console.log(chalk.red('Invalid choice. Model not changed.'))
            rl.close()
            return
          }
          saveConfig(config)
          console.log(chalk.green('Model saved successfully!'))
          rl.close()
        })
        break
      case '3':
        rl.close()
        break
      default:
        console.log(chalk.red('Invalid option.'))
        rl.close()
        break
    }
  })
}
