export enum Operation {
  "insert",
  "delete",
  "replace",
}
export interface LevensteinDiff {
  new: string;
  operation: Operation;
  index: number;
}

export function lDiggity(a: string, b: string): LevensteinDiff[] {
  const diffs: LevensteinDiff[] = [];
  const dp = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) {
    for (let j = 0; j <= b.length; j++) {
      if (i == 0) dp[i][j] = j;
      else if (j == 0) dp[i][j] = i;
      else if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else {
        dp[i][j] =
          Math.min(
            dp[i - 1][j], // deletion
            dp[i][j - 1], // insertion
            dp[i - 1][j - 1] // replacement
          ) + 1;
      }
    }
  }

  // Backtracking to find the path
  let i = a.length;
  let j = b.length;

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      i--;
      j--;
    } else if (dp[i][j] === dp[i - 1][j - 1] + 1) {
      diffs.push({
        new: b[j - 1],
        operation: Operation.replace,
        index: i - 1,
      });
      i--;
      j--;
    } else if (dp[i][j] === dp[i - 1][j] + 1) {
      diffs.push({
        new: "",
        operation: Operation.delete,
        index: i - 1,
      });
      i--;
    } else if (dp[i][j] === dp[i][j - 1] + 1) {
      diffs.push({
        new: b[j - 1],
        operation: Operation.insert,
        index: j - 1,
      });
      j--;
    }
  }

  // Take care of the remaining operations
  while (i > 0) {
    diffs.push({
      new: "",
      operation: Operation.delete,
      index: i - 1,
    });
    i--;
  }
  while (j > 0) {
    diffs.push({
      new: b[j - 1],
      operation: Operation.insert,
      index: j - 1,
    });
    j--;
  }

  return diffs.reverse(); // Reverse to get the correct order of operations
}

// Example usage:
const source = "this is a test of the algorithm";
const target = "This test is designed to validate the algorithm.";
const changes = lDiggity(source, target);
console.log(changes);
