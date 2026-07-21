export const routes = {
  home: '/',
  guides: '/guides',
  guideDetail: (id: string) => `/guides/${id}`,
  phrases: '/phrases',
  reality: '/reality',
  safety: '/safety',
  community: '/community',
  apps: '/apps',
} as const
