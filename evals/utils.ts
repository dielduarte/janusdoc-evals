import { exec } from "node:child_process";
import { promisify } from "node:util";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const execAsync = promisify(exec);

/**
 * Load environment variables from .envrc
 */
function loadEnvFromEnvrc(): {
  GITHUB_TOKEN?: string;
  OPENAI_API_KEY?: string;
} {
  try {
    const envrcPath = join(process.cwd(), ".envrc");
    const content = readFileSync(envrcPath, "utf-8");

    const env: { GITHUB_TOKEN?: string; OPENAI_API_KEY?: string } = {};

    // Parse simple export statements
    const lines = content.split("\n");
    for (const line of lines) {
      const match = line.match(/export\s+(\w+)="([^"]*)"/);
      if (match) {
        const [, key, value] = match;
        if (key === "GITHUB_TOKEN" || key === "OPENAI_API_KEY") {
          env[key] = value;
        }
      }
    }

    return env;
  } catch (error) {
    return {};
  }
}

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
    relevantDocs: string[];
    totalSuggestions: number;
  };
}

/**
 * Run JanusDoc on a PR and return parsed output
 */
export async function runJanusDoc(
  prNumber: number,
  repo: string = "dielduarte/janusdoc-evals"
): Promise<JanusDocOutput> {
  try {
    // Load env vars from .envrc if not in process.env
    const envFromFile = loadEnvFromEnvrc();
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN || envFromFile.GITHUB_TOKEN;
    const OPENAI_API_KEY =
      process.env.OPENAI_API_KEY || envFromFile.OPENAI_API_KEY;

    if (!GITHUB_TOKEN) {
      throw new Error("GITHUB_TOKEN not found");
    }
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not found");
    }

    const { stdout } = await execAsync(
      `janusdoc run --pr ${prNumber} --repo ${repo} --dry-run`,
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          GITHUB_TOKEN,
          OPENAI_API_KEY,
          // Disable direnv output
          DIRENV_LOG_FORMAT: "",
        },
      }
    );

    // Extract JSON from stdout (in case there's any extra output)
    // Try to find JSON object in the output
    const jsonMatch = stdout.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error(`No JSON found in stdout (len: ${stdout.length})`);
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error: any) {
    // Provide more detailed error info
    const message = error.code
      ? `Command failed with code ${error.code}`
      : error.message;

    console.error("Error running JanusDoc:", message);

    if (error.stdout) {
      console.error("Stdout preview:", error.stdout.slice(0, 500));
    }
    if (error.stderr) {
      console.error("Stderr preview:", error.stderr.slice(0, 500));
    }

    // Return empty result for negative test cases or errors
    return {
      summary: "Error: " + message,
      suggestions: [],
      metadata: {
        pr: prNumber,
        repo,
        filesChanged: [],
        relevantDocs: [],
        totalSuggestions: 0,
      },
    };
  }
}

/**
 * Normalize file path for comparison (remove leading docs/)
 */
export function normalizeFilePath(path: string): string {
  return path.replace(/^docs\//, "");
}

/**
 * Extract file paths from suggestions
 */
export function extractSuggestedFiles(output: JanusDocOutput): string[] {
  return output.suggestions.map((s) => normalizeFilePath(s.file));
}
