import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

export function saveConversation(config, format = 'json') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `conversation-${timestamp}.${format}`
  const filePath = path.join(config.saveLocation, filename)

  // Create save directory if it doesn't exist
  if (!fs.existsSync(config.saveLocation)) {
    fs.mkdirSync(config.saveLocation, { recursive: true })
  }

  let content
  switch (format) {
    case 'json':
      content = JSON.stringify(config.conversationHistory, null, 2)
      break
    case 'md':
      content = config.conversationHistory
        .map(msg => `**${msg.role}**: ${msg.content}`)
        .join('\n\n')
      break
    case 'txt':
      content = config.conversationHistory
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n\n')
      break
    default:
      throw new Error('Unsupported format')
  }

  fs.writeFileSync(filePath, content)
  console.log(chalk.green(`Conversation saved to ${filePath}`))
}
