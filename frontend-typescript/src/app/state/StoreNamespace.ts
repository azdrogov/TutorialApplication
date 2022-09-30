export interface IRootState {
    root: RootBody
}

export type RootBody = {
    tutorials: StoreNamespace[]
    errorMessage: string
}

export type StoreNamespace = {
    id: string,
    title: string,
    description: string,
    published: boolean
}