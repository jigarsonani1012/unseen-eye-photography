// ————————————————————————————————————————————————————————————————
// THE PHOTOGRAPHER'S UNIVERSE — content layer
// One photographer. One eye. All imagery art-directed as a single body of work.
// ————————————————————————————————————————————————————————————————

const P = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export function px(base: string, w: number): string {
  return `${base}?auto=compress&cs=tinysrgb&w=${w}`;
}

export type Photo = { src: string; alt: string; credit?: string };
export const ph = (id: number, alt: string, credit?: string): Photo => ({ src: P(id), alt, credit });

// ——— Image library (curated real frames, named like a working archive) ———
export const IMAGES = {
  night01: ph(29356751, "Rain-slicked street in Tokyo, storefront light spilling onto wet asphalt", "Alexander London"),
  night02: ph(16158304, "An empty street after midnight, puddles holding the city lights", "Shuvo Haque"),
  night03: ph(12151768, "A crowd beneath a cinema marquee, New York, late showing", "Philip Warp"),
  night04: ph(35171253, "Malmö central station at night, sodium light on wet stone", "Nathan J Hilton"),
  night05: ph(1676985, "Handrail and stairwell at night, shallow focus, distant traffic", "Artem Saranin"),
  night06: ph(35171250, "Metro platform after the last departure, fluorescent hum", "Nathan J Hilton"),
  night07: ph(31000908, "A grocer closing his shop in Istanbul, single lamp still burning", "Tolga Ahmetler"),
  night08: ph(35171243, "A cyclist crossing a neon-lit junction, long shadow", "Nathan J Hilton"),
  night09: ph(35171240, "Escalator descending into the metro, deep hour", "Nathan J Hilton"),
  night10: ph(35171310, "Street food stall in Copenhagen, steam and tungsten light", "Nathan J Hilton"),

  portrait01: ph(13211921, "Henri, set photographer, cigarette break between setups", "Yasin Aydın"),
  portrait02: ph(32508771, "María, weaver, photographed with her eyes closed at her own request", "Dave García"),
  portrait03: ph(32508768, "Tomás on the morning of his nineteenth birthday", "Dave García"),
  portrait04: ph(32508764, "María again, one year later, in black and white", "Dave García"),
  portrait05: ph(19165482, "Ada descending the staircase of the old print works", "Khoa Võ"),
  portrait06: ph(34094508, "Yuki looking up into the greenhouse glass", "Tiemy Pixel"),
  portrait07: ph(12835734, "Lena in her apartment, the afternoon she decided to move", "Stephen C"),
  portrait08: ph(15169602, "Nadia fixing her hair in the window light before the ceremony", "Connor S. McManus"),
  portrait09: ph(30205003, "Osei testing a camera older than both of us", "Usman A. Gambo"),
  portrait10: ph(31325259, "Vitor with the Rolleiflex he inherited from his grandfather", "Vitor Diniz"),

  fashion01: ph(29785590, "Editorial for Revue — sculptural light, single source", "Dan Butler"),
  fashion02: ph(17945059, "Studio sitting, black blazer, for Document Journal", "Nur Demirbaş"),
  fashion03: ph(19222080, "Between looks — the quiet minute before the shutter", "Guto Macedo"),
  fashion04: ph(18516758, "Minimal study in black, agency test that became a cover", "Daniil Kondrashin"),
  fashion05: ph(29090948, "Chair study, afternoon studio session in Milan", "Andrea Musto"),
  fashion06: ph(22856145, "Geometry of rest — seated figure, hard light", "Anand Kulkarni"),
  fashion07: ph(19445634, "Beige coat, July, the only usable frame of the day", "James L"),
  fashion08: ph(11689401, "Umbrella study, single red gel, rain machine off-camera", "Brian Haider"),
  fashion09: ph(14946383, "Red on red — colour story for the autumn issue", "Barion McQueen"),
  fashion10: ph(29504114, "Reading the proofs of her own cover, on set", "Alena Evseenko"),

  street01: ph(36385768, "Via Toledo in winter, Naples, everyone going somewhere", "Olivia"),
  street02: ph(32560353, "Another photographer working the same corner, São Paulo", "Nascimento Jr."),
  street03: ph(28337237, "Flinders Street, the argument that was not an argument", "Lawrence Lam"),
  street04: ph(38979614, "Alleyway crossing, midday, no one looked up", "D. Apostolidou"),
  street05: ph(3676387, "Two women crossing Old Town Square, Prague, first snow", "Waqas Saeed"),
  street06: ph(30481264, "Dusk traffic and a waiting tuk-tuk, last light of the year", "Marcelo Mora"),
  street07: ph(12476322, "A man walking off a long night, morning shift beginning", "Ayşegül Aytören"),
  street08: ph(18396916, "The bus stop on Mare Street, 08:14, a held breath", "Arthur Swiffen"),
  street09: ph(18644503, "Squatting for the low angle — colleague at work", "Traveler Stories"),
  street10: ph(32497732, "São Paulo, the corner everyone photographs and no one gets", "Emanuel Pedro"),

  arch01: ph(16512513, "Facade study — the hour when the building becomes a sundial", "Jan van der Wolf"),
  arch02: ph(36969840, "Shadow geometry on raw concrete, midday", "Sayeed Chowdhury"),
  arch03: ph(38808616, "Looking up through the structure, the sky doing the composing", "T. Royce Xan"),
  arch04: ph(29064897, "Warm light raking across a blind wall, Kyoto", "Mak_ jp"),
  arch05: ph(9214336, "Stone facade, midday, Lviv — architecture keeping time", "Alexander Zvir"),
  arch06: ph(13166135, "Steps and their doubled shadows, late afternoon", "Jan van der Wolf"),
  arch07: ph(20070348, "A lamp's shadow doing the building's talking", "Vladimir Gladkov"),
  arch08: ph(14494047, "The corner condition, held against a clear sky", "Connor S. McManus"),
  arch09: ph(19101642, "Plain wall, dramatic weather, nothing else needed", "Adrien Olichon"),
  arch10: ph(18891774, "Stairwell light study, housing block, Marseille", "Filipp Romanovski"),

  travel01: ph(34611635, "Stokksnes at first light, the mountain deciding whether to appear", "Rino Adamo"),
  travel02: ph(12579302, "Fog lowering itself into the valley, Westfjords", "Ichi Hand"),
  travel03: ph(32478141, "The coastline doing what it has always done, unwitnessed", "Raul Ling"),
  travel04: ph(37194582, "Lake Ashi at dawn, ducks crossing the mist", "Iban Lopez Luna"),
  travel05: ph(5273531, "Fog and rock near the ring road, hour uncertain", "Julia Volk"),
  travel06: ph(4640978, "Rough sea and fog, the cliff edge politely ignored", "ArtHouse Studio"),
  travel07: ph(37194583, "A road in Hakone holding its breath before the buses", "Iban Lopez Luna"),
  travel08: ph(37194580, "Rowboats moored on the fog lake, waiting for no one", "Iban Lopez Luna"),
  travel09: ph(4641117, "Sea stacks through fog, black sand in the foreground", "ArtHouse Studio"),
  travel10: ph(8775536, "A runner crossing the field, Iceland, scale made human", "Roman Kirienko"),
} as const;

type ImgKey = keyof typeof IMAGES;

// ——— Photographer ———
export const PHOTOGRAPHER = {
  name: "UNSEEN EYE",
  role: "Fine Art & Commercial Photography Studio",
  base: "Paris, France",
  email: "studio@unseeneye.com",
  statement: "I photograph what remains after the moment has passed.",
  bio: [
    "Elias Vale was born in Lisbon in 1984 and raised between a fishing harbour and his grandfather's darkroom. He studied architecture before abandoning it for the street, carrying the discipline of measured drawings into the unmeasured life of cities.",
    "For fifteen years he has worked slowly: long walks, longer waits, few frames. His photographs — portraits of strangers who became acquaintances, buildings at the hour they become instruments of light, cities after the crowds go home — have been published internationally and exhibited across Europe and Japan.",
    "He still shoots film for personal work, still prints by hand, and still believes a photograph is a promise made to a moment: that someone, somewhere, was paying attention.",
  ],
  philosophy: [
    "The photograph is not the moment. It is the trace the moment leaves behind.",
    "I am less interested in what things look like than in what they felt like.",
    "Restraint is a form of respect — for the subject, for the viewer, for the light.",
  ],
};

// ——— Projects / Stories ———
export type Project = {
  slug: string;
  title: string;
  year: string;
  location: string;
  category: "Night" | "Portrait" | "Street" | "Architecture" | "Travel" | "Fashion";
  description: string;
  note: string;
  cover: ImgKey;
  images: ImgKey[];
  credits?: { role: string; name: string }[];
  body: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "nocturne",
    title: "Nocturne",
    year: "2024 — 2026",
    location: "Paris · Tokyo · Malmö",
    category: "Night",
    description:
      "Three winters spent walking after dark. Night is not the absence of light; it is a different economy of it — less of it, spent more carefully.",
    note: "Most of these were made between 23:00 and 03:00, on foot, alone. I learned that a city at night tells you what it actually is, once it has stopped performing.",
    cover: "night01",
    images: ["night01", "night02", "night03", "night04", "night05", "night06", "night07", "night08", "night09", "night10"],
    credits: [
      { role: "Photographs", name: "Elias Vale" },
      { role: "Published in", name: "Revue Noire, issue 41" },
    ],
    body: [
      "The project began by accident: a missed last train in Malmö, three hours to kill, a camera with half a roll left. The station was empty and the light was doing something I had never seen in daylight — rationing itself, choosing what deserved to be visible.",
      "I started planning my winters around it. Paris in January, when the rain polishes the streets for free. Tokyo in February, where the neon is not decoration but infrastructure, as functional as plumbing. Everywhere the same discovery: the night is not empty. It is edited.",
      "People assume night photography is about neon and noise. It is mostly about patience and silence — about standing still long enough that the people who remain begin to ignore you, which is when they finally become themselves.",
      "The last frame of the series was made walking home at 03:40 after the film ran out. The best photograph of that winter exists only in my memory. I have decided to be grateful for that.",
    ],
  },
  {
    slug: "the-distance-between-us",
    title: "The Distance Between Us",
    year: "2019 — 2026",
    location: "Quito · Lisbon · Kyoto",
    category: "Portrait",
    description:
      "Seven years of portraits of people I met once and could not forget — and a few I return to, year after year, like a debt I happily owe.",
    note: "A portrait is a negotiation about distance: how close I may stand, how much you will show. The photograph is the treaty both parties sign.",
    cover: "portrait01",
    images: ["portrait01", "portrait02", "portrait03", "portrait04", "portrait05", "portrait06", "portrait07", "portrait08", "portrait09", "portrait10"],
    credits: [
      { role: "Photographs", name: "Elias Vale" },
      { role: "Exhibited", name: "Galerie Basse, Paris 2024" },
    ],
    body: [
      "María asked me to photograph her with her eyes closed. 'So you keep the inside,' she said, 'not the outside.' I have been thinking about that instruction for three years.",
      "I never begin with the camera. We walk, or we sit, or we drink something warm. The camera appears when it stops being interesting — when the person's face has relaxed back into the face they wear when nobody is asking anything of it.",
      "Henri, the set photographer, refused to be photographed for two years. Then one afternoon, without a word, he lit a cigarette and turned his good side to the window. We made four frames. He chose to keep two and gave me the other two 'for the archive you're always talking about.'",
      "The distance in the title is not between me and them. It is the distance between who people are and who they let us see. Photography lives in that gap.",
    ],
  },
  {
    slug: "after-the-rain",
    title: "After the Rain",
    year: "2023 — 2025",
    location: "Naples · Istanbul · New York",
    category: "Street",
    description:
      "Street photography made in the thirty minutes after rain stops — when a city exhales, the pavement turns to mercury, and everyone forgets to hurry.",
    note: "I keep a weather app open like other photographers keep a light meter. The work begins when the rain ends.",
    cover: "street01",
    images: ["street01", "street06", "street04", "street07", "street02", "street05", "street08", "street10", "street09", "street03"],
    credits: [{ role: "Photographs", name: "Elias Vale" }],
    body: [
      "Rain clears the stage and then the actors wander back on, blinking, slightly softer than before. Naples is the great master of this: within minutes the whole street reassembles, louder and wetter.",
      "I work with a fixed lens and one rule — the photograph must be made where I found it. No arranging, no waiting for a better coat to walk past. The street is smarter than I am.",
      "In Istanbul a grocer saw me photographing his shuttered shop and insisted I come back when it was open, 'so you can photograph something real.' I explained the closed shop was the real thing. He disagreed, and made me tea while we argued. Both of us were right.",
      "The series ends with a picture of another photographer working the same corner as me. We nodded. The street belongs to no one, which is the whole point of it.",
    ],
  },
  {
    slug: "concrete-elegy",
    title: "Concrete Elegy",
    year: "2021 — 2025",
    location: "Marseille · Kyoto · Lviv",
    category: "Architecture",
    description:
      "Buildings photographed at the precise hour they stop being objects and become instruments — walls that keep time, shadows doing the talking.",
    note: "I studied architecture for two years. I left because I preferred buildings to floor plans. This series is the diploma I never collected.",
    cover: "arch01",
    images: ["arch01", "arch02", "arch03", "arch04", "arch05", "arch06", "arch07", "arch08", "arch09", "arch10"],
    body: [
      "Every building has one hour a day when it is honest. Find that hour and the architects' intentions — even the failed ones — become briefly, forgivingly visible.",
      "I photograph facades the way I photograph people: straight on, in available light, without flattery. Concrete, like skin, keeps a record of the weather it has survived.",
      "In Marseille a caretaker watched me photograph his stairwell for an hour. 'You are the third one this year,' he said. 'The light is famous.' Buildings have reputations too.",
    ],
  },
  {
    slug: "where-light-ends",
    title: "Where Light Ends",
    year: "2022 — 2024",
    location: "Iceland · Hakone",
    category: "Travel",
    description:
      "Two journeys to the edge of visibility — Icelandic fog and the mist lakes of Hakone. Photographs made in weather that was trying to erase the view.",
    note: "Fog is a humble teacher: it deletes everything you thought the picture was about, and the picture improves.",
    cover: "travel01",
    images: ["travel01", "travel02", "travel03", "travel05", "travel09", "travel06", "travel10", "travel04", "travel07", "travel08"],
    body: [
      "At Stokksnes I waited four mornings for the mountain to appear. On the fifth I photographed the fog instead, and understood I had been photographing the wrong subject all week.",
      "The Iceland frames were nearly all made within a kilometre of the ring road. The epic was never the point — the weather arriving and leaving was the point.",
      "In Hakone the mist has a schedule the locals read like a newspaper. The boats go onto the lake anyway. Everything there is a negotiation with vanishing.",
    ],
  },
  {
    slug: "still-moving",
    title: "Still Moving",
    year: "2020 — 2026",
    location: "Paris · Milan",
    category: "Fashion",
    description:
      "Selected editorial and studio commissions — fashion photographed as portraiture: the person first, the garment almost incidentally second.",
    note: "The best fashion photograph is the one taken between looks, when the model has stopped wearing the clothes and started inhabiting them.",
    cover: "fashion01",
    images: ["fashion01", "fashion02", "fashion03", "fashion04", "fashion05", "fashion06", "fashion07", "fashion08", "fashion09", "fashion10"],
    credits: [
      { role: "Photographs", name: "Elias Vale" },
      { role: "Styling", name: "A. Moreau · E. Lindqvist" },
      { role: "Clients", name: "Revue, Document Journal, Maison Ferrier" },
    ],
    body: [
      "I came to fashion late and with suspicion. I stayed because a studio is the one place where light will sit still for you, and I am not above enjoying that.",
      "My brief to every team is the same: we are making portraits that happen to contain clothes. The garment is the context. The person is the photograph.",
      "The red-on-red story was shot in one afternoon and almost killed by the client as 'too much.' It ran as a cover. Colour, like people, is usually right when it insists.",
    ],
  },
];

export const CATEGORIES = ["All", "Night", "Portrait", "Street", "Architecture", "Travel", "Fashion"] as const;

// ——— People ———
export type Person = {
  slug: string;
  name: string;
  profession: string;
  location: string;
  portrait: ImgKey;
  images: ImgKey[];
  quote: string;
  story: string;
};

export const PEOPLE: Person[] = [
  {
    slug: "maria",
    name: "María Q.",
    profession: "Weaver",
    location: "Quito, Ecuador",
    portrait: "portrait02",
    images: ["portrait02", "portrait04"],
    quote: "Photograph me with my eyes closed. So you keep the inside, not the outside.",
    story:
      "I met Marí­a at a market where she sold textiles woven on a loom older than her granddaughter. She refused the first portrait, accepted the second a year later, and instructed the third. We exchange a letter every spring. Her instruction — to photograph her with closed eyes — quietly reorganised everything I believe about portraiture.",
  },
  {
    slug: "henri",
    name: "Henri D.",
    profession: "Set Photographer",
    location: "Paris, France",
    portrait: "portrait01",
    images: ["portrait01"],
    quote: "You photograph people being looked at. I photograph people pretending not to be.",
    story:
      "Henri has spent thirty years on film sets, invisible by profession. He refused my camera for two years, then one afternoon lit a cigarette, turned his good side to the window, and held still for exactly four frames. He kept two. I keep the other two in the archive, where he says they belong.",
  },
  {
    slug: "tomas",
    name: "Tomás R.",
    profession: "Apprentice Roofer",
    location: "Lisbon, Portugal",
    portrait: "portrait03",
    images: ["portrait03"],
    quote: "You woke up at six on your birthday for a photograph? — For three photographs.",
    story:
      "Tomás agreed to a portrait on his nineteenth birthday, on the roof where he was learning his trade. The light came up over the estuary; he stopped performing somewhere around frame two. His mother has a print. He says it is the only photograph of himself he has ever liked, which is the review I care about.",
  },
  {
    slug: "ada",
    name: "Ada K.",
    profession: "Print Conservator",
    location: "Berlin, Germany",
    portrait: "portrait05",
    images: ["portrait05"],
    quote: "I spend my days keeping other people's images alive. Yours can look after themselves.",
    story:
      "Ada restores nineteenth-century prints in a workshop that smells of gelatin and patience. I photographed her descending the staircase of the old print works as she left for the day — one frame, unposed, between the door and the stairs. She looked at it and said it was 'adequately archival.' From Ada, that is a standing ovation.",
  },
  {
    slug: "yuki",
    name: "Yuki M.",
    profession: "Botanist",
    location: "Kyoto, Japan",
    portrait: "portrait06",
    images: ["portrait06"],
    quote: "The glasshouse plants face the light. You face the plants. It is the same photograph.",
    story:
      "Yuki keeps the alpine house at the botanical gardens. We spent an afternoon there in February, the glass ticking as it warmed. She looked up into the light at the exact moment I stopped composing and started accepting. She claims she was inspecting a pane of glass. I keep her version in the caption and mine in the frame.",
  },
  {
    slug: "lena",
    name: "Lena V.",
    profession: "Stage Manager",
    location: "Hamburg, Germany",
    portrait: "portrait07",
    images: ["portrait07", "portrait08"],
    quote: "Take it before I change my mind about the apartment, not about you.",
    story:
      "Lena was leaving the flat she had lived in for nine years. We made the portrait in the last hour the light reached her kitchen window. The photograph is really about the room, but she has never admitted it, and neither have I.",
  },
];

// ——— Locations ———
export type Location = {
  slug: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  frames: number;
  visits: string;
  cover: ImgKey;
  note: string;
};

export const LOCATIONS: Location[] = [
  { slug: "paris", name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, frames: 1412, visits: "2015 — 2026", cover: "night03", note: "Home base. The city I photograph when I am not travelling, which means the city I photograph when it rains." },
  { slug: "tokyo", name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, frames: 986, visits: "2018 — 2026", cover: "night01", note: "Neon as infrastructure. Every February, three weeks, one district at a time." },
  { slug: "new-york", name: "New York", country: "United States", lat: 40.7128, lng: -74.006, frames: 743, visits: "2016 — 2024", cover: "night03", note: "Where I learned that the crowd is a landscape." },
  { slug: "istanbul", name: "Istanbul", country: "Türkiye", lat: 41.0082, lng: 28.9784, frames: 512, visits: "2019 — 2025", cover: "night07", note: "The city that argues with you over tea, and is usually right." },
  { slug: "naples", name: "Naples", country: "Italy", lat: 40.8518, lng: 14.2681, frames: 468, visits: "2022 — 2025", cover: "street01", note: "After the rain, Naples reassembles itself in minutes. I try to be there for it." },
  { slug: "reykjavik", name: "Reykjavík / Ring Road", country: "Iceland", lat: 64.1466, lng: -21.9426, frames: 394, visits: "2022 — 2024", cover: "travel02", note: "Four winters of fog. The weather is the subject; the island merely hosts it." },
  { slug: "kyoto", name: "Kyoto / Hakone", country: "Japan", lat: 35.0116, lng: 135.7681, frames: 351, visits: "2019 — 2023", cover: "travel07", note: "Mist on a schedule. Everything is a negotiation with vanishing." },
  { slug: "marrakech", name: "Marrakech", country: "Morocco", lat: 31.6295, lng: -7.9811, frames: 288, visits: "2017 — 2023", cover: "arch04", note: "Light you can lean against. Photographed mostly at the hour walls turn to amber." },
];

// ——— Journal ———
export type Article = {
  slug: string;
  title: string;
  category: "Field Notes" | "Behind the Frame" | "Travel" | "People" | "Process" | "Equipment" | "Essay";
  date: string;
  cover: ImgKey;
  excerpt: string;
  body: string[];
  pull?: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "on-photographing-strangers",
    title: "On Photographing Strangers",
    category: "Essay",
    date: "March 12, 2026",
    cover: "portrait01",
    excerpt: "The camera appears when it stops being interesting. Notes on the ethics and arithmetic of photographing people you have only just met.",
    pull: "A portrait is a treaty both parties sign.",
    body: [
      "The question strangers ask most often is not 'why me?' but 'what for?' It is a fair question and I have stopped giving clever answers. For the archive, I say now, which is honest. For the record that you were here, on this street, on this Tuesday, being entirely yourself.",
      "I never photograph anyone who hesitates. Hesitation is information, and the information is no. The exceptions to this rule have produced my worst photographs and one friendship I nearly ruined.",
      "What I have learned in fifteen years: people do not fear the camera. They fear the version of themselves the camera might keep. The work — all of it — is convincing someone that the version I want is the one they already are.",
      "Henri put it best, cigarette in hand, refusing my lens for the second year running: 'You want the face I use when nobody is asking. So stop asking.' I stopped asking. Two months later he gave me the photograph.",
    ],
  },
  {
    slug: "the-night-is-not-empty",
    title: "The Night Is Not Empty",
    category: "Behind the Frame",
    date: "January 28, 2026",
    cover: "night01",
    excerpt: "How Nocturne began with a missed train in Malmö, and what three winters of walking after dark taught me about the editing a city does to itself.",
    pull: "Night is not the absence of light. It is a different economy of it.",
    body: [
      "I missed the last train out of Malmö on a Tuesday in January. Three hours to kill. The station was empty, the sodium lights were on, and the wet stone was doing something I had never seen a city do in daylight: it was rationing itself.",
      "Daylight is democratic — it falls on everything equally, the beautiful and the merciless alike. Night light is editorial. A shop lamp chooses its pavement. A marquee chooses its crowd. The photographer at night is not composing so much as eavesdropping on choices the light has already made.",
      "The technical notes are boring and here they are: 50mm, f/1.8, whatever shutter speed my hands could hold, film pushed until the grain becomes part of the weather. The grain is not noise. It is the texture of the hour.",
      "People imagine night photography as neon and drama. Mostly it is silence and arithmetic: how long can I stand here before the man at the food stall forgets me? Usually eleven minutes. Frame twelve is the keeper.",
    ],
  },
  {
    slug: "notes-from-the-ring-road",
    title: "Notes from the Ring Road",
    category: "Travel",
    date: "November 9, 2025",
    cover: "travel01",
    excerpt: "Four mornings waiting for a mountain to appear. On the fifth I photographed the fog instead. A field diary from Stokksnes.",
    pull: "Fog deletes everything you thought the picture was about, and the picture improves.",
    body: [
      "Day one: arrived at 05:40, mountain invisible. Made zero frames. Photographed, mentally, the photograph I would have made.",
      "Day two: mountain briefly visible at 06:12, gone by 06:14. Two frames, both hesitant. Hesitation photographs like mud.",
      "Day three: fog total. A runner crossed the empty field in front of me, alone, at walking pace, and suddenly the emptiness had scale. I finally understood the location: it is not about the mountain. It is about the negotiation between something enormous and the moment it agrees to be seen.",
      "Day four: I stopped waiting for the mountain. The fog frames are the best of the trip. The mountain, when it finally appeared on day five, was magnificent and unnecessary. I photographed it anyway. Gratitude, not need.",
    ],
  },
  {
    slug: "why-i-still-shoot-film",
    title: "An Unreasonable Case for Film",
    category: "Process",
    date: "September 2, 2025",
    cover: "portrait09",
    excerpt: "Not nostalgia. Arithmetic. What thirty-six frames do to a day that three thousand frames never could.",
    body: [
      "The case against film is complete and correct: it is expensive, slow, fragile, and unnecessary. I accept every word of it and shoot it anyway, for reasons that have nothing to do with romance.",
      "Thirty-six frames change my arithmetic. With a digital camera I ask 'why not?' before pressing the shutter. With film I ask 'why?' That single missing word is the entire difference in the contact sheets.",
      "The delay matters too. The week between the exposure and the scan is a cooling-off period for my judgement. The photograph I was certain of is often ordinary; the frame I barely remember taking keeps the truth. My memory, it turns out, is a worse editor than my camera.",
      "None of this is advocacy. Digital made half the work on this site. This is simply a note that constraint is a tool, and scarcity is a curriculum.",
    ],
  },
  {
    slug: "portrait-of-maria-again",
    title: "Portrait of María, Again",
    category: "People",
    date: "May 17, 2025",
    cover: "portrait02",
    excerpt: "She refused the first portrait, accepted the second a year later, and instructed the third. On the people a photographer collects without meaning to.",
    pull: "So you keep the inside, not the outside.",
    body: [
      "The first time I asked Marí­a for a portrait she said no with the efficiency of someone who has been asked before. I bought a table runner instead. It is still on my table.",
      "A year later I returned to the market with a print of the stall, not of her. She looked at it for a long time, then said: 'You photograph like my husband haggles. Slowly.' That day she agreed to five minutes.",
      "The third portrait, the one with her eyes closed, was her idea entirely. I asked why closed. 'So you keep the inside,' she said, 'not the outside.' I have thought about that sentence more than most books I have read.",
      "We exchange a letter every spring. She has never once asked to see the photographs. She does not need to. She was there.",
    ],
  },
  {
    slug: "the-field-kit",
    title: "The Field Kit, Weighed and Confessed",
    category: "Equipment",
    date: "February 3, 2025",
    cover: "travel02",
    excerpt: "What is actually in the bag after fifteen years of removing things from it. Total weight: 4.1 kg. Total excuses: zero.",
    body: [
      "The bag weighs 4.1 kilograms. It weighed 9 kilograms a decade ago, which means my education has a mass of roughly 5 kilograms of abandoned equipment.",
      "One camera that shoots film, one that does not. A 35mm and a 50mm, nothing longer: if the photograph needs a longer lens, the photograph needs me to walk closer, and if I cannot walk closer, it was not my photograph to begin with.",
      "A notebook, because the frame number and the weather are facts but the grocer's argument about his closed shop is the story, and the archive deserves both.",
      "Spare batteries, spare film, a plastic bag for rain, and the certain knowledge that the one image that matters will be made when something in the kit has just failed. It always is.",
    ],
  },
];

// ——— 24 Hours ———
export type Hour = {
  time: string;
  title: string;
  location: string;
  image: ImgKey;
  note: string;
  tone: "dawn" | "day" | "dusk" | "night";
};

export const HOURS: Hour[] = [
  { time: "05:48", title: "First Light", location: "Hakone, Japan", image: "travel07", tone: "dawn", note: "The road before the buses. Mist with a schedule, and me on it." },
  { time: "08:32", title: "The Commute", location: "Melbourne or anywhere", image: "street03", tone: "day", note: "Everyone rehearsing the day on the way to it." },
  { time: "12:16", title: "Hard Noon", location: "Naples, Italy", image: "street01", tone: "day", note: "The light everyone warns you about, doing its honest worst." },
  { time: "17:51", title: "The Long Shadow", location: "Marseille, France", image: "arch06", tone: "dusk", note: "Buildings become sundials. Steps count double." },
  { time: "21:43", title: "The Warm Hour", location: "Copenhagen, Denmark", image: "night10", tone: "night", note: "Steam, tungsten, and the people who feed the night." },
  { time: "23:57", title: "Last Frame", location: "New York, USA", image: "night02", tone: "night", note: "The city edited down to its verbs." },
];

// ——— Exhibitions / Publications / Commissions ———
export const EXHIBITIONS = [
  { year: "2026", title: "Nocturne", venue: "Fotografiska, Stockholm", kind: "Solo" },
  { year: "2024", title: "The Distance Between Us", venue: "Galerie Basse, Paris", kind: "Solo" },
  { year: "2023", title: "After the Rain", venue: "Offprint, Tate Modern, London", kind: "Group" },
  { year: "2022", title: "Where Light Ends", venue: "Kyotographie, Kyoto", kind: "Solo" },
  { year: "2020", title: "Street Level", venue: "C/O Berlin", kind: "Group" },
  { year: "2018", title: "First Light", venue: "Museu do Chiado, Lisbon", kind: "Solo" },
];

export const PUBLICATIONS = [
  { year: "2026", title: "Revue Noire, issue 41 — Nocturne (cover story)" },
  { year: "2025", title: "The British Journal of Photography — Ones to Watch, revisited" },
  { year: "2024", title: "Document Journal — Still Moving, fashion editorial" },
  { year: "2023", title: "Foam Magazine — Talent issue, portfolio" },
  { year: "2022", title: "Connaissance des Arts — Iceland portfolio" },
];

export const COMMISSIONS = [
  "Maison Ferrier — campaign, 2025 / 2026",
  "Théâtre de la Ville — season portraits, 2024 — ongoing",
  "Nordic Light Hotels — night series, 2024",
  "Banlieue Music — artist portraits, 2023",
  "Ville de Marseille — architectural archive, 2022",
];

// ——— Navigation ———
export const NAV = [
  { label: "Work", href: "/work" },
  { label: "Stories", href: "/stories" },
  { label: "Archive", href: "/archive" },
  { label: "World", href: "/world" },
  { label: "People", href: "/people" },
  { label: "24 Hours", href: "/24-hours" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ——— Archive: 60 frames generated from the working library ———
export type Frame = {
  id: string;
  frameNo: string;
  image: Photo;
  project: string;
  location: string;
  date: string;
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
  category: Project["category"];
  selected: boolean;
};

const CAMERAS = ["Leica M6", "Contax G2", "Nikon F3", "Pentax 67", "Leica Q3"];
const LENSES = ["35mm f/2", "50mm f/1.4", "50mm f/1.8", "45mm f/2", "90mm f/2.8"];
const APERTURES = ["f/1.8", "f/2", "f/2.8", "f/4", "f/5.6", "f/8"];
const SHUTTERS = ["1/60", "1/125", "1/250", "1/500", "1/1000", "1/30"];
const ISOS = ["200", "400", "800", "1600", "3200"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "September", "October", "November", "December"];

type FrameSeed = { keys: ImgKey[]; project: string; location: string; category: Frame["category"]; yearBase: number };
const FRAME_SETS: FrameSeed[] = [
  { keys: ["night01", "night02", "night03", "night04", "night05", "night06", "night07", "night08", "night09", "night10"], project: "Nocturne", location: "Paris / Tokyo", category: "Night", yearBase: 2024 },
  { keys: ["portrait01", "portrait02", "portrait03", "portrait04", "portrait05", "portrait06", "portrait07", "portrait08", "portrait09", "portrait10"], project: "The Distance Between Us", location: "Quito / Lisbon", category: "Portrait", yearBase: 2019 },
  { keys: ["street01", "street02", "street03", "street04", "street05", "street06", "street07", "street08", "street09", "street10"], project: "After the Rain", location: "Naples / Istanbul", category: "Street", yearBase: 2023 },
  { keys: ["arch01", "arch02", "arch03", "arch04", "arch05", "arch06", "arch07", "arch08", "arch09", "arch10"], project: "Concrete Elegy", location: "Marseille / Kyoto", category: "Architecture", yearBase: 2021 },
  { keys: ["travel01", "travel02", "travel03", "travel04", "travel05", "travel06", "travel07", "travel08", "travel09", "travel10"], project: "Where Light Ends", location: "Iceland / Hakone", category: "Travel", yearBase: 2022 },
  { keys: ["fashion01", "fashion02", "fashion03", "fashion04", "fashion05", "fashion06", "fashion07", "fashion08", "fashion09", "fashion10"], project: "Still Moving", location: "Paris / Milan", category: "Fashion", yearBase: 2020 },
];

export const FRAMES: Frame[] = FRAME_SETS.flatMap((set, si) =>
  set.keys.map((key, i) => {
    const n = 700 + si * 120 + i * 7;
    const year = set.yearBase + (i % 3);
    return {
      id: `${key}`,
      frameNo: `FRAME_${String(n).padStart(4, "0")}`,
      image: IMAGES[key],
      project: set.project,
      location: set.location,
      date: `${MONTHS[(si * 2 + i) % MONTHS.length]} ${3 + ((i * 5 + si) % 26)}, ${year}`,
      camera: CAMERAS[(si + i) % CAMERAS.length],
      lens: LENSES[(si * 3 + i) % LENSES.length],
      aperture: APERTURES[(si + i * 2) % APERTURES.length],
      shutter: SHUTTERS[(si * 2 + i) % SHUTTERS.length],
      iso: ISOS[(si + i) % ISOS.length],
      category: set.category,
      selected: (i * 3 + si) % 5 === 0,
    } satisfies Frame;
  }),
);

export const ARCHIVE_FILTERS = {
  years: [...new Set(FRAMES.map((f) => f.date.split(", ")[1]))].sort(),
  locations: [...new Set(FRAMES.map((f) => f.location))],
  categories: [...new Set(FRAMES.map((f) => f.category))],
  projects: [...new Set(FRAMES.map((f) => f.project))],
};

// ——— Gallery rooms ———
export const ROOMS: { id: string; title: string; note: string; images: ImgKey[] }[] = [
  { id: "01", title: "Portraits", note: "The treaty between the person and the lens.", images: ["portrait01", "portrait02", "portrait05", "portrait06"] },
  { id: "02", title: "Places", note: "Walls that keep time; weather that edits the view.", images: ["arch01", "travel01", "arch04", "travel04"] },
  { id: "03", title: "Night", note: "The city, edited.", images: ["night01", "night04", "night03", "night10"] },
  { id: "04", title: "Personal", note: "Frames kept for no client and one reason.", images: ["street07", "portrait08", "travel10", "night02"] },
];

export const HERO: ImgKey = "night01";
export const FINAL: ImgKey = "night03";
