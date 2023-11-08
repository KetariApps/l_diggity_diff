import { diff, revert } from "../lib";

// Example usage:
const source =
  "Kittens are really cute";
const target =
  "sitting";
console.time("diff timer");
const changes = diff(source, target);
console.timeEnd("diff timer");
console.log(changes.length);

console.time("recon timer")
const reconstruction = revert(source, changes);
console.timeEnd("recon timer")
console.log(reconstruction);
