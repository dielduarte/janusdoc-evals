/**
 * Test scenario definitions for JanusDoc evaluation
 */

export interface TestScenario {
  id: string;
  name: string;
  input: number;  // PR number
  branch: string;
  prNumber: number;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  expectedFiles: string[];
  isNegativeCase: boolean;
}

export const testScenarios: TestScenario[] = [
  {
    id: 'new-endpoint',
    name: 'New Endpoint',
    input: 1,
    branch: 'test/new-endpoint',
    prNumber: 1,
    description: 'Add POST /tasks/:id/duplicate endpoint',
    difficulty: 'easy',
    expectedFiles: [
      'docs/api-reference.md',
      'docs/api/tasks.md',
      'docs/examples.md',
    ],
    isNegativeCase: false,
  },
  {
    id: 'rename-parameter',
    name: 'Rename Parameter',
    input: 2,
    branch: 'test/rename-parameter',
    prNumber: 2,
    description: "Rename listTasks() parameter from 'filters' to 'query'",
    difficulty: 'medium',
    expectedFiles: ['docs/guides/filtering.md', 'docs/api/tasks.md'],
    isNegativeCase: false,
  },
  {
    id: 'breaking-change',
    name: 'Breaking Change',
    input: 3,
    branch: 'test/breaking-change',
    prNumber: 3,
    description: 'Add tags field to Task interface',
    difficulty: 'easy',
    expectedFiles: [
      'docs/types.md',
      'docs/api-reference.md',
      'docs/api/tasks.md',
      'docs/changelog.md',
    ],
    isNegativeCase: false,
  },
  {
    id: 'new-feature',
    name: 'New Feature',
    input: 4,
    branch: 'test/new-feature',
    prNumber: 4,
    description: 'Add task commenting feature',
    difficulty: 'hard',
    expectedFiles: [
      'docs/api-reference.md',
      'docs/api/tasks.md',
      'docs/types.md',
      'docs/examples.md',
    ],
    isNegativeCase: false,
  },
  {
    id: 'deprecation',
    name: 'Deprecation',
    input: 5,
    branch: 'test/deprecation',
    prNumber: 5,
    description: 'Deprecate /stats in favor of /tasks/stats',
    difficulty: 'medium',
    expectedFiles: [
      'docs/api-reference.md',
      'docs/api/stats.md',
      'docs/examples.md',
      'docs/changelog.md',
    ],
    isNegativeCase: false,
  },
  {
    id: 'internal-refactor',
    name: 'Internal Refactor',
    input: 6,
    branch: 'test/internal-refactor',
    prNumber: 6,
    description: 'Refactor internal implementation (no API changes)',
    difficulty: 'hard',
    expectedFiles: [],
    isNegativeCase: true,
  },
  {
    id: 'config-change',
    name: 'Configuration Change',
    input: 7,
    branch: 'test/config-change',
    prNumber: 7,
    description: 'Add ENABLE_LOGGING and REQUEST_TIMEOUT env vars',
    difficulty: 'easy',
    expectedFiles: ['docs/configuration.md', 'docs/deployment.md'],
    isNegativeCase: false,
  },
  {
    id: 'behavior-change',
    name: 'Behavior Change',
    input: 8,
    branch: 'test/behavior-change',
    prNumber: 8,
    description: 'Sort tasks by creation date',
    difficulty: 'hard',
    expectedFiles: [
      'docs/api-reference.md',
      'docs/api/tasks.md',
      'docs/guides/filtering.md',
      'docs/changelog.md',
    ],
    isNegativeCase: false,
  },
];
