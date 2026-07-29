export type TimelineEventType = 'work' | 'life' | 'milestone'

export interface TimelineEntry {
    id: string
    year: number
    type: TimelineEventType
    label?: string // usado por eventos 'life' y 'milestone' (born, now...)
    company?: string
    role?: string
    period?: string
    description?: string[]
    tech?: string[]
    url?: string
}

export const timeline: TimelineEntry[] = [
    {
        id: 'avalanche-ui',
        year: 2025,
        type: 'work',
        company: 'Avalanche Studios Group',
        role: 'UI Developer - Call of the Wild',
        period: 'Oct 2025 - Present',
        description: [
            'Implementing designs into functional in-game elements, developing responsive UI features, optimizing performance across platforms, and creating and maintaining interfaces using Coherent.',
        ],
        tech: ['Coherent GT', 'React', 'TypeScript'],
    },
    {
        id: 'avalanche-frontend',
        year: 2021,
        type: 'work',
        company: 'Avalanche Studios Group',
        role: 'Frontend Developer - Apex Connect Team',
        period: 'Jun 2021 - Oct 2025',
        description: [
            'Development of internal and player-facing cloud services used in AAA games and self-published games with millions of active users.',
        ],
        tech: ['React', 'Angular', 'Vue', 'Go'],
    },
    {
        id: 'crowdfarming',
        year: 2020,
        type: 'work',
        company: 'CrowdFarming',
        role: 'Frontend Developer',
        period: 'May 2020 - Jun 2021',
        description: [
            "Design and deploy features for CrowdFarming's website, code and test technical solutions while seeking optimal performance and structuring.",
        ],
        tech: ['Angular 10', 'TypeScript', 'Sass'],
    },
    {
        id: 'ryanair',
        year: 2018,
        type: 'work',
        company: 'Ryanair',
        role: 'UI Developer',
        period: 'Feb 2018 - May 2020',
        description: [
            'Transformed design concepts, wireframes and finished designs into working simulations assessed by the research and design team.',
        ],
        tech: ['Angular 8', 'TypeScript', 'jQuery'],
    },
    {
        id: 'ea',
        year: 2017,
        type: 'work',
        company: 'Electronic Arts (EA)',
        role: 'UI Developer',
        period: 'Feb 2017 - Feb 2018',
        description: [
            'User Interface Design and first level development of an internal Content Management System for games translation.',
        ],
        tech: ['React', 'Sketch', 'Principle'],
    },
    {
        id: 'solcom',
        year: 2014,
        type: 'work',
        company: 'Solcom S.L.',
        role: 'UX/UI - Web Developer',
        period: 'Feb 2014 - Feb 2017',
        description: [
            'Landing pages, CMS, banners, newsletters, and images for social media.',
        ],
        tech: ['AngularJS', 'jQuery', 'PHP'],
    },
    {
        id: 'telefonica',
        year: 2013,
        type: 'work',
        company: 'Telefónica',
        role: 'UX/UI - Web Developer',
        period: 'Aug 2013 - Feb 2014',
        description: [
            'Telefonica Learning Services: Creation of an Spanish for foreign speakers E-learning project.',
        ],
        tech: ['Adobe Flash', 'HTML', 'CSS', 'Javascript'],
    },
    {
        id: 'delvico',
        year: 2012,
        type: 'work',
        company: 'J. Walter Thompson',
        role: 'UX/UI - Web Developer',
        period: 'Nov 2012 - Nov 2013',
        description: [
            'Digital Experience Department. Banners, Newsletters, Landing Pages and Images for Social Media.',
        ],
        tech: ['Adobe Flash', 'HTML', 'CSS', 'Javascript'],
    },
    {id: 'born', year: 1988, type: 'milestone', label: 'I was born'},
    {id: 'bike', year: 1996, type: 'life', label: 'I learned to ride a bike'},
    {id: 'longestjourney', year: 2001, type: 'life', label: 'I played The Longest Journey'},
    {id: 'matrix', year: 1999, type: 'life', label: 'I saw The Matrix'},
    {id: 'startuniversity', year: 2006, type: 'life', label: 'I started University'},
    {id: 'birmingham', year: 2011, type: 'life', label: 'I moved to Birmingham'},
    {id: 'now', year: 2026, type: 'milestone', label: 'Now is summer'},
]


export interface Stat {
    value: string
    label: string
    type: 'text' | 'icons'
    icons?: ('react' | 'angular' | 'vue')[]
}

export const stats: Stat[] = [
    {value: '12+', label: 'Years of experience', type: 'text'},
    {value: 'AAA', label: 'EA · Avalanche Studios', type: 'text'},
    {value: 'Coherent GT', label: 'Game UI middleware', type: 'text'},
    {value: '', label: 'Frontend frameworks', type: 'icons', icons: ['react', 'angular', 'vue']},
]