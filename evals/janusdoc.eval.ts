import { evalite } from 'evalite';
import { testScenarios } from './test-scenarios.js';
import { runJanusDoc } from './utils.js';
import { precision, recall, f1Score, getScoreSummary } from './scorers.js';

evalite('JanusDoc Documentation Suggestions', {
  data: () => testScenarios,

  task: async (scenario) => {
    console.log(`\n🧪 Testing: ${scenario.name} (PR #${scenario.prNumber})`);
    console.log(`   ${scenario.description}`);

    const output = await runJanusDoc(scenario.prNumber);

    console.log(`   📊 ${output.suggestions.length} suggestions`);
    console.log(`   ${getScoreSummary(output, scenario)}`);

    return output;
  },

  scorers: {
    Precision: (output, scenario) => precision(output, scenario),
    Recall: (output, scenario) => recall(output, scenario),
    F1Score: (output, scenario) => f1Score(output, scenario),
  },
});
