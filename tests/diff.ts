import { diff } from "../lib";

// Example usage:
const source =
  "In the heart of the ancient forest, a hidden glade shimmered under the moon's gentle glow. A quiet brook meandered through, its waters whispering secrets of the old woods. Fireflies danced above the water, their lights flickering like tiny stars bound to the earth. An old oak stood watch, its branches stretching towards the sky, a silent guardian of the serene landscape.";
const target =
  "Within the ancient forest's core, a secluded glade gleamed beneath the soft luminescence of the moon. A tranquil stream wound its way across, murmuring age-old secrets of the woodland. Fireflies flitted over the stream, their glow blinking like miniature stars tethered to the terrain. An aged oak stood sentinel, its limbs reaching for the heavens, a quiet custodian of the peaceful scenery.";
console.time("timer");
const changes = diff(source, target);
console.timeEnd("timer");
console.log(changes);
console.log(changes.length);
