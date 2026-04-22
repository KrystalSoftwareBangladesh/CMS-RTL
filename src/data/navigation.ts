export interface NavLink {
  key: string
  path: string
}

export const navLinks: NavLink[] = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.about', path: '/we-are' },
  { key: 'nav.services', path: '/services' },
  { key: 'nav.portfolio', path: '/portfolio' },
  { key: 'nav.news', path: '/news' },
  { key: 'nav.contact', path: '/contact' }
]

export const partners: string[] = ['PARADIE', 'Homey', 'DIAMOND', 'Minty', 'Product']
