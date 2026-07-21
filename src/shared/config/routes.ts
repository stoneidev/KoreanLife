export const routes = {
  home: '/',
  guides: '/guides',
  guideDetail: (id: string) => `/guides/${id}`,
  phrases: '/phrases',
  reality: '/reality',
  safety: '/safety',
} as const
