import {Tutorials} from '../../app/state/StoreNamespace';

export type TutorialsStateProps = {
    tutorials: Tutorials;
    errorMessage: string;
}

export type TutorialsActionsProps = {
    loadTutorials(): void;
    createTutorial(): void;
}

export type TutorialsProps = TutorialsStateProps & TutorialsActionsProps;