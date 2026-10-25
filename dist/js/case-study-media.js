export const caseStudyMedia = [
    {
        id: 'trimly',
        name: 'Trimly',
        category: 'Project delivery',
        description: 'Scope, decisions, delivery and results.',
        coverAlt: 'Trimly case-study cover with barber tools',
        pdfPath: '/assets/trimly-case-study.pdf',
        downloadName: 'Precious_Olusayo_Trimly_Case_Study.pdf',
        pdfPages: 7,
        slides: [
            { page: 1, title: 'The project', caption: 'From manual bookings to a live service platform.' },
            { page: 3, title: 'My responsibilities', caption: 'Scope, coordination, delivery control, testing and launch readiness.' },
            { page: 4, title: 'Delivery timeline', caption: 'The route from scope approval to public launch and handover.' },
            { page: 5, title: 'Key decisions', caption: 'Protecting the web-first scope and making payment risk visible.' },
            { page: 6, title: 'Testing & release', caption: 'Test outcomes, readiness sign-off and founder authorization.' },
            { page: 7, title: 'Reported outcomes', caption: 'Product, payment and service results after launch.' },
        ],
    },
    {
        id: 'faceless',
        name: 'Faceless Freedom',
        category: 'Digital operations',
        description: 'Channel rebuilds, production workflow and delivery decisions.',
        coverAlt: 'Faceless Freedom case-study cover with a microphone and video production illustration',
        pdfPath: '/assets/faceless-freedom-case-study.pdf',
        downloadName: 'Precious_Olusayo_Faceless_Freedom_Case_Study.pdf',
        pdfPages: 8,
        slides: [
            { page: 1, title: 'The project', caption: 'Rebuilding channels through stronger production delivery.' },
            { page: 2, title: 'The mandate', caption: 'Improve performance and make production dependable through clearer ownership, deadlines and feedback.' },
            { page: 3, title: 'My responsibilities', caption: 'Planning, resources, production, performance review and transition to operations across a 12-channel portfolio.' },
            { page: 4, title: 'Production workflow', caption: 'Script, voiceover, editing, quality review and publishing, coordinated in Asana.' },
            { page: 5, title: 'Turnaround approach', caption: 'Connect changes in content direction with contributor performance and production execution.' },
            { page: 6, title: 'A delivery decision', caption: 'When a thumbnail designer was unavailable, continue publication with a video whose thumbnail was ready.' },
            { page: 7, title: 'Reported outcomes', caption: 'Selected video results of 395K and 107K views, alongside the production scope coordinated.' },
            { page: 8, title: 'From rebuild to operations', caption: 'Turn priorities into executable work, coordinate dependencies, and adapt delivery through review and contingencies.' },
        ],
    },
];
export function getCaseStudyMedia(id) {
    return caseStudyMedia.find((study) => study.id === id);
}
export function slidePath(study, slide) {
    return `/assets/${study.id}-slide-${slide.page}.webp`;
}
