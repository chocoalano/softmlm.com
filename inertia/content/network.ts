export type Rank = 'Diamond' | 'Platinum' | 'Gold' | 'Silver'

export type NetworkMember = {
  id: string
  name: string
  rank: Rank
  active: boolean
  members: number
  groupSales: string
  personalAp: string
  commission: string
  /** Year and month, `YYYY-MM`; the page shows it in its own language. */
  joined: string
  city: string
  more?: number
  children?: NetworkMember[]
}

/**
 * Sample genealogy for the network section. Figures line up with the other
 * mockups (hero dashboard, command center, member 360). Names, IDs, rank
 * names and figures are sample data, the same in every language; labels
 * around them live in the homePlatform copy.
 */
export const network: NetworkMember = {
  id: 'SM-210304',
  name: 'Budi Santoso',
  rank: 'Diamond',
  active: true,
  members: 289,
  groupSales: 'Rp465.2M',
  personalAp: 'Rp6.8M',
  commission: 'Rp52.4M',
  joined: '2021-03',
  city: 'Jakarta',
  children: [
    {
      id: 'SM-240118',
      name: 'Sarah Wijaya',
      rank: 'Platinum',
      active: true,
      members: 123,
      groupSales: 'Rp186.4M',
      personalAp: 'Rp4.2M',
      commission: 'Rp21.7M',
      joined: '2024-01',
      city: 'Bandung',
      more: 41,
      children: [
        {
          id: 'SM-240562',
          name: 'Maya Lestari',
          rank: 'Gold',
          active: true,
          members: 41,
          groupSales: 'Rp58.3M',
          personalAp: 'Rp3.1M',
          commission: 'Rp7.9M',
          joined: '2024-05',
          city: 'Bogor',
        },
        {
          id: 'SM-241107',
          name: 'Putri Salsabila',
          rank: 'Silver',
          active: true,
          members: 22,
          groupSales: 'Rp24.1M',
          personalAp: 'Rp1.9M',
          commission: 'Rp3.2M',
          joined: '2024-11',
          city: 'Bekasi',
        },
      ],
    },
    {
      id: 'SM-220915',
      name: 'Daniel Pratama',
      rank: 'Gold',
      active: true,
      members: 89,
      groupSales: 'Rp142.9M',
      personalAp: 'Rp3.6M',
      commission: 'Rp15.8M',
      joined: '2022-09',
      city: 'Surabaya',
      more: 29,
      children: [
        {
          id: 'SM-230410',
          name: 'Lina Hartono',
          rank: 'Gold',
          active: true,
          members: 38,
          groupSales: 'Rp61.0M',
          personalAp: 'Rp2.8M',
          commission: 'Rp8.1M',
          joined: '2023-04',
          city: 'Malang',
        },
        {
          id: 'SM-230822',
          name: 'Andre Setiawan',
          rank: 'Silver',
          active: false,
          members: 27,
          groupSales: 'Rp12.6M',
          personalAp: 'Rp0.3M',
          commission: 'Rp1.1M',
          joined: '2023-08',
          city: 'Sidoarjo',
        },
      ],
    },
    {
      id: 'SM-230117',
      name: 'Kevin Halim',
      rank: 'Gold',
      active: true,
      members: 74,
      groupSales: 'Rp118.3M',
      personalAp: 'Rp2.9M',
      commission: 'Rp12.6M',
      joined: '2023-01',
      city: 'Denpasar',
      more: 24,
      children: [
        {
          id: 'SM-240301',
          name: 'Bima Saputra',
          rank: 'Silver',
          active: true,
          members: 19,
          groupSales: 'Rp18.4M',
          personalAp: 'Rp1.6M',
          commission: 'Rp2.4M',
          joined: '2024-03',
          city: 'Ubud',
        },
        {
          id: 'SM-240919',
          name: 'Dewi Anggraini',
          rank: 'Silver',
          active: false,
          members: 11,
          groupSales: 'Rp6.2M',
          personalAp: 'Rp0.2M',
          commission: 'Rp0.6M',
          joined: '2024-09',
          city: 'Mataram',
        },
      ],
    },
  ],
}
