# AI CLI Tool

A command-line interface tool that allows you to interact with OpenAI's GPT models directly from your terminal.

## Prerequisites

- Node.js (version 14 or higher)
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Installation

Since this package isn't published to npm yet, you can install it locally:

1. Clone this repository

```bash
git clone git@github.com:gasatrya/ai-cli.git
cd ai-cli
```

2. Install dependencies

```bash
npm install
```

3. Link the package locally

```bash
npm link
```

## Configuration

Before using the tool, you need to configure your OpenAI API key. You have two options:

### Option 1: First-time setup

When you run the tool for the first time without a configured API key, it will prompt you to enter your OpenAI API key.

### Option 2: Configuration menu

Run the configuration menu:

```bash
ai-cli config
```

In the configuration menu, you can:

1. Add/Update your API key
2. Choose the AI model:
   - gpt-4o-2024-11-20
   - gpt-4o-mini-2024-07-18

## Usage

### Start Interactive Session

```bash
ai-cli
```

This will start an interactive session where you can:

- Type your questions and get responses from the AI
- Type 'exit' to quit the session

### Example

```bash
ai-cli> What is the capital of France?
[AI will respond with the answer]

ai-cli> exit
Goodbye!
```

## Features

- Interactive CLI interface
- Markdown rendering for AI responses
- Loading animation while waiting for responses
- Configuration persistence
- Support for multiple GPT models

## Configuration File

The configuration is stored in `~/.ai-cli-config.json` in your home directory.
