/**
 * Showcase projects — real jobsite photos from Hitesh's company profile PDF,
 * facts verified against Aastha-Enterprise-Master-Document.md §3.
 * GFSU Training Centre (project 6) joins once its photo arrives from Hitesh.
 */
export type ShowcaseProject = {
  /** Upright part of the display name */
  name: string;
  /** Italic part of the display name (design system headline split) */
  emphasis?: string;
  scope: string;
  location: string;
  type: string;
  /** Filename inside /images/projects/ */
  image: string;
  alt: string;
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    name: "Central Bus Station,",
    emphasis: "Ved Transcube Plaza",
    scope: "Structural glazing",
    location: "Vadodara, Gujarat",
    type: "Public infrastructure",
    image: "central-bus-station.webp",
    alt: "Structural glazing at Central Bus Station, Ved Transcube Plaza, Vadodara",
  },
  {
    name: "H.J. Doshi",
    emphasis: "Hospital",
    scope: "Curtain wall",
    location: "Rajkot, Gujarat",
    type: "Healthcare",
    image: "hj-doshi-hospital.webp",
    alt: "Curtain wall at H.J. Doshi Hospital, Rajkot",
  },
  {
    name: "Vapi",
    emphasis: "Auditorium",
    scope: "Spider glass fixing",
    location: "Vapi, Gujarat",
    type: "Public auditorium",
    image: "vapi-auditorium.webp",
    alt: "Spider glass facade at Vapi Auditorium",
  },
  {
    name: "MEPRO",
    scope: "12mm glass partition",
    location: "Jarod, Gujarat",
    type: "Commercial facility",
    image: "mepro.webp",
    alt: "12mm glass partition work at MEPRO, Jarod",
  },
  {
    name: "GFSU,",
    emphasis: "Gandhinagar",
    scope: "Curtain wall",
    location: "Gandhinagar, Gujarat",
    type: "University campus",
    image: "gfsu-gandhinagar.webp",
    alt: "Curtain wall at GFSU campus, Gandhinagar",
  },
];
