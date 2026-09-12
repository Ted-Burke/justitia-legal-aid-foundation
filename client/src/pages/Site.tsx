import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  HandHeart,
  Landmark,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "wouter";

const programs = [
  {
    title: "Case Assistance",
    slug: "case-assistance",
    eyebrow: "Justice in action",
    description:
      "Participatory legal support for violence against women and children, land and natural-resource disputes, and harmful government decisions.",
    icon: Scale,
    accent: "coral",
  },
  {
    title: "Education & Training",
    slug: "education-training",
    eyebrow: "Knowledge is protection",
    description:
      "Community discussions, human-rights workshops, gender-responsive village regulations, planning and budgeting, and campaigns against violence and trafficking.",
    icon: BookOpen,
    accent: "sage",
  },
  {
    title: "Media & Publications",
    slug: "media-publications",
    eyebrow: "Make rights visible",
    description:
      "Brochures, leaflets, pocket books, print and social campaigns, and publications that make legal information more accessible.",
    icon: FileText,
    accent: "gold",
  },
  {
    title: "Policy Studies & Research",
    slug: "policy-research",
    eyebrow: "Evidence for reform",
    description:
      "Research on local regulations, violence against women, natural-resource management, and legal reform movements in NTT.",
    icon: Landmark,
    accent: "blue",
  },
  {
    title: "Economic Advocacy",
    slug: "economic-advocacy",
    eyebrow: "Rights and livelihoods",
    description:
      "Support for women’s savings and loan groups, women farmers and female-headed households, and traditional weaving groups.",
    icon: HandHeart,
    accent: "terracotta",
  },
  {
    title: "Disaster Response",
    slug: "disaster-response",
    eyebrow: "Care in crisis",
    description:
      "Emergency preparedness outreach and humanitarian activities, including public health awareness and support for children’s learning.",
    icon: ShieldCheck,
    accent: "violet",
  },
] satisfies Array<{
  title: ReactNode;
  slug: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}>;

const impactAreas = [
  "Legal consultations",
  "Cases assisted",
  "Community education",
  "Women and children supported",
  "Human-rights advocacy",
  "Research and policy work",
  "Publications",
  "Economic empowerment",
  "Disaster-response activities",
];

const partners = [
  "LBH Kupang",
  "Pikul Association",
  "WALHI NTT",
  "Komnas Perempuan",
  "Solidaritas Perempuan",
  "JATAM",
  "KPA",
  "Oxfam",
  "Misereor",
  "HIVOS",
  "UN Women",
  "The Asia Foundation",
];

const stories = [
  {
    type: "Human rights story",
    title: "When legal information becomes a community resource",
    copy: "A future story space for verified, consent-based accounts of how people use legal knowledge to act with greater confidence.",
    color: "bg-[#e9efe4]",
  },
  {
    type: "Program update",
    title: "From community dialogue to gender-responsive village rules",
    copy: "A future update space for documented training, local dialogue, and policy work across Nusa Tenggara Timur.",
    color: "bg-[#f8e4d9]",
  },
  {
    type: "Research",
    title: "Evidence that can move legal reform forward",
    copy: "A future research space for publications and findings that Justitia has cleared for public sharing.",
    color: "bg-[#e8e4f2]",
  },
];

function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 text-sm font-semibold transition ${light ? "text-white" : "text-[#23352f]"}`}>
      <span className="border-b border-current pb-1">{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "text-[#f5c7a5]" : "text-[#bb5c43]"}`}>{children}</p>;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const nav = [
    ["About", "/about"],
    ["What we do", "/what-we-do"],
    ["Where we work", "/where-we-work"],
    ["Our impact", "/impact"],
    ["Stories & news", "/stories"],
    ["Resources", "/resources"],
  ];

  return (
    <header className="site-header">
      <div className="container flex h-[76px] items-center justify-between gap-5">
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Justitia home">
          <span className="brand-mark">J</span>
          <span>
            <strong>justitia</strong>
            <small>legal aid · NTT</small>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="nav-link">{label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/legal-help" className="help-button">Get legal help <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/donate" className="donate-button">Donate</Link>
        </div>
        <button className="menu-button xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu xl:hidden">
          <div className="container grid gap-1 pb-5">
            {nav.map(([label, href]) => <Link key={href} href={href} className="mobile-nav-link" onClick={() => setOpen(false)}>{label}</Link>)}
            <Link href="/legal-help" className="help-button mt-3 justify-center" onClick={() => setOpen(false)}>Get legal help <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/donate" className="donate-button mt-2 justify-center" onClick={() => setOpen(false)}>Donate</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="brand brand-light">
            <span className="brand-mark">J</span>
            <span><strong>justitia</strong><small>legal aid · NTT</small></span>
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-7 text-[#b9c5bd]">Legal advocacy and human-rights work with poor communities, women, children, and vulnerable groups throughout Nusa Tenggara Timur.</p>
          <div className="mt-6 flex gap-3 text-[#f5c7a5]"><span className="social-pill">Fb</span><span className="social-pill">Ig</span><span className="social-pill">X</span></div>
        </div>
        <div><p className="footer-heading">Explore</p><div className="grid gap-3">{[["About Justitia", "/about"], ["What we do", "/what-we-do"], ["Where we work", "/where-we-work"], ["Our impact", "/impact"]].map(([label, href]) => <Link key={href} href={href} className="footer-link">{label}</Link>)}</div></div>
        <div><p className="footer-heading">Take action</p><div className="grid gap-3">{[["Get legal help", "/legal-help"], ["Get involved", "/get-involved"], ["Donate", "/donate"], ["Resources", "/resources"]].map(([label, href]) => <Link key={href} href={href} className="footer-link">{label}</Link>)}</div></div>
        <div><p className="footer-heading">Contact</p><div className="grid gap-3 text-sm leading-6 text-[#b9c5bd]"><a href="mailto:ykbh.justitia@gmail.com" className="footer-link inline-flex items-center gap-2"><Mail className="h-4 w-4" /> ykbh.justitia@gmail.com</a><a href="tel:+6281236179074" className="footer-link inline-flex items-center gap-2"><Phone className="h-4 w-4" /> +62-812-3617-9074</a><span className="inline-flex items-start gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0" />Jalan Samratulangi II, No. 33, Kec. Kelapa Lima, Kel. Kelapa Lima, Kupang, NTT, Indonesia, 85228</span></div></div>
      </div>
      <div className="container flex flex-col justify-between gap-4 border-t border-white/10 py-5 text-xs text-[#809088] sm:flex-row"><span>© {new Date().getFullYear()} Justitia Foundation. Content subject to verification before publication.</span><span>Privacy · Safeguarding · Accessibility</span></div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#f8f6f1] text-[#23352f]"><SiteHeader />{children}<Footer /></div>;
}

function PageIntro({ label, title, copy, dark = false }: { label: string; title: ReactNode; copy: string; dark?: boolean }) {
  return <section className={`page-intro ${dark ? "page-intro-dark" : ""}`}><div className="container grid gap-7 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-28"><div><SectionLabel light={dark}>{label}</SectionLabel><h1 className="display-title mt-5">{title}</h1></div><p className="max-w-xl text-lg leading-8 text-[#60716a]">{copy}</p></div></section>;
}

function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  const Icon = program.icon;
  return <Link href={`/what-we-do#${program.slug}`} className={`program-card accent-${program.accent}`}><div className="flex items-start justify-between gap-4"><span className="icon-box"><Icon className="h-5 w-5" /></span><ArrowUpRight className="h-5 w-5 opacity-50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#bb5c43]">{program.eyebrow}</p><h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{program.title}</h3><p className="mt-3 text-sm leading-7 text-[#60716a]">{program.description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Explore program <ArrowRight className="h-4 w-4" /></span></Link>;
}

export function Home() {
  return <Shell>
    <main>
      <section className="hero-section"><div className="container grid gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24"><div><div className="hero-kicker"><Sparkles className="h-4 w-4" /> Justice, truth, democracy & peace in NTT</div><h1 className="hero-title mt-6">A fairer future starts with <em>being heard.</em></h1><p className="hero-copy mt-7">Justitia works alongside people and communities in Nusa Tenggara Timur to protect rights, strengthen legal knowledge, and make justice more accessible.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/legal-help" className="primary-button">Get legal help <ArrowUpRight className="h-4 w-4" /></Link><Link href="/what-we-do" className="secondary-button">See our work <ArrowRight className="h-4 w-4" /></Link></div><p className="mt-6 text-xs leading-5 text-[#718078]">We review enquiries carefully. Contacting Justitia does not guarantee acceptance of a case.</p></div><div className="hero-art" aria-label="Abstract illustration of connected pathways"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-orbit orbit-three" /><div className="hero-sun"><span>JUSTICE</span><strong>for all</strong></div><div className="hero-note note-top">Human rights<br /><strong>are lived</strong></div><div className="hero-note note-bottom">NTT · Indonesia<br /><strong>08.02.1996</strong></div></div></div><div className="container pb-16"><div className="hero-scroll"><ArrowDownRight className="h-4 w-4" /> Scroll to explore our work</div></div></section>
      <section className="border-y border-[#dfe3dc] bg-[#f1f0e9]"><div className="container grid gap-8 py-10 md:grid-cols-3"><div><p className="stat-label">Our focus</p><p className="stat-line">Legal advocacy <span>+</span> human rights</p></div><div><p className="stat-label">Our place</p><p className="stat-line">Nusa Tenggara Timur</p></div><div><p className="stat-label">Our starting point</p><p className="stat-line">February 8, 1996</p></div></div></section>
      <section className="section-pad"><div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><SectionLabel>Why Justitia</SectionLabel><h2 className="section-title mt-4">Rights work that stays close to real life.</h2></div><div className="grid gap-8 text-lg leading-8 text-[#60716a] md:grid-cols-2"><p>From a legal enquiry to a village conversation, change begins when people can understand their rights and participate in decisions that affect them.</p><p>Our work connects case assistance, community education, research, economic advocacy, media, and humanitarian service.</p><ArrowLink href="/about">Who we are</ArrowLink><ArrowLink href="/legal-help">I need legal help</ArrowLink></div></div></section>
      <section className="section-pad section-tint"><div className="container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel>What we do</SectionLabel><h2 className="section-title mt-4 max-w-xl">Six connected ways to move justice forward.</h2></div><ArrowLink href="/what-we-do">View all programs</ArrowLink></div><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{programs.map(program => <ProgramCard key={program.slug} program={program} />)}</div></div></section>
      <section className="section-pad"><div className="container legal-banner"><div className="legal-banner-orb" /><div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><SectionLabel light>Need support?</SectionLabel><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">You do not have to navigate a legal problem alone.</h2><p className="mt-5 max-w-xl text-base leading-7 text-[#c8d4cd]">Learn who may request assistance, what to prepare, what happens next, and the limitations of our service.</p></div><Link href="/legal-help" className="primary-button light-button">Explore legal help <ArrowUpRight className="h-4 w-4" /></Link></div></div></section>
      <section className="section-pad pt-0"><div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><SectionLabel>Our impact</SectionLabel><h2 className="section-title mt-4">Measure what matters. Verify what we share.</h2><p className="mt-5 max-w-md text-base leading-7 text-[#60716a]">We are designing a public impact record for verified figures, stories, and learning. No numbers are published here until Justitia confirms them.</p><ArrowLink href="/impact">Explore our impact approach</ArrowLink></div><div className="impact-grid">{impactAreas.slice(0, 6).map((area, index) => <div key={area} className="impact-tile"><span>0{index + 1}</span><strong>{area}</strong><small>To be verified</small></div>)}</div></div></section>
      <section className="section-pad section-tint"><div className="container"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel>Stories & news</SectionLabel><h2 className="section-title mt-4">A careful space for justice in action.</h2></div><ArrowLink href="/stories">All stories & news</ArrowLink></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{stories.map(story => <article key={story.title} className={`story-card ${story.color}`}><div className="story-art"><span>J</span></div><p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#bb5c43]">{story.type}</p><h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{story.title}</h3><p className="mt-4 text-sm leading-7 text-[#60716a]">{story.copy}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Coming soon <ArrowRight className="h-4 w-4" /></span></article>)}</div></div></section>
      <section className="section-pad"><div className="container support-strip"><div><SectionLabel>Get involved</SectionLabel><h2 className="section-title mt-4 max-w-2xl">Support work built around dignity, not distance.</h2></div><div className="grid gap-3 sm:grid-cols-2"><Link href="/donate" className="support-link">Donate safely <ArrowUpRight className="h-4 w-4" /></Link><Link href="/get-involved" className="support-link">Partner with Justitia <ArrowUpRight className="h-4 w-4" /></Link><Link href="/get-involved" className="support-link">Volunteer / fundraise <ArrowUpRight className="h-4 w-4" /></Link><Link href="/contact" className="support-link">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link></div></div></section>
    </main>
  </Shell>;
}

export function About() {
  return <Shell><PageIntro label="About Justitia" title={<>A local foundation with a <em>lasting</em> commitment.</>} copy="Justitia Consultation and Legal Aid Foundation was established on February 8, 1996, in Kupang City, East Nusa Tenggara. The profile supplied for this site describes a long-term focus on legal advocacy and human rights." /><main><section className="section-pad"><div className="container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel>Our vision</SectionLabel><p className="quote-text mt-5">“The realization of justice, truth, democracy, and peace with a gender perspective in the lives of people in NTT.”</p></div><div className="about-copy"><SectionLabel>Our mission</SectionLabel><h2 className="section-title mt-4">Legal services that uphold human rights.</h2><p className="mt-6">Justitia’s mission includes legal consultation; legal assistance in and outside the courts; legal and gender awareness; research and publications on law and human rights; advocacy for people’s economic rights and household economic empowerment; and humanitarian services for victims of natural and human-made disasters.</p><p>Its stated focus includes women’s rights, children’s rights, people with disabilities, and vulnerable groups.</p></div></div></section><section className="section-pad section-tint"><div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4"><div className="info-card"><span className="number-mark">01</span><h3>Participatory</h3><p>Clients and communities are part of data collection, analysis, evidence preparation, and decision-making.</p></div><div className="info-card"><span className="number-mark">02</span><h3>Gender-responsive</h3><p>Gender perspective is part of the stated vision and informs awareness, planning, budgeting, and advocacy.</p></div><div className="info-card"><span className="number-mark">03</span><h3>Rights-based</h3><p>Legal aid and human-rights work are connected to community knowledge, dignity, and accountability.</p></div><div className="info-card"><span className="number-mark">04</span><h3>Community-rooted</h3><p>The profile places Justitia in NTT, with work focused on people facing poverty and vulnerability.</p></div></div></section><section className="section-pad"><div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><SectionLabel>Goals</SectionLabel><h2 className="section-title mt-4">The change Justitia sets out to support.</h2></div><div className="grid gap-4">{["Increase public awareness of law, human rights, and gender.", "Support women survivors of violence and children in legal processes.", "Improve community and household economies through small business empowerment programs.", "Assist government, national, and international organizations in delivering emergency programs."].map((goal, i) => <div key={goal} className="goal-row"><span>0{i + 1}</span><p>{goal}</p><Check className="h-5 w-5 text-[#bb5c43]" /></div>)}</div></div></section><section className="section-pad section-dark"><div className="container grid gap-10 lg:grid-cols-2"><div><SectionLabel light>Networks & partnerships</SectionLabel><h2 className="section-title light mt-4">Relationships remembered with care.</h2><p className="mt-5 max-w-lg text-base leading-7 text-[#b9c5bd]">The organizational profile lists local, national, and international relationships built since establishment. They are shown here as profile-sourced relationships, not as confirmed current partners or funders.</p></div><div className="partner-cloud">{partners.map(partner => <span key={partner}>{partner}</span>)}</div></div></section><section className="section-pad"><div className="container border-t border-[#dfe3dc] pt-12"><SectionLabel>Organizational information</SectionLabel><div className="mt-7 grid gap-5 md:grid-cols-3"><div><p className="meta-label">Established</p><p className="text-lg font-semibold">February 8, 1996</p></div><div><p className="meta-label">Origin</p><p className="text-lg font-semibold">Kupang City, NTT</p></div><div><p className="meta-label">Focus</p><p className="text-lg font-semibold">Legal advocacy & human rights</p></div></div><p className="mt-7 max-w-3xl text-sm leading-7 text-[#718078]">People, current staff, governing arrangements, current partners, and current project locations should be added only after Justitia confirms them.</p></div></section></main></Shell>;
}

export function WhatWeDo() {
  return <Shell><PageIntro label="What we do" title={<>Six programs. One connected <em>rights</em> practice.</>} copy="Justitia’s program areas link direct assistance with learning, public information, research, economic rights, and humanitarian response." /><main><section className="section-pad"><div className="container grid gap-5">{programs.map((program, index) => { const Icon = program.icon; return <article id={program.slug} key={program.slug} className="program-detail"><div className="program-detail-number">0{index + 1}</div><div className="program-detail-icon"><Icon className="h-6 w-6" /></div><div><p className="eyebrow text-[#bb5c43]">{program.eyebrow}</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{program.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#60716a]">{program.description}</p></div><ArrowUpRight className="h-5 w-5 text-[#bb5c43]" /></article>; })}</div></section><section className="section-pad section-tint"><div className="container"><SectionLabel>How the work connects</SectionLabel><h2 className="section-title mt-4 max-w-2xl">From the issue, to action, to learning.</h2><div className="process-line mt-14">{["Understand the issue", "Listen to affected people", "Act with care", "Document learning", "Strengthen the next step"].map((step, i) => <div key={step} className="process-step"><span>0{i + 1}</span><strong>{step}</strong></div>)}</div></div></section><section className="section-pad"><div className="container legal-banner"><div className="relative"><SectionLabel light>Central to our identity</SectionLabel><div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="text-4xl font-semibold tracking-[-0.05em] text-white">Need to talk about a legal problem?</h2><p className="mt-4 max-w-xl text-[#c8d4cd]">Start with our legal-help guide. It explains the pathway without promising an outcome before Justitia reviews the enquiry.</p></div><Link href="/legal-help" className="primary-button light-button">Get legal help <ArrowUpRight className="h-4 w-4" /></Link></div></div></div></section></main></Shell>;
}

export function WhereWeWork() {
  return <Shell><PageIntro label="Where we work" title={<>Rooted in <em>Nusa Tenggara Timur.</em></>} copy="The supplied profile describes Justitia as working throughout NTT, from its foundation in Kupang City. This page intentionally avoids implying that every historic location is a current project area." /><main><section className="section-pad"><div className="container grid gap-12 lg:grid-cols-[1fr_1fr]"><div className="map-card"><div className="map-grid" /><div className="map-pin pin-kupang"><MapPin className="h-5 w-5" /><span>Kupang</span></div><div className="map-label">NTT / Indonesia</div></div><div className="flex flex-col justify-center"><SectionLabel>Geographic focus</SectionLabel><h2 className="section-title mt-4">Local knowledge, regional purpose.</h2><p className="mt-6 text-base leading-8 text-[#60716a]">Justitia’s profile identifies Nusa Tenggara Timur as the geographic focus of its work. The foundation was established in Kupang City and describes work with poor communities, women, children, and vulnerable groups throughout NTT.</p><div className="mt-8 border-l-2 border-[#f0b38f] pl-5 text-sm leading-7 text-[#60716a]">Project locations, active areas, and current service availability require confirmation before publication. This is a deliberate safeguard for accuracy.</div></div></div></section><section className="section-pad section-tint"><div className="container grid gap-6 md:grid-cols-3"><div className="location-card"><MapPin className="h-5 w-5 text-[#bb5c43]" /><h3>Kupang City</h3><p>Place of establishment and the address supplied in the profile.</p></div><div className="location-card"><Leaf className="h-5 w-5 text-[#bb5c43]" /><h3>Across NTT</h3><p>Regional focus stated by Justitia’s organizational profile.</p></div><div className="location-card"><CircleHelp className="h-5 w-5 text-[#bb5c43]" /><h3>Confirm current areas</h3><p>Contact Justitia before relying on location-specific service information.</p></div></div></section><section className="section-pad"><div className="container"><SectionLabel>For partners and visitors</SectionLabel><h2 className="section-title mt-4 max-w-2xl">A place to start a conversation, not a promise of coverage.</h2><p className="mt-5 max-w-2xl text-base leading-8 text-[#60716a]">If you are seeking legal assistance, use the legal-help pathway. If you are seeking collaboration, use the contact page and describe the geographic context of your work.</p><Link href="/contact" className="primary-button mt-8">Contact Justitia <ArrowUpRight className="h-4 w-4" /></Link></div></section></main></Shell>;
}

export function Impact() {
  return <Shell><PageIntro label="Our impact" title={<>A transparent record of <em>what changes.</em></>} copy="Impact reporting is designed to be useful, honest, and verifiable. Current figures are not published until Justitia has documented and approved them." /><main><section className="section-pad"><div className="container"><div className="impact-hero-note"><div><SectionLabel>Impact ledger</SectionLabel><h2 className="section-title mt-4">Verified figures will live here.</h2></div><p className="max-w-md text-base leading-8 text-[#60716a]">The categories below create a clear home for future data. They are not claims of performance or beneficiary counts.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{impactAreas.map((area, i) => <div key={area} className="impact-record"><span className="record-index">0{i + 1}</span><strong>{area}</strong><span className="record-status">Awaiting verified data</span></div>)}</div></div></section><section className="section-pad section-dark"><div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionLabel light>Story safety</SectionLabel><h2 className="section-title light mt-4">People are not proof points.</h2><p className="mt-5 text-base leading-8 text-[#b9c5bd]">Case studies and community stories must protect confidentiality. Publish only anonymized material with appropriate consent, editorial review, and safeguarding checks.</p></div><div className="safety-list">{["Anonymize case details unless disclosure is necessary and authorized.", "Confirm informed consent for stories, quotes, images, and personal information.", "Keep legal enquiries and case documents out of public content systems.", "Record what is known, what is verified, and what still needs confirmation."].map(item => <div key={item} className="safety-item"><ShieldCheck className="h-5 w-5 shrink-0 text-[#f5c7a5]" /><span>{item}</span></div>)}</div></div></section><section className="section-pad"><div className="container grid gap-6 md:grid-cols-3"><div className="info-card"><h3>Case studies</h3><p>Consent-based, anonymized examples of legal work and learning.</p></div><div className="info-card"><h3>Community stories</h3><p>Human-centered accounts that do not expose people to further harm.</p></div><div className="info-card"><h3>Program updates</h3><p>Documented news from education, research, economic advocacy, and response.</p></div></div></section></main></Shell>;
}

export function GetLegalHelp() {
  return <Shell><PageIntro label="Get legal help" dark title={<>A clearer first step when something feels <em>unfair.</em></>} copy="Justitia’s work includes legal consultation and legal assistance in and outside the courts. Use this guide to understand the enquiry pathway." /><main><section className="section-pad"><div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><SectionLabel>Who may enquire</SectionLabel><h2 className="section-title mt-4">Start with your situation.</h2><p className="mt-5 text-base leading-8 text-[#60716a]">People and communities seeking support with issues within Justitia’s stated focus may contact the foundation. Priority concerns described in the profile include women, children, poor communities, and vulnerable groups.</p><div className="mt-8 rounded-[20px] bg-[#f1f0e9] p-6"><p className="text-sm font-semibold">Important</p><p className="mt-2 text-sm leading-7 text-[#60716a]">An enquiry is not an acceptance decision. Justitia may have limits on capacity, location, mandate, urgency, conflicts, or the type of matter it can take.</p></div></div><div><SectionLabel>Types of legal problems</SectionLabel><div className="mt-5 grid gap-3 sm:grid-cols-2">{["Violence against women and children", "Abuse, threats, neglect, rape, and harassment", "Domestic violence and divorce", "Land and natural-resource disputes", "Defamation and related harms", "Harmful government decisions"].map(item => <div key={item} className="check-card"><Check className="h-4 w-4 text-[#bb5c43]" /><span>{item}</span></div>)}</div></div></div></section><section className="section-pad section-tint"><div className="container"><SectionLabel>What happens next</SectionLabel><h2 className="section-title mt-4">A careful, participatory pathway.</h2><div className="mt-12 grid gap-5 md:grid-cols-4">{[{n:"01", t:"Enquire", c:"Share a safe way for Justitia to contact you."},{n:"02", t:"Review", c:"The team considers the issue, urgency, mandate, and capacity."},{n:"03", t:"Discuss", c:"If appropriate, you may be asked for more information."},{n:"04", t:"Agree next steps", c:"Justitia explains what it can or cannot offer."}].map(step => <div className="step-card" key={step.n}><span>{step.n}</span><h3>{step.t}</h3><p>{step.c}</p></div>)}</div></div></section><section className="section-pad"><div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionLabel>Request assistance</SectionLabel><h2 className="section-title mt-4">Use a channel you can trust.</h2><p className="mt-5 text-base leading-8 text-[#60716a]">For a first enquiry, contact the foundation using the profile-supplied details below. Do not send highly sensitive documents until Justitia gives you a secure method and explains how they will be handled.</p><div className="mt-8 grid gap-3"><a className="contact-row" href="mailto:ykbh.justitia@gmail.com"><Mail className="h-5 w-5 text-[#bb5c43]" /><span><small>Email</small><strong>ykbh.justitia@gmail.com</strong></span><ArrowUpRight className="ml-auto h-4 w-4" /></a><a className="contact-row" href="tel:+6281236179074"><Phone className="h-5 w-5 text-[#bb5c43]" /><span><small>Phone</small><strong>+62-812-3617-9074</strong></span><ArrowUpRight className="ml-auto h-4 w-4" /></a></div></div><div className="safe-form-card"><div className="flex items-start gap-3"><ShieldCheck className="mt-1 h-5 w-5 text-[#bb5c43]" /><div><h3 className="text-xl font-semibold">Before you contact us</h3><p className="mt-2 text-sm leading-7 text-[#60716a]">Prepare only what is safe to share: your preferred contact method, a short description of the issue, location, urgency, and any immediate safety concern.</p></div></div><div className="mt-7 border-t border-[#dfe3dc] pt-6"><p className="text-sm font-semibold">Privacy note</p><p className="mt-2 text-sm leading-7 text-[#60716a]">This website does not provide a secure case-management portal. No confidential case information should be submitted into an unapproved form.</p><Link href="/contact" className="primary-button mt-6">Go to contact page <ArrowUpRight className="h-4 w-4" /></Link></div></div></div></section></main></Shell>;
}

export function GetInvolved() {
  return <Shell><PageIntro label="Get involved" title={<>Many ways to stand with <em>rights.</em></>} copy="Support pathways should match Justitia’s actual capacity, authority, and safeguards. The options below are a structured starting point, not an activation of services." /><main><section className="section-pad"><div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-3">{[{icon:HandHeart,title:"Support legal aid",copy:"Help protect access to consultation and assistance for people facing injustice."},{icon:Users,title:"Support women’s rights",copy:"Stand with work addressing violence, leadership, gender awareness, and economic rights."},{icon:BookOpen,title:"Support legal education",copy:"Help make legal and human-rights knowledge more accessible to communities."},{icon:Landmark,title:"Support research",copy:"Back evidence, policy studies, and legal reform work in NTT."},{icon:Leaf,title:"Support economic advocacy",copy:"Support women’s groups, farmers, female-headed households, and weavers."},{icon:ShieldCheck,title:"Support disaster response",copy:"Help strengthen preparedness and humanitarian response when crisis comes."}].map(option => { const Icon = option.icon; return <div className="support-card" key={option.title}><span className="icon-box"><Icon className="h-5 w-5" /></span><h3>{option.title}</h3><p>{option.copy}</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Discuss this option <ArrowUpRight className="h-4 w-4" /></Link></div>; })}</div></section><section className="section-pad section-tint"><div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionLabel>Partner with us</SectionLabel><h2 className="section-title mt-4">Bring an aligned question.</h2><p className="mt-5 text-base leading-8 text-[#60716a]">The profile lists relationships across local, national, and international organizations. Current partnerships and new collaboration pathways require confirmation from Justitia.</p></div><div className="grid gap-3">{["Partner on community education", "Collaborate on research or policy studies", "Explore a humanitarian response role", "Ask about volunteering or fundraising capacity"].map(item => <Link href="/contact" className="goal-row" key={item}><span className="text-[#bb5c43]">→</span><p>{item}</p><ArrowUpRight className="h-4 w-4 text-[#bb5c43]" /></Link>)}</div></div></section></main></Shell>;
}

export function Donate() {
  return <Shell><PageIntro label="Donate" dark title={<>Give with confidence, when the pathway is <em>ready.</em></>} copy="A professional donation structure should come before payment activation. Justitia’s bank arrangements, legal status, currency, receipts, tax implications, and data protections must be confirmed first." /><main><section className="section-pad"><div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><SectionLabel>Donation menu</SectionLabel><h2 className="section-title mt-4">Choose what you want to make possible.</h2><p className="mt-5 text-base leading-8 text-[#60716a]">These categories are intentionally presented as a planning structure. No payment provider or donation account is connected in this build.</p></div><div className="grid gap-3 sm:grid-cols-2">{["One-time donation", "Monthly giving", "Legal Aid Fund", "Women’s Rights & Gender Equality", "Human Rights & Community Rights", "Legal Education", "Research & Policy", "Economic Empowerment", "Disaster Response", "Major Gifts / Foundation Support"].map(item => <div className="donation-option" key={item}><span>{item}</span><ArrowUpRight className="h-4 w-4 text-[#bb5c43]" /></div>)}</div></div></section><section className="section-pad section-tint"><div className="container"><div className="donation-notice"><div className="icon-box"><ShieldCheck className="h-5 w-5" /></div><div><p className="eyebrow text-[#bb5c43]">Payment status</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Donation processing is not activated.</h2><p className="mt-4 max-w-2xl text-base leading-8 text-[#60716a]">Do not send money through this site until Justitia confirms the approved payment route. Contact the foundation to ask about current giving arrangements.</p><a href="mailto:ykbh.justitia@gmail.com" className="primary-button mt-7">Ask about giving <Mail className="h-4 w-4" /></a></div></div></div></section><section className="section-pad"><div className="container"><SectionLabel>Before activation</SectionLabel><h2 className="section-title mt-4 max-w-2xl">A safe payment checklist.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{["Legal status and registration", "Bank and currency arrangements", "Payment provider and fees", "Receipts, tax, and data protection"].map((item, i) => <div className="info-card" key={item}><span className="number-mark">0{i + 1}</span><h3>{item}</h3><p>Confirm with Justitia before publishing or connecting a service.</p></div>)}</div></div></section></main></Shell>;
}

export function Stories() {
  return <Shell><PageIntro label="Stories & news" title={<>Tell the truth about the work, with <em>care.</em></>} copy="A future editorial space for case studies, community stories, Justice in Action, program updates, human-rights stories, women’s rights stories, research, news, and video/media." /><main><section className="section-pad"><div className="container grid gap-5 lg:grid-cols-3">{[...stories, { type: "Editorial note", title: "A consent-first story system", copy: "Stories should be anonymized and approved before publication. Confidential case information does not belong here.", color: "bg-[#f1f0e9]" }].map(story => <article className={`story-card ${story.color}`} key={story.title}><div className="story-art"><span>J</span></div><p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#bb5c43]">{story.type}</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{story.title}</h2><p className="mt-4 text-sm leading-7 text-[#60716a]">{story.copy}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Publishing pathway <ArrowRight className="h-4 w-4" /></span></article>)}</div></section><section className="section-pad section-dark"><div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><SectionLabel light>Editorial standard</SectionLabel><h2 className="section-title light mt-4">People first. Documentation second. Publishing last.</h2></div><Link href="/contact" className="secondary-button dark-button">Discuss a story <ArrowUpRight className="h-4 w-4" /></Link></div></section></main></Shell>;
}

export function Resources() {
  const resourceTypes = ["Annual reports", "Financial reports", "Research", "Policy studies", "Legal information", "Training materials", "Publications", "Reports", "Books", "Brochures & leaflets", "Videos"];
  return <Shell><PageIntro label="Resources" title={<>Useful knowledge, made <em>shareable.</em></>} copy="A future resource library for verified Justitia publications, legal information, training materials, reports, books, media, and public accountability documents." /><main><section className="section-pad"><div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-3">{resourceTypes.map((type, i) => <div className="resource-card" key={type}><span className="resource-icon"><FileText className="h-5 w-5" /></span><span className="resource-index">0{i + 1}</span><h2>{type}</h2><p>Resource collection to be added after Justitia confirms the file, title, date, language, and publication status.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Collection planned <ChevronDown className="h-4 w-4" /></span></div>)}</div></section><section className="section-pad section-tint"><div className="container grid gap-10 lg:grid-cols-2"><div><SectionLabel>Profile-sourced publications</SectionLabel><h2 className="section-title mt-4">The titles already identified.</h2></div><div className="grid gap-3">{["Timorese Women Amidst the Noise of Terror", "Gender-Based Violence and Legal Instruments", "Compilation of Indonesian Laws on Women’s and Children’s Rights", "Compilation of Village Regulations"].map(title => <div className="publication-row" key={title}><BookOpen className="h-5 w-5 text-[#bb5c43]" /><span>{title}</span><span className="text-xs text-[#87958e]">Profile source</span></div>)}</div></div></section></main></Shell>;
}

export function Contact() {
  return <Shell><PageIntro label="Contact" title={<>Start with a <em>conversation.</em></>} copy="Use the contact details supplied in the organizational profile. Please confirm current phone, email, website, and social channels with Justitia before launch." /><main><section className="section-pad"><div className="container grid gap-6 lg:grid-cols-3"><a href="mailto:ykbh.justitia@gmail.com" className="contact-card"><Mail className="h-6 w-6 text-[#bb5c43]" /><p className="meta-label">Email</p><h2>ykbh.justitia@gmail.com</h2><span>Write to the foundation <ArrowUpRight className="h-4 w-4" /></span></a><a href="tel:+6281236179074" className="contact-card"><Phone className="h-6 w-6 text-[#bb5c43]" /><p className="meta-label">Phone</p><h2>+62-812-3617-9074</h2><span>Call the listed number <ArrowUpRight className="h-4 w-4" /></span></a><div className="contact-card"><MapPin className="h-6 w-6 text-[#bb5c43]" /><p className="meta-label">Address</p><h2>Jalan Samratulangi II, No. 33, Kec. Kelapa Lima, Kel. Kelapa Lima, Kupang, NTT, Indonesia, 85228</h2><span>Profile-supplied location</span></div></div></section><section className="section-pad section-tint"><div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><SectionLabel>Choose your path</SectionLabel><h2 className="section-title mt-4">Different questions need different doors.</h2></div><div className="grid gap-3"><Link href="/legal-help" className="contact-row"><Scale className="h-5 w-5 text-[#bb5c43]" /><span><small>Legal enquiry</small><strong>Read the legal-help pathway</strong></span><ArrowUpRight className="ml-auto h-4 w-4" /></Link><Link href="/get-involved" className="contact-row"><HandHeart className="h-5 w-5 text-[#bb5c43]" /><span><small>Collaboration</small><strong>Explore ways to get involved</strong></span><ArrowUpRight className="ml-auto h-4 w-4" /></Link><Link href="/resources" className="contact-row"><BookOpen className="h-5 w-5 text-[#bb5c43]" /><span><small>Knowledge</small><strong>Browse the planned resources</strong></span><ArrowUpRight className="ml-auto h-4 w-4" /></Link></div></div></section></main></Shell>;
}
