import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowUpRight,
  ChartCandlestick,
  Code2,
  Cpu,
  Mail,
  MapPin,
  Network,
  Radio,
  Route,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

const highlights = [
  "Dual-Degree Student",
  "President's List Honors",
  "Community Builder",
  "Quant Finance + CS",
  "Infrastructure Engineering",
  "Atlanta Operator",
];

const trackerMetrics = [
  {
    label: "Running volume",
    value: "42.6",
    unit: "mi",
    delta: "+8%",
    detail: "Mileage block built around aerobic consistency and measured recovery.",
    icon: Route,
  },
  {
    label: "Code output",
    value: "18",
    unit: "commits",
    delta: "+5",
    detail: "Shipping product surfaces, automation tools, and local model experiments.",
    icon: Code2,
  },
  {
    label: "Academic focus",
    value: "03",
    unit: "tracks",
    delta: "live",
    detail: "Market structure, systems design, and applied probability stay in rotation.",
    icon: ChartCandlestick,
  },
];

const experience = [
  {
    role: "Growth Intern",
    company: "Dueflow",
    period: "Distribution / GTM",
    signal: "Student ecosystems",
    description:
      "Built distribution strategy for student adoption, mapped campus acquisition loops, and supported sales operations with direct user feedback from high-density university networks.",
  },
  {
    role: "Professional Development Program",
    company: "Point72",
    period: "Markets / Quant",
    signal: "Market operations",
    description:
      "Completed intensive work across quantitative analysis, market mechanics, and investment process fundamentals with emphasis on disciplined research and risk-aware decision making.",
  },
  {
    role: "Professional Development Program",
    company: "BCG",
    period: "Strategy / Execution",
    signal: "Consulting systems",
    description:
      "Applied structured consulting frameworks to ambiguous operating problems, converting qualitative inputs into crisp hypotheses, analysis paths, and execution plans.",
  },
];

const projects = [
  {
    name: "CampusXATL",
    status: "Production-ready MVP",
    icon: Network,
    description:
      "A full-stack student marketplace built for localized commerce. The product combines real-time messaging, marketplace listings, mobile purchase flows, and campus-specific trust signals.",
    tags: ["SwiftUI", "React Native", "FastAPI", "Supabase", "StoreKit 2"],
  },
  {
    name: "Autonomous Workflows / Agentic Systems",
    status: "Local orchestration",
    icon: Cpu,
    description:
      "Local model orchestration, LangGraph implementations, and custom automation tools designed to compress research, coding, and operational workflows without hiding the system state.",
    tags: ["LangGraph", "Python", "Local LLMs", "Automation", "Tooling"],
  },
  {
    name: "Physiological Analytics App",
    status: "Modeling engine",
    icon: Activity,
    description:
      "An engineering project that models workout volume to estimate real-time physiological changes, accumulated body impact, and the training cost of high-output running blocks.",
    tags: ["React", "TypeScript", "Data Models", "Health Metrics", "UX"],
  },
];

const leadership = [
  {
    organization: "DeepLearning.AI",
    role: "Atlanta Community Lead",
    icon: Radio,
    description:
      "Organizes and scales AI infrastructure and engineering events for the regional ecosystem, connecting builders around practical model deployment, tooling, and applied research.",
    metrics: ["Regional AI events", "Builder network", "Technical programming"],
  },
  {
    organization: "Panthers Run Club",
    role: "Founder / Operator",
    icon: Users,
    description:
      "Built and scaled a university distance running organization with repeatable operating systems for practices, community growth, accountability, and athlete retention.",
    metrics: ["University running culture", "Operations cadence", "Community growth"],
  },
];

type IconProps = {
  icon: LucideIcon;
  className?: string;
};

function Icon({ icon: IconComponent, className }: IconProps) {
  return <IconComponent aria-hidden="true" className={className} strokeWidth={1.5} />;
}

function SectionHeader({
  eyebrow,
  id,
  title,
  description,
}: {
  eyebrow: string;
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-line px-5 py-6 sm:px-8 lg:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-signal">
        {eyebrow}
      </p>
      <div className="mt-3 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <h2
          className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl"
          id={id}
        >
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-muted sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

function Ticker() {
  const repeated = [...highlights, ...highlights];

  return (
    <div
      aria-label="Portfolio highlights"
      className="overflow-hidden border-y border-line bg-panel"
    >
      <div className="ticker-track flex w-max">
        {repeated.map((item, index) => (
          <span
            className="flex items-center gap-4 border-r border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted"
            key={`${item}-${index}`}
          >
            <span className="h-1.5 w-1.5 bg-signal" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/90 backdrop-blur-sm">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl flex-col divide-y divide-line px-4 sm:px-6 lg:px-8 xl:px-0"
      >
        <div className="flex min-h-16 items-center justify-between gap-4">
          <a
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em]"
            href="#top"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-line-strong bg-panel text-signal transition-colors group-hover:bg-signal group-hover:text-background">
              JB
            </span>
            <span className="hidden text-foreground sm:inline">Jalani Bandele</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                className="border border-transparent px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:border-line hover:bg-panel hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
            <span className="h-2 w-2 bg-signal" />
            <span>Status: Active in Atlanta, GA</span>
          </div>
        </div>
        <div className="grid grid-cols-4 md:hidden">
          {navItems.map((item) => (
            <a
              className="border-r border-line px-2 py-3 text-center font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted transition-colors last:border-r-0 hover:bg-panel hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grid min-h-screen border-b border-line pt-28 md:pt-16 lg:grid-cols-[1.2fr_0.8fr]"
      id="top"
    >
      <div className="flex flex-col justify-end border-line px-5 py-10 sm:px-8 lg:border-r lg:px-10 lg:py-14">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-signal">
          Quant finance / computer science / infrastructure
        </p>
        <h1
          className="terminal-cursor max-w-5xl text-6xl font-semibold tracking-[-0.075em] text-foreground sm:text-7xl lg:text-8xl"
          id="hero-title"
        >
          Jalani Bandele
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
          I build at the intersection of market systems, software engineering,
          and physical discipline. My work turns complex workflows into fast,
          legible tools for students, operators, and technical communities.
        </p>
        <div className="mt-10 grid border border-line sm:grid-cols-3">
          {[
            ["Focus", "Quantitative finance"],
            ["Base", "Atlanta, Georgia"],
            ["Mode", "Builder + operator"],
          ].map(([label, value]) => (
            <div className="border-b border-line p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0" key={label}>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                {label}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <aside className="grid content-end border-t border-line bg-panel lg:border-t-0">
        <div className="grid grid-cols-2 border-b border-line">
          {[
            ["01", "Engineering products"],
            ["02", "Market analysis"],
            ["03", "Community systems"],
            ["04", "Endurance training"],
          ].map(([index, label]) => (
            <div className="min-h-32 border-r border-t border-line p-5 odd:border-l-0 even:border-r-0 lg:min-h-40" key={label}>
              <p className="font-mono text-xs text-signal">{index}</p>
              <p className="mt-10 text-sm font-medium uppercase tracking-[0.16em] text-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
        <Ticker />
      </aside>
    </section>
  );
}

function PerformanceMetrics() {
  return (
    <section aria-labelledby="metrics-title" className="border-b border-line">
      <SectionHeader
        description="A compact status board for the inputs that shape the work: training volume, engineering output, and academic concentration."
        eyebrow="Weekly Output Tracker"
        id="metrics-title"
        title="Performance metrics with real-world momentum."
      />
      <div className="grid lg:grid-cols-3">
        {trackerMetrics.map((metric) => (
          <article
            className="group border-b border-line p-5 transition-colors hover:bg-panel-strong lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-8"
            key={metric.label}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  {metric.label}
                </p>
                <div className="mt-5 flex items-end gap-3">
                  <span className="font-mono text-6xl tracking-[-0.08em] text-foreground">
                    {metric.value}
                  </span>
                  <span className="pb-2 font-mono text-xs uppercase tracking-[0.2em] text-signal">
                    {metric.unit}
                  </span>
                </div>
              </div>
              <div className="border border-line bg-background p-3 text-signal transition-colors group-hover:border-signal">
                <Icon className="h-5 w-5" icon={metric.icon} />
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
              <p className="max-w-xs text-sm leading-6 text-muted">{metric.detail}</p>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">
                {metric.delta}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceTimeline() {
  return (
    <section aria-labelledby="experience-title" className="border-b border-line" id="experience">
      <SectionHeader
        description="Roles and programs selected for operating exposure: distribution, markets, quantitative thinking, and structured strategic execution."
        eyebrow="Experience"
        id="experience-title"
        title="Professional work mapped as a technical timeline."
      />
      <div className="grid lg:grid-cols-3">
        {experience.map((item, index) => (
          <article
            className="relative border-b border-line p-5 transition-colors hover:bg-panel lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-8"
            key={`${item.company}-${item.role}`}
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-signal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="border border-line px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                {item.period}
              </span>
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
              {item.company}
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-signal">
              {item.role}
            </p>
            <p className="mt-6 text-sm leading-6 text-muted">{item.description}</p>
            <div className="mt-8 border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Signal: <span className="text-foreground">{item.signal}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectsGrid() {
  return (
    <section aria-labelledby="projects-title" className="border-b border-line" id="projects">
      <SectionHeader
        description="Engineering work is presented by product surface, system behavior, and implementation stack. The emphasis stays on shipped functionality and technical leverage."
        eyebrow="Core Projects"
        id="projects-title"
        title="Practical systems built for students, agents, and athletes."
      />
      <div className="grid lg:grid-cols-3">
        {projects.map((project) => (
          <article
            className="group flex min-h-[31rem] flex-col border-b border-line p-5 transition-colors hover:bg-panel lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-8"
            key={project.name}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="border border-line bg-background p-3 text-signal transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-background">
                <Icon className="h-6 w-6" icon={project.icon} />
              </div>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                {project.status}
              </span>
            </div>
            <h3 className="mt-10 max-w-sm text-3xl font-semibold tracking-[-0.05em] text-foreground">
              {project.name}
            </h3>
            <p className="mt-6 text-sm leading-6 text-muted">{project.description}</p>
            <div className="mt-auto pt-10">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    className="border border-line px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LeadershipCommunity() {
  return (
    <section aria-labelledby="leadership-title" className="border-b border-line" id="leadership">
      <SectionHeader
        description="Community work is treated as infrastructure: consistent programming, clear rituals, and systems that make people more likely to keep showing up."
        eyebrow="Leadership & Community"
        id="leadership-title"
        title="Operating communities with the same rigor as products."
      />
      <div className="grid lg:grid-cols-2">
        {leadership.map((item) => (
          <article
            className="group border-b border-line p-5 transition-colors hover:bg-panel lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-8"
            key={item.organization}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-3xl font-semibold tracking-[-0.05em] text-foreground">
                  {item.organization}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-signal">
                  {item.role}
                </p>
              </div>
              <div className="border border-line bg-background p-3 text-signal transition-colors group-hover:border-signal">
                <Icon className="h-6 w-6" icon={item.icon} />
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-6 text-muted">
              {item.description}
            </p>
            <div className="mt-8 grid border border-line sm:grid-cols-3">
              {item.metrics.map((metric) => (
                <div className="border-b border-line p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0" key={metric}>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                    {metric}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section aria-labelledby="contact-title" className="grid lg:grid-cols-[0.9fr_1.1fr]" id="contact">
      <div className="border-b border-line p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-signal">
          Contact
        </p>
        <h2
          className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl"
          id="contact-title"
        >
          Build the next useful system.
        </h2>
      </div>
      <div className="grid sm:grid-cols-2">
        <a
          className="group flex min-h-56 flex-col justify-between border-b border-line p-5 transition-colors hover:bg-panel sm:border-b-0 sm:border-r sm:p-8"
          href="mailto:jalani@bandele.dev"
        >
          <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            Email
          </span>
          <span className="flex items-center justify-between gap-4 text-xl font-semibold tracking-[-0.03em] text-foreground">
            jalani@bandele.dev
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 text-signal transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </span>
        </a>
        <div className="flex min-h-56 flex-col justify-between p-5 sm:p-8">
          <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <MapPin aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            Operating base
          </span>
          <p className="text-xl font-semibold tracking-[-0.03em] text-foreground">
            Atlanta, GA. Available for technical collaborations, community
            programming, and infrastructure-heavy product work.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-signal focus:bg-background focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-foreground"
        href="#main"
      >
        Skip to content
      </a>
      <Navigation />
      <main className="mx-auto max-w-7xl border-x border-line bg-background" id="main">
        <Hero />
        <PerformanceMetrics />
        <ExperienceTimeline />
        <ProjectsGrid />
        <LeadershipCommunity />
        <Contact />
      </main>
      <footer className="mx-auto max-w-7xl border-x border-t border-line px-5 py-6 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted sm:px-8 lg:px-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>Jalani Bandele / Portfolio System</span>
          <span>Built with Next.js, React, Tailwind CSS, and Lucide</span>
        </div>
      </footer>
    </>
  );
}
