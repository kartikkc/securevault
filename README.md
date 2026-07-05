# SecureVault 🔐

**SecureVault** is an advanced password management solution designed to help you secure your digital accounts. It provides a clean, modern interface for storing, generating, and organizing passwords, with a strong emphasis on security and usability.

🔗 **Live demo:** [securevault-six.vercel.app](https://securevault-six.vercel.app)

## Features

- **Military-grade encryption** — built around AES-256 encryption for protecting stored credentials
- **Password generation & autofill** — quickly generate strong passwords for any account
- **Multi-device sync** — keep your vault up to date across devices
- **Two-factor authentication (2FA)** support for an extra layer of account security
- **Tiered plans** — Personal, Premium, and Family plans with features like unlimited passwords, family sharing, and admin controls

## Tech Stack

SecureVault is built with:

- [Next.js 14](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/) for accessible, composable UI components
- [Recharts](https://recharts.org/) for data visualization
- [React Hook Form](https://react-hook-form.com/) for form handling
- [Lucide React](https://lucide.dev/) for icons

## Project Structure

```
securevault/
├── app/            # Next.js app router pages and layouts
├── components/     # Reusable UI components
├── contexts/        # React context providers (app-wide state)
├── guidelines/       # Project/design guidelines
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and shared logic
├── styles/         # Global styles and Tailwind configuration
├── App.tsx         # Root application component
└── package.json    # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (or your preferred package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kartikkc/securevault.git
   cd securevault
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the development server          |
| `npm run build` | Build the app for production         |
| `npm run start` | Start the production server           |
| `npm run lint`  | Run ESLint                            |

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have suggestions for improvements or new features.

## Attributions

This project includes components from [shadcn/ui](https://ui.shadcn.com/) (MIT license) and photos from [Unsplash](https://unsplash.com) (Unsplash license). See [`Attributions.md`](./Attributions.md) for details.

## License

No license has been specified for this repository yet. Consider adding one (e.g., MIT) to clarify how others can use your code.
