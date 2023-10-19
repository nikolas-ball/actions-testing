const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const regex = 'd2m|D2M|M2D|master to dev|dev2master|Dev to master|dev to master|[A-Za-z]+/ \[[^\]]*\](\s([A-Za-z]+\s)+)\([^)]*\)';
    const prTitle = github.context.payload.pull_request.title;

    if (!prTitle.match(new RegExp(regex))) {
      core.setFailed('PR title does not match the required pattern — must be structured like: "fix: [myViewAPI] small change (MVT-123)" or "feat/[Desktop] small change (No Jira)", etc.');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();