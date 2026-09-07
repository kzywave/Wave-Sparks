export const THEME_PRESETS = ['neutral', 'yellow'] as const
export type ThemePreset = (typeof THEME_PRESETS)[number]

export const THEME_DEFAULT_ACCENTS: Record<ThemePreset, string> = {
  neutral: '#646cff',
  yellow: '#ffcb05',
}

export interface ShellConfig {
  identity: {
    name: string
    subtitle: string
  }
  theme: {
    preset: ThemePreset
    accent: string
  }
  device: {
    width: number
    height: number
  }
}

/** Replace this object with the payload copied from /config. */
export const DEFAULT_SHELL_CONFIG: ShellConfig = {
  identity: {
    name: 'Product Initiatives',
    subtitle: 'Start small. Connect what already exists.',
  },
  theme: {
    preset: 'yellow',
    accent: THEME_DEFAULT_ACCENTS.yellow,
  },
  device: {
    width: 393,
    height: 852,
  },
}

export const SCREENS = [
  {
    id: 'home',
    label: 'Home',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 'detail',
    label: 'Detail',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'success',
    label: 'Success',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
] as const

export type ScreenId = (typeof SCREENS)[number]['id']

export const getScreen = (candidate: string | undefined) =>
  SCREENS.find((screen) => screen.id === candidate) ?? SCREENS[0]
