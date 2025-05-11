import { UserType } from '@/types'
import { create } from 'zustand'

export interface UserStoreTypes {
    user: null | UserType
    token: null | string
    setUser: (user: UserType | null) => void
    setToken: (token: string | null) => void
}

export const useUserStore = create<UserStoreTypes>(set => ({
    user: null,
    token: null,
    setUser: (user) => set({user}),
    setToken: (token) => set({token}),
}))
