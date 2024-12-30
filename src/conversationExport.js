import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { saveConfig } from './config.js'

export async function saveConversation(config, format = 'json') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const defaultFilename = `conversation-${timestamp}.${format}`
  const latestFilename = `conversation-latest.${format}`
  const latestFilePath = path.join(config.saveLocation, latestFilename)

  let filename = defaultFilename
  let filePath = path.join(config.saveLocation, filename)

  // Show prompt if a file of the same format exists
  if (fs.existsSync(latestFilePath)) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: `A previous ${format} file exists. What would you like to do?`,
        choices: [
          { name: `Create new ${format} file with timestamp`, value: 'new' },
          { name: `Overwrite latest ${format} file`, value: 'overwrite' },
        ],
      },
    ])

    if (action === 'overwrite') {
      filename = latestFilename
      filePath = latestFilePath
    }
  }

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
        .map((msg) => `**${msg.role}**: ${msg.content}`)
        .join('\n\n')
      break
    case 'txt':
      content = config.conversationHistory.map((msg) => `${msg.role}: ${msg.content}`).join('\n\n')
      break
    default:
      throw new Error('Unsupported format')
  }

  fs.writeFileSync(filePath, content)
  console.log(chalk.green(`Conversation saved to ${filePath}`))

  // Update last saved format
  config.lastSaveFormat = format
  saveConfig(config)
}
