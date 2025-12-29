export interface NewsItem {
  title: string
  author: string
  date: string
  image?: string
}

export const newsItems: NewsItem[] = [
  {
    title: 'New design for cargo and warehouse',
    author: 'Hamish Slavit',
    date: 'December 14, 2024'
  },
  {
    title: 'Outports launches 10 charter flights',
    author: 'Kylie Brown',
    date: 'December 14, 2024'
  },
  {
    title: 'Transport transit time be guaranteed',
    author: 'Zayn Ghani',
    date: 'December 14, 2024'
  }
]
