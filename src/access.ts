export const getAccessCode = () => import.meta.env.VITE_ACCESS_CODE || (import.meta.env.DEV ? '1337' : '')
