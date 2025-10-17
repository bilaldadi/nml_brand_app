# NML E-Commerce App

A modern, well-structured React Native e-commerce application built with Expo, following best practices for component separation and clean code architecture.

## Features

- ✅ Modern UI with Arabic (RTL) support
- ✅ Clean component architecture
- ✅ TypeScript for type safety
- ✅ Reusable UI components
- ✅ File-based routing with Expo Router
- ✅ Consistent design system (colors, typography, spacing)
- ✅ Ready for e-commerce integration

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed information about the project architecture.

```
app/              # Screens and navigation
components/       # Reusable UI components
constants/        # Design tokens and constants
types/            # TypeScript type definitions
utils/            # Helper functions
assets/           # Images and static files
```

## Get Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   # or
   npx expo start
   ```

3. Open the app on your device

   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Current Screens

- **Welcome Screen** (`/welcome`) - Onboarding screen with app introduction
- **Login Screen** (`/auth/login`) - User authentication
- **Home Screen** (`/home`) - Main app screen (placeholder)

## Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Check code quality

## UI Components

### Button
```tsx
import { Button } from '@/components/ui';

<Button 
  title="Click Me"
  onPress={() => console.log('Pressed')}
  variant="primary"  // primary | secondary | outline
  size="medium"      // small | medium | large
  fullWidth
/>
```

### Typography
```tsx
import { Heading2, BodyText, Caption } from '@/components/ui';

<Heading2>Welcome</Heading2>
<BodyText>This is body text</BodyText>
<Caption>Small caption text</Caption>
```

### Logo
```tsx
import { Logo } from '@/components/ui';

<Logo size="medium" /> // small | medium | large
```

## Design System

The app uses a consistent design system:
- **Colors**: Defined in `constants/colors.ts`
- **Typography**: Defined in `constants/typography.ts`
- **Spacing**: Defined in `constants/spacing.ts`

Import and use them:
```tsx
import { Colors, Spacing, Typography } from '@/constants';
```

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
