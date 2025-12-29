import type { TestScenario } from './test-scenarios.js';
import type { JanusDocOutput } from './utils.js';
import { normalizeFilePath } from './utils.js';

/**
 * Calculate precision: correct suggestions / total suggestions
 * Measures false positive rate
 */
export function precision(
  output: JanusDocOutput,
  scenario: TestScenario
): number {
  if (output.suggestions.length === 0) {
    return scenario.isNegativeCase ? 1.0 : 0.0;
  }

  const suggestedFiles = output.suggestions.map((s) =>
    normalizeFilePath(s.file)
  );
  const expectedFiles = scenario.expectedFiles.map(normalizeFilePath);

  const correctSuggestions = suggestedFiles.filter((file) =>
    expectedFiles.includes(file)
  ).length;

  return correctSuggestions / suggestedFiles.length;
}

/**
 * Calculate recall: correct suggestions / expected suggestions
 * Measures false negative rate
 */
export function recall(output: JanusDocOutput, scenario: TestScenario): number {
  if (scenario.isNegativeCase) {
    return output.suggestions.length === 0 ? 1.0 : 0.0;
  }

  if (scenario.expectedFiles.length === 0) {
    return 1.0;
  }

  const suggestedFiles = output.suggestions.map((s) =>
    normalizeFilePath(s.file)
  );
  const expectedFiles = scenario.expectedFiles.map(normalizeFilePath);

  const correctSuggestions = expectedFiles.filter((file) =>
    suggestedFiles.includes(file)
  ).length;

  return correctSuggestions / expectedFiles.length;
}

/**
 * Calculate F1 score: harmonic mean of precision and recall
 */
export function f1Score(output: JanusDocOutput, scenario: TestScenario): number {
  const p = precision(output, scenario);
  const r = recall(output, scenario);

  if (p + r === 0) {
    return 0;
  }

  return (2 * p * r) / (p + r);
}

/**
 * Check if this is a perfect result
 */
export function isPerfect(
  output: JanusDocOutput,
  scenario: TestScenario
): boolean {
  return precision(output, scenario) === 1.0 && recall(output, scenario) === 1.0;
}

/**
 * Get human-readable score summary
 */
export function getScoreSummary(
  output: JanusDocOutput,
  scenario: TestScenario
): string {
  const p = precision(output, scenario);
  const r = recall(output, scenario);
  const f1 = f1Score(output, scenario);

  return `Precision: ${(p * 100).toFixed(1)}% | Recall: ${(r * 100).toFixed(1)}% | F1: ${(f1 * 100).toFixed(1)}%`;
}
