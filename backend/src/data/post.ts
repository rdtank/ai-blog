export const posts = [
  {
    id: "1",
    slug: "understanding-react-server-components",
    title: "Understanding React Server Components",
    excerpt:
      "A deep dive into React Server Components, how they work, and why they are changing the way we build React applications.",
    content: `
React Server Components (RSC) are one of the most significant additions to the React ecosystem in recent years. They allow developers to render components on the server while keeping the client-side bundle smaller and more efficient.
Traditionally, React applications shipped most of their JavaScript to the browser. While this provided a rich user experience, it also increased bundle size and slowed down page loads. Server Components address this issue by allowing certain components to execute only on the server.
One of the key benefits of RSC is direct access to backend resources. Components can fetch data from databases, APIs, or file systems without exposing implementation details to the browser.
Another advantage is improved performance. Since Server Components never reach the client, they do not contribute to JavaScript bundle size. This can significantly improve initial page load times, especially for large applications.
React Server Components work particularly well with frameworks like Next.js, which provide seamless integration and routing support.
While RSC introduces new concepts and patterns, understanding when to use Server Components versus Client Components is the key to building scalable and performant applications.
    `,
    author: "John Doe",
    publishedAt: "2026-01-15",
    readingTime: 8,
  },

  {
    id: "2",
    slug: "mastering-nextjs-app-router",
    title: "Mastering the Next.js App Router",
    excerpt:
      "Learn how the App Router works and why it has become the preferred way to build modern Next.js applications.",
    content: `
The App Router introduced in Next.js represents a major evolution from the traditional Pages Router. It is built around React Server Components and nested layouts.
One of the standout features is file-based routing. Developers can create routes simply by organizing folders and files inside the app directory.
Nested layouts allow UI elements such as sidebars, navigation bars, and dashboards to persist across route transitions. This reduces unnecessary re-renders and improves user experience.
The App Router also supports streaming and partial rendering. Instead of waiting for an entire page to load, users can begin interacting with content as soon as it becomes available.
Loading states and error boundaries are built directly into the routing system, making it easier to create resilient applications.
By embracing the App Router, developers gain access to a more scalable architecture that aligns closely with the future direction of React.
    `,
    author: "Sarah Wilson",
    publishedAt: "2026-02-10",
    readingTime: 7,
  },

  {
    id: "3",
    slug: "typescript-best-practices-for-large-projects",
    title: "TypeScript Best Practices for Large Projects",
    excerpt:
      "Discover practical strategies for maintaining type safety and scalability in enterprise applications.",
    content: `
As applications grow, maintaining code quality becomes increasingly challenging. TypeScript provides powerful tools that help developers manage complexity through static typing.
One of the most important practices is defining clear interfaces and types. Consistent typing improves readability and reduces bugs across teams.
Avoid relying heavily on the 'any' type. While it may seem convenient, excessive use defeats the purpose of TypeScript and removes important compiler checks.
Another useful technique is creating shared type definitions for API contracts. This ensures both frontend and backend systems remain synchronized.
Utility types such as Partial, Pick, Omit, and Record can dramatically reduce repetitive code while maintaining flexibility.
Finally, enable strict mode in your TypeScript configuration. Strict settings catch potential issues early and encourage better coding habits throughout the development lifecycle.
    `,
    author: "Michael Chen",
    publishedAt: "2026-03-05",
    readingTime: 6,
  },

  {
    id: "4",
    slug: "building-scalable-react-architecture",
    title: "Building a Scalable React Architecture",
    excerpt:
      "Explore proven architectural patterns that help React applications grow without becoming difficult to maintain.",
    content: `
Many React projects start small but quickly become difficult to manage as new features are added. Establishing a scalable architecture early can save significant time and effort.
Feature-based folder structures are often preferred over type-based structures because they group related files together. This improves discoverability and reduces cognitive overhead.
State management should be carefully planned. Local component state works well for isolated interactions, while global state solutions should be reserved for shared concerns.
Reusable UI components should remain presentation-focused and avoid business logic whenever possible.
Code splitting and lazy loading can improve performance by ensuring users download only the code they need.
A successful React architecture balances flexibility, maintainability, and developer experience while remaining adaptable to future requirements.
    `,
    author: "Emily Rodriguez",
    publishedAt: "2026-03-20",
    readingTime: 9,
  },

  {
    id: "5",
    slug: "introduction-to-ai-powered-applications",
    title: "Introduction to AI-Powered Applications",
    excerpt:
      "Understand the core concepts behind modern AI applications and how developers can integrate AI into products.",
    content: `
Artificial Intelligence has become a core component of modern software development. From chatbots to recommendation systems, AI is transforming digital experiences.
Large Language Models (LLMs) allow applications to understand and generate human-like text. These models can power customer support systems, content generation tools, and coding assistants.
Integrating AI into an application often involves connecting to external APIs that provide model inference capabilities.
Prompt engineering plays a critical role in determining the quality of responses. Well-structured prompts can significantly improve model output.
Developers must also consider cost, latency, privacy, and security when deploying AI-powered features.
As AI technologies continue to evolve, developers who understand both software engineering fundamentals and AI concepts will be well-positioned for future opportunities.
    `,
    author: "David Kumar",
    publishedAt: "2026-04-08",
    readingTime: 10,
  },

  {
    id: "6",
    slug: "optimizing-web-performance-in-2026",
    title: "Optimizing Web Performance in 2026",
    excerpt:
      "Modern techniques and strategies for delivering fast, responsive web experiences across devices.",
    content: `
Web performance remains one of the most important factors influencing user satisfaction and business outcomes.
Core Web Vitals continue to provide valuable insights into loading performance, interactivity, and visual stability. Monitoring these metrics should be part of every development workflow.
Image optimization remains a major opportunity for improvement. Modern formats such as WebP and AVIF can dramatically reduce file sizes.
Caching strategies, Content Delivery Networks (CDNs), and edge computing can reduce latency for users across different regions.
JavaScript bundle optimization is equally important. Tree shaking, code splitting, and lazy loading help reduce the amount of code shipped to the browser.
Performance should not be treated as a one-time task. Continuous monitoring and optimization ensure applications remain fast as they evolve.
    `,
    author: "Alex Thompson",
    publishedAt: "2026-05-12",
    readingTime: 7,
  },
];
