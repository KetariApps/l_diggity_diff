export enum Operation {
  "Insert",
  "Delete",
  "Replace",
}
export interface Diff {
  new: string;
  operation: Operation;
  index: { old: number; new: number };
}
export interface GroupedDiff {
  
}