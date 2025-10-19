import { atomWithStorage } from 'jotai/utils'

const tokenAtom = atomWithStorage<string | undefined>('token', 'undefined')
const authInfoAtom = atomWithStorage<ApiType.Auth.Info | undefined>('info', undefined)

export const authStore = {
  tokenAtom,
  authInfoAtom
}
