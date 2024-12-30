import OpenAI from 'openai'
import chalk from 'chalk'
import markdown from 'cli-markdown'

let loaderInterval

const startLoader = () => {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  let i = 0
  loaderInterval = setInterval(() => {
    process.stdout.write(`\r${frames[i]} Generating response...`)
    i = (i + 1) % frames.length
  }, 100)
}

const stopLoader = () => {
  clearInterval(loaderInterval)
  process.stdout.write('\r\x1b[K') // Move cursor to start of line and clear the entire line
}

export async function askAI(question, config) {
  try {
    if (!config?.apiKey) {
      console.log(chalk.red('Error: API key is not set. Use "ai-cli config" to add your API key.'))
      return
    }

    const openai = new OpenAI({
      apiKey: config.apiKey,
    })

    startLoader()

    // Add user message to history
    config.conversationHistory.push({ role: 'user', content: question })

    const response = await openai.chat.completions.create({
      model: config.model,
      messages: config.conversationHistory,
    })

    stopLoader()

    // Add AI response to history
    const aiResponse = response.choices[0].message.content
    config.conversationHistory.push({ role: 'assistant', content: aiResponse })

    // Render the AI's response as markdown
    console.log(markdown(aiResponse))
  } catch (error) {
    stopLoader()
    console.error(chalk.red('Error:', error.message))
  }
}
