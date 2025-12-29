import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export interface JanusDocOutput {
  summary: string;
  suggestions: Array<{
    file: string;
    reason: string;
    updatedContent: string;
  }>;
  metadata: {
    pr: number;
    repo: string;
    filesChanged: string[];
    totalSuggestions: number;
  };
}

/**
 * Run JanusDoc on a PR and return parsed output
 */
export async function runJanusDoc(
  prNumber: number,
  repo: string = 'dielduarte/janusdoc-evals'
): Promise<JanusDocOutput> {
  try {
    const { stdout } = await execAsync(
      `janusdoc run --pr ${prNumber} --repo ${repo} --dry-run`,
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          GITHUB_TOKEN: process.env.GITHUB_TOKEN,
          OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        },
      }
    );

    return JSON.parse(stdout);
  } catch (error: any) {
    console.error('Error running JanusDoc:', error.message);
    if (error.stdout) {
      console.error('Stdout:', error.stdout);
    }
    if (error.stderr) {
      console.error('Stderr:', error.stderr);
    }
    throw error;
  }
}

/**
 * Normalize file path for comparison (remove leading docs/)
 */
export function normalizeFilePath(path: string): string {
  return path.replace(/^docs\//, '');
}

/**
 * Extract file paths from suggestions
 */
export function extractSuggestedFiles(output: JanusDocOutput): string[] {
  return output.suggestions.map((s) => normalizeFilePath(s.file));
}
