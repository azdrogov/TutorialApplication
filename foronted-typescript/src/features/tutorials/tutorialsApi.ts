import {api} from '../../api';
import {ITutorial, ITutorialInput} from '../../app/states';
import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {BaseQueryFn} from '@reduxjs/toolkit/query';

export const tutorialsApi = api.injectEndpoints({
    endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getTutorials: build.query<ITutorial[], string>({
            query: () => 'tutorials',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Tutorials' as const, id })),
                        { type: 'Tutorials', id: 'LIST' },
                    ]
                    : [{ type: 'Tutorials', id: 'LIST' }],
        }),
        addTutorial: build.mutation<string, ITutorialInput>({
            query: (body: ITutorialInput) => {
                return ({
                    url: 'tutorials',
                    method: 'POST',
                    body
                })
            },
            invalidatesTags: [{type: 'Tutorials', id: 'LIST'}]
        }),
        deleteTutorial: build.mutation<number, string>({
            query: (id: string) => {
                return ({
                    url: `tutorials/${id}`,
                    method: 'DELETE'
                })
            },
            invalidatesTags: [{type: 'Tutorials', id: 'LIST'}]
        }),
        getTutorialById: build.query<ITutorial | null, string | undefined>({
            query: (id: string) => `tutorials/${id}`
        })
    })
})

export const {useGetTutorialsQuery, useAddTutorialMutation, useDeleteTutorialMutation, useGetTutorialByIdQuery} = tutorialsApi