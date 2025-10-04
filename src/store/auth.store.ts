import { atomWithStorage } from 'jotai/utils'

const tokenAtom = atomWithStorage<string | undefined>('token', undefined)
const authInfoAtom = atomWithStorage<ApiType.Auth.Info | undefined>('info', undefined)
const permAtom = atomWithStorage<string[]>('perm', [
  'home',
  'system',
  'profile',
  'system:account',
  'system:perm',
  'system:log',
  'system:user',
  'system:tenant'
])

export const authJotai = {
  tokenAtom,
  authInfoAtom,
  permAtom
}
