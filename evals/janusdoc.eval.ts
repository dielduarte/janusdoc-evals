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

    return { output, scenario };
  },

  scorers: {
    Precision: (result) => precision(result.output, result.scenario),
    Recall: (result) => recall(result.output, result.scenario),
    F1Score: (result) => f1Score(result.output, result.scenario),
  },
});
