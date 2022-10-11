namespace Store {
    export interface IRootState {
        root: TutorialResponseBody
    }
}

export type TutorialResponseBody = {
    tutorials: Tutorial[]
    errorMessage: string
}

export type Tutorial = {
    id: string,
    title: string,
    description: string,
    published: boolean
}

export default Store;