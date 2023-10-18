import { processTestResults } from './results';
import { setFailed, setSummary } from './utils';
import { formatResultMarkdown } from './formatting/markdown';
import { formatResultHtml, formatTitleHtml } from './formatting/html';
import * as fs from 'fs';

const run = async (): Promise<void> => {
  try {
    // const {
    //   token,
    //   title,
    //   resultsPath,
    //   coveragePath,
    //   coverageType,
    //   coverageThreshold,
    //   postNewComment,
    //   allowFailedTests,
    //   onlyShowFailedTests,
    //   showTestOutput
    // } = getInputs();

    const title = "a";
    const resultsPath = './files/ab/_ip-10-8-96-225_2023-10-04_13_16_40.trx';
    // const coveragePath = null;
    // const token = 'a'
    const allowFailedTests = true;
    const onlyShowFailedTests = false;
    const showTestOutput = true;

    let comment = '';
    let summary = formatTitleHtml(title);

    const testResult = await processTestResults(resultsPath, allowFailedTests);
    comment += formatResultMarkdown(testResult);
    summary += formatResultHtml(testResult, onlyShowFailedTests, showTestOutput);

    fs.writeFile("output.html", summary, function(err) {
      if(err) {
      return console.log(err);
      }});
    // if (coveragePath) {
    //   const testCoverage = await processTestCoverage(coveragePath, coverageType, coverageThreshold);
    //   comment += testCoverage ? formatCoverageMarkdown(testCoverage, coverageThreshold) : '';
    //   summary += testCoverage ? formatCoverageHtml(testCoverage) : '';
    // }

    console.log(comment);

    await setSummary(summary);
    //await publishComment(token, title, comment, postNewComment);
  } catch (error) {
    setFailed((error as Error).message);
  }
};

run();
