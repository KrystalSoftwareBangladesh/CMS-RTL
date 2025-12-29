export interface NavLink {
  name: string
  path: string
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/contact' }
]

export const partners: string[] = ['PARADIE', 'Homey', 'DIAMOND', 'Minty', 'Product']
