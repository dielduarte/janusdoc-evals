import { evalite } from 'evalite';
import { testScenarios } from './test-scenarios.js';
import { runJanusDoc } from './utils.js';
import { precision, recall, f1Score, getScoreSummary } from './scorers.js';

evalite('JanusDoc Documentation Suggestions', {
  data: () => testScenarios,

  task: async (prNumber) => {
    // Find the full scenario data
    const scenario = testScenarios.find(s => s.prNumber === prNumber)!;

    console.log(`\n🧪 Testing: ${scenario.name} (PR #${scenario.prNumber})`);
    console.log(`   ${scenario.description}`);

    const output = await runJanusDoc(scenario.prNumber);

    console.log(`   📊 ${output.suggestions.length} suggestions`);
    console.log(`   ${getScoreSummary(output, scenario)}`);

    return {
      output,
      scenario,
      // Return scores as part of the result for tracking
      scores: {
        precision: precision(output, scenario),
        recall: recall(output, scenario),
        f1Score: f1Score(output, scenario),
      },
    };
  },
});
