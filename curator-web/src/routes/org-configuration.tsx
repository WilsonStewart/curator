import { LayoutShell } from '@/components/layout.shell'
import { createFileRoute } from '@tanstack/react-router'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { useState } from 'react'

export const Route = createFileRoute('/org-configuration')({
    component: RouteComponent,
})

const people = [
    { id: 1, name: 'Tom Cook' },
    { id: 2, name: 'Wade Cooper' },
    { id: 3, name: 'Tanya Fox' },
    { id: 4, name: 'Arlene Mccoy' },
    { id: 5, name: 'Devon Webb' }
]

function RouteComponent() {
    return <LayoutShell>
        <h1>Org Configuration</h1>
        <div>
            <h2>Musuems</h2>
        </div>

    </LayoutShell>
}
