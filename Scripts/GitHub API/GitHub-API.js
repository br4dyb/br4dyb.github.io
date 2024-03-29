// Ensure Octokit is globally accessible
const octokit = new Octokit({
  auth: process.env.PAT_BR4DYB // Accessing GitHub Secret as an environment variable
});

// Define getGitHubPagesBuildStatus function
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

      return [latestRun.conclusion, latestRun.status]; // Return an array

    } else {
      console.log("No GitHub Pages workflow runs found.");
      return ["Error", "Could not Fetch!"]; // Return an array
    }
  } catch (error) {
    console.error("Error fetching GitHub Pages build status:", error);
    return ["Error", "Could not Fetch!"]; // Return an array
  }
}

// Define CheckMainBuildStatus function
async function CheckMainBuildStatus() {
  console.log("Checking Build Status | Via API ");

  try {
    let [BuildSuccess, data] = await getGitHubPagesBuildStatus("br4dyb", "br4dyb");
    let NewText = document.createElement('div');

    if (BuildSuccess == "Error") {
      NewText.innerHTML = `
        <p> <b> Results: </b> </p>
        <p> Conclusion: <b> ERROR! </b> </p>
        <p> Status: <b> ERROR! </b> </p>
      `;
    } else {
      NewText.innerHTML = `
        <p> Results </p>
        <p> Conclusion: ${BuildSuccess} </p>
        <p> Status: ${data} </p>
      `;
    }

    document.body.appendChild(NewText);
  } catch (error) {
    console.error("Error checking build status:", error);
  }
}
