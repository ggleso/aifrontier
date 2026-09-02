const apiVersion = '2022-11-28';

export function findMergedPullRequest(pullRequests, sha) {
  return pullRequests.find(
    (pullRequest) =>
      pullRequest.merged_at !== null &&
      pullRequest.base?.ref === 'main' &&
      pullRequest.merge_commit_sha === sha,
  );
}

async function fetchAssociatedPullRequests({ repository, sha, token }) {
  const response = await fetch(`https://api.github.com/repos/${repository}/commits/${sha}/pulls`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': apiVersion,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${String(response.status)} ${response.statusText}`);
  }

  return response.json();
}

export async function verifyMainPush(environment = process.env) {
  const repository = environment.GITHUB_REPOSITORY;
  const sha = environment.GITHUB_SHA;
  const token = environment.GITHUB_TOKEN;

  if (!repository || !sha || !token) {
    throw new Error('GITHUB_REPOSITORY, GITHUB_SHA, and GITHUB_TOKEN are required.');
  }

  const pullRequests = await fetchAssociatedPullRequests({ repository, sha, token });
  const mergedPullRequest = findMergedPullRequest(pullRequests, sha);

  if (!mergedPullRequest) {
    throw new Error(
      `Commit ${sha} reached main without a matching merged pull request. Investigate and revert through a pull request if needed.`,
    );
  }

  console.log(
    `Verified main commit ${sha} came from merged pull request #${String(mergedPullRequest.number)}.`,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  verifyMainPush().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
