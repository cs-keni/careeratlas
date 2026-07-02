import type { QuestPhase } from "./types";

/**
 * My First 90 Days (and first year) — the onboarding questline.
 * "main" quests are the must-dos; "side" quests are high-value extras.
 */
export const questPhases: QuestPhase[] = [
  {
    id: "week-1",
    label: "First Week",
    timeframe: "Days 1–7",
    theme: "Arrive, orient, absorb",
    quests: [
      { title: "Complete onboarding & required trainings", detail: "HR, safety, ethics, security awareness — clear the tutorial zone fast.", type: "main" },
      { title: "Learn how timekeeping & billability work", detail: "Charge codes, billable vs. overhead hours, and how to ask which code a task goes to. In consulting, the timesheet is sacred.", type: "main" },
      { title: "Meet your team and map the org", detail: "Who's your supervisor, your PM(s), the senior engineers, the discipline lead? Write it down.", type: "main" },
      { title: "Set up your toolchain", detail: "Bluebeam, Revit, AutoCAD, ACC access, network drives, project folders. Verify licenses and logins before you need them.", type: "main" },
      { title: "Start a personal glossary", detail: "Every acronym you hear — RFI, BOD, CD, SD, DD, AHJ, REX — goes in. Review weekly. This is your XP tracker.", type: "side" },
    ],
  },
  {
    id: "days-30",
    label: "First 30 Days",
    timeframe: "Weeks 2–4",
    theme: "Learn to read the world",
    quests: [
      { title: "Learn to read a floor plan", detail: "Sheet numbering, scales, grid lines, symbols, keynotes, details. Practice by tracing one full drawing set.", type: "main" },
      { title: "Bluebeam Revu basics", detail: "Markups, tool chest, measurements, overlays. Bluebeam University or your firm's training.", type: "main" },
      { title: "Understand Division 28 structure", detail: "Read one complete Div 28 spec section end to end. Note how it references Div 8, 26, and 27.", type: "main" },
      { title: "Shadow a senior engineer", detail: "Sit in on a design review, a client call, and a coordination meeting. Ask for 30 minutes of their time to walk through a past project.", type: "main" },
      { title: "Join ASIS", detail: "Membership + find the Portland chapter's next meeting. Ask if Jacobs sponsors membership.", type: "side" },
      { title: "Anatomy of one door", detail: "Pick a real access-controlled door in your office. Identify every component: reader, strike/maglock, DPS, REX, closer, panel it homes to.", type: "side" },
    ],
  },
  {
    id: "days-60",
    label: "First 60 Days",
    timeframe: "Month 2",
    theme: "Touch real work",
    quests: [
      { title: "Take on your first real deliverable", detail: "A device schedule update, a markup pass, a small layout — done under review, finished properly.", type: "main" },
      { title: "Revit fundamentals", detail: "Navigate a model, place and tag security families, generate a device schedule.", type: "main" },
      { title: "Axis Site Designer + camera math", detail: "Model a camera layout for a small area; learn DORI pixel-density targets and storage estimation.", type: "main" },
      { title: "Learn the project lifecycle", detail: "SD → DD → CD → bidding → CA. Know which phase each of your projects is in and what that means for your work.", type: "main" },
      { title: "Ride along on a site walk", detail: "Volunteer for any site visit. Field reality is the best teacher — bring the drawings and compare.", type: "side" },
    ],
  },
  {
    id: "days-90",
    label: "First 90 Days",
    timeframe: "Month 3",
    theme: "Become useful",
    quests: [
      { title: "Own a small scope end to end", detail: "One system on one small project — with review, but with your name on it.", type: "main" },
      { title: "AutoCAD reading fluency", detail: "Layers, xrefs, blocks, paper space. Enough to edit a riser diagram confidently.", type: "main" },
      { title: "Understand fail-safe vs fail-secure cold", detail: "And free egress requirements. This is the knowledge that keeps designs legal and people safe.", type: "main" },
      { title: "90-day check-in with your supervisor", detail: "Ask directly: what should I double down on? Where am I behind? What would make me more useful in 6 months?", type: "main" },
      { title: "Automate one annoying thing", detail: "A schedule formatter, a naming checker, a Bluebeam tool set — flex the CS background where it saves the team real time.", type: "side" },
    ],
  },
  {
    id: "year-1",
    label: "First Year",
    timeframe: "Months 4–12",
    theme: "Level up to full class",
    quests: [
      { title: "Start APP prep (~month 10–12)", detail: "You need ~1 year of experience to sit for it. Use the ASIS study materials; make it your first badge.", type: "main" },
      { title: "Contribute to a full design package", detail: "Plans, riser, schedules, and spec edits for at least one project phase issue.", type: "main" },
      { title: "Build your standard-details library", detail: "Collect every typical detail, riser pattern, and spec paragraph you touch. Future-you will design 3x faster.", type: "main" },
      { title: "Attend an industry event", detail: "ASIS chapter meetings regularly; GSX or ISC West if the budget allows. Meet integrators and vendors.", type: "side" },
      { title: "Pick your first multiclass experiment", detail: "By month 12 you'll feel a pull — deeper design? data centers? automation? Ask to be staffed accordingly. That's how paths actually start.", type: "side" },
      { title: "Ship one automation the team adopts", detail: "The clearest way to make your CS background visible and valued.", type: "side" },
    ],
  },
];
