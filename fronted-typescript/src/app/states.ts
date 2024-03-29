export interface ITutorial {
    id: string,
    title: string,
    description: string,
    published: boolean
}

export interface ITutorialInput {
    title: string,
    description?: string,
    published: boolean
}

export const initialState: ITutorial[] = []

export const initialTutorial: ITutorial = {
    id: '',
    title: '',
    description: '',
    published: false
}