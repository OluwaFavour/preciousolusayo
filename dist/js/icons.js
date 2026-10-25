/** Small interface glyphs, drawn on a consistent 24-point grid. */
const glyphs = {
    'chevron-left': '<path d="m15 5-7 7 7 7"/>',
    'chevron-right': '<path d="m9 5 7 7-7 7"/>',
    'chevron-up': '<path d="m5 15 7-7 7 7"/>',
    'chevron-down': '<path d="m5 9 7 7 7-7"/>',
    'arrow-up': '<path d="M12 20V4m-7 7 7-7 7 7"/>',
    'arrow-up-right': '<path d="M6 18 18 6M6 6h12v12"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M5 16v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4"/>',
    share: '<path d="M12 15V2m-4 4 4-4 4 4M8 10H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1h-3"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    folder: '<path d="M3 7V5a1 1 0 0 1 1-1h5l3 3h8a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z"/>',
    file: '<path d="M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 13h8M8 17h6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    plus: '<path d="M12 4v16M4 12h16"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18M7 14h2m6 0h2m-10 3h2"/>',
    heart: '<path d="M20.4 5.7a5.2 5.2 0 0 0-7.4 0l-1 1-1-1a5.2 5.2 0 0 0-7.4 7.4L12 21l8.4-7.9a5.2 5.2 0 0 0 0-7.4Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    more: '<circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    sparkles: '<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Zm8-2v4m-2-2h4M3 18v4m-2-2h4"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    phone: '<path d="m7 3 3 5-2 2a16 16 0 0 0 6 6l2-2 5 3v3c0 1-1 2-2 2C9.6 21.3 2.7 14.4 2 5c0-1 1-2 2-2h3Z"/>',
    safari: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
    link: '<path d="m10 13 4-4m-6 7-2 2a4.2 4.2 0 0 1-6-6l4-4a4.2 4.2 0 0 1 6 0m4-1 2-2a4.2 4.2 0 0 1 6 6l-4 4a4.2 4.2 0 0 1-6 0" transform="translate(1 1) scale(.92)"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12a21 21 0 0 0 18 0M12 11v5"/>',
    settings: '<path d="m10 3-.5 2.1-2 .9-1.9-.6L3.5 9l1.5 1.5v3L3.5 15l2.1 3.6 1.9-.6 2 .9.5 2.1h4l.5-2.1 2-.9 1.9.6 2.1-3.6-1.5-1.5v-3L20.5 9l-2.1-3.6-1.9.6-2-.9L14 3h-4Z"/><circle cx="12" cy="12" r="3.5"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
    unlock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 7.5-2M12 14v3"/>',
    moon: '<path d="M20.7 13.7A9 9 0 0 1 10.3 3.3 9 9 0 1 0 20.7 13.7Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM9.5 21h5"/>',
    flashlight: '<path d="M7 3h10v5l-3 4v9h-4v-9L7 8V3ZM7 7h10M11 15h2"/>',
    camera: '<path d="M8 5 6 8H3v12h18V8h-3l-2-3H8Z"/><circle cx="12" cy="13" r="3.5"/><path d="M18 10h.01"/>',
    photo: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.3" cy="8.3" r="1.6" fill="currentColor" stroke="none"/><path d="m4 17 4.5-4.5 3.3 3.3 3.7-5.1L21 17"/>',
    battery: '<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M23 10v4"/><rect x="4" y="9" width="13" height="6" rx=".8" fill="currentColor" stroke="none"/>',
    wifi: '<g fill="currentColor" stroke="none"><path d="M1.2 7.1a16 16 0 0 1 21.6 0 .55.55 0 0 1 .02.8l-1.7 1.7a.54.54 0 0 1-.74.02 12.5 12.5 0 0 0-16.76 0 .54.54 0 0 1-.74-.02l-1.7-1.7a.55.55 0 0 1 .02-.8Z"/><path d="M5.3 11.2a10 10 0 0 1 13.4 0 .55.55 0 0 1 .02.8l-1.7 1.7a.54.54 0 0 1-.74.02 6.5 6.5 0 0 0-8.56 0 .54.54 0 0 1-.74-.02l-1.7-1.7a.55.55 0 0 1 .02-.8Z"/><path d="M9.25 15.2a4.2 4.2 0 0 1 5.5 0 .5.5 0 0 1 .02.75l-2.4 2.4a.53.53 0 0 1-.74 0l-2.4-2.4a.5.5 0 0 1 .02-.75Z"/></g>',
    signal: '<g fill="currentColor" stroke="none"><rect x="1" y="13" width="4" height="5.8" rx=".65"/><rect x="7" y="10.8" width="4" height="8" rx=".65"/><rect x="13" y="8" width="4" height="10.8" rx=".65"/><rect x="19" y="5.2" width="4" height="13.6" rx=".65"/></g>',
    globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    sliders: '<path d="M4 7h7m6 0h3M4 17h3m6 0h7"/><circle cx="14" cy="7" r="3"/><circle cx="10" cy="17" r="3"/>',
    volume: '<path d="m11 4-6 5H2v6h3l6 5V4Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
    bluetooth: '<path d="m7 7 10 10-5 5V2l5 5L7 17"/>',
    airplane: '<path d="M12 2c-1 0-1.7 1-1.7 2v5.1L3 14v2l7.3-2.5v5.2L8 20.5V22l4-1 4 1v-1.5l-2.3-1.8v-5.2L21 16v-2l-7.3-4.9V4c0-1-.7-2-1.7-2Z" fill="currentColor" stroke="none"/>',
    cellular: '<g fill="currentColor" stroke="none"><rect x="1" y="13" width="4" height="5.8" rx=".65"/><rect x="7" y="10.8" width="4" height="8" rx=".65"/><rect x="13" y="8" width="4" height="10.8" rx=".65"/><rect x="19" y="5.2" width="4" height="13.6" rx=".65"/></g>',
    music: '<path d="M9 18V5l12-3v13M9 9l12-3"/><ellipse cx="5.5" cy="18.5" rx="3.5" ry="2.5" fill="currentColor" stroke="none"/><ellipse cx="17.5" cy="15.5" rx="3.5" ry="2.5" fill="currentColor" stroke="none"/>',
    play: '<path d="m6 3 15 9-15 9V3Z" fill="currentColor" stroke="none"/>',
    pause: '<rect x="5" y="3" width="5" height="18" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="3" width="5" height="18" rx="1" fill="currentColor" stroke="none"/>',
    'skip-forward': '<path d="m2 5 10 7-10 7V5Zm10 0 10 7-10 7V5Z" fill="currentColor" stroke="none"/>',
    'skip-back': '<path d="M22 5 12 12l10 7V5ZM12 5 2 12l10 7V5Z" fill="currentColor" stroke="none"/>',
    'screen-mirroring': '<rect x="2" y="3" width="15" height="12" rx="2"/><rect x="8" y="9" width="14" height="12" rx="2" fill="currentColor" fill-opacity=".13"/>',
    'orientation-lock': '<path d="M4.3 7.5a9 9 0 1 0 4.1-4M4 2v6h6"/><rect x="8" y="10" width="8" height="7" rx="1.5"/><path d="M10 10V8a2 2 0 0 1 4 0v2"/>',
    timer: '<circle cx="12" cy="14" r="8"/><path d="M12 6V2M9 2h6m3 5 2-2M12 10v4l3 2"/>',
    calculator: '<rect x="4" y="2" width="16" height="20" rx="3"/><path d="M8 6h8M8 11h1m6 0h1M8 15h1m6 0h1M8 19h1m6 0h1" stroke-width="2.4"/>',
    power: '<path d="M12 2v10M6 5.2a9 9 0 1 0 12 0"/>',
    qr: '<rect x="3" y="3" width="6" height="6" rx=".5"/><rect x="15" y="3" width="6" height="6" rx=".5"/><rect x="3" y="15" width="6" height="6" rx=".5"/><path d="M15 15h2v2h4v4h-4m-2-4v4M3 12h5m4-9v5m0 4h3m4 0h2m-9 5v4"/>',
    expand: '<path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6"/>',
    'volume-off': '<path d="m11 4-6 5H2v6h3l6 5V4Zm5 5 6 6m0-6-6 6"/>',
    airdrop: '<path d="M5.9 15.3a8.5 8.5 0 1 1 12.2 0M8.6 12.8a5 5 0 1 1 6.8 0"/><circle cx="12" cy="9" r="1.4" fill="currentColor" stroke="none"/><path d="m12 14 5 8H7l5-8Z" fill="currentColor" stroke="none"/>',
    airplay: '<path d="M7 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/><path d="m12 14 6 8H6l6-8Z" fill="currentColor" stroke="none"/>',
    hotspot: '<path d="m10.8 6.7 1.5-1.5a4.5 4.5 0 0 1 6.4 6.4l-3.5 3.5a4.5 4.5 0 0 1-6.4 0m4.4 2.2-1.5 1.5a4.5 4.5 0 0 1-6.4-6.4l3.5-3.5a4.5 4.5 0 0 1 6.4 0m-6 6 5.6-5.6"/>',
    satellite: '<g transform="rotate(-36 12 11)"><rect x="9" y="7" width="6" height="8" rx="1"/><path d="M12 7V3m-2 0h4M6 11h3m6 0h3"/><rect x="2" y="7" width="4" height="8" rx=".5"/><rect x="18" y="7" width="4" height="8" rx=".5"/></g><path d="M3 17a4 4 0 0 1 4 4M3 13a8 8 0 0 1 8 8"/>',
    'chevrons-up-down': '<path d="m8 8 4-4 4 4m-8 8 4 4 4-4"/>',
    'circle-half': '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18V3Z" fill="currentColor" stroke="none"/>',
    accessibility: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="7" r="1.6" fill="currentColor" stroke="none"/><path d="m6.7 10 5.3 1 5.3-1M12 11v3m0 0-3 4m3-4 3 4"/>',
};
export function icon(name, size = 24) {
    const dimension = Number.isFinite(size) && size > 0 ? size : 24;
    const body = glyphs[name] ?? '<circle cx="12" cy="12" r="9"/><path d="M12 8v5m0 3h.01"/>';
    const viewBox = name === 'wifi' ? '0 2 24 18' : name === 'signal' || name === 'cellular' ? '0 4 24 16' : '0 0 24 24';
    return `<svg class="icon" width="${dimension}" height="${dimension}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}
let artworkInstance = 0;
/**
 * Original vector artwork in the default coloured iOS appearance.
 * Familiar saturated bases and layered foregrounds are retained; glass is
 * expressed through restrained edge lighting and material depth, not Clear mode.
 * Reference: https://www.apple.com/v/os/g/images/shared/improvements/performance__dzd4tapk2suq_large.jpg
 */
export function appIcon(id) {
    const ns = `app-${id}-${++artworkInstance}`;
    const paint = (key) => `url(#${ns}-${key})`;
    const gradient = (key, from, to) => `<linearGradient id="${ns}-${key}" x1="0" y1="0" x2=".3" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`;
    let defs = gradient('white', '#fff', '#f5f6f8') + gradient('ivory', '#fff', '#e8f2f7');
    defs += `<linearGradient id="${ns}-rim" x1=".1" y1="0" x2=".9" y2="1"><stop stop-color="#fff" stop-opacity=".72"/><stop offset=".4" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity=".23"/></linearGradient><radialGradient id="${ns}-shine" cx=".1" cy="0" r=".9"><stop stop-color="#fff" stop-opacity=".16"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/></radialGradient><filter id="${ns}-lift" x="-20%" y="-20%" width="140%" height="145%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy=".8" stdDeviation=".7" flood-color="#14222f" flood-opacity=".15"/></filter>`;
    let base = paint('white');
    let body;
    switch (id) {
        case 'contacts': {
            defs += gradient('cover', '#d9d7d2', '#bfbdb7') + gradient('page', '#eeeae3', '#dcd8ce') + gradient('person', '#aaa59a', '#88877e');
            base = paint('cover');
            body = `<path d="M52 12h9v10h-9Z" fill="#e7a094"/><path d="M52 23h9v10h-9Z" fill="#a1bdca"/><path d="M52 34h9v10h-9Z" fill="#e3ca80"/><path d="M52 45h9v9h-9Z" fill="#a9b89b"/>
        <path d="M8 0h43a3 3 0 0 1 3 3v58a3 3 0 0 1-3 3H8Z" fill="${paint('page')}"/><path d="M9 0v64" stroke="#b3ada3" stroke-opacity=".35"/>
        <circle cx="31" cy="24" r="8.6" fill="${paint('person')}"/>
        <path d="M15 49.5c0-8.8 5.8-14.5 16-14.5s16 5.7 16 14.5V52H15Z" fill="${paint('person')}"/>
        <path d="M15 51.5h32" stroke="#fff" stroke-opacity=".44" stroke-width=".8"/>`;
            break;
        }
        case 'files': {
            defs += gradient('back', '#38beff', '#058fe9') + gradient('folder', '#27bbff', '#0878de');
            body = `<path d="M8 21a4 4 0 0 1 4-4h13l5 5h22a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4Z" fill="${paint('back')}"/>
        <path d="M12 25h40v23H12Z" fill="#c8eeff"/>
        <path d="M11 29h42a3 3 0 0 1 3 3v17a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V32a3 3 0 0 1 3-3Z" fill="${paint('folder')}"/>
        <path d="M12 29.7h40" stroke="#a2e5ff" stroke-opacity=".9" stroke-width="1.1"/><path d="M13 52h38" stroke="#016ad1" stroke-opacity=".28"/>`;
            break;
        }
        case 'health': {
            defs += gradient('heart', '#ff5777', '#fa2750');
            body = `<path d="M40.5 14c-5.6-7.6-16.5-3-16.5 4.8 0 7.5 10.6 13.8 16.5 18.4C46.4 32.6 57 26.3 57 18.8 57 11 46.1 6.4 40.5 14Z" fill="${paint('heart')}"/>
        <path d="M28.5 15.5c1.8-2.1 4.5-2.8 7.2-1.3" stroke="#ffa2b5" stroke-width="1" stroke-linecap="round" fill="none" opacity=".7"/>`;
            break;
        }
        case 'notes': {
            defs += gradient('yellow', '#ffe963', '#ffd126') + gradient('paper', '#fffefa', '#f4f3f0');
            base = paint('paper');
            body = `<path d="M0 0h64v18H0Z" fill="${paint('yellow')}"/>
        <path d="M0 18h64" stroke="#d7b947" stroke-opacity=".5"/>
        <path d="M0 29h64M0 40h64M0 51h64M0 62h64" stroke="#d4d2cd" stroke-width=".8"/>
        <path d="M0 20h64" stroke="#fff" opacity=".85"/>
        <path d="M3 16h58" stroke="#fff3ae" stroke-width=".8" stroke-dasharray="1 1.2"/>`;
            break;
        }
        case 'calendar': {
            const now = new Date();
            const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(now);
            const date = String(now.getDate());
            body = `<text x="32" y="18.2" text-anchor="middle" fill="#ff3c32" font-family="-apple-system,BlinkMacSystemFont,Arial,sans-serif" font-size="11.2" font-weight="600">${weekday}</text>
        <text x="31.4" y="53" text-anchor="middle" fill="#111113" font-family="-apple-system,BlinkMacSystemFont,Arial,sans-serif" font-size="38" font-weight="300" letter-spacing="-1.4">${date}</text>`;
            break;
        }
        case 'photos': {
            const colors = ['#ffbc0b', '#ff8225', '#ff4564', '#dc53aa', '#8273cc', '#30a2e4', '#35c1c4', '#a5cd29'];
            const petals = colors.map((color, index) => `<ellipse cx="32" cy="20.3" rx="8.5" ry="13.7" transform="rotate(${index * 45} 32 32)" fill="${color}" opacity=".85" style="mix-blend-mode:multiply"/><path d="M26.8 10.4c2.3-2.3 5.6-2.9 8.5-1.3" transform="rotate(${index * 45} 32 32)" fill="none" stroke="#fff" stroke-width=".55" opacity=".33"/>`).join('');
            body = petals;
            break;
        }
        case 'settings': {
            defs += gradient('ground', '#e2e3e7', '#afb1b8') + gradient('metal', '#f5f6f8', '#a5a8b0') + gradient('edge', '#f8faff', '#818792');
            defs += `<radialGradient id="${ns}-inner"><stop stop-color="#777d87"/><stop offset=".8" stop-color="#484e58"/><stop offset="1" stop-color="#30343e"/></radialGradient>`;
            base = paint('ground');
            const teeth = Array.from({ length: 96 }, (_, i) => {
                const r = i % 4 < 2 ? 26.4 : 24.2;
                const a = (i / 96) * Math.PI * 2;
                return `${(32 + Math.cos(a) * r).toFixed(2)},${(32 + Math.sin(a) * r).toFixed(2)}`;
            }).join(' ');
            const spokes = [0, 120, 240].map((angle) => `<path d="M28.5 29V13h7v16Z" fill="${paint('metal')}" transform="rotate(${angle} 32 32)"/>`).join('');
            body = `<polygon points="${teeth}" fill="${paint('edge')}" stroke="#8c929e" stroke-width=".5"/>
        <circle cx="32" cy="32" r="22" fill="${paint('inner')}" stroke="#f8f9fc" stroke-width="1.1"/>
        <circle cx="32" cy="32" r="18.7" fill="none" stroke="#d5d9e0" stroke-width="2.6"/>
        <circle cx="32" cy="32" r="15.8" fill="none" stroke="#9298a4" stroke-width=".7"/>
        ${spokes}<circle cx="32" cy="32" r="10" fill="${paint('metal')}" stroke="#f0f2f8" stroke-width=".7"/>
        <circle cx="32" cy="32" r="6.2" fill="${paint('inner')}" stroke="#848c9a" stroke-width=".7"/>
        <path d="M15 15a24 24 0 0 1 34 1" fill="none" stroke="#fff" stroke-width=".65" opacity=".62"/>`;
            break;
        }
        case 'reminders': {
            const rows = [[15, '#178cff'], [32, '#ff9e0e'], [49, '#ff4d43']];
            body = rows.map(([y, color]) => `<circle cx="14" cy="${y}" r="5" fill="${color}"/><circle cx="14" cy="${y}" r="3.6" fill="none" stroke="#fff" stroke-opacity=".44" stroke-width=".7"/><path d="M25 ${y - 2.5}h29M25 ${y + 3}h29" stroke="#bdbec3" stroke-width="1.15"/>`).join('');
            break;
        }
        case 'safari': {
            defs += gradient('blue', '#43d4ff', '#0066e5') + gradient('needle', '#ff6853', '#ed2840');
            const marks = Array.from({ length: 60 }, (_, i) => `<path d="M32 7.8v${i % 5 === 0 ? '4.0' : '1.8'}" transform="rotate(${i * 6} 32 32)" stroke="#ecfbff" stroke-width="${i % 5 === 0 ? '.85' : '.5'}" opacity="${i % 5 === 0 ? '1' : '.85'}"/>`).join('');
            body = `<circle cx="32" cy="32" r="27.5" fill="${paint('blue')}"/>
        <circle cx="32" cy="32" r="26.3" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".65"/>
        ${marks}<g transform="rotate(39 32 32)">
        <path d="M32.7 8.5 38.9 32.7 32.7 56.7 26.5 32.7Z" fill="#03458f" opacity=".24"/>
        <path d="M32 8.2 38 32H26Z" fill="${paint('needle')}"/>
        <path d="M32 55.8 26 32h12Z" fill="#fff"/>
        <path d="M32 8.2V32h6Z" fill="#d81d39" opacity=".3"/>
        <path d="M32 55.8V32h-6Z" fill="#dfe9f3"/>
        </g><circle cx="32" cy="32" r="1.8" fill="#f4f7fc"/>`;
            break;
        }
        case 'mail': {
            defs += gradient('blue', '#21b9ff', '#0778ed') + gradient('envelope', '#f7feff', '#c3e6ff');
            base = paint('blue');
            body = `<rect x="9.5" y="18" width="45" height="30" rx="4.2" fill="${paint('envelope')}"/>
        <path d="m10.7 46.4 16-13.3h10.6l16 13.3" fill="#e8f6ff"/>
        <path d="M11 19h42L34.8 33.4a4.5 4.5 0 0 1-5.6 0Z" fill="${paint('ivory')}"/>
        <path d="m11 19 18.2 14.4a4.5 4.5 0 0 0 5.6 0L53 19" fill="none" stroke="#b9def5" stroke-width=".6"/>
        <path d="M12 19h40" stroke="#fff" stroke-width=".8" opacity=".8"/>`;
            break;
        }
        case 'messages': {
            defs += gradient('green', '#62ed68', '#12cc39') + gradient('bubble', '#fff', '#d9f6df');
            base = paint('green');
            body = `<path d="M32 12.8C19.2 12.8 8.8 20.7 8.8 30.5c0 5.9 3.8 11.1 9.7 14.3-.9 3.1-2.8 5.3-5.1 6.7 5.3.2 9.6-1.3 12.9-3.7 1.8.4 3.7.7 5.7.7 12.8 0 23.2-8 23.2-18S44.8 12.8 32 12.8Z" fill="${paint('bubble')}" stroke="#fff" stroke-opacity=".55" stroke-width=".6"/>
        <path d="M15.1 21.7c4.2-4.9 13.1-8.3 22.5-6.4" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width=".7" stroke-linecap="round"/>`;
            break;
        }
        case 'phone': {
            defs += gradient('green', '#65ed71', '#18c948');
            base = paint('green');
            body = `<path d="M17.9 9.9c-1.1-.6-2.4-.4-3.3.4l-4 3.9c-1.6 1.6-1.4 4.2-.8 6.5C13.9 36.1 27.8 50.1 43.2 54c2.3.6 4.9.8 6.5-.8l4-4c.8-.9 1-2.2.4-3.3l-5.5-9.3c-.7-1.2-2.2-1.7-3.4-1.1l-5.5 2.7c-.7.4-1.5.3-2.2-.1a40.4 40.4 0 0 1-11.5-11.5c-.4-.7-.5-1.5-.1-2.2l2.7-5.5c.6-1.2.1-2.7-1.1-3.4Z" fill="${paint('ivory')}" stroke="#fff" stroke-opacity=".6" stroke-width=".45" transform="translate(2 1) scale(.93)"/>`;
            break;
        }
    }
    return `<svg class="app-art app-art-default" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false" style="display:block;border-radius:26.5%;overflow:hidden"><defs>${defs}<clipPath id="${ns}-clip"><rect width="64" height="64" rx="17"/></clipPath></defs><g clip-path="${paint('clip')}"><rect width="64" height="64" rx="17" fill="${base}"/><g filter="${paint('lift')}">${body}</g><rect x=".5" y=".5" width="63" height="63" rx="16.5" fill="${paint('shine')}" stroke="${paint('rim')}" stroke-width=".8"/></g></svg>`;
}
