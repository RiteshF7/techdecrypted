import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'

const sharedComponents = {
  Image
}

const useMDXComponent = (code) => {
  try {
    const fn = new Function('runtime', code)
    const component = fn({ ...runtime }).default
    // Add display name to dynamically created component
    if (component) {
      component.displayName = 'MDXComponent'
    }
    return component
  } catch (error) {
    console.error('Error parsing MDX component:', error)
    // Return a fallback component that displays the error
    const FallbackComponent = () => <div>Error loading content</div>
    FallbackComponent.displayName = 'FallbackComponent'
    return FallbackComponent
  }
}

const MDXContent = ({ code, components, ...props }) => {
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...components }} {...props} />
}
MDXContent.displayName = 'MDXContent';

export default MDXContent