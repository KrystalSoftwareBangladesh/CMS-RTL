export interface Service {
  number: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Road Freight',
    description: 'Road transport is a versatile mode of freight carriage that offers speed, cost-efficiency and flexibility for short-to-medium-distance distribution services.'
  },
  {
    number: '02',
    title: 'Air Freight',
    description: 'TMS is a leader in providing both domestic and international air freight shipping solutions for your time-sensitive and high-value cargo.'
  },
  {
    number: '03',
    title: 'Sea Freight',
    description: 'Freight management is the process of overseeing and managing the delivery of goods. Cargo or retail, that deals with cargo movements.'
  },
  {
    number: '04',
    title: 'Rail Freight',
    description: 'Freight management is the process of overseeing and managing the delivery of goods. Any container, cargo or retail, that deals with cargo movements.'
  }
]
