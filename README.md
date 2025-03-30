# Word Puzzle Game

A beautiful daily word guessing game built with Next.js, TypeScript, and Tailwind CSS. Challenge yourself to guess the daily 5-letter word within 6 attempts.

## Features

- 🎮 Daily word challenges with a new word each day
- 💡 Hint system with up to 3 daily hints
- 📊 Statistics tracking for wins, streaks, and guess distribution
- 🌓 Dark mode and light mode support
- 📱 Responsive design for all devices
- 🎯 Keyboard and mouse input support
- 🔄 Automatic game state saving with localStorage

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **Theme**: next-themes for dark/light mode
- **Notifications**: Sonner for toast notifications

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Play

1. Try to guess the daily 5-letter word in six tries
2. Each guess must be a valid 5-letter word
3. After each guess, the color of the tiles will change to show how close your guess was:
   - 🟩 Green: Letter is in the correct spot
   - 🟨 Yellow: Letter is in the word but in the wrong spot
   - ⬜ Gray: Letter is not in the word
4. A new puzzle is available each day
5. You can use up to 3 hints per day if you're stuck

## Gameplay

- Type a 5-letter word and press ENTER to submit
- Use the onscreen keyboard or your physical keyboard
- View your statistics by clicking the 📊 icon
- Switch between light and dark mode with the theme toggle
- Access game rules by clicking the ❓ icon

## License

[MIT](https://choosealicense.com/licenses/mit/)
