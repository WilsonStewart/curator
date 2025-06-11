import { createFileRoute } from '@tanstack/react-router'
import { MainLayout } from '@/components/main.layout'
import { getMuseums, type GetMuseumsData, type GetMuseumsResponse, type GetMuseumsResponses } from '@/openapi-ts-client';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/dashboard')({
    component: RouteComponent,
})

export function RouteComponent() {
    const [museums, setMuseums] = useState<GetMuseumsResponse>();
    const handlerGetMuseums = async () => { return (await getMuseums()).data }

    const goo = async () => { setMuseums((await getMuseums()).data) }

    useEffect(() => {
        // (async () => { setMuseums((await getMuseums()).data) })()
    }, []);
    return <MainLayout>
        <button onClick={goo}>Get Museums</button>
        <ul>
            {museums?.map((museum) => {
                return <div>{museum.eid}</div>
            })}
        </ul>
    </MainLayout>
}
