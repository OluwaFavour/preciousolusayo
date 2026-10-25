import { icon, appIcon } from './icons.js';
import { mountProjectApp } from './projects.js';
const EMAIL = 'originalshayo@gmail.com';
const PHONE = '+2348100609621';
const LINKEDIN = 'https://www.linkedin.com/in/preciousolusayo';
const RESUME = '/assets/Precious_Olusayo_Resume.pdf';
const topics = {
    role: { subject: 'Let’s talk about a role', body: 'Hi Precious,\n\nI’d like to talk about an opportunity on our team.\n\nCompany:\nRole and responsibilities:\nWhat we’re hoping to achieve:\n\nBest,\n' },
    delivery: { subject: 'Let’s talk about project delivery', body: 'Hi Precious,\n\nI’d like to discuss a project with you.\n\nWhat we’re building:\nWhere things stand today:\nWhere we could use your help:\n\nBest,\n' },
    work: { subject: 'A question about your work', body: 'Hi Precious,\n\nI explored your portfolio and would love to hear more about your work on ' },
    introduction: { subject: 'An introduction', body: 'Hi Precious,\n\nI found your portfolio and wanted to get in touch.\n\n' },
};
function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character] ?? character));
}
function mailto(subject, body) {
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function bind(host, selector, handler) {
    host.querySelectorAll(selector).forEach((element) => element.addEventListener('click', handler));
}
function bindRoutes(host, context) {
    host.querySelectorAll('[data-open-app]').forEach((button) => {
        button.addEventListener('click', () => context.openApp(button.dataset.openApp, button.dataset.route));
    });
    bind(host, '[data-home]', () => context.home());
}
async function copyText(text, context, success) {
    try {
        await navigator.clipboard.writeText(text);
        context.toast(success);
    }
    catch {
        context.toast('Copy is unavailable here. You can select the email address to copy it.');
    }
}
function avatar(size = 'large') {
    return `<span class="na-avatar na-avatar-${size} portrait" aria-hidden="true"><img src="/assets/profile-photo.jpg" alt="" width="1365" height="2048" decoding="async"></span>`;
}
function chevron() { return `<span class="na-chevron" aria-hidden="true">${icon('chevron-right', 16)}</span>`; }
function toolbar(back, title, action = '') {
    return `<div class="na-toolbar"><button class="na-text-button" data-home aria-label="Return to Home Screen">${icon('chevron-left', 19)}${back}</button><span class="na-toolbar-title">${title}</span>${action || '<span class="na-toolbar-spacer"></span>'}</div>`;
}
function titleHeader(title, sub = '', action = '') {
    return `<header class="na-large-header"><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${action}</header>`;
}
function contactContent() {
    return `<div class="na-contact-hero">${avatar()}<h2>Precious Olusayo</h2><p>Technical Project Manager</p><span class="na-muted">Product delivery · Cross-functional leadership</span></div>
  <div class="na-contact-actions">
    <button data-open-app="mail" data-route="introduction" aria-label="Email Precious" title="Email">${icon('mail', 23)}<span>email</span></button>
    <a href="tel:${PHONE}" aria-label="Call Precious" title="Call">${icon('phone', 23)}<span>call</span></a>
    <a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" aria-label="Precious on LinkedIn" title="LinkedIn">${icon('link', 23)}<span>LinkedIn</span></a>
    <button data-open-app="safari" data-route="resume" aria-label="View Precious’s résumé" title="Résumé">${icon('file', 23)}<span>résumé</span></button>
  </div>
  <div class="na-group na-contact-details">
    <a class="na-detail-row" href="mailto:${EMAIL}"><span>email</span><strong>${EMAIL}</strong></a>
    <a class="na-detail-row" href="tel:${PHONE}"><span>mobile</span><strong>+234 810 060 9621</strong></a>
    <div class="na-detail-row"><span>location</span><strong class="na-normal-color">Ibadan, Nigeria</strong><small>Working across distributed teams</small></div>
  </div>
  <section class="na-section"><h3 class="na-section-label">ABOUT ME</h3><div class="na-group na-prose"><p>I bring structure to complex projects, connect the people doing the work, and keep delivery moving.</p><p>My experience spans software launches, a hospitality platform in development, and remote digital operations. I work across product, engineering, design and operations to turn requirements into clear plans, accountable ownership and usable outcomes.</p><p class="na-stat-line"><strong>4+ years</strong><span>across cross-functional technology<br>and digital projects</span></p></div></section>
  <section class="na-section"><h3 class="na-section-label">EXPERIENCE</h3><div class="na-group na-timeline">
    <button class="na-experience" data-open-app="files" data-route="valto"><span class="na-company-mark na-valto">V</span><span><strong>Valto</strong><b>Lead Project Manager</b><small>Sep 2025 – Present</small><em>AI hospitality SaaS · In development</em></span>${chevron()}</button>
    <button class="na-experience" data-open-app="files" data-route="trimly"><span class="na-company-mark na-trimly">t.</span><span><strong>Trimly</strong><b>Project Manager</b><small>Oct 2025 – Jun 2026</small><em>Booking platform · Publicly launched</em></span>${chevron()}</button>
    <button class="na-experience" data-open-app="files" data-route="faceless"><span class="na-company-mark na-faceless">FF</span><span><strong>Faceless Freedom</strong><b>Channel Operations Manager</b><small>Mar 2022 – Aug 2026</small><em>12-channel portfolio · Remote, US team</em></span>${chevron()}</button>
  </div></section>
  <button class="na-primary-button na-full" data-open-app="calendar">${icon('calendar', 19)}Request an introduction</button>
  <p class="na-footnote na-centered">Good delivery starts with a clear conversation.</p>`;
}
function mountContacts(host, context) {
    host.innerHTML = `<div class="native-app na-contacts">${toolbar('Home', 'My Card')}<div class="na-scroll na-contact-scroll">${contactContent()}</div></div>`;
    bindRoutes(host, context);
}
function mountPhone(host, context) {
    host.innerHTML = `<div class="native-app na-phone">${titleHeader('Phone', 'Let’s make the next step simple.')}<div class="na-scroll"><div class="na-phone-contact">${avatar()}<h2>Precious Olusayo</h2><p>Technical Project Manager</p><span>Ibadan, Nigeria · WAT</span><a class="na-call-button" href="tel:${PHONE}">${icon('phone', 25)}<span>Call Precious<small>+234 810 060 9621</small></span></a></div><h3 class="na-section-label">MORE WAYS TO CONNECT</h3><div class="na-group"><button class="na-list-row" data-open-app="mail" data-route="introduction"><span class="na-row-icon na-blue">${icon('mail', 19)}</span><span>Email me<small>${EMAIL}</small></span>${chevron()}</button><a class="na-list-row" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer"><span class="na-row-icon na-linkedin">in</span><span>Connect on LinkedIn<small>preciousolusayo</small></span>${icon('arrow-up-right', 17)}</a><button class="na-list-row" data-open-app="calendar"><span class="na-row-icon na-red">${icon('calendar', 19)}</span><span>Request an introduction<small>Suggest a date by email</small></span>${chevron()}</button></div><p class="na-footnote">If a call is inconvenient, email is a good place to share what you have in mind.</p></div><div class="na-bottom-tabs"><button class="is-selected" aria-current="page">${icon('heart', 20)}<span>Connect</span></button><button data-open-app="contacts">${icon('person', 20)}<span>My Card</span></button><button data-open-app="messages">${icon('mail', 20)}<span>Message</span></button></div></div>`;
    bindRoutes(host, context);
}
function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function mountCalendar(host, context) {
    const watParts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(new Date());
    const part = (type) => watParts.find((item) => item.type === type)?.value ?? '';
    const today = `${part('year')}-${part('month')}-${part('day')}`;
    const tomorrow = new Date(`${today}T12:00:00`);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let selected = dateKey(tomorrow);
    let month = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
    let requestedTime = '10:00';
    const render = () => {
        const year = month.getFullYear();
        const monthIndex = month.getMonth();
        const days = new Date(year, monthIndex + 1, 0).getDate();
        const offset = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
        let grid = '<span class="na-calendar-empty" aria-hidden="true"></span>'.repeat(offset);
        for (let day = 1; day <= days; day += 1) {
            const value = dateKey(new Date(year, monthIndex, day));
            const label = new Date(year, monthIndex, day).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            grid += `<button class="na-calendar-day ${value === selected ? 'is-selected' : ''} ${value === today ? 'is-today' : ''} ${[0, 6].includes(new Date(year, monthIndex, day).getDay()) ? 'is-weekend' : ''}" data-date="${value}" aria-label="${label}" aria-pressed="${value === selected}" ${value < today ? 'disabled' : ''}>${day}</button>`;
        }
        const selectedDate = new Date(`${selected}T12:00:00`);
        const displaySelected = selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
        const monthTitle = month.toLocaleDateString('en-GB', { month: 'long' });
        host.innerHTML = `<div class="native-app na-calendar">${toolbar('Home', 'Calendar')}<div class="na-scroll"><div class="na-month-nav"><h1>${monthTitle}<small>${year}</small></h1><div class="na-month-controls"><button class="na-icon-button" data-month="-1" aria-label="Previous month">${icon('chevron-left', 22)}</button><button class="na-icon-button" data-month="1" aria-label="Next month">${icon('chevron-right', 22)}</button></div></div><div class="na-calendar-grid" role="group" aria-label="Choose a proposed date"><div class="na-calendar-weekdays" aria-hidden="true"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>${grid}</div><div class="na-calendar-rule"></div><div class="na-meeting-heading"><span class="na-meeting-dot"></span><div><h3>Let’s get acquainted</h3><p>A short introduction to your team or project</p></div></div><div class="na-group na-request-card"><div class="na-detail-row"><span>proposed date</span><strong class="na-normal-color">${displaySelected}</strong></div><label class="na-time-row" for="meeting-time"><span>Proposed time<small>West Africa Time · UTC+1</small></span><input id="meeting-time" type="time" value="${requestedTime}" required aria-label="Proposed meeting time in West Africa Time"></label></div><button class="na-primary-button na-full na-calendar-request" data-request-date>${icon('mail', 19)}Request this date by email</button><p class="na-footnote">Suggest a time that works for you. This opens an email request; we’ll agree the details by email.</p><button class="na-subtle-link" data-open-app="mail" data-route="introduction">Prefer to write first? Send an email ${icon('arrow-up-right', 15)}</button></div></div>`;
        bindRoutes(host, context);
        host.querySelectorAll('[data-month]').forEach((button) => {
            button.addEventListener('click', () => {
                month = new Date(year, monthIndex + Number(button.dataset.month), 1);
                render();
            });
        });
        host.querySelectorAll('[data-date]').forEach((button) => {
            button.addEventListener('click', () => { selected = button.dataset.date ?? selected; render(); });
        });
        const timeInput = host.querySelector('#meeting-time');
        timeInput?.addEventListener('change', () => { requestedTime = timeInput.value; });
        bind(host, '[data-request-date]', () => {
            const requestedTimestamp = new Date(`${selected}T${requestedTime}:00+01:00`).getTime();
            if (!requestedTime || !Number.isFinite(requestedTimestamp) || requestedTimestamp <= Date.now()) {
                context.toast('Please choose a future date and time.');
                return;
            }
            const body = `Hi Precious,\n\nI’d like to arrange an introductory conversation.\n\nProposed date: ${selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\nProposed time: ${requestedTime} WAT (UTC+1)\n\nWhat I’d like to discuss:\n\nPlease let me know if this works for you, or suggest another time.\n\nBest,\n`;
            window.location.href = mailto('An introductory conversation', body);
        });
    };
    render();
}
function mountMessages(host, context) {
    host.innerHTML = `<div class="native-app na-messages"><header class="na-conversation-header"><button class="na-text-button" data-home aria-label="Return to Home Screen">${icon('chevron-left', 24)}</button><button class="na-conversation-person" data-open-app="contacts">${avatar('small')}<strong>Precious ${icon('chevron-right', 12)}</strong></button><button class="na-icon-button" data-open-app="calendar" aria-label="Request an introduction">${icon('calendar', 22)}</button></header><div class="na-scroll na-message-scroll"><p class="na-conversation-label">A LITTLE INTRODUCTION</p><div class="na-message-bubble"><p>Hi, I’m Precious.</p><p>I help teams turn ambitious ideas into clear plans and well-coordinated delivery.</p></div><div class="na-message-bubble"><p>I’ve managed a software launch, coordinated a hospitality product in development, and led remote digital operations.</p><p>What would you like to talk about?</p></div><div class="na-conversation-topics"><button data-open-app="mail" data-route="role">A role on your team ${icon('arrow-up-right', 15)}</button><button data-open-app="mail" data-route="delivery">Help with project delivery ${icon('arrow-up-right', 15)}</button><button data-open-app="mail" data-route="work">A question about my work ${icon('arrow-up-right', 15)}</button></div><p class="na-message-explainer">Pick a topic to start an email.<br>Or write a few words below.</p></div><form class="na-message-compose"><label class="na-sr-only" for="intro-message">Your introduction</label><input id="intro-message" name="message" type="text" autocomplete="off" placeholder="Your introduction…" maxlength="1500" required><button type="submit" aria-label="Continue this message by email">${icon('arrow-up', 20)}</button></form><p class="na-compose-caption">Continues in your email app</p></div>`;
    bindRoutes(host, context);
    host.querySelector('.na-message-compose')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = host.querySelector('#intro-message')?.value ?? '';
        if (!message.trim())
            return;
        context.openApp('mail', `message:${encodeURIComponent(message)}`);
    });
}
function mountMail(host, context, route) {
    let draft = topics[route ?? 'introduction'] ?? topics.introduction;
    if (route?.startsWith('message:')) {
        try {
            draft = { subject: 'Hello from your portfolio', body: `Hi Precious,\n\n${decodeURIComponent(route.slice(8))}\n\n` };
        }
        catch {
            draft = topics.introduction;
        }
    }
    const safeDraft = draft ?? { subject: 'An introduction', body: 'Hi Precious,\n\n' };
    host.innerHTML = `<div class="native-app na-mail"><form class="na-mail-form"><header class="na-mail-header"><button type="button" class="na-text-button" data-home>Cancel</button><h1>New Message</h1><button class="na-mail-send" type="submit" aria-label="Open this draft in your email app">${icon('arrow-up', 21)}</button></header><div class="na-mail-fields"><div class="na-mail-field"><span>To:</span><a class="na-recipient-chip" href="mailto:${EMAIL}">Precious Olusayo</a></div><div class="na-mail-field"><label for="mail-subject">Subject:</label><input id="mail-subject" name="subject" value="${escapeHtml(safeDraft.subject)}" maxlength="160" required></div></div><label class="na-sr-only" for="mail-body">Message body</label><textarea id="mail-body" name="body" maxlength="6000" spellcheck="true" required>${escapeHtml(safeDraft.body)}</textarea><div class="na-mail-help"><span>${icon('lock', 14)} Opens in your email app. You decide when to send.</span><button type="button" class="na-primary-button na-full" data-open-email>${icon('mail', 18)}Continue in email</button><button type="button" class="na-copy-email" data-copy-email>${EMAIL} ${icon('copy', 14)}</button><small>Tap the address above to copy it</small></div></form></div>`;
    bindRoutes(host, context);
    const form = host.querySelector('.na-mail-form');
    const send = () => {
        if (!form?.reportValidity())
            return;
        const subject = host.querySelector('#mail-subject')?.value ?? '';
        const body = host.querySelector('#mail-body')?.value ?? '';
        if (!subject.trim() || !body.trim()) {
            context.toast('Add a subject and a message first.');
            return;
        }
        window.location.href = mailto(subject, body);
    };
    form?.addEventListener('submit', (event) => { event.preventDefault(); send(); });
    bind(host, '[data-open-email]', send);
    bind(host, '[data-copy-email]', () => { void copyText(EMAIL, context, 'Email address copied'); });
}
function mountSafari(host, context, route) {
    const showResume = route === 'resume';
    const refreshGlyph = '<svg class="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7V2m0 5h-5M20 7a9 9 0 1 0 1 8"/></svg>';
    host.innerHTML = `<div class="native-app na-safari"><div class="na-scroll ${showResume ? 'na-resume-scroll' : 'na-safari-start'}">${showResume ? `<div class="na-resume-header"><div class="na-document-symbol">${icon('file', 30)}</div><h1>Precious Olusayo</h1><p>Technical Project Manager · Résumé</p><a class="na-primary-button na-full" href="${RESUME}" download="Precious_Olusayo_Resume.pdf">${icon('download', 18)}Download résumé</a><a class="na-subtle-link" href="${RESUME}" target="_blank" rel="noopener noreferrer">Open PDF in a new tab ${icon('arrow-up-right', 15)}</a></div><object class="na-pdf-preview" data="${RESUME}#toolbar=0&navpanes=0&view=FitH" type="application/pdf" aria-label="Precious Olusayo resume PDF"><div class="na-pdf-fallback">${icon('file', 38)}<p>Your browser can open the résumé in a separate tab.</p><a class="na-primary-button" href="${RESUME}" target="_blank" rel="noopener noreferrer">View résumé</a></div></object>` : `<header class="na-safari-intro"><span class="na-safari-kicker">PRECIOUS OLUSAYO</span><h1>Favorites</h1><p>My work, experience and ways to get in touch.</p></header><section class="na-safari-favorites" aria-label="Favorite links"><div class="na-favorite-grid"><button data-open-app="safari" data-route="resume"><span class="na-favorite-icon na-favorite-resume">${icon('file', 29)}</span><span>Résumé</span></button><a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer"><span class="na-favorite-icon na-favorite-linkedin">in</span><span>LinkedIn</span></a><button data-open-app="files"><span class="na-favorite-app">${appIcon('files')}</span><span>My work</span></button><button data-open-app="mail" data-route="introduction"><span class="na-favorite-app">${appIcon('mail')}</span><span>Email</span></button></div></section><section class="na-reading-list"><h2>Reading List</h2><button data-open-app="files" data-route="trimly"><span class="na-reading-icon">t.</span><span><strong>From manual bookings to a public launch</strong><small>Trimly · Featured case study</small></span>${chevron()}</button><button data-open-app="files" data-route="faceless"><span class="na-reading-note">${icon('briefcase', 23)}</span><span><strong>Inside a channel turnaround</strong><small>Faceless Freedom · Case study</small></span>${chevron()}</button><button data-open-app="notes"><span class="na-reading-note">${icon('file', 23)}</span><span><strong>How I bring clarity to delivery</strong><small>Notes on my project management approach</small></span>${chevron()}</button></section><div class="na-safari-private"><span>${icon('lock', 16)}</span><p>A little more human than a résumé.<br><strong>A portfolio you can explore.</strong></p></div>`}</div><footer class="na-safari-chrome na-safari-compact"><button class="na-icon-button na-safari-back" data-safari-start aria-label="Safari start page" ${showResume ? '' : 'disabled'}>${icon('chevron-left', 23)}</button><div class="na-address-bar">${icon('lock', 12)}<span>${showResume ? 'Precious_Olusayo_Resume.pdf' : 'Precious’s portfolio'}</span><button class="na-address-refresh" data-refresh-safari aria-label="${showResume ? 'Back to Safari start page' : 'Refresh start page'}">${showResume ? icon('close', 17) : refreshGlyph}</button></div><details class="na-safari-menu"><summary class="na-icon-button" aria-label="Safari page actions">${icon('more', 23)}</summary><div class="na-safari-menu-panel"><p>Page actions</p><button data-open-app="safari" data-route="resume"><span>View résumé</span>${icon('file', 20)}</button><button data-share-portfolio><span>Copy portfolio link</span>${icon('share', 20)}</button><a href="${RESUME}" download="Precious_Olusayo_Resume.pdf"><span>Download résumé</span>${icon('download', 20)}</a><button data-home><span>Home Screen</span>${icon('grid', 20)}</button></div></details></footer></div>`;
    bindRoutes(host, context);
    bind(host, '[data-safari-start], [data-refresh-safari]', () => mountSafari(host, context));
    bind(host, '[data-share-portfolio]', () => { void copyText(window.location.origin + window.location.pathname, context, 'Portfolio link copied'); });
}
function mountSettings(host, context) {
    const dark = context.getTheme() === 'dark';
    const reduced = context.getReducedMotion();
    host.innerHTML = `<div class="native-app na-settings">${titleHeader('Settings')}<div class="na-scroll"><button class="na-settings-profile na-group" data-open-app="contacts">${avatar('medium')}<span><strong>Precious Olusayo</strong><small>Technical Project Manager</small></span>${chevron()}</button><h3 class="na-section-label">MAKE YOURSELF COMFORTABLE</h3><div class="na-group"><div class="na-appearance-section"><span class="na-appearance-label">Appearance</span><div class="na-appearance-options" role="group" aria-label="Appearance"><button data-theme="light" class="${dark ? '' : 'is-selected'}" aria-pressed="${!dark}"><span class="na-mini-phone na-mini-light"><i></i><b></b><b></b><b></b></span><span>Light</span><span class="na-radio">${!dark ? icon('check', 10) : ''}</span></button><button data-theme="dark" class="${dark ? 'is-selected' : ''}" aria-pressed="${dark}"><span class="na-mini-phone na-mini-dark"><i></i><b></b><b></b><b></b></span><span>Dark</span><span class="na-radio">${dark ? icon('check', 10) : ''}</span></button></div></div><div class="na-list-row"><span class="na-row-icon na-blue">${icon('sparkles', 18)}</span><span>Reduce Motion<small>Gentler screen transitions</small></span><button class="na-toggle ${reduced ? 'is-on' : ''}" role="switch" aria-checked="${reduced}" aria-label="Reduce Motion" data-reduced-motion><span></span></button></div></div><h3 class="na-section-label">MY TOOLKIT</h3><div class="na-group"><div class="na-list-row"><span class="na-tool-logo na-clickup">⌃</span><span>ClickUp<small>Incremental delivery and dependencies</small></span></div><div class="na-list-row"><span class="na-tool-logo na-jira">◆</span><span>Jira<small>Sprints, scope and launch readiness</small></span></div><div class="na-list-row"><span class="na-tool-logo na-asana">●</span><span>Asana<small>Remote production and team coordination</small></span></div><details class="na-setting-details"><summary><span class="na-row-icon na-purple">${icon('briefcase', 18)}</span><span>Collaboration & planning</span>${chevron()}</summary><p>Google Workspace · Google Sheets · Figma · Slack · WhatsApp</p></details></div><h3 class="na-section-label">HOW I WORK</h3><div class="na-group"><details class="na-setting-details"><summary><span>Delivery approaches</span>${chevron()}</summary><p>Hybrid and incremental delivery, Agile sprints, milestone-based planning, structured production workflows and data-informed iteration.</p></details><details class="na-setting-details"><summary><span>Core strengths</span>${chevron()}</summary><p>Planning and execution · Stakeholder alignment · Scope and requirements · Risks and dependencies · Resource coordination · Acceptance and testing · Launch readiness · SOPs and process improvement.</p></details><button class="na-list-row" data-open-app="notes"><span>Read my delivery notes</span>${chevron()}</button></div><h3 class="na-section-label">EDUCATION</h3><div class="na-group na-education"><strong>B.Tech, Physics Electronics</strong><span>Federal University of Technology Akure</span><small>2019 – 2024</small></div><h3 class="na-section-label">ABOUT THIS SPACE</h3><div class="na-group"><a class="na-list-row" href="https://www.iclarified.com/101089/download-the-official-ios-27-wallpaper-for-iphone" target="_blank" rel="noopener noreferrer"><span>Wallpaper source<small>iOS 27 · via iClarified</small></span>${icon('arrow-up-right', 17)}</a><button class="na-list-row" data-open-app="safari" data-route="resume"><span>View my résumé</span>${chevron()}</button><button class="na-list-row" data-open-app="mail" data-route="introduction"><span>Say hello</span>${chevron()}</button></div><p class="na-footnote na-centered">A portfolio by Precious Olusayo.<br>Built around the way I work.</p></div></div>`;
    bindRoutes(host, context);
    host.querySelectorAll('[data-theme]').forEach((button) => {
        button.addEventListener('click', () => {
            const scrollTop = host.querySelector('.na-scroll')?.scrollTop ?? 0;
            context.setTheme(button.dataset.theme === 'dark' ? 'dark' : 'light');
            mountSettings(host, context);
            host.querySelector('.na-scroll')?.scrollTo(0, scrollTop);
        });
    });
    bind(host, '[data-reduced-motion]', () => {
        const scrollTop = host.querySelector('.na-scroll')?.scrollTop ?? 0;
        context.setReducedMotion(!context.getReducedMotion());
        mountSettings(host, context);
        host.querySelector('.na-scroll')?.scrollTo(0, scrollTop);
    });
}
export function mountApp(id, host, context, route) {
    switch (id) {
        case 'files':
        case 'health':
        case 'notes':
        case 'photos':
        case 'reminders':
            mountProjectApp(id, host, context, route);
            break;
        case 'contacts':
            mountContacts(host, context);
            break;
        case 'phone':
            mountPhone(host, context);
            break;
        case 'calendar':
            mountCalendar(host, context);
            break;
        case 'messages':
            mountMessages(host, context);
            break;
        case 'mail':
            mountMail(host, context, route);
            break;
        case 'safari':
            mountSafari(host, context, route);
            break;
        case 'settings':
            mountSettings(host, context);
            break;
    }
}
