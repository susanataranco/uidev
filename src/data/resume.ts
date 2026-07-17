export interface TimelineEntry {
    id: string
    company: string
    role: string
    period: string
    description: string[]
    tech: string[]
    url?: string
}

export const timeline: TimelineEntry[] = [
    {
        id: 'avalanche-ui',
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
        company: 'Solcom S.L.',
        role: 'UX/UI - Web Developer',
        period: 'Feb 2014 - Feb 2017',
        description: [
            'Landing pages, CMS, banners, newsletters, and images for social media.',
        ],
        tech: ['AngularJS', 'jQuery', 'PHP'],
    },
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