# Animedle

Animedle is a React-based game where players guess anime titles based on pixelated cover images. The game progressively reveals more details about the cover as players make incorrect guesses.

## Project Structure

The project has been restructured for better maintainability, reusability, and professionalism:

```
src/
├── assets/                 # Static assets (images, sounds)
├── components/             # Reusable UI components
│   ├── AnimeImage/         # Anime cover display component
│   ├── GameControls/       # Game input controls
│   ├── GameInfo/           # Game statistics and information
│   ├── GameResult/         # Game result display
│   ├── GameTitle/          # Game title component
│   ├── Header/             # Application header
│   ├── Footer/             # Application footer
│   ├── SearchInput/        # Search input with autocomplete
│   └── index.js            # Component exports
├── constants/              # Application constants
├── hooks/                  # Custom React hooks
├── pages/                  # Page components
├── styles/                 # Global styles
├── tests/                  # Test configurations
└── utils/                  # Utility functions
```

## Key Improvements

### 1. Component-Based Architecture

- **Modular Components**: Each UI element is a separate, reusable component
- **Single Responsibility**: Each component handles one specific piece of UI
- **Consistent Structure**: All components follow the same folder structure

### 2. Custom Hooks

- **useGameState**: Manages all game-related state and logic
- **useAnimeSearch**: Handles search functionality and autocomplete

### 3. Utility Functions

- **gameUtils**: Game-specific utility functions
- **storageUtils**: Session storage management

### 4. Constants Management

- Centralized constants for game configuration, messages, and storage keys

### 5. CSS Organization

- Component-scoped CSS files
- Global styles separated from component styles
- CSS imports for better organization

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

Removes the single build dependency from the project.

## Game Features

- **Progressive Image Reveal**: Image becomes clearer with each wrong guess
- **Autocomplete Search**: Helps players find anime titles
- **Game Statistics**: Tracks score and attempts
- **Session Persistence**: Game state saved between sessions
- **Responsive Design**: Works on mobile and desktop devices

## Technical Details

### State Management

The game uses React hooks for state management:

- `useState` for component state
- `useEffect` for side effects and lifecycle events
- Custom hooks for complex logic separation

### Data Flow

1. Game state is managed by `useGameState` hook
2. Search functionality is handled by `useAnimeSearch` hook
3. Components receive data as props and handle user interactions
4. Game state is persisted to session storage

### Code Quality

- **Modular Design**: Small, focused files with clear responsibilities
- **Reusability**: Components designed for reuse across the application
- **Maintainability**: Clear separation of concerns
- **Professional Structure**: Follows React best practices

## Folder Descriptions

### `/components`

Contains all reusable UI components, each in its own folder with:

- Component JSX file
- Component CSS file
- Index file for easy imports

### `/constants`

All application constants organized by category:

- Game configuration
- Storage keys
- UI messages
- Game states

### `/hooks`

Custom React hooks that encapsulate complex logic:

- `useGameState`: Game logic and state management
- `useAnimeSearch`: Search functionality

### `/utils`

Utility functions grouped by functionality:

- `gameUtils`: Game-specific helper functions
- `storageUtils`: Storage management functions

### `/styles`

Global CSS files and component style imports.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
