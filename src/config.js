import fs from 'fs'
import path from 'path'
import os from 'os'

// Store config in the user's home directory
const configPath = path.join(os.homedir(), '.ai-cli-config.json')

export function loadConfig() {
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    return {
      apiKey: config.apiKey || null,
      model: config.model || 'gpt-4o-2024-11-20',
      conversationHistory: config.conversationHistory || []
    }
  }
  return { 
    apiKey: null, 
    model: 'gpt-4o-2024-11-20',
    conversationHistory: []
  }
}

export function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8')
}
