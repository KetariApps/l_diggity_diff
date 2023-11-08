import { Diff, Operation } from "./types";

  
  export default function diff(a: string, b: string): Diff[] {
    const diffs: Diff[] = [];
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
          operation: Operation.Replace,
          index: { old: i - 1, new: j - 1 },
        });
        i--;
        j--;
      } else if (dp[i][j] === dp[i - 1][j] + 1) {
        diffs.push({
          new: "",
          operation: Operation.Delete,
          index: { old: i - 1, new: j - 1 },
        });
        i--;
      } else if (dp[i][j] === dp[i][j - 1] + 1) {
        diffs.push({
          new: b[j - 1],
          operation: Operation.Insert,
          index: { old: i - 1, new: j - 1 },
        });
        j--;
      }
    }
  
    // Take care of the remaining operations
    while (i > 0) {
      diffs.push({
        new: "",
        operation: Operation.Delete,
        index: { old: i - 1, new: j - 1 },
      });
      i--;
    }
    while (j > 0) {
      diffs.push({
        new: b[j - 1],
        operation: Operation.Insert,
        index: { old: i - 1, new: j - 1 },
      });
      j--;
    }
  
    return diffs.reverse(); // Reverse to get the correct order of operations
  }
  