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
    {
      label: 'صندوق ورودی',
      icon: 'i-lucide-inbox',
      to: '/inbox',
      permission: true
    },
    {
      label: 'کارمندان',
      icon: 'i-lucide-users',
      to: '/employees',
      permission: true
    },
    {
      label: 'مشتریان',
      icon: 'solar:user-id-broken',
      to: '/customers',
      permission: true
    },
    // {
    //   label: 'تنظیمات',
    //   icon: 'i-lucide-settings',
    //   type: 'trigger',
    //   defaultOpen: true,
    //   permission: true,

    //   children: [
    //     {
    //       label: 'عمومی',
    //       to: '/settings',
    //       exact: true
    //     },
    //     {
    //       label: 'اعضا',
    //       to: '/settings/members',
    //       permission: true
    //     },
    //     {
    //       label: 'اعلان‌ها',
    //       to: '/settings/notifications',
    //       permission: true
    //     },
    //     {
    //       label: 'امنیت',
    //       to: '/settings/security',
    //       permission: true
    //     }
    //   ]
    // }
  ],
]