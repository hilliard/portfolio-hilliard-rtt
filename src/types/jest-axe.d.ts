// Minimal type declarations for 'jest-axe' to satisfy TypeScript.
// Provides basic typings for common exports used in tests.

declare module 'jest-axe' {
  export interface AxeNode {
    target: string[];
    html: string;
    failureSummary: string;
  }

  export interface AxeViolation {
    id: string;
    impact?: 'minor' | 'moderate' | 'serious' | 'critical';
    description: string;
    help: string;
    helpUrl: string;
    nodes: AxeNode[];
  }

  export interface AxeResults {
    violations: AxeViolation[];
    passes: unknown[];
    incomplete: unknown[];
    inapplicable: unknown[];
  }

  export type ElementContext = HTMLElement | Document | DocumentFragment | undefined;

  // Run axe against a DOM context and return results
  export function axe(context?: ElementContext, options?: unknown): Promise<AxeResults>;

  // Matcher used with expect.extend(toHaveNoViolations)
  export const toHaveNoViolations: any;

  // Configure axe and get a pre-configured runner
  export function configureAxe(config?: unknown): typeof axe;
}
