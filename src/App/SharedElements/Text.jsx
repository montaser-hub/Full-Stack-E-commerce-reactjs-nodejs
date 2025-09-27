import React from "react";

/**
 * Text Component
 * -----------------------------
 * A reusable dynamic text component that can render different HTML tags
 * (h1, h2, p, span, etc.) based on the `as` prop.
 *
 * Props:
 * - as:      The HTML tag to render (default: "h2").
 * - content: The text or JSX content to display inside the element.
 * - MyClass: Custom CSS or Tailwind classes for styling.
 *
 * Example Usage:
 * <Text as="h1" content="Main Title" MyClass="text-2xl font-bold" />
 * <Text as="p" content="This is a paragraph" MyClass="text-gray-600" />
 */
export default function Text({ as: Tag = "h2", content, MyClass }) {
  // Render the chosen HTML tag with dynamic content and styling
  return <Tag className={MyClass}>{content}</Tag>;
}
