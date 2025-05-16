# NgForms

A dynamic form builder application built with Angular that allows users to create, customize, and preview forms with various field types. This interactive tool provides a drag-and-drop interface for form creation with real-time preview capabilities.

## Features

- **Drag-and-drop form building** with Angular CDK
- **Multiple field types** including:
  - Text fields
  - Checkbox fields
  - Select/dropdown fields
- **Field customization options** through a dedicated settings panel
- **Real-time form preview** capability
- **Custom theming** support with a green theme option

## Installation & Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or with pnpm
pnpm install
```

3. Start the development server:

```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

## Building & Testing

To build the project:

```bash
ng build
```

To run unit tests:

```bash
ng test
```

## Styling

This project uses a combination of:

- Tailwind CSS for utility-first styling
- Angular Material for UI components
- Custom theme variables for consistent design

## Project Architecture

The application follows a modular architecture:

- **Components**:

  - `field-settings`: Configures properties for form fields
  - `field-types`: Contains implementations for different field types
  - `form-elements-menu`: Sidebar menu with available field elements
  - `main-canvas`: Main editor area with form builder and preview

- **Services**:

  - `field-types.service.ts`: Manages available field types
  - `form.service.ts`: Handles form state and operations

- **Models**:
  - `field.ts`: Defines field data structure
  - `form.ts`: Defines overall form structure

## Technologies

- **Angular 19**: Frontend framework
- **Angular Material**: UI component library
- **Angular CDK**: Drag and drop functionality
- **Tailwind CSS**: Utility-first styling

Configuration files:

- `tailwind.css` - Contains theme variables
- `styles.scss` - Imports styling configurations
- `greentheme.css` - Custom theme implementation
