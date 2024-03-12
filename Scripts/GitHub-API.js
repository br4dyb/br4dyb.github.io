const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
  auth: process.env.PAT_BR4DYB // Accessing GitHub Secret as an environment variable
});

async function getGitHubPagesBuildStatus(owner, repo) {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
      owner: owner,
      repo: repo,
      workflow_id: ".github/workflows/github-pages.yml" // Adjust workflow name if necessary
    });
    const workflowRuns = response.data.workflow_runs;
    if (workflowRuns.length > 0) {
      const latestRun = workflowRuns[0];
      console.log("Latest GitHub Pages build status:", latestRun.status);
      console.log("Conclusion:", latestRun.conclusion);
      console.log("Details:", latestRun.html_url); // URL to the workflow run on GitHub
    } else {
      console.log("No GitHub Pages workflow runs found.");
    }
  } catch (error) {
    console.error("Error fetching GitHub Pages build status:", error);
  }
}

// Replace 'owner' and 'repo' with your GitHub username and repository name
getGitHubPagesBuildStatus("br4dyb", "br4dyb");
