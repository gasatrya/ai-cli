# AI-CLI Enhancement Suggestions

## Implemented Features

- Basic CLI interface
- OpenAI API integration
- Configuration management
- Model selection
- Interactive prompt
- [x] Add conversation history tracking

### Conversation History Implementation Details

- History stored in config file (~/.ai-cli-config.json)
- Persists between sessions
- Maintains context across messages
- Includes both user and AI messages
- Accessible via !history command
- Clearable via !clear command
- Used as context for subsequent AI responses

## Proposed Enhancements

### 1. Conversation Management

- [ ] Add conversation history tracking
- [ ] Save conversations to file
- [ ] Load previous conversations
- [ ] Multiple conversation threads
- [ ] Conversation context maintenance

### 2. Interactive Commands

- [ ] !help - Show available commands
- [ ] !history - Display conversation history
- [ ] !clear - Clear current conversation
- [ ] !save - Save conversation to file
- [ ] !load - Load a previous conversation
- [ ] !model - Quick model switching
- [ ] !export - Export conversation as MD/JSON
- [ ] Command auto-completion

### 3. UI Improvements

- [ ] Enhanced progress indicator
- [ ] Timestamps for messages
- [ ] Color-coded responses
- [ ] Token usage display
- [ ] Response streaming
- [ ] Better error messages
- [ ] Interactive menus

### 4. Configuration Options

- [ ] Temperature control
- [ ] Maximum token limit
- [ ] Response format preferences
- [ ] System message customization
- [ ] Default behavior settings
- [ ] Persistent preferences

### 5. Advanced Features

- [ ] Custom AI personalities
- [ ] Response formatting options
- [ ] Code execution capabilities
- [ ] Plugin system
- [ ] API usage analytics

### 6. Multi-Provider Support

#### OpenAI Integration (Existing)

- [x] GPT-4 support
- [x] Basic API integration
- [ ] Streaming responses
- [ ] Function calling

### 7. System Prompts Presets

- [ ] Preset system prompts such as programmer, content writer, strategist etc.

#### Anthropic Integration (Planned)

- [ ] Claude 3 Opus support
- [ ] Claude 3 Sonnet support
- [ ] Claude 3 Haiku support
- [ ] Anthropic API key configuration
- [ ] Provider-specific features:
  - [ ] System prompts
  - [ ] Message citations
  - [ ] Tool use
  - [ ] JSON mode

### 7. Provider Management

- [ ] Easy provider switching (!provider openai/anthropic)
- [ ] Provider-specific settings
- [ ] Model comparison mode
- [ ] Cost tracking per provider
- [ ] Usage analytics across providers
- [ ] Default provider configuration

## Configuration Updates Needed

````json
{
  "openai": {
    "apiKey": "sk-...",
    "defaultModel": "gpt-4",
    "options": {}
  },
  "anthropic": {
    "apiKey": "sk-ant-...",
    "defaultModel": "claude-3-opus-20240229",
    "options": {}
  },
  "defaultProvider": "openai"
}

## Implementation Priority

1. Basic command system (!help, !history, !clear)
2. Conversation history tracking
3. Enhanced UI with better formatting
4. Configuration expansion
5. Advanced features

## Technical Requirements

- Update interactive.js to handle new commands
- Create new modules for history management
- Add configuration options for new features
- Implement proper error handling
- Add proper documentation
- Create new provider-specific modules:
 - anthropic.js for Anthropic API integration
 - openai.js (refactor from current ai.js)
 - provider.js for provider management
- Update configMenu.js to support multiple providers
- Add provider selection in configuration
- Implement provider-specific error handling
- Update documentation for multi-provider support

## Example Usage

```bash
ai-cli> !help
Available commands:
!help    - Show this help message
!history - Show conversation history
!clear   - Clear conversation history
!exit    - Exit the program

ai-cli> How does photosynthesis work?
[AI responds with explanation]

ai-cli> !history
[1] You: How does photosynthesis work?
   AI: [Previous response]

ai-cli> !provider
Available providers:
1. OpenAI (current)
2. Anthropic

ai-cli> !provider anthropic
Switched to Anthropic provider
Using model: claude-3-opus-20240229

ai-cli> !models
Available models:
OpenAI:
- gpt-4-turbo
- gpt-4

Anthropic:
- claude-3-opus-20240229
- claude-3-sonnet-20240229
- claude-2.1
````

## Technical Implementation Requirements

1 Create new provider-specific modules:
• src/providers/openai.js
• src/providers/anthropic.js
• src/providers/index.js
2 Update configuration system:
• Multiple API key support
• Provider-specific settings
• Model management per provider
3 Modify core modules:
• Update askAI to support multiple providers
• Add provider switching logic
• Enhance error handling for provider-specific errors
4 New CLI commands:
• !provider - Provider management
• !compare - Run same prompt through multiple providers
• !cost - Show usage costs per provider

This enhancement would require several code changes:

1.  Create a new providers directory structure:

src/ providers/ openai.js anthropic.js index.js config/ providers.js

2.  Update the config structure to support multiple providers:

````javascript
// config/providers.js
export const supportedProviders = {
  openai: {
    name: "OpenAI",
    models: ["gpt-4", "gpt-3.5-turbo"],
    requiresApiKey: true,
    configKey: "OPENAI_API_KEY"
  },
  anthropic: {
    name: "Anthropic",
    models: ["claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"],
    requiresApiKey: true,
    configKey: "ANTHROPIC_API_KEY"
  }
};


3 Add provider-specific implementation files:


// providers/anthropic.js
import Anthropic from '@anthropic-ai/sdk';

export async function askAnthropicAI(question, config) {
  const anthropic = new Anthropic({
    apiKey: config.anthropic.apiKey,
  });

  // Anthropic-specific implementation
}

## Interactive CLI session

Yes, there are several alternatives to using readline for creating an interactive CLI session. One popular and more feature-rich option is to use the `inquirer` library. It provides a more user-friendly interface and easier handling of different types of prompts. Here's how you could refactor your interactive session using `inquirer`:

1. First, install inquirer and its TypeScript types:

```bash
npm install inquirer @types/inquirer
````

2. Then, you can update your `src/interactive.ts` file to use inquirer instead of readline:

```typescript
import inquirer from 'inquirer'
import chalk from 'chalk'
import { askAI } from './ai'
import { Config } from './config'

export async function startInteractiveSession(config: Config) {
  console.log(chalk.green('Welcome to AI CLI! Type your questions or "exit" to quit.'))

  while (true) {
    const { input } = await inquirer.prompt([
      {
        type: 'input',
        name: 'input',
        message: chalk.blue('ai-cli>'),
        prefix: '',
      },
    ])

    if (input.toLowerCase() === 'exit') {
      console.log(chalk.yellow('Goodbye!'))
      process.exit(0)
    }

    if (input.trim()) {
      await askAI(input, config)
    }
  }
}
```

This approach using `inquirer` provides several benefits:

1. It's more declarative and easier to read.
2. It handles user input asynchronously, which can be more efficient.
3. It provides built-in support for various types of prompts (e.g., list, checkbox, password) which could be useful for future enhancements.
4. It offers better handling of special keys and command history out of the box.

If you want to stick closer to a REPL (Read-Eval-Print Loop) style interface, you could also consider using the `repl` module that comes built-in with Node.js. Here's a quick example:

```typescript
import repl from 'repl'
import chalk from 'chalk'
import { askAI } from './ai'
import { Config } from './config'

export function startInteractiveSession(config: Config) {
  console.log(chalk.green('Welcome to AI CLI! Type your questions or "exit" to quit.'))

  const r = repl.start({
    prompt: chalk.blue('ai-cli> '),
    eval: async (input: string, context, filename, callback) => {
      if (input.trim().toLowerCase() === 'exit\n') {
        console.log(chalk.yellow('Goodbye!'))
        process.exit(0)
      }

      if (input.trim()) {
        await askAI(input.trim(), config)
      }
      callback(null)
    },
  })

  r.on('exit', () => {
    console.log(chalk.yellow('Goodbye!'))
    process.exit(0)
  })
}
```

This `repl`-based approach provides a more traditional command-line interface feel and automatically handles things like command history and line editing.

Both of these alternatives offer improvements over the basic `readline` interface. The choice between them depends on your specific needs and the type of user experience you want to provide.

## Contributing

Feel free to submit pull requests implementing any of these features!

```

```
