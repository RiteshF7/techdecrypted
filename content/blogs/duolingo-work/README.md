# Duolingo Blog Components

This directory contains the "Duolingo's Retention Magic" blog post with custom React components.

## Components

The blog uses several custom components that are globally available in the MDX rendering system:

### Alert & AlertDescription
Used for highlighting important information with a blue background.

```jsx
<Alert className="mb-6">
  <AlertDescription>
    Your important message here
  </AlertDescription>
</Alert>
```

### Badge
Used for displaying small labels or tags with different variants.

```jsx
<Badge variant="default">Default Badge</Badge>
<Badge variant="secondary">Secondary Badge</Badge>
```

### Card Components
Used for creating structured content containers.

```jsx
<Card className="my-6">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

## Implementation

All components are defined in `src/components/Blog/RenderMdx.js` and are available globally for all MDX files in the project.

## Styling

All components use Tailwind CSS classes for styling and are designed to work with the existing blog theme.

## Features

- **Responsive Design**: All components are mobile-friendly
- **Accessibility**: Proper semantic HTML and ARIA attributes
- **Customizable**: Components accept className props for additional styling
- **Global Availability**: Components work across all blog posts
