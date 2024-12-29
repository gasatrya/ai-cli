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

  function showHistory(config) {
    if (config.conversationHistory.length === 0) {
      console.log(chalk.yellow('No conversation history yet.'))
      return
    }
    
    config.conversationHistory.forEach((message, index) => {
      const prefix = message.role === 'user' ? chalk.blue('You:') : chalk.green('AI:')
      console.log(`${chalk.gray(`[${index + 1}]`)} ${prefix} ${message.content}`)
    })
  }

  rl.on('line', async (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log(chalk.yellow('Goodbye!'))
      rl.close()
      process.exit(0)
    }

    if (input.toLowerCase() === '!history') {
      showHistory(config)
      rl.prompt()
      return
    }

    if (input.toLowerCase() === '!clear') {
      config.conversationHistory = []
      console.log(chalk.green('Conversation history cleared.'))
      rl.prompt()
      return
    }

    if (input.trim()) {
      await askAI(input, config)
    }

    rl.prompt()
  }).on('close', () => {
    process.exit(0)
  })
}
