import { icon } from './icons.js';
const assets = '/assets/trimly-documents';
const recordPdf = `${assets}/delivery-record.pdf`;
const documents = [
    { id: 'record-pdf', title: 'Project Delivery Record', extension: 'PDF', detail: '9 pages · 243 KB', path: recordPdf, download: 'Precious_Olusayo_Trimly_Project_Delivery_Record.pdf', color: '#e64b4b' },
    { id: 'workbook', title: 'Delivery Workbook', extension: 'XLSX', detail: '11 worksheets · 35 KB', path: `${assets}/delivery-workbook.xlsx`, download: 'Precious_Olusayo_Trimly_Delivery_Workbook.xlsx', color: '#1c905a' },
    { id: 'record-word', title: 'Project Delivery Record', extension: 'DOCX', detail: 'Word document · 49 KB', path: `${assets}/delivery-record.docx`, download: 'Precious_Olusayo_Trimly_Project_Delivery_Record.docx', color: '#2875d2' },
];
function escape(value) {
    return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] ?? character));
}
function documentIcon(extension, color) {
    return `<span class="td-file-icon" style="--file-color:${color}">${icon('file', 29)}<small>${extension}</small></span>`;
}
function backButton(label) {
    return `<button type="button" class="p-back" data-document-back>${icon('chevron-left', 23)}<span>${label}</span></button>`;
}
function downloadLink(document, compact = false) {
    return `<a class="${compact ? 'p-nav-icon' : 'td-download'}" href="${document.path}" download="${document.download}" aria-label="Download ${document.title} ${document.extension}">${icon('download', 21)}${compact ? '' : `<span>Download ${document.extension}</span>`}</a>`;
}
/** The shared project documents remain local to the exported, static website. */
export function renderTrimlyDocuments(host, route, browse, caseStudy) {
    const document = documents.find((item) => item.id === route);
    const folder = () => renderTrimlyDocuments(host, undefined, browse, caseStudy);
    if (document) {
        if (document.id === 'workbook')
            renderWorkbook(host, document, folder);
        else
            renderRecord(host, document, folder);
        return;
    }
    host.innerHTML = `<section class="p-app p-files td-folder"><header class="p-nav">${backButton('Browse')}<span class="p-nav-title">Trimly</span><span class="p-nav-spacer"></span></header><div class="p-scroll"><div class="td-folder-heading"><span class="td-folder-mark">${icon('folder', 35)}</span><h1 class="p-large-title">Trimly</h1><p class="p-title-subtitle">The case study and the work behind the launch.</p></div><div class="p-section-heading"><h2>Project files</h2><span>4 items</span></div><div class="p-list td-file-list"><button type="button" class="p-list-row" data-open-case>${documentIcon('CASE', '#197d78')}<span class="p-row-copy"><strong>Trimly case study</strong><small>Decisions, timeline and outcomes</small><span class="p-row-date">Interactive case study · PDF included</span></span>${icon('chevron-right', 17)}</button>${documents.map((item) => `<button type="button" class="p-list-row" data-trimly-document="${item.id}">${documentIcon(item.extension, item.color)}<span class="p-row-copy"><strong>${item.title}</strong><small>${item.extension} · ${item.detail}</small><span class="p-row-date">Preview and download</span></span>${icon('chevron-right', 17)}</button>`).join('')}</div><div class="td-folder-note"><h2>Inside the delivery workbook</h2><p>Timeline, issue register, transitions, decisions, risks, launch readiness and outcomes, with the source index and record notes.</p></div><p class="p-footnote">October 2026 review edition, compiled from my project account. Includes selected issue records and reported outcomes; budget amounts are omitted.</p></div></section>`;
    host.querySelector('[data-document-back]')?.addEventListener('click', browse);
    host.querySelector('[data-open-case]')?.addEventListener('click', caseStudy);
    host.querySelectorAll('[data-trimly-document]').forEach((button) => button.addEventListener('click', () => renderTrimlyDocuments(host, button.dataset.trimlyDocument, browse, caseStudy)));
}
function renderRecord(host, document, folder) {
    let page = 1;
    let zoomed = false;
    host.innerHTML = `<section class="p-app td-reader"><header class="p-nav">${backButton('Trimly')}<span class="p-nav-title">Delivery record</span>${downloadLink(document, true)}</header><div class="td-reader-body"><div class="td-document-heading"><div><strong>Project Delivery Record</strong><small>${document.extension === 'DOCX' ? 'Word document · PDF preview of the same record' : 'PDF document · 9 pages'}</small></div>${downloadLink(document)}</div><div class="td-page-stage" tabindex="0" aria-label="Delivery record page preview"><div class="td-page-canvas"><img id="td-record-page" src="${assets}/delivery-record-page-1.webp" alt="Trimly Project Delivery Record, page 1 of 9" decoding="async"></div></div><footer class="td-preview-controls"><button type="button" data-page-previous aria-label="Previous page" disabled>${icon('chevron-left', 23)}</button><label class="td-page-picker"><span class="td-sr-only">Page</span><select aria-label="Preview page">${Array.from({ length: 9 }, (_, index) => `<option value="${index + 1}">Page ${index + 1} of 9</option>`).join('')}</select></label><button type="button" data-page-next aria-label="Next page">${icon('chevron-right', 23)}</button><button type="button" data-page-zoom aria-label="Zoom in on page" aria-pressed="false">${icon('search', 21)}</button><a href="${recordPdf}#page=1" target="_blank" rel="noopener" data-open-pdf aria-label="Open delivery record PDF in a new tab">${icon('arrow-up-right', 21)}</a></footer></div></section>`;
    const stage = host.querySelector('.td-page-stage');
    const image = host.querySelector('#td-record-page');
    const select = host.querySelector('.td-page-picker select');
    const previous = host.querySelector('[data-page-previous]');
    const next = host.querySelector('[data-page-next]');
    const zoom = host.querySelector('[data-page-zoom]');
    const open = host.querySelector('[data-open-pdf]');
    function update() {
        if (image) {
            image.src = `${assets}/delivery-record-page-${page}.webp`;
            image.alt = `Trimly Project Delivery Record, page ${page} of 9`;
        }
        if (select)
            select.value = String(page);
        if (previous)
            previous.disabled = page === 1;
        if (next)
            next.disabled = page === 9;
        if (open)
            open.href = `${recordPdf}#page=${page}`;
        if (stage) {
            stage.scrollTop = 0;
            stage.scrollLeft = 0;
        }
    }
    host.querySelector('[data-document-back]')?.addEventListener('click', folder);
    previous?.addEventListener('click', () => { page = Math.max(1, page - 1); update(); });
    next?.addEventListener('click', () => { page = Math.min(9, page + 1); update(); });
    select?.addEventListener('change', () => { page = Number(select.value); update(); });
    zoom?.addEventListener('click', () => {
        zoomed = !zoomed;
        stage?.classList.toggle('is-zoomed', zoomed);
        zoom.setAttribute('aria-pressed', String(zoomed));
        zoom.setAttribute('aria-label', zoomed ? 'Fit page to screen' : 'Zoom in on page');
    });
}
let workbookCache = null;
function loadWorkbook() {
    if (!workbookCache)
        workbookCache = fetch(`${assets}/workbook-preview.json`).then(async (response) => {
            if (!response.ok)
                throw new Error('Workbook preview unavailable');
            return await response.json();
        }).catch((error) => { workbookCache = null; throw error; });
    return workbookCache;
}
function columnName(index) {
    let value = index + 1;
    let name = '';
    while (value > 0) {
        value -= 1;
        name = String.fromCharCode(65 + value % 26) + name;
        value = Math.floor(value / 26);
    }
    return name;
}
function cellStyle(style) {
    if (!style)
        return '';
    const safeColor = (value) => value && /^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(value) ? value : '';
    const rules = [];
    if (safeColor(style.background))
        rules.push(`background:${style.background}`);
    if (safeColor(style.color))
        rules.push(`color:${style.color}`);
    if (style.bold)
        rules.push('font-weight:650');
    if (style.fontSize)
        rules.push(`font-size:${Math.min(22, Math.max(11, style.fontSize))}px`);
    if (style.align && ['left', 'center', 'right'].includes(style.align))
        rules.push(`text-align:${style.align}`);
    return rules.length ? ` style="${rules.join(';')}"` : '';
}
function sheetMarkup(sheet) {
    const columnCount = Math.max(sheet.columnWidths.length, ...sheet.rows.map((row) => row.length));
    const covered = new Set();
    const merged = new Map();
    for (const merge of sheet.merges) {
        merged.set(`${merge.row}:${merge.column}`, merge);
        for (let r = merge.row; r < merge.row + merge.rowSpan; r += 1)
            for (let c = merge.column; c < merge.column + merge.colSpan; c += 1) {
                if (r !== merge.row || c !== merge.column)
                    covered.add(`${r}:${c}`);
            }
    }
    return `<table class="td-worksheet"><caption class="td-sr-only">${escape(sheet.name)} worksheet</caption><colgroup><col style="width:38px">${Array.from({ length: columnCount }, (_, c) => `<col style="width:${Math.max(64, Math.min(480, sheet.columnWidths[c] ?? 170))}px">`).join('')}</colgroup><thead><tr><th aria-label="Row number"></th>${Array.from({ length: columnCount }, (_, c) => `<th scope="col">${columnName(c)}</th>`).join('')}</tr></thead><tbody>${sheet.rows.map((row, r) => `<tr style="height:${Math.max(28, sheet.rowHeights[r] ?? 32)}px"><th scope="row">${r + 1}</th>${Array.from({ length: columnCount }, (_, c) => {
        const key = `${r}:${c}`;
        if (covered.has(key))
            return '';
        const merge = merged.get(key);
        return `<td${merge ? ` rowspan="${merge.rowSpan}" colspan="${merge.colSpan}"` : ''}${cellStyle(sheet.styles?.[key])}>${escape(String(row[c] ?? ''))}</td>`;
    }).join('')}</tr>`).join('')}</tbody></table>`;
}
function renderWorkbook(host, document, folder) {
    host.innerHTML = `<section class="p-app td-reader td-workbook"><header class="p-nav">${backButton('Trimly')}<span class="p-nav-title">Delivery workbook</span>${downloadLink(document, true)}</header><div class="td-reader-body"><div class="td-document-heading"><div><strong>Delivery Workbook</strong><small>Excel workbook · 11 worksheets</small></div>${downloadLink(document)}</div><div class="td-workbook-content"><p class="td-loading" role="status">Opening workbook…</p></div></div></section>`;
    host.querySelector('[data-document-back]')?.addEventListener('click', folder);
    const content = host.querySelector('.td-workbook-content');
    if (!content)
        return;
    function showError() {
        if (!host.contains(content))
            return;
        content.innerHTML = `<div class="td-preview-error"><p>The preview couldn’t load.</p><button type="button" data-retry-workbook>Try again</button><p>You can still download the complete Excel file above.</p></div>`;
        content.querySelector('[data-retry-workbook]')?.addEventListener('click', () => renderWorkbook(host, document, folder));
    }
    void loadWorkbook().then((workbook) => {
        if (!host.contains(content))
            return;
        let selected = 0;
        content.innerHTML = `<label class="td-sheet-picker"><span>Worksheet</span><select aria-label="Choose worksheet">${workbook.sheets.map((sheet, index) => `<option value="${index}">${escape(sheet.name)}</option>`).join('')}</select><span class="td-sheet-count">1 / ${workbook.sheets.length}</span></label><span class="td-sr-only" role="status" data-sheet-status></span><div class="td-sheet-stage" tabindex="0" aria-label="Scrollable workbook preview"></div><p class="td-sheet-note">Scroll across to view every column. Download the Excel file to work with the original workbook.</p>`;
        const stage = content.querySelector('.td-sheet-stage');
        const picker = content.querySelector('.td-sheet-picker select');
        function showSheet() {
            const sheet = workbook.sheets[selected];
            if (!sheet || !stage)
                return;
            stage.innerHTML = sheetMarkup(sheet);
            stage.scrollTop = 0;
            stage.scrollLeft = 0;
            const counter = content.querySelector('.td-sheet-count');
            if (counter)
                counter.textContent = `${selected + 1} / ${workbook.sheets.length}`;
            const status = content.querySelector('[data-sheet-status]');
            if (status)
                status.textContent = `${sheet.name}, worksheet ${selected + 1} of ${workbook.sheets.length}`;
        }
        picker?.addEventListener('change', () => { selected = Number(picker.value); showSheet(); });
        showSheet();
    }).catch(showError);
}
