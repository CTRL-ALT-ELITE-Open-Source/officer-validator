import { WithId, Document } from 'mongodb'
import { create } from 'zustand'

interface StoreState {
    officerData?: WithId<Document>
    modalInfoOpen: boolean,
    setOfficer: (data: WithId<Document>) => void
}

export const store = create<StoreState>((set) => ({
    officerData: undefined,
    modalInfoOpen: false,
    setOfficer: (data: WithId<Document>) =>
        set(() => ({
            officerData: data
        }))
}))