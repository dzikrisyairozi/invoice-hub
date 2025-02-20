# Invoice Hub

A modern invoice management application built with Next.js, Material-UI, and TypeScript, featuring local storage persistence.

## Features

- 📊 Invoice Management (Create, Edit, Delete)
- 💰 Payment Status Tracking
- 🔍 Search & Filter Capabilities
- 📱 Responsive Design
- 🌙 Material-UI Components
- 💾 Local Storage Persistence

## Technical Decisions

1. **Material-UI**: Chosen for its comprehensive component library and consistent design system.
2. **Local Storage**: Used for data persistence without backend complexity.
3. **React Hook Form**: Implemented for efficient form handling and validation.
4. **Zod**: Selected for robust type-safe schema validation.
5. **TypeScript**: Ensures type safety and better developer experience.

## Prerequisites

- Node.js 18+
- pnpm

## Getting Started

1. Clone the repository:

```
git clone https://github.com/yourusername/invoice-hub.git
```

2. Install dependencies:

```
cd invoice-hub
pnpm install
```

3. Run the development server:

```
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/              # Next.js 13 app directory
    invoices/       # Invoice feature routes
      add/          # Add invoice page
        page.tsx    # Add invoice form page
      list/         # Invoice list page
        page.tsx    # Invoice listing and management
  components/       # Reusable React components
    invoices/       # Invoice-specific components
  constants/        # Application constants and enums
  lib/              # Core library code
    schemas/        # Zod validation schemas
    types/          # TypeScript type definitions
  hooks/            # Custom React hooks
  utils/            # Utility functions and helpers
```

## Key Features

### Invoice Management

- Create new invoices with detailed information
- Edit existing invoices
- Delete unwanted invoices
- View invoice history

### Search and Filter

- Search by invoice name or number
- Filter by payment status
- Sort by date or amount

### Data Persistence

- Local storage implementation
- Automatic data saving
- Data recovery on page reload

## State Management

- Uses React's useState for local state management
- Implements useEffect for filtering and persistence
- Leverages localStorage for data persistence

## Form Validation

- Zod schemas ensure type-safe validation
- React Hook Form handles form state and submission
- Custom validation messages for better user experience

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Next.js team for the amazing framework
- Material-UI for the component library
- React Hook Form for form handling
- Zod for schema validation
