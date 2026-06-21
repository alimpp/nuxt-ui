import type { NavigationMenuItem } from '@nuxt/ui'

export interface AppNavigationItem extends NavigationMenuItem {
  permission?: boolean
  children?: AppNavigationItem[]
}

export const navigation: AppNavigationItem[][] = [
  [
    {
      label: 'خانه',
      icon: 'i-lucide-house',
      to: '/',
      permission: true
    },
  ],
]