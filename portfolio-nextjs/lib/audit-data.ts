export interface AuditQuestion {
  id: string;
  question: string;
  helpText: string;
  options: { value: number; label: string }[];
}

export interface AuditSection {
  id: string;
  icon: string;
  title: string;
  description: string;
  questions: AuditQuestion[];
}

export const auditSections: AuditSection[] = [
  {
    id: "reporting",
    icon: "BarChart",
    title: "Client Reporting & Performance Updates",
    description:
      "How does your agency measure, track, and communicate results to clients?",
    questions: [
      {
        id: "q1",
        question:
          "How do you create and deliver client performance reports?",
        helpText:
          "Client reporting is the single biggest recurring time drain in most agencies. 10 clients = 15+ hours/month minimum if done manually.",
        options: [
          {
            value: 0,
            label:
              "Manually: We pull data from multiple platforms and build reports by hand each time.",
          },
          {
            value: 1,
            label:
              "Partially: We use templates or tools, but data entry and delivery still require manual steps.",
          },
          {
            value: 2,
            label:
              "Fully Automated: Reports are generated and delivered to clients on a set schedule without manual work.",
          },
        ],
      },
      {
        id: "q2",
        question:
          "How do you monitor whether your client deliverables are actually working?",
        helpText:
          "Reactive monitoring means clients find problems before you do. Automation flips that dynamic entirely.",
        options: [
          {
            value: 0,
            label:
              "Manually: We check manually when a client asks, or on an inconsistent schedule.",
          },
          {
            value: 1,
            label:
              "Partially: We use tracking tools, but reviewing data and flagging issues still requires manual effort.",
          },
          {
            value: 2,
            label:
              "Fully Automated: We have dashboards or alerts that proactively surface issues without manual checking.",
          },
        ],
      },
      {
        id: "q3",
        question:
          "When a client asks 'how are things going?' — how quickly can you give them a data-backed answer?",
        helpText:
          "The speed of your answer directly affects client trust and retention. Manual data access is a hidden retention risk.",
        options: [
          {
            value: 0,
            label:
              "It takes time: We need to pull data manually before we can respond.",
          },
          {
            value: 1,
            label:
              "Partially: We have some data accessible, but compiling a clear answer still takes effort.",
          },
          {
            value: 2,
            label:
              "Instantly: We have live dashboards or automated reports ready at any time.",
          },
        ],
      },
    ],
  },
  {
    id: "delivery",
    icon: "Wrench",
    title: "Service Delivery & Content Operations",
    description:
      "How does your team actually deliver work to clients — from creation to publishing to handoff?",
    questions: [
      {
        id: "q4",
        question:
          "How does your team deliver recurring content or services to clients each week/month?",
        helpText:
          "Recurring manual delivery is the #1 reason agencies hit a growth ceiling. If adding a client adds proportional workload, you can't scale profitably.",
        options: [
          {
            value: 0,
            label:
              "Manually: Team members complete and deliver each piece of work individually for each client.",
          },
          {
            value: 1,
            label:
              "Partially: We have some templates or tools, but delivery still requires significant manual effort per client.",
          },
          {
            value: 2,
            label:
              "Fully Automated: Recurring delivery follows a repeatable system that runs with minimal oversight.",
          },
        ],
      },
      {
        id: "q5",
        question:
          "How are tasks handed off between team members or departments?",
        helpText:
          "Manual handoffs create bottlenecks, missed deadlines, and team frustration. They get worse as you grow.",
        options: [
          {
            value: 0,
            label:
              "Informally: Via Slack, email, or verbal communication—handoffs are informal and often get dropped.",
          },
          {
            value: 1,
            label:
              "Partially: We use a project management tool, but task assignment and follow-up are still done manually.",
          },
          {
            value: 2,
            label:
              "Fully Automated: Task completion triggers the next step automatically without anyone needing to manually assign or follow up.",
          },
        ],
      },
      {
        id: "q6",
        question:
          "How much of your team's weekly work is genuinely repetitive — the same task done over and over for different clients?",
        helpText:
          "Repetitive work is automatable work. If your team is doing the same thing 10 times for 10 clients, that's a system waiting to be built.",
        options: [
          {
            value: 0,
            label:
              "A large portion: Most of what we do is the same task repeated across clients manually.",
          },
          {
            value: 1,
            label:
              "Partially: Some repetition exists, but we've automated parts of it.",
          },
          {
            value: 2,
            label:
              "Minimal: Most repetitive work has been systematized or automated.",
          },
        ],
      },
    ],
  },
  {
    id: "onboarding",
    icon: "Settings",
    title: "Client Onboarding & Internal Operations",
    description:
      "How does your agency bring on new clients and keep internal operations running smoothly?",
    questions: [
      {
        id: "q7",
        question:
          "How long does it take to fully onboard a new client from signed contract to first deliverable?",
        helpText:
          "Every hour spent on onboarding is an hour not spent on delivery or growth. A 3-hour onboard for 4 clients/month = 12 hours of pure overhead.",
        options: [
          {
            value: 0,
            label:
              "Several hours or more: Onboarding involves multiple manual steps across tools and team members.",
          },
          {
            value: 1,
            label:
              "1–3 hours: We have a process but it still requires significant coordination.",
          },
          {
            value: 2,
            label:
              "Under 30 minutes: Onboarding is systematized and most steps happen automatically.",
          },
        ],
      },
      {
        id: "q8",
        question: "How do you onboard and train new team members?",
        helpText:
          "Inconsistent onboarding creates inconsistent output. It's also a hidden cost that compounds as your team grows.",
        options: [
          {
            value: 0,
            label:
              "Manually: A manager walks them through everything each time—training is inconsistent and person-dependent.",
          },
          {
            value: 1,
            label:
              "Partially: We have some documentation, but onboarding is incomplete and varies between hires.",
          },
          {
            value: 2,
            label:
              "Fully Automated: New hires receive structured training materials, SOPs, and tool access automatically.",
          },
        ],
      },
      {
        id: "q9",
        question:
          "How visible is your team's workload and project status at any given moment?",
        helpText:
          "If you can't see your operations clearly, you can't manage them. Status meetings are a symptom of poor visibility.",
        options: [
          {
            value: 0,
            label:
              "Not very: We rely on check-ins, status meetings, or asking team members directly.",
          },
          {
            value: 1,
            label:
              "Partially: We have a project management tool but it's not consistently updated.",
          },
          {
            value: 2,
            label:
              "Fully visible: We have a live view of every project, task, and deadline without needing to ask anyone.",
          },
        ],
      },
    ],
  },
  {
    id: "growth",
    icon: "Rocket",
    title: "Business Growth & Client Communication",
    description:
      "How does your agency attract new clients, follow up with prospects, and stay in touch with existing ones?",
    questions: [
      {
        id: "q10",
        question:
          "How do you generate new leads and follow up with prospects?",
        helpText:
          "Manual outreach doesn't scale. If lead generation stops when you're busy delivering, your pipeline dries up every time you grow.",
        options: [
          {
            value: 0,
            label:
              "Manually: Outreach, follow-ups, and nurturing are done by hand with no consistent system.",
          },
          {
            value: 1,
            label:
              "Partially: We have some email sequences or a CRM, but prospecting and follow-up still require manual effort.",
          },
          {
            value: 2,
            label:
              "Fully Automated: Lead generation, outreach, and follow-up sequences run automatically with minimal manual input.",
          },
        ],
      },
      {
        id: "q11",
        question:
          "How do you handle routine client communication — updates, check-ins, and answering recurring questions?",
        helpText:
          "Reactive communication creates anxious clients. Proactive automated touchpoints build trust and reduce churn without extra effort.",
        options: [
          {
            value: 0,
            label:
              "Reactively: We respond when clients reach out, and updates are sent manually when we remember.",
          },
          {
            value: 1,
            label:
              "Partially: We send updates regularly, but it's still a manual process that relies on individual team members.",
          },
          {
            value: 2,
            label:
              "Fully Automated: Clients receive regular automated updates, reports, and check-ins without manual effort.",
          },
        ],
      },
      {
        id: "q12",
        question:
          "How well do your tools talk to each other? (CRM, project management, invoicing, communication, reporting)",
        helpText:
          "Disconnected tools are the silent tax on agency efficiency. Every manual data transfer is a potential error and a guaranteed time drain.",
        options: [
          {
            value: 0,
            label:
              "They don't: Data lives in silos and team members manually update multiple platforms.",
          },
          {
            value: 1,
            label:
              "Partially: Some integrations exist, but data sync is unreliable or there are still manual steps between tools.",
          },
          {
            value: 2,
            label:
              "Fully Integrated: Data flows automatically between systems without manual entry or copy-pasting.",
          },
        ],
      },
    ],
  },
];

export interface ScoringTier {
  range: [number, number];
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  recommendation: string;
}

export const scoringTiers: ScoringTier[] = [
  {
    range: [20, 24],
    label: "High Automation Maturity",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    description:
      "Your operations are well-systematized. Focus on optimizing what exists, closing edge-case gaps, and exploring advanced AI integrations.",
    recommendation:
      "You're ahead of the curve. Let's explore advanced AI integrations and find the last remaining efficiency gaps.",
  },
  {
    range: [14, 19],
    label: "Moderate — Room to Grow",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description:
      "You've made a good start, but significant manual work remains. Prioritize your two lowest-scoring sections first.",
    recommendation:
      "You have a strong foundation. Let's identify and automate the 2-3 areas holding you back from the next level.",
  },
  {
    range: [8, 13],
    label: "Low — Significant Opportunity",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    description:
      "Your agency is likely losing 20–35 hours/week to manual processes. Start with client reporting and delivery operations.",
    recommendation:
      "There's massive untapped potential here. A focused automation sprint could reclaim 20+ hours/week within 30 days.",
  },
  {
    range: [0, 7],
    label: "Critical — Immediate Action Required",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description:
      "Your operations are almost entirely manual. This is a growth ceiling. Start with client onboarding and reporting automation immediately.",
    recommendation:
      "Your agency is leaving 40+ hours/week on the table. Let's build the foundation that makes growth possible.",
  },
];

export function getTier(score: number): ScoringTier {
  return (
    scoringTiers.find(
      (tier) => score >= tier.range[0] && score <= tier.range[1]
    ) ?? scoringTiers[scoringTiers.length - 1]
  );
}
