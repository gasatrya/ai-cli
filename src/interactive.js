import readline from 'readline'
import { askAI } from './ai.js'
import chalk from 'chalk'

export function startInteractiveSession(config) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.blue('ai-cli> '),
  })

  console.log(chalk.green('Welcome to AI CLI! Type your questions or "exit" to quit.'))

  rl.prompt()

  rl.on('line', async (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log(chalk.yellow('Goodbye!'))
      rl.close()
      process.exit(0)
    }

    if (input.trim()) {
      await askAI(input, config)
    }

    rl.prompt()
  }).on('close', () => {
    process.exit(0)
  })
}
