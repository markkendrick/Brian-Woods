/** Internal SEO targeting list. Not for homepage or knowledge-base copy. */
export type AreaRound = "first" | "conditional" | "secondary";

export const serviceAreas = [
  {
    name: "Menifee",
    round: "first",
    focus: "subdivision",
    summary:
      "First-round search for 100–200-home subdivisions and remaining phases inside larger plans.",
  },
  {
    name: "Perris",
    round: "first",
    focus: "subdivision",
    summary:
      "First-round search for roughly 100–200 detached homes, including conventional and compact-lot concepts.",
  },
  {
    name: "Hemet and San Jacinto",
    round: "first",
    focus: "both",
    summary:
      "First-round subdivisions, with selected apartment sites where the product and utilities fit.",
  },
  {
    name: "Beaumont and Banning",
    round: "first",
    focus: "subdivision",
    summary:
      "First-round search for manageable tracts or phases with a documented path to required infrastructure.",
  },
  {
    name: "Wildomar",
    round: "first",
    focus: "apartment",
    summary: "First-round apartment search, with selective subdivision review.",
  },
  {
    name: "Lake Elsinore",
    round: "first",
    focus: "apartment",
    summary: "First-round screen for low-rise, two-story apartment concepts.",
  },
  {
    name: "Ontario and Ontario Ranch",
    round: "first",
    focus: "both",
    summary:
      "Parallel search for apartments or a defined tract phase under the applicable specific plan.",
  },
  {
    name: "Winchester and French Valley",
    round: "conditional",
    focus: "subdivision",
    summary:
      "Conditional only. Review sites with existing adopted rights, not proposals that still need a plan change.",
  },
] as const satisfies readonly {
  name: string;
  round: AreaRound;
  focus: "subdivision" | "apartment" | "both";
  summary: string;
}[];

export const firstRoundAreas = serviceAreas.filter((area) => area.round === "first");
