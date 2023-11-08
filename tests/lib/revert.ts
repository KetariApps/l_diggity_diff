import { Diff, Operation } from "../../lib/types";

export default function revert(original: string, diffs: Diff[]): string {
    // Copy the original string into an array for easier manipulation
    let chars = original.split('');
    // We will apply diffs in reverse order, so we need to sort them by index in descending order
    const sortedDiffs = diffs.sort((a, b) => b.index.old - a.index.old);
  
    // Apply the differences in reverse
    for (const diff of sortedDiffs) {
      switch (diff.operation) {
        case Operation.Delete:
          // Insert the character back to the original string
          chars.splice(diff.index.old, 0, diff.new);
          break;
        case Operation.Insert:
          // Remove the character that was inserted
          chars.splice(diff.index.old, 1);
          break;
        case Operation.Replace:
          // Replace the new character with the old character
          chars[diff.index.old] = diff.new;
          break;
      }
    }
  
    // Join the array back into a string
    return chars.join('');
  }
  