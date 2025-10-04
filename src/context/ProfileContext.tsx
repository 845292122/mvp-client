import { createContext } from 'react'

const ProfileContext = createContext<
  | {
      visible: boolean
      closeProfile: () => void
      openProfile: () => void
    }
  | undefined
>(undefined)

export default ProfileContext
