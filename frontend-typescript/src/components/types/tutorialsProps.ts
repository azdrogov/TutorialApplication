import {Tutorial} from '../../app/state/StoreNamespace';

export type TutorialsStateProps = {
    tutorials: Tutorial[];
    errorMessage: string;
}

export type TutorialsActionsProps = {
    loadTutorials(): void;
    createTutorial(): void;
}

export type TutorialsProps = TutorialsStateProps & TutorialsActionsProps;