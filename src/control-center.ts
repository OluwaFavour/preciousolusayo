import { icon } from './icons.js';
import type { AppContext } from './types.js';

/** Working portfolio controls, using Apple's compact glass control geometry. */
export function createControlCentre(host: HTMLElement, screen: HTMLElement, context: AppContext, lock: () => void, close: () => void): { update: () => void } {
  let notifications = true;
  let brightness = 75;
  const supportsFullscreen = document.fullscreenEnabled && typeof document.documentElement.requestFullscreen === 'function';
  const control = (id: string, label: string, glyph: string, action: string): string => `<button class="cc-circle cc-material cc-${id}" type="button" data-cc-action="${action}" aria-label="${label}" title="${label}">${icon(glyph)}</button>`;

  host.innerHTML = `
    <div class="cc-header"><span class="cc-heading">Control Centre</span><button class="cc-top-button" id="control-close" type="button" data-cc-action="close" aria-label="Close Control Centre" title="Close Control Centre">${icon('close')}</button></div>
    <div class="cc-status" aria-hidden="true"><span class="cc-connectivity-status">${icon('signal')}${icon('wifi')}</span><span class="cc-battery-status">100%<span class="battery-indicator"><span></span></span></span></div>
    <div class="cc-grid">
      <button class="cc-pill cc-material cc-appearance" type="button" data-cc-action="theme" aria-label="Dark appearance" aria-pressed="false" title="Appearance">${icon('circle-half')}<span class="cc-pill-label"><strong>Appearance</strong><small id="cc-appearance-state">Light</small></span></button>
      ${control('motion', 'Reduce motion', 'accessibility', 'motion')}
      <label class="cc-slider cc-material cc-brightness" style="--level:75%" title="Brightness"><span class="cc-slider-fill"></span><span class="cc-slider-icon">${icon('sun')}</span><input class="cc-range" id="cc-brightness" type="range" min="20" max="100" value="75" step="1" aria-label="Brightness" aria-orientation="vertical" /></label>
      <button class="cc-pill cc-material cc-welcome" type="button" data-cc-action="notifications" aria-label="Welcome notification" aria-pressed="true" title="Welcome notification">${icon('bell')}<span class="cc-pill-label"><strong>Welcome notification</strong><small id="cc-welcome-state">Shown</small></span></button>
      <button class="cc-pill cc-material cc-files" type="button" data-cc-action="files" aria-label="Files" title="Files">${icon('folder')}<span class="cc-pill-label"><strong>Files</strong></span></button>
      ${control('photos', 'Photos', 'photo', 'photos')}
      ${control('lock', 'Lock portfolio', 'lock', 'lock')}
      ${supportsFullscreen ? `<button class="cc-pill cc-material cc-fullscreen" type="button" data-cc-action="fullscreen" aria-label="Enter full screen" aria-pressed="false" title="Enter full screen">${icon('expand')}<span class="cc-pill-label"><strong id="cc-fullscreen-label">Full screen</strong></span></button>` : ''}
    </div>
    <button class="cc-dismiss" type="button" data-cc-action="close" aria-label="Close Control Centre" tabindex="-1"></button>`;

  const find = <T extends HTMLElement>(selector: string): T => {
    const node = host.querySelector<T>(selector);
    if (!node) throw new Error(`Missing Control Centre element: ${selector}`);
    return node;
  };

  function update(): void {
    const dark = context.getTheme() === 'dark';
    const motion = context.getReducedMotion();
    find('.cc-appearance').setAttribute('aria-pressed', String(dark));
    find('.cc-appearance').title = dark ? 'Switch to light appearance' : 'Switch to dark appearance';
    find('#cc-appearance-state').textContent = dark ? 'Dark' : 'Light';
    find('.cc-motion').setAttribute('aria-pressed', String(motion));
    find('.cc-motion').title = `Reduce motion: ${motion ? 'On' : 'Off'}`;
    find('.cc-welcome').setAttribute('aria-pressed', String(notifications));
    find('.cc-welcome').title = notifications ? 'Hide welcome notification' : 'Show welcome notification';
    find('#cc-welcome-state').textContent = notifications ? 'Shown' : 'Hidden';
    screen.classList.toggle('quiet-welcome', !notifications);
    screen.style.setProperty('--display-brightness', String(.25 + brightness / 100));
    find('.cc-brightness').style.setProperty('--level', `${brightness}%`);
    find<HTMLInputElement>('#cc-brightness').setAttribute('aria-valuetext', `${brightness}%`);
    const fullscreenButton = host.querySelector<HTMLButtonElement>('.cc-fullscreen');
    if (fullscreenButton) {
      const fullscreen = Boolean(document.fullscreenElement);
      fullscreenButton.setAttribute('aria-pressed', String(fullscreen));
      fullscreenButton.setAttribute('aria-label', fullscreen ? 'Exit full screen' : 'Enter full screen');
      fullscreenButton.title = fullscreen ? 'Exit full screen' : 'Enter full screen';
      find('#cc-fullscreen-label').textContent = fullscreen ? 'Exit full screen' : 'Full screen';
    }
  }

  find<HTMLInputElement>('#cc-brightness').addEventListener('input', (event: Event): void => {
    brightness = Number((event.currentTarget as HTMLInputElement).value);
    update();
  });

  host.addEventListener('click', (event: MouseEvent): void => {
    if (event.target === host) { close(); return; }
    if (!(event.target instanceof Element)) return;
    const action = event.target.closest<HTMLElement>('[data-cc-action]')?.dataset.ccAction;
    if (!action) return;
    switch (action) {
      case 'close': close(); break;
      case 'lock': lock(); break;
      case 'theme': context.setTheme(context.getTheme() === 'light' ? 'dark' : 'light'); break;
      case 'motion': context.setReducedMotion(!context.getReducedMotion()); break;
      case 'notifications': notifications = !notifications; break;
      case 'files': case 'photos': context.openApp(action); break;
      case 'fullscreen':
        if (document.fullscreenElement) void document.exitFullscreen().catch(() => context.toast('Use your browser to exit full screen.'));
        else if (supportsFullscreen) void document.documentElement.requestFullscreen().catch(() => context.toast('Full screen is unavailable in this browser.'));
        break;
    }
    update();
  });
  document.addEventListener('fullscreenchange', update);

  let swipeStart: number | null = null;
  host.addEventListener('pointerdown', (event: PointerEvent): void => {
    if (event.target instanceof Element && event.target.closest('button:not(.cc-dismiss),input,label')) return;
    swipeStart = event.clientY;
  });
  host.addEventListener('pointerup', (event: PointerEvent): void => {
    if (swipeStart !== null && swipeStart - event.clientY > 60) close();
    swipeStart = null;
  });
  host.addEventListener('pointercancel', (): void => { swipeStart = null; });
  update();
  return { update };
}
