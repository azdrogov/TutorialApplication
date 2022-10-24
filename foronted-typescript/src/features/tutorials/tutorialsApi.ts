import {api} from '../../api';
import {ITutorial, ITutorialInput} from '../../app/states';
import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {BaseQueryFn} from '@reduxjs/toolkit/query';

export const tutorialsApi = api.injectEndpoints({
    endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getTutorials: build.query<ITutorial[], string>({
            query: () => 'tutorials'
        }),
        addTutorial: build.mutation<string, ITutorialInput>({
            query: (body: ITutorialInput) => {
                debugger
                return ({
                    url: 'tutorials',
                    method: 'POST',
                    body
                })
            }
        })
    })
})

export const {useGetTutorialsQuery, useAddTutorialMutation} = tutorialsApi