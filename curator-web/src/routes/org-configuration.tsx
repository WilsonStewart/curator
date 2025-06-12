import { getMuseums } from "@/lib/api-client/museums/museums";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/org-configuration")({
    component: RouteComponent,
});

function RouteComponent() {
    const query = useQuery({ queryKey: ['museums'], queryFn: getMuseums })


    return (
        <>
            <h1>Org Configuration</h1>
            <div>
                <h2>Musuems</h2>
                <hr />
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Created</th>
                        <th>Modified</th>
                    </tr>
                    {query.data?.data.map((i) => {
                        return (
                            <tr>
                                <td><code>{i.displayName}</code></td>
                                <td><code>{i.eid}</code></td>
                                <td><code>{i.createdAt}</code></td>
                                <td><code>{i.modifiedAt}</code></td>
                            </tr>
                        )
                    })}
                </table>

            </div>
        </>
    );
}
