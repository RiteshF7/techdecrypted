# Modern MDX Components

A collection of modern, subtle, and mobile-friendly MDX components designed for blog content.

## Features

- **Subtle Design**: Components enhance content without overwhelming it
- **Mobile-First**: Responsive design that works on all screen sizes
- **Reusable**: Can be used across different blog posts and content types
- **Modern Aesthetics**: Contemporary design patterns with gradients and glassmorphism
- **Accessible**: Proper contrast ratios and semantic markup
- **TypeScript Ready**: Full type safety and IntelliSense support

## Components

### Callout

Highlight important information with different types of callouts.

```jsx
<Callout type="info" title="Information">
  This is an informational callout with a blue theme.
</Callout>

<Callout type="warning" title="Warning">
  This is a warning callout with an amber theme.
</Callout>

<Callout type="success" title="Success">
  This is a success callout with a green theme.
</Callout>

<Callout type="error" title="Error">
  This is an error callout with a red theme.
</Callout>
```

**Props:**
- `type`: "info" | "warning" | "success" | "error"
- `title`: Optional title text
- `className`: Additional CSS classes

### Quote

Display quotes with optional author and source attribution.

```jsx
<Quote author="Albert Einstein" source="The Theory of Relativity">
  Imagination is more important than knowledge.
</Quote>
```

**Props:**
- `author`: Optional author name
- `source`: Optional source attribution
- `className`: Additional CSS classes

### Tag & TagGroup

Display tags and badges with different color variants.

```jsx
<TagGroup>
  <Tag variant="default">Default Tag</Tag>
  <Tag variant="primary">Primary Tag</Tag>
  <Tag variant="success">Success Tag</Tag>
  <Tag variant="warning">Warning Tag</Tag>
  <Tag variant="danger">Danger Tag</Tag>
  <Tag variant="purple">Purple Tag</Tag>
</TagGroup>
```

**Tag Props:**
- `variant`: "default" | "primary" | "success" | "warning" | "danger" | "purple"
- `className`: Additional CSS classes

**TagGroup Props:**
- `className`: Additional CSS classes

### StatsCard & StatsGrid

Display statistics in a grid layout.

```jsx
<StatsGrid cols={2}>
  <StatsCard 
    title="Total Users" 
    value="1.2M" 
    description="Active monthly users"
    variant="primary"
  />
  <StatsCard 
    title="Retention Rate" 
    value="85%" 
    description="User retention after 30 days"
    variant="success"
  />
</StatsGrid>
```

**StatsCard Props:**
- `title`: Card title
- `value`: Main value to display
- `description`: Optional description text
- `icon`: Optional icon emoji
- `variant`: "default" | "primary" | "success" | "warning" | "purple"
- `className`: Additional CSS classes

**StatsGrid Props:**
- `cols`: Number of columns (1-4)
- `className`: Additional CSS classes

### Table Components

Create responsive tables with modern styling.

```jsx
<Table>
  <TableHeader>
    <TableHeaderCell>Feature</TableHeaderCell>
    <TableHeaderCell>Status</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Mobile Responsive</TableCell>
      <TableCell>
        <Tag variant="success">✅ Complete</Tag>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Available Components:**
- `Table`: Main table container
- `TableHeader`: Table header section
- `TableHeaderCell`: Header cell
- `TableBody`: Table body section
- `TableRow`: Table row
- `TableCell`: Table cell

### CodeBlock

Display code with syntax highlighting and optional title.

```jsx
<CodeBlock language="javascript" title="Example Component">
const ExampleComponent = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-black/80">
      {children}
    </div>
  );
};
</CodeBlock>
```

**Props:**
- `language`: Programming language for syntax highlighting
- `title`: Optional title for the code block
- `className`: Additional CSS classes

### Divider

Create section dividers with optional text.

```jsx
<Divider text="Section Break" />
```

**Props:**
- `text`: Optional text to display in the center
- `className`: Additional CSS classes

### ImageWithCaption

Display images with optional captions.

```jsx
<ImageWithCaption 
  src="/images/example.jpg" 
  alt="Example image" 
  caption="This is an example image with a caption"
/>
```

**Props:**
- `src`: Image source URL
- `alt`: Alt text for accessibility
- `caption`: Optional caption text
- `className`: Additional CSS classes

## Usage in MDX Files

These components are automatically available in all MDX files. Simply import and use them:

```mdx
---
title: "My Blog Post"
---

<Callout type="info" title="Note">
  This is a note about the content.
</Callout>

<TagGroup>
  <Tag variant="primary">React</Tag>
  <Tag variant="success">TypeScript</Tag>
</TagGroup>

<Quote author="Steve Jobs">
  Design is not just what it looks like and feels like. Design is how it works.
</Quote>
```

## Mobile Responsiveness

All components are designed with mobile-first principles:

- **Responsive Grids**: StatsGrid automatically adjusts columns based on screen size
- **Flexible Tags**: TagGroup wraps tags appropriately on smaller screens
- **Scrollable Tables**: Tables include horizontal scrolling on mobile
- **Touch-Friendly**: All interactive elements have appropriate touch targets
- **Readable Text**: Font sizes and spacing optimized for mobile reading

## Customization

Components can be customized using the `className` prop for additional styling:

```jsx
<Callout type="info" className="my-custom-class">
  Custom styled callout
</Callout>
```

## Accessibility

All components include:

- Proper semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast ratios
- Screen reader compatibility

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers
