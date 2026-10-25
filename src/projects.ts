import type { AppContext, AppId } from './types.js';
import { icon } from './icons.js';
import { caseStudyMedia, getCaseStudyMedia, slidePath } from './case-study-media.js';
import type { CaseStudyId, CaseStudyMedia, GallerySlide } from './case-study-media.js';
import { renderTrimlyDocuments } from './trimly-documents.js';

type ProjectId = 'trimly' | 'valto' | 'faceless';
type TrimlyView = 'overview' | 'decisions' | 'timeline' | 'outcomes';
type CaseStudyView = TrimlyView | 'workflow';
interface ProjectSummary { id: ProjectId; name: string; subtitle: string; date: string; status: string; color: string; }
interface ResultMetric { value: string; label: string; detail: string; color: string; symbol: string; }
interface ProcessNote { id: string; title: string; preview: string; tag: string; html: string; }
interface ReadinessItem { id: string; title: string; detail: string; }

const projectList: readonly ProjectSummary[] = [
  { id: 'trimly', name: 'Trimly', subtitle: 'Booking platform · Product launch', date: 'Oct 2025 – Jun 2026', status: 'Launched', color: '#197d78' },
  { id: 'valto', name: 'Valto', subtitle: 'AI hospitality · Incremental delivery', date: 'Sep 2025 – Present', status: 'In development', color: '#7564d8' },
  { id: 'faceless', name: 'Faceless Freedom', subtitle: 'Digital operations · Distributed teams', date: 'Mar 2022 – Aug 2026', status: 'Completed', color: '#df8041' },
];

const trimlyMetrics: readonly ResultMetric[] = [
  { value: '210', label: 'Completed bookings', detail: 'First 3 months after launch', color: '#ff7645', symbol: 'calendar' },
  { value: '97%', label: 'Payment success', detail: 'Reported post-launch outcome', color: '#ec5a7a', symbol: 'check-circle' },
  { value: '99%', label: 'Platform uptime', detail: 'First 90 days after launch', color: '#8066e2', symbol: 'heart' },
  { value: '50', label: 'Active barbers', detail: 'Reported post-launch outcome', color: '#189f92', symbol: 'person' },
  { value: '76%', label: 'Booking completion', detail: '26 May – 25 August 2026', color: '#327bdd', symbol: 'check' },
  { value: '24%', label: '30-day repeat rate', detail: 'Reported post-launch outcome', color: '#bf63d1', symbol: 'clock' },
];

const gallerySlideCount = caseStudyMedia.reduce((count: number, study: CaseStudyMedia): number => count + study.slides.length, 0);

const processNotes: readonly ProcessNote[] = [
  {
    id: 'scope', title: 'Make the scope a decision', preview: 'A useful MVP has a clear boundary. Trimly stayed web-first.', tag: 'Scope & priorities',
    html: `<p>At Trimly, the agreed MVP connected booking, payment, barber allocation and service coordination. A mobile app belonged outside that phase.</p><h3>The decision</h3><p>On 11 February 2026, I declined an iOS app request for the current phase to protect the agreed budget and timeline.</p><p>The team stayed focused on the booking platform and operating workflow.</p><blockquote>Make the boundary explicit, then use it when new requests arrive.</blockquote><h3>How I applied it</h3><ul><li>Defined the MVP with the founders.</li><li>Prioritized work against the agreed launch scope.</li><li>Kept non-critical requests from quietly changing the delivery plan.</li></ul>`,
  },
  {
    id: 'release', title: 'Done is more than built', preview: 'Acceptance, readiness and release authorization are separate steps.', tag: 'Release readiness',
    html: `<p>At Trimly, completed implementation was one part of launch readiness. Test outcomes, acceptance criteria and founder authorization each had a place.</p><h3>The release sequence</h3><ol><li><strong>20 May:</strong> the UAT summary recorded 14 critical/high fixes and 3 medium deferrals.</li><li><strong>22 May:</strong> I confirmed critical launch criteria.</li><li><strong>25 May:</strong> I completed readiness sign-off.</li><li><strong>26 May:</strong> both founders authorized public release.</li></ol><blockquote>Keep the evidence, the readiness decision and the authority to release visible.</blockquote><p>Daily hypercare continued through 20 June. Closure and handover followed on 25 June.</p>`,
  },
  {
    id: 'risk', title: 'Put risk in the conversation', preview: 'Unresolved payment retries needed an explicit release decision.', tag: 'Risk & stakeholders',
    html: `<p>On 18 May 2026, payment retry concerns were still unresolved. I recommended a later public launch instead of proceeding with those concerns outstanding.</p><p>The founders approved the change. Payment risk stayed visible in the release decision.</p><h3>The actual outcome</h3><p>The platform launched on 26 May, 21 calendar days after its original 5 May target, within the approved budget.</p><p class="p-note-aside">The 18 May recommendation is a documented decision within that delivery timeline; it does not, on its own, explain the entire schedule change.</p><blockquote>A useful status update makes the decision and its consequences clear.</blockquote>`,
  },
  {
    id: 'dependencies', title: 'Give the work an owner', preview: 'At Valto, delivery is built around dependencies and review checkpoints.', tag: 'Planning & execution',
    html: `<p>At Valto, I coordinate two software developers and a product designer on an AI-powered hospitality platform.</p><h3>From concept to delivery</h3><p>I established an approved incremental delivery approach in ClickUp, with dependency-based work packages, clear owners and review checkpoints.</p><ul><li>Connect requirements to approved designs and implementation.</li><li>Track the dependencies that affect the next deliverable.</li><li>Use integrated end-to-end testing before acceptance.</li><li>Reconcile resource timelines with the delivery plan.</li></ul><p>Valto is in active development and preparing for its first hotel pilot.</p>`,
  },
  {
    id: 'continuity', title: 'Keep a distributed team moving', preview: 'A prepared alternative kept publication moving when a contributor was unavailable.', tag: 'People & operations',
    html: `<p>At Faceless Freedom, I coordinated distributed creative teams across a 12-channel portfolio, with up to ten contributors and up to three concurrent projects.</p><h3>Make dependencies visible</h3><p>Production moved through script, voiceover, editing, quality review and publishing. I coordinated those handoffs in Asana, alongside deadlines and quality standards.</p><h3>Use a prepared alternative</h3><p>When a thumbnail designer became unavailable, I attempted contact. Some videos already had thumbnails prepared, so I selected one of those videos for publication and continued with the available alternative.</p><h3>Carry learning into the next cycle</h3><p>Published-video results informed topics, titles, thumbnails and content direction. Across approximately eight channel rebuilds and takeovers, I connected those decisions with production and the transition into ongoing operations.</p><blockquote>Useful process helps the team carry work forward when circumstances change.</blockquote>`,
  },
];

const readinessItems: readonly ReadinessItem[] = [
  { id: 'scope', title: 'Confirm the agreed scope', detail: 'What is included, and what is deferred?' },
  { id: 'owners', title: 'Name owners & dependencies', detail: 'Make each handoff visible.' },
  { id: 'journey', title: 'Test the complete workflow', detail: 'Follow the customer journey end to end.' },
  { id: 'risks', title: 'Review critical issues', detail: 'Resolve blockers and document deferrals.' },
  { id: 'readiness', title: 'Record readiness sign-off', detail: 'Check the agreed acceptance criteria.' },
  { id: 'approval', title: 'Confirm release authorization', detail: 'Keep the decision-maker explicit.' },
  { id: 'hypercare', title: 'Prepare launch support', detail: 'Set ownership for issues and escalation.' },
  { id: 'handover', title: 'Plan the handover', detail: 'Document ownership and lessons learned.' },
];

function escapeHTML(value: string): string {
  return value.replace(/[&<>"']/g, (character: string): string => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] ?? character));
}

function bindAll<T extends HTMLElement>(host: HTMLElement, selector: string, handler: (element: T) => void): void {
  host.querySelectorAll<T>(selector).forEach(handler);
}

function navBack(label: string, action: string): string {
  return `<button type="button" class="p-back" data-${action}>${icon('chevron-left', 23)}<span>${label}</span></button>`;
}

function nativeFolder(): string {
  return '<svg viewBox="0 0 52 44" width="44" height="38" fill="none" aria-hidden="true"><path d="M3 8.5A4.5 4.5 0 0 1 7.5 4H19a5 5 0 0 1 3.2 1.2l3.4 2.9H44.5A4.5 4.5 0 0 1 49 12.6V35a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" fill="#258de2"/><path d="M3 15a4 4 0 0 1 4-4h38a4 4 0 0 1 4 4v20a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" fill="#5bb9fa"/><path d="M7 11.5h38" stroke="#a7ddff" stroke-opacity=".8"/><path d="M8 39.5h36" stroke="#329ce9" stroke-opacity=".65"/></svg>';
}

function shell(host: HTMLElement, className: string, nav: string, body: string, footer = ''): void {
  host.innerHTML = `<section class="p-app ${className}">${nav}<div class="p-scroll">${body}</div>${footer}</section>`;
}

function metricCards(metrics: readonly ResultMetric[], className = ''): string {
  return `<div class="p-metric-grid ${className}">${metrics.map((metric: ResultMetric): string => `<article class="p-metric" style="--metric-color:${metric.color}"><div class="p-metric-label">${icon(metric.symbol, 16)}<span>${metric.label}</span></div><div class="p-metric-value">${metric.value}</div><p>${metric.detail}</p></article>`).join('')}</div>`;
}

function openPublicPdf(id: CaseStudyId = 'trimly'): string {
  const study = getCaseStudyMedia(id);
  if (!study) return '';
  return `<a class="p-primary-button" href="${study.pdfPath}" target="_blank" rel="noopener" download="${study.downloadName}" aria-label="Download ${study.name} case study PDF">${icon('download', 18)} Download case study <span class="p-button-meta">PDF · ${study.pdfPages} slides</span></a>`;
}

function renderFiles(host: HTMLElement, context: AppContext, route?: string): void {
  const [project, view] = (route ?? '').split('/');
  if (project === 'trimly' && (!view || ['documents', 'record-pdf', 'record-word', 'workbook'].includes(view))) {
    renderTrimlyDocuments(host, view, () => renderFiles(host, context), () => renderProject(host, context, 'trimly', 'overview'));
    return;
  }
  if (project === 'trimly' || project === 'valto' || project === 'faceless') {
    renderProject(host, context, project, view);
    return;
  }
  const documents = route === 'documents';
  const nav = `<header class="p-nav p-nav-right"><span class="p-native-location">Portfolio</span><button type="button" class="p-nav-icon" data-documents aria-label="Open portfolio documents">${icon('file', 21)}</button></header>`;
  const list = documents ? `
    <p class="p-section-label">PORTFOLIO DOCUMENTS</p>
    <div class="p-list p-document-list">
      <button type="button" class="p-list-row" data-trimly-documents><span class="p-folder-icon">${nativeFolder()}</span><span class="p-row-copy"><strong>Trimly delivery documents</strong><small>PDF, Word and Excel · Previews and downloads</small></span>${icon('chevron-right', 17)}</button>
      ${caseStudyMedia.map((study: CaseStudyMedia): string => `<a class="p-list-row" href="${study.pdfPath}" target="_blank" rel="noopener"><span class="p-document-icon">${icon('file', 29)}</span><span class="p-row-copy"><strong>${study.name} case study</strong><small>PDF document · ${study.pdfPages} slides</small></span>${icon('arrow-up-right', 17)}</a>`).join('')}
      <button type="button" class="p-list-row" data-gallery><span class="p-document-icon p-purple">${icon('sparkles', 27)}</span><span class="p-row-copy"><strong>Case-study gallery</strong><small>${gallerySlideCount} presentation slides · ${caseStudyMedia.length} collections</small></span>${icon('chevron-right', 17)}</button>
    </div><p class="p-footnote">Project delivery and digital operations, documented in my case-study presentations.</p>` : `
    <div class="p-search">${icon('search', 17)}<input aria-label="Search projects" id="project-search" type="search" placeholder="Search" autocomplete="off"></div>
    <div class="p-section-heading"><h2>Projects</h2><span>3 items</span></div>
    <div class="p-list">${projectList.map((project: ProjectSummary): string => `<button type="button" class="p-list-row p-project-row" data-project="${project.id}" data-search="${escapeHTML(`${project.name} ${project.subtitle}`.toLowerCase())}"><span class="p-folder-icon">${nativeFolder()}</span><span class="p-row-copy"><strong>${project.name}</strong><small>${project.subtitle}</small><span class="p-row-date">${project.date}</span></span>${icon('chevron-right', 17)}</button>`).join('')}</div>
    <div class="p-empty" hidden><span>${icon('search', 32)}</span><strong>No matching projects</strong><p>Try Trimly, Valto or operations.</p></div>
    <p class="p-footnote">My delivery work, from software launches to distributed operations.</p>
    <button type="button" class="p-feature-link" data-feature><span class="p-feature-emoji">${icon('file', 27)}</span><span><strong>Start with Trimly</strong><small>A launch, two key decisions, and the results.</small></span>${icon('chevron-right', 18)}</button>`;
  const footer = `<nav class="p-tabbar" aria-label="Files sections"><button type="button" class="${documents ? '' : 'is-active'}" data-browse>${icon('folder', 22)}<span>Browse</span></button><button type="button" class="${documents ? 'is-active' : ''}" data-documents>${icon('file', 22)}<span>Documents</span></button></nav>`;
  shell(host, 'p-files', nav, `<h1 class="p-large-title">${documents ? 'Documents' : 'Browse'}</h1>${list}`, footer);
  host.querySelector('[data-browse]')?.addEventListener('click', (): void => renderFiles(host, context));
  bindAll<HTMLButtonElement>(host, '[data-documents]', (button): void => button.addEventListener('click', (): void => renderFiles(host, context, 'documents')));
  host.querySelector('[data-feature]')?.addEventListener('click', (): void => renderFiles(host, context, 'trimly'));
  host.querySelector('[data-gallery]')?.addEventListener('click', (): void => context.openApp('photos', 'collections'));
  host.querySelector('[data-trimly-documents]')?.addEventListener('click', (): void => renderFiles(host, context, 'trimly'));
  bindAll<HTMLButtonElement>(host, '[data-project]', (button): void => button.addEventListener('click', (): void => renderFiles(host, context, button.dataset.project)));
  host.querySelector<HTMLInputElement>('#project-search')?.addEventListener('input', (event: Event): void => {
    const query = (event.currentTarget as HTMLInputElement).value.trim().toLowerCase();
    let visible = 0;
    bindAll<HTMLButtonElement>(host, '[data-search]', (element): void => {
      element.hidden = !(element.dataset.search ?? '').includes(query);
      if (!element.hidden) visible += 1;
    });
    const empty = host.querySelector<HTMLElement>('.p-empty');
    if (empty) empty.hidden = visible > 0;
  });
}

function trimlyOverview(): string {
  return `<div class="p-stat-strip"><div><strong>8</strong><span>person team</span></div><div><strong>210</strong><span>completed bookings¹</span></div><div><strong>26 May</strong><span>public launch · 2026</span></div></div>
    <article class="p-card p-prose"><h2>The brief</h2><p>Turn manual bookings and service operations into a live web platform. Connect location, service and appointment selection to payment, barber allocation and WhatsApp-enabled coordination.</p><div class="p-workflow"><span>Book</span>${icon('chevron-right', 13)}<span>Pay</span>${icon('chevron-right', 13)}<span>Allocate</span>${icon('chevron-right', 13)}<span>Coordinate</span></div></article>
    <article class="p-card p-prose"><h2>My role</h2><p>I owned delivery coordination and readiness across product, engineering, design and operations.</p><ul class="p-check-list"><li>${icon('check-circle', 17)}<span>Defined the MVP and protected the agreed scope.</span></li><li>${icon('check-circle', 17)}<span>Coordinated plans, reviews, dependencies and milestones.</span></li><li>${icon('check-circle', 17)}<span>Kept risks, priorities and launch decisions visible.</span></li><li>${icon('check-circle', 17)}<span>Managed readiness, hypercare and handover.</span></li></ul><p class="p-inline-note">Engineering owned implementation.</p></article>
    <article class="p-card p-prose"><h2>The delivery system</h2><p>Jira, 1–2 week Agile development sprints and milestone planning for operational readiness, soft launch, go-live and handover.</p><div class="p-pills"><span>Jira</span><span>Hybrid delivery</span><span>8-person team</span></div></article>
    ${openPublicPdf()}<p class="p-footnote">¹ Completed bookings in the first three months after launch.</p>`;
}

function trimlyDecisions(): string {
  return `<article class="p-decision p-decision-teal"><div class="p-decision-top"><span>01 · SCOPE CONTROL</span><span>11 Feb 2026</span></div><h2>Kept the MVP web-first.</h2><p>I declined an iOS app request for this phase to protect the agreed budget and timeline.</p><div class="p-decision-result">The team stayed focused on the booking platform and operating workflow.</div></article>
    <article class="p-decision p-decision-gold"><div class="p-decision-top"><span>02 · RELEASE RISK</span><span>18 May 2026</span></div><h2>Chose readiness over date.</h2><p>I recommended a later public launch while payment retry concerns remained unresolved. The founders approved the change.</p><div class="p-decision-result">Payment retry work stayed visible in the release decision.</div></article>
    <article class="p-card p-prose"><h2>Acceptance was a release gate.</h2><div class="p-defects"><div><strong>14</strong><span>critical / high<br>bugs fixed</span></div><div><strong>3</strong><span>medium bugs<br>deferred</span></div></div><ol class="p-compact-timeline"><li><span>20 May</span><div>UAT review recorded fixes and deferrals.</div></li><li><span>22 May</span><div>I confirmed critical launch criteria.</div></li><li><span>25 May</span><div>I signed off readiness.</div></li><li><span>26 May</span><div>Both founders authorized public release.</div></li></ol></article>
    <section class="p-records" aria-labelledby="trimly-records-title"><div class="p-outcome-intro"><span class="p-eyebrow">DELIVERY IN PRACTICE</span><h2 id="trimly-records-title">From issue to release.</h2><p>Selected Jira records, transcribed in my October 2026 delivery review, show how implementation and launch-readiness work progressed.</p></div>
      <article class="p-card p-prose"><span class="p-eyebrow">TRIM-19 · PAYMENTS</span><h3>Work through an integration blocker.</h3><p>Paystack integration moved through code review and testing, encountered an edge-case blocker, and returned to implementation before completion on 28 March 2026.</p><p class="p-inline-note">Developer 2 owned implementation; I was the reporter.</p></article>
      <article class="p-card p-prose"><span class="p-eyebrow">TRIM-71 · SOFT-LAUNCH FEEDBACK</span><h3>Turn feedback into a clear task.</h3><p>Soft-launch feedback led to a task to improve error messages. Created on 27 April, it was resolved on 12 May 2026.</p><p class="p-inline-note">The designer owned the work; I was the reporter.</p></article>
      <article class="p-card p-prose"><span class="p-eyebrow">TRIM-79 · LAUNCH READINESS</span><h3>Own the go-live checklist.</h3><p>I was the assignee and reporter for the go-live checklist task. It was created on 20 May and closed on 26 May 2026, the public-launch date.</p><p class="p-inline-note">Readiness sign-off was recorded separately on 25 May.</p></article>
      <p class="p-footnote">Source: my October 2026 Project Delivery Record and Delivery Workbook, compiled from my supplied project account.</p>
    </section>`;
}

function trimlyTimeline(): string {
  const timeline: readonly [string, string, string][] = [
    ['OCT 2025', 'Define the scope', '6 Oct: requirements began.\n24 Oct: MVP approved.'],
    ['NOV 2025 – MAR 2026', 'Build & integrate', '20 Nov: development began.\n12 Mar: booking core ready.\n28 Mar: Paystack integration complete.'],
    ['APR 2026', 'Prepare operations', '10 Apr: barber onboarding live.\n25 Apr: internal soft launch.'],
    ['MAY 2026', 'Review & release', '22 May: go/no-go review.\n25 May: readiness sign-off.\n26 May: public launch.'],
    ['MAY – JUN 2026', 'Stabilize & hand over', '26 May–20 Jun: daily hypercare.\n25 Jun: closure and handover.'],
  ];
  return `<div class="p-card p-schedule"><span class="p-eyebrow">ACTUAL DELIVERY</span><div><strong>5 May</strong>${icon('arrow-up-right', 21)}<strong>26 May</strong></div><p>Public launch: 21 calendar days after the original target, within the approved budget.</p></div><ol class="p-timeline">${timeline.map(([date, title, text], index: number): string => `<li><span class="p-timeline-dot">${index + 1}</span><article><time>${date}</time><h2>${title}</h2><p>${escapeHTML(text).replace(/\n/g, '<br>')}</p></article></li>`).join('')}</ol>`;
}

function trimlyOutcomes(): string {
  return `<div class="p-outcome-intro"><span class="p-eyebrow">AFTER LAUNCH</span><h2>Delivery became measurable.</h2><p>Reported product, payment and service outcomes.</p></div>${metricCards(trimlyMetrics)}<p class="p-footnote">Reported outcomes from the Trimly delivery record and workbook, October 2026. Product and team results; my role was delivery coordination and readiness. Metrics are presented as recorded, without reconstructed denominators.</p>`;
}

function valtoOverview(): string {
  return `<div class="p-status-banner p-status-development"><span class="p-live-dot"></span>In active development · preparing for a first hotel pilot</div>
    <article class="p-card p-prose"><h2>The product</h2><p>An AI-powered hospitality platform, including voice and WhatsApp receptionists.</p><p>I coordinate two software developers and a product designer, taking work from requirements through design approval, implementation and acceptance.</p></article>
    <article class="p-card p-prose"><h2>How I structure delivery</h2><ul class="p-check-list"><li>${icon('check-circle', 17)}<span>Established an approved incremental delivery approach in ClickUp.</span></li><li>${icon('check-circle', 17)}<span>Organized work around dependencies, owners and review checkpoints.</span></li><li>${icon('check-circle', 17)}<span>Built integrated end-to-end testing into acceptance.</span></li><li>${icon('check-circle', 17)}<span>Reconciled developer and designer timelines with the delivery plan.</span></li></ul></article>
    <article class="p-card p-prose"><span class="p-eyebrow">A DELIVERY DECISION</span><h2>Unblocked a provider selection.</h2><p>I coordinated an engineering-led review of business-verification alternatives, helping resolve a provider selection blocker and secure approval for a lower-cost option.</p><p class="p-inline-note">Engineering evaluated the technical alternatives; I coordinated the decision and its delivery impact.</p></article>
    <div class="p-pills p-bottom-pills"><span>ClickUp</span><span>Incremental delivery</span><span>Dependencies</span></div>`;
}

function facelessOverview(): string {
  return `<div class="p-stat-strip"><div><strong>12</strong><span>channel portfolio</span></div><div><strong>~8</strong><span>rebuilds & takeovers</span></div><div><strong>10</strong><span>people in a team · up to</span></div></div>
    <article class="p-card p-prose"><h2>Make production dependable.</h2><p>The turnaround channel was underperforming. Missed handoffs, uneven quality and repeated follow-up disrupted planned uploads.</p><p>My remit was to turn channel priorities into a coordinated plan, then manage the work through production, review and ongoing operations.</p></article>
    <article class="p-card p-prose"><h2>My contribution</h2><ul class="p-check-list"><li>${icon('check-circle', 17)}<span>Assessed performance, set direction and planned channel rebuilds or takeovers.</span></li><li>${icon('check-circle', 17)}<span>Recruited and assessed contributors, allocated work and clarified responsibilities.</span></li><li>${icon('check-circle', 17)}<span>Coordinated deadlines, dependencies, documented workflows and quality standards.</span></li><li>${icon('check-circle', 17)}<span>Reviewed delivery and published results, communicated progress and transitioned projects into ongoing operations.</span></li></ul></article>
    <article class="p-card p-prose"><h2>The scale of the work</h2><p>Across a 12-channel portfolio, I coordinated approximately eight rebuilds and takeovers, with up to three projects running concurrently and teams of up to ten people.</p><p>Production scope reached up to seven video deliverables per week, per channel.</p><div class="p-pills"><span>Asana</span><span>Remote teams</span><span>Channel turnarounds</span></div></article>
    ${openPublicPdf('faceless')}
    <button type="button" class="p-feature-link" data-project-gallery><span>${icon('grid', 24)}</span><span><strong>View the presentation</strong><small>All 8 Faceless Freedom case-study slides</small></span>${icon('chevron-right', 18)}</button>
    <p class="p-footnote">From my Faceless Freedom project delivery case study. Strategy and delivery coordination were my contribution; published-video results were team outcomes.</p>`;
}

function facelessWorkflow(): string {
  const stages: readonly (readonly [string, string])[] = [
    ['Script', 'Writing establishes the material for the next production stage.'],
    ['Voiceover', 'Voice production follows the script handoff.'],
    ['Editing', 'The editor assembles the video from the production inputs.'],
    ['Quality review', 'Review and feedback check the work before publication.'],
    ['Publishing', 'Release the completed video with its title and thumbnail prepared.'],
  ];
  return `<article class="p-card p-prose"><h2>Clear handoffs, from script to publishing.</h2><p>I used Asana to coordinate sequential production, with owners, deadlines and quality expectations made visible across the team.</p></article>
    <ol class="p-timeline">${stages.map(([title, detail], index: number): string => `<li><span class="p-timeline-dot">${index + 1}</span><article><h2>${title}</h2><p>${detail}</p></article></li>`).join('')}</ol>
    <article class="p-card p-prose"><h2>Prepare the release assets.</h2><p>Title and thumbnail preparation fed into publication alongside the video production chain.</p></article>
    <article class="p-card p-prose"><h2>Feed performance back into the work.</h2><p>Published-video results and audience response informed the next topics, titles, thumbnails and content direction. I coordinated contributor performance and execution so those decisions became completed videos.</p></article>`;
}

function facelessDecisions(): string {
  return `<article class="p-decision p-decision-gold"><div class="p-decision-top"><span>A PRODUCTION CONTINGENCY</span></div><h2>Keep publishing when a contributor is unavailable.</h2><p>A thumbnail designer became unavailable. I attempted contact, then checked which videos already had their thumbnails prepared.</p><p class="p-decision-result">I selected one of those ready videos for publication and continued with the available alternative.</p></article>
    <article class="p-card p-prose"><h2>The response</h2><ol class="p-compact-timeline"><li><span>01</span><div><strong>Attempt contact</strong><br>Try to resolve the immediate contributor gap.</div></li><li><span>02</span><div><strong>Use prepared work</strong><br>Select a video whose thumbnail is already ready.</div></li><li><span>03</span><div><strong>Continue publication</strong><br>Move forward with that prepared alternative.</div></li></ol></article>
    <article class="p-card p-prose"><h2>Carry the new direction into delivery.</h2><p>The wider turnaround connected content decisions with contributor performance, deadlines, quality standards and active follow-up.</p><p>When circumstances changed, I reallocated work and used documented workflows to keep production moving.</p></article>
    <p class="p-footnote">A documented incident from slide 6 of the case study.</p>`;
}

function facelessOutcomes(): string {
  return `<div class="p-outcome-intro"><span class="p-eyebrow">REPORTED OUTCOMES</span><h2>Stronger video performance.</h2><p>Selected video results, alongside the scale of production I coordinated.</p></div>
    <article class="p-card p-turnaround"><span class="p-eyebrow">A TURNAROUND VIDEO</span><div class="p-turnaround-value">395K<span>views</span></div><p>One video reached 395,000 views, compared with that channel’s previous average of approximately 40,000 views per video.</p><div class="p-comparison" aria-label="Prior average about 40 thousand views; turnaround video 395 thousand views"><div><span>Previous average per video</span><i style="--bar-width:10.13%"></i><strong>~40K</strong></div><div><span>Turnaround video</span><i style="--bar-width:100%"></i><strong>395K</strong></div></div><p class="p-inline-note">Nearly 10× the previous average for this single-video result.</p></article>
    ${metricCards([
      { value: '107K', label: 'Further video', detail: 'Approximately 5× typical performance, as reported', color: '#1ca897', symbol: 'sparkles' },
      { value: 'Up to 7', label: 'Video deliverables', detail: 'Per week, per channel · production scope', color: '#df8041', symbol: 'calendar' },
    ])}
    <p class="p-footnote">Source: <a href="/assets/faceless-freedom-case-study.pdf#page=7" target="_blank" rel="noopener">Faceless Freedom case study, slide 7</a>. The two video comparisons use their respective reported benchmarks. My contribution was strategy and delivery coordination; view counts are team and project outcomes.</p>`;
}

function renderProject(host: HTMLElement, context: AppContext, id: ProjectId, requestedView?: string): void {
  const project = projectList.find((item: ProjectSummary): boolean => item.id === id);
  if (!project) return;
  const allowedViews: readonly CaseStudyView[] = id === 'faceless' ? ['overview', 'workflow', 'decisions', 'outcomes'] : ['overview', 'decisions', 'timeline', 'outcomes'];
  const view: CaseStudyView = allowedViews.find((section: CaseStudyView): boolean => section === requestedView) ?? 'overview';
  const study = getCaseStudyMedia(id);
  const role = id === 'valto' ? 'Lead Project Manager' : id === 'faceless' ? 'Channel Operations Manager' : 'Project Manager';
  const nav = `<header class="p-nav">${navBack(id === 'trimly' ? 'Trimly' : 'Browse', 'files-back')}<span class="p-nav-title">${project.name}</span>${study ? `<a class="p-nav-icon" href="${study.pdfPath}" target="_blank" rel="noopener" aria-label="Open ${study.name} case study PDF">${icon('download', 21)}</a>` : '<span class="p-nav-spacer"></span>'}</header>`;
  const hero = `<header class="p-project-hero" style="--project-color:${project.color}"><div class="p-project-monogram">${id === 'trimly' ? 't.' : id === 'valto' ? 'v.' : 'ff.'}</div><span class="p-project-status">${project.status}</span><h1>${project.name}</h1><p>${role}</p><small>${project.date}</small></header>`;
  const tabs = study ? `<div class="p-segmented" role="tablist" aria-label="${project.name} case study sections">${allowedViews.map((tab: CaseStudyView): string => `<button type="button" role="tab" aria-selected="${view === tab}" class="${view === tab ? 'is-active' : ''}" data-section="${tab}">${tab[0]?.toUpperCase()}${tab.slice(1)}</button>`).join('')}</div>` : '';
  const body = id === 'valto' ? valtoOverview() : id === 'faceless' ? (view === 'workflow' ? facelessWorkflow() : view === 'decisions' ? facelessDecisions() : view === 'outcomes' ? facelessOutcomes() : facelessOverview()) : view === 'decisions' ? trimlyDecisions() : view === 'timeline' ? trimlyTimeline() : view === 'outcomes' ? trimlyOutcomes() : trimlyOverview();
  shell(host, 'p-project', nav, `${hero}${tabs}<div class="p-project-content">${body}</div>`);
  host.querySelector('[data-files-back]')?.addEventListener('click', (): void => renderFiles(host, context, id === 'trimly' ? 'trimly' : undefined));
  bindAll<HTMLButtonElement>(host, '[data-section]', (button): void => button.addEventListener('click', (): void => renderProject(host, context, id, button.dataset.section)));
  host.querySelector('[data-project-gallery]')?.addEventListener('click', (): void => context.openApp('photos', id));
}

function renderHealth(host: HTMLElement, context: AppContext, route?: string): void {
  const operations = route === 'operations';
  const nav = `<header class="p-nav p-nav-right"><span class="p-small-name p-results-label">${icon('heart', 17)} PROJECT RESULTS</span><button type="button" class="p-round-avatar portrait" data-profile aria-label="View Precious's contact card"><img src="/assets/profile-photo.jpg" alt="" width="1365" height="2048" decoding="async"></button></header>`;
  const tabs = `<div class="p-segmented p-results-tabs"><button type="button" class="${operations ? '' : 'is-active'}" data-trimly>Trimly</button><button type="button" class="${operations ? 'is-active' : ''}" data-operations>Digital operations</button></div>`;
  const body = operations ? `<div class="p-section-heading"><h2>Faceless Freedom</h2><span>2022–2026</span></div>${metricCards([
    { value: '12', label: 'Channel portfolio', detail: 'Coordinated operations', color: '#fe7e3f', symbol: 'folder' },
    { value: '10', label: 'Team members', detail: 'Up to ten contributors', color: '#ed5d7d', symbol: 'person' },
    { value: '~8', label: 'Rebuilds & takeovers', detail: 'Assessment to operations', color: '#8563da', symbol: 'check-circle' },
    { value: '395K', label: 'Standout video', detail: 'Previous average: ~40K views', color: '#1ca897', symbol: 'sparkles' },
    { value: '107K', label: 'Further video', detail: 'Approximately 5× typical performance, as reported', color: '#327bdd', symbol: 'sparkles' },
    { value: 'Up to 7', label: 'Video deliverables', detail: 'Per week, per channel · production scope', color: '#df8041', symbol: 'calendar' },
  ])}<div class="p-card p-prose"><h2>Selected video outcomes</h2><p>The 395K result compares one video with that channel’s previous ~40K average. The further 107K video is reported at approximately 5× its own typical benchmark.</p><p class="p-inline-note">My contribution was strategy and delivery coordination. View counts are team and project outcomes.</p></div><button type="button" class="p-feature-link" data-case="faceless/outcomes"><span>${icon('folder', 24)}</span><span><strong>Explore the reported outcomes</strong><small>Faceless Freedom case study</small></span>${icon('chevron-right', 18)}</button>` : `<div class="p-highlight"><div><span>${icon('calendar', 18)} COMPLETED BOOKINGS</span><span class="p-highlight-period">FIRST 3 MONTHS</span></div><strong>210</strong><p>A manual service workflow became a launched platform.</p><button type="button" data-case="trimly">Explore the case study ${icon('chevron-right', 14)}</button></div><div class="p-section-heading"><h2>Reported outcomes</h2><span>After launch</span></div>${metricCards(trimlyMetrics.slice(1))}<p class="p-footnote">Reported in Trimly’s delivery record and workbook, October 2026. These are team and product outcomes; my contribution was delivery coordination and launch readiness.</p>`;
  shell(host, 'p-health', nav, `<h1 class="p-large-title">Summary</h1><p class="p-title-subtitle">The results behind the work.</p>${tabs}${body}`);
  host.querySelector('[data-profile]')?.addEventListener('click', (): void => context.openApp('contacts'));
  host.querySelector('[data-trimly]')?.addEventListener('click', (): void => renderHealth(host, context));
  host.querySelector('[data-operations]')?.addEventListener('click', (): void => renderHealth(host, context, 'operations'));
  bindAll<HTMLButtonElement>(host, '[data-case]', (button): void => button.addEventListener('click', (): void => context.openApp('files', button.dataset.case)));
}

function renderNotes(host: HTMLElement, context: AppContext, route?: string): void {
  const note = processNotes.find((item: ProcessNote): boolean => item.id === route);
  if (note) {
    const nav = `<header class="p-nav">${navBack('Notes', 'notes-back')}<span class="p-nav-title">My approach</span><button type="button" class="p-nav-icon" data-related aria-label="Open related project">${icon('folder', 21)}</button></header>`;
    shell(host, 'p-notes p-note-open', nav, `<article class="p-note-document"><p class="p-note-date">${note.tag} · Precious Olusayo</p><h1>${note.title}</h1>${note.html}</article>`);
    host.querySelector('[data-notes-back]')?.addEventListener('click', (): void => renderNotes(host, context));
    host.querySelector('[data-related]')?.addEventListener('click', (): void => context.openApp('files', note.id === 'dependencies' ? 'valto' : note.id === 'continuity' ? 'faceless' : 'trimly'));
    return;
  }
  const nav = `<header class="p-nav"><span class="p-back">${icon('folder', 20)}<span>My approach</span></span><span class="p-note-count">${processNotes.length} notes</span></header>`;
  shell(host, 'p-notes', nav, `<h1 class="p-large-title">Notes</h1><div class="p-search">${icon('search', 17)}<input type="search" id="note-search" placeholder="Search notes" aria-label="Search process notes" autocomplete="off"></div><p class="p-section-label p-notes-pinned">Pinned</p><div class="p-note-list">${processNotes.map((item: ProcessNote): string => `<button type="button" class="p-note-row" data-note="${item.id}" data-search="${escapeHTML(`${item.title} ${item.preview} ${item.tag}`.toLowerCase())}"><strong>${item.title}</strong><p>${item.preview}</p><span>${icon('folder', 12)} ${item.tag}</span></button>`).join('')}</div><p class="p-footnote">How I approach scope, risk, delivery and team coordination, illustrated by my project work.</p><div class="p-empty" hidden><strong>No matching notes</strong><p>Try scope, risk or delivery.</p></div>`);
  bindAll<HTMLButtonElement>(host, '[data-note]', (button): void => button.addEventListener('click', (): void => renderNotes(host, context, button.dataset.note)));
  host.querySelector<HTMLInputElement>('#note-search')?.addEventListener('input', (event: Event): void => {
    const query = (event.currentTarget as HTMLInputElement).value.trim().toLowerCase();
    let visible = 0;
    bindAll<HTMLButtonElement>(host, '[data-search]', (element): void => { element.hidden = !(element.dataset.search ?? '').includes(query); if (!element.hidden) visible += 1; });
    const empty = host.querySelector<HTMLElement>('.p-empty');
    if (empty) empty.hidden = visible > 0;
  });
}

function photoGrid(studies: readonly CaseStudyMedia[], library = false): string {
  return `<div class="p-gallery-grid ${library ? 'p-photo-library-grid' : ''}">${studies.map((study: CaseStudyMedia): string => study.slides.map((slide: GallerySlide): string => `<button type="button" data-slide="${study.id}/${slide.page}" aria-label="View ${study.name}: ${slide.title} slide"><img src="${slidePath(study, slide)}" alt="${study.name} slide ${slide.page}: ${slide.title}" loading="lazy"><span>${library ? `${study.name} · ` : ''}${slide.title}</span></button>`).join('')).join('')}</div>`;
}

function renderPhotos(host: HTMLElement, context: AppContext, route?: string): void {
  const [requestedId, requestedSlide] = (route ?? '').split('/');
  const legacySlide = requestedId !== undefined && /^\d+$/.test(requestedId);
  const album = getCaseStudyMedia(legacySlide ? 'trimly' : requestedId);
  const selected = album?.slides.find((slide: GallerySlide): boolean => slide.page === Number(legacySlide ? requestedId : requestedSlide));
  if (selected && album) {
    const index = album.slides.indexOf(selected);
    const imagePath = slidePath(album, selected);
    const nav = `<header class="p-nav">${navBack('Album', 'photos-back')}<span class="p-nav-title">${album.name} · Slide ${selected.page}</span><a class="p-nav-icon" href="${imagePath}" target="_blank" rel="noopener" aria-label="Open full-size slide">${icon('arrow-up-right', 21)}</a></header>`;
    const footer = `<nav class="p-gallery-navigation" aria-label="Gallery navigation"><button type="button" data-previous ${index === 0 ? 'disabled' : ''} aria-label="Previous slide">${icon('chevron-left', 23)}</button><span>${index + 1} of ${album.slides.length}</span><button type="button" data-next ${index === album.slides.length - 1 ? 'disabled' : ''} aria-label="Next slide">${icon('chevron-right', 23)}</button></nav>`;
    const filmstrip = `<nav class="p-photo-filmstrip" aria-label="${album.name} slides">${album.slides.map((slide: GallerySlide): string => `<button type="button" class="${slide.page === selected.page ? 'is-selected' : ''}" data-slide="${album.id}/${slide.page}" aria-label="View ${slide.title}" aria-current="${slide.page === selected.page ? 'true' : 'false'}"><img src="${slidePath(album, slide)}" alt=""></button>`).join('')}</nav>`;
    shell(host, 'p-photos p-photo-open', nav, `<figure class="p-photo-detail"><a href="${imagePath}" target="_blank" rel="noopener" aria-label="Open ${selected.title} slide at full size"><img src="${imagePath}" alt="${album.name} case-study slide ${selected.page}: ${selected.title}"></a><figcaption><span class="p-eyebrow">${album.name.toUpperCase()} · CASE-STUDY PRESENTATION</span><h1>${selected.title}</h1><p>${selected.caption}</p><a href="${imagePath}" target="_blank" rel="noopener">Open full-size slide ${icon('arrow-up-right', 14)}</a></figcaption></figure>${filmstrip}<div class="p-photo-download">${openPublicPdf(album.id)}</div>`, footer);
    const strip = host.querySelector<HTMLElement>('.p-photo-filmstrip');
    const selectedThumbnail = strip?.querySelector<HTMLElement>('.is-selected');
    if (strip && selectedThumbnail && strip.scrollWidth > strip.clientWidth) {
      strip.scrollLeft += selectedThumbnail.getBoundingClientRect().left - strip.getBoundingClientRect().left - (strip.clientWidth - selectedThumbnail.offsetWidth) / 2;
    }
    host.querySelector('[data-photos-back]')?.addEventListener('click', (): void => renderPhotos(host, context, album.id));
    host.querySelector('[data-previous]')?.addEventListener('click', (): void => { const previous = album.slides[index - 1]; if (previous) renderPhotos(host, context, `${album.id}/${previous.page}`); });
    host.querySelector('[data-next]')?.addEventListener('click', (): void => { const next = album.slides[index + 1]; if (next) renderPhotos(host, context, `${album.id}/${next.page}`); });
    bindAll<HTMLButtonElement>(host, '[data-slide]', (button): void => button.addEventListener('click', (): void => renderPhotos(host, context, button.dataset.slide)));
    return;
  }

  const collections = route === 'collections';
  const inCollections = collections || album !== undefined;
  const nav = `<header class="p-nav p-nav-right">${album ? navBack('Collections', 'collections') : '<span class="p-native-location">Photos</span>'}<button type="button" class="p-round-avatar portrait" data-profile aria-label="View Precious's contact card"><img src="/assets/profile-photo.jpg" alt="" width="1365" height="2048" decoding="async"></button></header>`;
  const albumList = `<div class="p-section-heading"><h2>Case studies</h2><span>${caseStudyMedia.length} collections</span></div><div class="p-album-list">${caseStudyMedia.map((study: CaseStudyMedia): string => `<button type="button" class="p-album-cover" data-album="${study.id}" aria-label="Open ${study.name} collection"><img src="/assets/${study.id}-slide-1.webp" alt="${study.coverAlt}"><span><small>${study.category.toUpperCase()}</small><strong>${study.name}</strong><em>${study.slides.length} case-study slides</em></span></button>`).join('')}</div>`;
  const feature = album ? `<div class="p-photo-album-download">${openPublicPdf(album.id)}</div><button type="button" class="p-feature-link" data-case="${album.id}"><span>${icon('folder', 24)}</span><span><strong>Read the ${album.name} case study</strong><small>${album.description}</small></span>${icon('chevron-right', 18)}</button>` : '';
  const title = album?.name ?? (collections ? 'Collections' : 'Library');
  const subtitle = album ? `${album.slides.length} slides · ${album.category}` : collections ? 'A closer look at the work.' : `${gallerySlideCount} slides · ${caseStudyMedia.length} project case studies`;
  const content = album ? photoGrid([album]) : collections ? albumList : photoGrid(caseStudyMedia, true);
  const footer = `<nav class="p-tabbar p-photos-tabbar" aria-label="Photos sections"><button type="button" class="${inCollections ? '' : 'is-active'}" data-library>${icon('grid', 22)}<span>Library</span></button><button type="button" class="${inCollections ? 'is-active' : ''}" data-collections>${icon('folder', 22)}<span>Collections</span></button></nav>`;
  shell(host, `p-photos ${inCollections ? 'p-photo-collections' : 'p-photo-library'}`, nav, `<h1 class="p-large-title">${title}</h1><p class="p-title-subtitle">${subtitle}</p>${content}<p class="p-photo-library-count">${album?.slides.length ?? gallerySlideCount} case-study slides</p><p class="p-footnote">Actual slides from my project delivery presentations, including their original illustrations and diagrams.</p>${feature}`, footer);
  bindAll<HTMLButtonElement>(host, '[data-slide]', (button): void => button.addEventListener('click', (): void => renderPhotos(host, context, button.dataset.slide)));
  bindAll<HTMLButtonElement>(host, '[data-album]', (button): void => button.addEventListener('click', (): void => renderPhotos(host, context, button.dataset.album)));
  bindAll<HTMLButtonElement>(host, '[data-library]', (button): void => button.addEventListener('click', (): void => renderPhotos(host, context)));
  bindAll<HTMLButtonElement>(host, '[data-collections]', (button): void => button.addEventListener('click', (): void => renderPhotos(host, context, 'collections')));
  host.querySelector('[data-profile]')?.addEventListener('click', (): void => context.openApp('contacts'));
  host.querySelector<HTMLButtonElement>('[data-case]')?.addEventListener('click', (event: MouseEvent): void => context.openApp('files', (event.currentTarget as HTMLButtonElement).dataset.case));
}

function readChecked(): Set<string> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem('precious-example-checklist-v1') ?? '[]');
    if (!Array.isArray(saved)) return new Set<string>();
    return new Set(saved.filter((value: unknown): value is string => typeof value === 'string' && readinessItems.some((item: ReadinessItem): boolean => item.id === value)));
  } catch { return new Set<string>(); }
}

function renderReminders(host: HTMLElement, context: AppContext): void {
  const checked = readChecked();
  const nav = `<header class="p-nav"><button type="button" class="p-back" data-notes>${icon('chevron-left', 22)}<span>My approach</span></button><button type="button" class="p-text-button" data-reset>Reset</button></header>`;
  shell(host, 'p-reminders', nav, `<div class="p-reminder-heading"><h1>Launch readiness</h1><span class="p-reminder-total" data-remaining aria-label="Remaining example tasks">${readinessItems.length - checked.size}</span><p>Example checklist</p></div><div class="p-example-note">Try the checklist. Your selections stay in this browser and do not represent the status of a live project.</div><div class="p-checklist-progress"><span><strong data-complete>${checked.size}</strong> of ${readinessItems.length} complete</span><div role="progressbar" aria-label="Example checklist completion" aria-valuemin="0" aria-valuemax="${readinessItems.length}" aria-valuenow="${checked.size}"><i style="width:${checked.size / readinessItems.length * 100}%"></i></div></div><div class="p-checklist">${readinessItems.map((item: ReadinessItem): string => `<label class="p-checklist-item ${checked.has(item.id) ? 'is-checked' : ''}"><input type="checkbox" value="${item.id}" ${checked.has(item.id) ? 'checked' : ''}><span class="p-custom-check">${icon('check', 15)}</span><span><strong>${item.title}</strong><small>${item.detail}</small></span></label>`).join('')}</div><button type="button" class="p-feature-link" data-readiness><span>${icon('file', 24)}</span><span><strong>See it in a real project</strong><small>Trimly’s testing and release decisions</small></span>${icon('chevron-right', 18)}</button>`);
  host.querySelector('[data-notes]')?.addEventListener('click', (): void => context.openApp('notes'));
  host.querySelector('[data-readiness]')?.addEventListener('click', (): void => context.openApp('files', 'trimly/decisions'));
  host.querySelector('[data-reset]')?.addEventListener('click', (): void => { try { localStorage.removeItem('precious-example-checklist-v1'); } catch { /* Checklist remains usable without storage. */ } renderReminders(host, context); });
  bindAll<HTMLInputElement>(host, 'input[type="checkbox"]', (input): void => input.addEventListener('change', (): void => {
    if (input.checked) checked.add(input.value); else checked.delete(input.value);
    input.closest<HTMLElement>('.p-checklist-item')?.classList.toggle('is-checked', input.checked);
    const count = host.querySelector('[data-complete]');
    if (count) count.textContent = String(checked.size);
    const remaining = host.querySelector('[data-remaining]');
    if (remaining) remaining.textContent = String(readinessItems.length - checked.size);
    const progress = host.querySelector<HTMLElement>('[role="progressbar"]');
    progress?.setAttribute('aria-valuenow', String(checked.size));
    const bar = progress?.querySelector<HTMLElement>('i');
    if (bar) bar.style.width = `${checked.size / readinessItems.length * 100}%`;
    try { localStorage.setItem('precious-example-checklist-v1', JSON.stringify([...checked])); } catch { /* Selections still work for this session. */ }
  }));
}

export function mountProjectApp(id: AppId, host: HTMLElement, context: AppContext, route?: string): void {
  switch (id) {
    case 'files': renderFiles(host, context, route); break;
    case 'health': renderHealth(host, context, route); break;
    case 'notes': renderNotes(host, context, route); break;
    case 'photos': renderPhotos(host, context, route); break;
    case 'reminders': renderReminders(host, context); break;
    default: renderFiles(host, context, route);
  }
}
