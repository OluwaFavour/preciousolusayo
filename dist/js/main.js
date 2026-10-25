import { icon, appIcon } from './icons.js';
import { mountApp } from './apps.js';
import { createControlCentre } from './control-center.js';
const apps = [
    { id: 'files', name: 'Files', subtitle: 'Projects and case studies', color: '#007aff' },
    { id: 'notes', name: 'Notes', subtitle: 'How I manage delivery', color: '#eeb827' },
    { id: 'health', name: 'Results', subtitle: 'Reported project outcomes', color: '#ed577a' },
    { id: 'calendar', name: 'Calendar', subtitle: 'Request an introduction', color: '#ed4b50' },
    { id: 'photos', name: 'Photos', subtitle: 'Explore project case study slides', color: '#c76f9d' },
    { id: 'contacts', name: 'Contacts', subtitle: 'About Precious and my experience', color: '#918b7e' },
    { id: 'reminders', name: 'Reminders', subtitle: 'Explore a launch-readiness checklist', color: '#007aff' },
    { id: 'settings', name: 'Settings', subtitle: 'Skills, tools, and appearance', color: '#888' },
    { id: 'phone', name: 'Phone', subtitle: 'Ways to get in touch', color: '#26bd4f' },
    { id: 'safari', name: 'Safari', subtitle: 'Resume and professional links', color: '#007aff' },
    { id: 'messages', name: 'Messages', subtitle: 'Start a conversation', color: '#28c251' },
    { id: 'mail', name: 'Mail', subtitle: 'Write to Precious', color: '#007aff' },
];
const searchItems = [
    { title: 'Trimly', description: 'A web-first booking platform, from scope to handover', app: 'files', route: 'trimly', keywords: 'barbers payments launch bookings case study jira product delivery' },
    { title: 'Valto', description: 'Hospitality SaaS · In development', app: 'files', route: 'valto', keywords: 'hotels ai voice whatsapp clickup dependencies' },
    { title: 'Faceless Freedom', description: 'Remote operations across a 12-channel portfolio', app: 'files', route: 'faceless', keywords: 'youtube teams asana operations distributed creative case study turnaround 395k 107k' },
    { title: 'Faceless Freedom slides', description: 'Explore the channel-turnaround case study', app: 'photos', route: 'faceless', keywords: 'youtube operations case study turnaround slides 395k 107k' },
    { title: 'Resume', description: 'Read or download my professional resume', app: 'safari', route: 'resume', keywords: 'cv experience pdf qualifications education' },
    { title: 'Release decisions', description: 'Scope control and payment readiness at Trimly', app: 'files', route: 'trimly/decisions', keywords: 'risks payment retries scope launch decisions' },
    { title: 'Trimly delivery documents', description: 'Preview and download the PDF, Word record and Excel workbook', app: 'files', route: 'trimly/documents', keywords: 'original artifacts documents evidence word pdf xlsx excel delivery record' },
    { title: 'Trimly delivery workbook', description: 'Explore all 11 project worksheets', app: 'files', route: 'trimly/workbook', keywords: 'jira timeline transitions risks register decisions launch outcomes board excel' },
];
function element(id) {
    const found = document.getElementById(id);
    if (!found)
        throw new Error(`Missing interface element: ${id}`);
    return found;
}
function isAppId(value) { return apps.some((app) => app.id === value); }
function safeRead(key) { try {
    return localStorage.getItem(key);
}
catch {
    return null;
} }
function safeWrite(key, value) { try {
    localStorage.setItem(key, value);
}
catch { /* The portfolio still works without storage. */ } }
const screen = element('screen');
const homeScreen = element('home-screen');
const lockScreen = element('lock-screen');
const appWindow = element('app-window');
const appHost = element('app-host');
const homeIndicator = element('home-indicator');
const spotlight = element('spotlight-overlay');
const spotlightInput = element('spotlight-input');
const controlPanel = element('controls-overlay');
let locked = true;
let activeApp = null;
let currentOverlay = null;
let theme = safeRead('precious-portfolio-theme') === 'dark' ? 'dark' : 'light';
let reducedMotion = safeRead('precious-portfolio-motion') === 'true' || (safeRead('precious-portfolio-motion') === null && matchMedia('(prefers-reduced-motion: reduce)').matches);
let transition = null;
let viewGeneration = 0;
let toastTimer;
let previousFocus = null;
let launchOrigin = null;
function fill(id, markup) { element(id).innerHTML = markup; }
function appButton(app, inDock = false) {
    return `<button class="app-button${inDock ? ' dock-app' : ''}" type="button" data-open="${app.id}" aria-label="${app.name}: ${app.subtitle}" title="${app.subtitle}"><span class="app-icon" aria-hidden="true">${appIcon(app.id)}</span><span class="app-label">${app.name}</span></button>`;
}
fill('app-grid', apps.slice(0, 8).map((app) => appButton(app)).join(''));
fill('dock', apps.slice(8).map((app) => appButton(app, true)).join(''));
fill('notification-icon', appIcon('files'));
fill('lock-status-icon', icon('lock', 18));
fill('lock-mail', icon('mail', 23));
fill('lock-files', icon('folder', 23));
fill('swipe-chevron', icon('chevron-up', 15));
fill('signal-icon', icon('signal', 17));
fill('wifi-icon', icon('wifi', 17));
fill('search-glyph', icon('search', 11));
fill('spotlight-search-icon', icon('search', 17));
fill('results-widget-icon', icon('heart', 13));
fill('notes-widget-icon', icon('file', 14));
function toast(message) {
    const node = element('phone-toast');
    if (toastTimer !== undefined)
        window.clearTimeout(toastTimer);
    node.textContent = message;
    node.classList.add('visible');
    toastTimer = window.setTimeout(() => node.classList.remove('visible'), 3600);
}
function setTheme(value) {
    theme = value;
    document.documentElement.dataset.theme = value;
    safeWrite('precious-portfolio-theme', value);
    const color = document.querySelector('meta[name="theme-color"]');
    if (color)
        color.content = value === 'dark' ? '#1b1b20' : '#f4f2ed';
    if (currentOverlay === 'controls')
        renderControls();
}
function setReducedMotion(value) {
    reducedMotion = value;
    document.documentElement.dataset.reducedMotion = String(value);
    safeWrite('precious-portfolio-motion', String(value));
    if (currentOverlay === 'controls')
        renderControls();
}
const context = {
    openApp,
    home: goHome,
    toast,
    getTheme: () => theme,
    setTheme,
    getReducedMotion: () => reducedMotion,
    setReducedMotion,
};
const controlCentre = createControlCentre(controlPanel, screen, context, lock, () => closeOverlay());
function updateClock() {
    const now = new Date();
    const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(now).replace(/\s?[AP]M/, '');
    element('lock-time').textContent = time;
    element('lock-time').setAttribute('aria-label', new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(now));
    element('lock-date').textContent = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now);
    element('status-time').textContent = locked ? 'Portfolio' : time;
}
function syncInert() {
    lockScreen.inert = !locked || currentOverlay !== null;
    homeScreen.inert = locked || activeApp !== null || currentOverlay !== null;
    appHost.inert = activeApp === null || currentOverlay !== null;
}
function closeOverlay(restoreFocus = true) {
    spotlight.hidden = true;
    controlPanel.hidden = true;
    screen.classList.remove('has-overlay', 'has-controls');
    currentOverlay = null;
    syncInert();
    if (restoreFocus && previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
    previousFocus = null;
}
function unlock(nextApp, route) {
    if (!locked) {
        if (nextApp)
            openApp(nextApp, route);
        return;
    }
    closeOverlay(false);
    locked = false;
    screen.dataset.state = 'home';
    lockScreen.style.removeProperty('--drag');
    fill('lock-status-icon', icon('unlock', 18));
    homeIndicator.setAttribute('aria-label', 'Return to Home Screen');
    syncInert();
    updateClock();
    // Announce the newly visible screen without preselecting a card after a swipe.
    homeScreen.focus({ preventScroll: true });
    if (nextApp)
        window.setTimeout(() => { if (!locked)
            openApp(nextApp, route); }, reducedMotion ? 0 : 340);
}
function lock() {
    closeOverlay(false);
    viewGeneration += 1;
    transition?.cancel();
    transition = null;
    locked = true;
    activeApp = null;
    appWindow.hidden = true;
    appHost.replaceChildren();
    screen.dataset.state = 'locked';
    appWindow.style.transformOrigin = '0 0';
    homeIndicator.setAttribute('aria-label', 'Unlock portfolio');
    fill('lock-status-icon', icon('lock', 18));
    syncInert();
    updateClock();
    element('unlock-button').focus({ preventScroll: true });
}
function findLaunchOrigin(app) {
    const button = homeScreen.querySelector(`.app-button[data-open="${app}"] .app-icon`);
    if (!button)
        return { x: screen.clientWidth / 2 - 32, y: screen.clientHeight / 2 - 32, width: 64, height: 64 };
    const rect = button.getBoundingClientRect();
    const screenRect = screen.getBoundingClientRect();
    const scale = screenRect.width / screen.clientWidth;
    return { x: (rect.left - screenRect.left) / scale, y: (rect.top - screenRect.top) / scale, width: rect.width / scale, height: rect.height / scale };
}
function iconTransform(origin) {
    return `translate(${origin.x}px, ${origin.y}px) scale(${origin.width / screen.clientWidth}, ${origin.height / screen.clientHeight})`;
}
function openApp(app, route) {
    if (locked) {
        unlock(app, route);
        return;
    }
    const wasActive = activeApp !== null;
    closeOverlay(false);
    viewGeneration += 1;
    transition?.cancel();
    activeApp = app;
    screen.dataset.state = 'app';
    appWindow.hidden = false;
    appWindow.setAttribute('aria-label', `${apps.find((item) => item.id === app)?.name ?? 'Portfolio'} application`);
    syncInert();
    mountApp(app, appHost, context, route);
    if (!wasActive) {
        launchOrigin = findLaunchOrigin(app);
        appWindow.style.transformOrigin = '0 0';
        transition = appWindow.animate([
            { transform: iconTransform(launchOrigin), opacity: 0, borderRadius: '90px', filter: 'blur(3px)' },
            { transform: 'translate(0, 0) scale(1)', opacity: 1, borderRadius: '0px', filter: 'blur(0)' },
        ], { duration: reducedMotion ? 0 : 430, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'none' });
    }
    const heading = appHost.querySelector('h1, h2');
    if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
    }
}
function goHome() {
    if (currentOverlay) {
        closeOverlay();
        return;
    }
    if (locked) {
        unlock();
        return;
    }
    if (activeApp === null)
        return;
    const lastApp = activeApp;
    const generation = ++viewGeneration;
    transition?.cancel();
    activeApp = null;
    screen.dataset.state = 'home';
    syncInert();
    launchOrigin = findLaunchOrigin(lastApp);
    appWindow.style.transformOrigin = '0 0';
    transition = appWindow.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1, borderRadius: '0px' },
        { transform: iconTransform(launchOrigin), opacity: 0, borderRadius: '90px' },
    ], { duration: reducedMotion ? 0 : 260, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'none' });
    void transition.finished.then(() => {
        if (generation !== viewGeneration)
            return;
        appWindow.hidden = true;
        appHost.replaceChildren();
        transition = null;
    }).catch(() => { });
    homeScreen.querySelector(`.app-button[data-open="${lastApp}"]`)?.focus({ preventScroll: true });
}
function renderSearch() {
    const query = spotlightInput.value.trim().toLowerCase();
    const matchingApps = apps.filter((app) => `${app.name} ${app.subtitle}`.toLowerCase().includes(query));
    const matchingItems = searchItems.filter((item) => `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(query));
    const appRows = matchingApps.slice(0, query ? 12 : 5).map((app) => `<button class="spotlight-result" type="button" data-search-open="${app.id}"><span class="app-icon">${appIcon(app.id)}</span><span><strong>${app.name}</strong><small>${app.subtitle}</small></span>${icon('chevron-right', 14)}</button>`).join('');
    const itemRows = matchingItems.map((item) => `<button class="spotlight-result" type="button" data-search-open="${item.app}" data-route="${item.route ?? ''}"><span class="app-icon">${appIcon(item.app)}</span><span><strong>${item.title}</strong><small>${item.description}</small></span>${icon('chevron-right', 14)}</button>`).join('');
    fill('spotlight-results', `${appRows ? `<p class="spotlight-section-label">Applications</p><div>${appRows}</div>` : ''}${itemRows ? `<p class="spotlight-section-label">${query ? 'In this portfolio' : 'Explore the work'}</p><div>${itemRows}</div>` : ''}${!appRows && !itemRows ? '<p class="spotlight-empty">No matches yet. Try “Trimly”, “resume”, “tools”, or “delivery”.</p>' : ''}`);
}
function showSpotlight() {
    if (locked)
        return;
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    currentOverlay = 'spotlight';
    screen.classList.remove('has-controls');
    spotlight.hidden = false;
    controlPanel.hidden = true;
    screen.classList.add('has-overlay');
    syncInert();
    spotlightInput.value = '';
    renderSearch();
    spotlightInput.focus({ preventScroll: true });
}
function renderControls() {
    controlCentre.update();
}
function showControls() {
    if (currentOverlay === 'controls') {
        closeOverlay();
        return;
    }
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    currentOverlay = 'controls';
    spotlight.hidden = true;
    controlPanel.hidden = false;
    screen.classList.add('has-overlay', 'has-controls');
    renderControls();
    syncInert();
    element('control-close').focus({ preventScroll: true });
}
document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element))
        return;
    const open = event.target.closest('[data-open]');
    if (open && isAppId(open.dataset.open))
        openApp(open.dataset.open);
    const shortcut = event.target.closest('[data-lock-open]');
    if (shortcut && isAppId(shortcut.dataset.lockOpen))
        unlock(shortcut.dataset.lockOpen);
    const result = event.target.closest('[data-search-open]');
    if (result && isAppId(result.dataset.searchOpen))
        openApp(result.dataset.searchOpen, result.dataset.route || undefined);
});
// Move the specular highlight with a pointer; no device permissions or sensors.
screen.addEventListener('pointermove', (event) => {
    if (reducedMotion || event.pointerType === 'touch' || !(event.target instanceof Element))
        return;
    const material = event.target.closest('.glass, .widget, .notes-widget, .app-icon');
    if (!material)
        return;
    const bounds = material.getBoundingClientRect();
    material.style.setProperty('--light-x', `${Math.round((event.clientX - bounds.left) / bounds.width * 100)}%`);
    material.style.setProperty('--light-y', `${Math.round((event.clientY - bounds.top) / bounds.height * 100)}%`);
}, { passive: true });
element('unlock-button').addEventListener('click', () => unlock());
element('spotlight-button').addEventListener('click', showSpotlight);
spotlightInput.addEventListener('input', renderSearch);
element('spotlight-cancel').addEventListener('click', () => closeOverlay());
element('control-button').addEventListener('click', () => {
    if (suppressControlClick) {
        suppressControlClick = false;
        return;
    }
    showControls();
});
let controlStart = null;
let suppressControlClick = false;
element('control-button').addEventListener('pointerdown', (event) => {
    controlStart = event.clientY;
    element('control-button').setPointerCapture(event.pointerId);
});
element('control-button').addEventListener('pointerup', (event) => {
    if (controlStart !== null && event.clientY - controlStart > 30) {
        suppressControlClick = true;
        showControls();
    }
    controlStart = null;
});
element('control-button').addEventListener('pointercancel', () => { controlStart = null; });
let unlockGesture = null;
lockScreen.addEventListener('pointerdown', (event) => {
    if (!locked || currentOverlay || event.button !== 0 || (event.target instanceof Element && event.target.closest('button,a')))
        return;
    unlockGesture = { pointerId: event.pointerId, startY: event.clientY, startX: event.clientX, started: performance.now(), distance: 0 };
    lockScreen.setPointerCapture(event.pointerId);
});
lockScreen.addEventListener('pointermove', (event) => {
    if (!unlockGesture || unlockGesture.pointerId !== event.pointerId)
        return;
    const scale = screen.getBoundingClientRect().width / screen.clientWidth;
    const delta = Math.max(0, (unlockGesture.startY - event.clientY) / scale);
    unlockGesture.distance = delta;
    if (delta < 3)
        return;
    lockScreen.classList.add('dragging');
    lockScreen.style.setProperty('--drag', `${-Math.min(delta, screen.clientHeight * .72)}px`);
});
function finishUnlockGesture(event) {
    if (!unlockGesture || unlockGesture.pointerId !== event.pointerId)
        return;
    const distance = unlockGesture.distance;
    const elapsed = performance.now() - unlockGesture.started;
    const cancelled = event.type === 'pointercancel';
    unlockGesture = null;
    lockScreen.classList.remove('dragging');
    lockScreen.style.removeProperty('--drag');
    if (lockScreen.hasPointerCapture(event.pointerId))
        lockScreen.releasePointerCapture(event.pointerId);
    if (!cancelled && (distance > 75 || (distance > 35 && elapsed < 240)))
        unlock();
}
lockScreen.addEventListener('pointerup', finishUnlockGesture);
lockScreen.addEventListener('pointercancel', finishUnlockGesture);
lockScreen.addEventListener('wheel', (event) => {
    if (!locked || currentOverlay)
        return;
    if (event.deltaY > 28) {
        event.preventDefault();
        unlock();
    }
}, { passive: false });
let homeStart = null;
let suppressHomeClick = false;
homeIndicator.addEventListener('pointerdown', (event) => { homeStart = event.clientY; homeIndicator.setPointerCapture(event.pointerId); });
homeIndicator.addEventListener('pointerup', (event) => {
    if (homeStart !== null && homeStart - event.clientY > 25) {
        suppressHomeClick = true;
        goHome();
    }
    homeStart = null;
});
homeIndicator.addEventListener('pointercancel', () => { homeStart = null; });
homeIndicator.addEventListener('click', () => { if (suppressHomeClick) {
    suppressHomeClick = false;
    return;
} goHome(); });
document.addEventListener('keydown', (event) => {
    const editing = event.target instanceof HTMLElement && Boolean(event.target.closest('input,textarea,select,[contenteditable=true]'));
    if (event.key === 'Escape') {
        event.preventDefault();
        goHome();
        return;
    }
    if (locked && !currentOverlay && !editing && event.key === 'ArrowUp') {
        event.preventDefault();
        unlock();
        return;
    }
    if (locked && event.target === lockScreen && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        unlock();
        return;
    }
    if (!locked && !editing && (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'))) {
        event.preventDefault();
        showSpotlight();
        return;
    }
    if (event.key === 'Tab' && currentOverlay) {
        const overlay = currentOverlay === 'spotlight' ? spotlight : controlPanel;
        const focusable = Array.from(overlay.querySelectorAll('button:not([disabled]),a[href],input,select,textarea,[tabindex="0"]')).filter((node) => !node.hidden);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first && last) {
            event.preventDefault();
            last.focus();
        }
        else if (!event.shiftKey && document.activeElement === last && first) {
            event.preventDefault();
            first.focus();
        }
    }
});
setTheme(theme);
document.documentElement.dataset.reducedMotion = String(reducedMotion);
syncInert();
updateClock();
window.setInterval(updateClock, 15000);
document.addEventListener('visibilitychange', () => { if (!document.hidden)
    updateClock(); });
// Each fresh visit always starts at the lock screen. Only display preferences
// and the explicitly labelled example checklist persist on this device.
