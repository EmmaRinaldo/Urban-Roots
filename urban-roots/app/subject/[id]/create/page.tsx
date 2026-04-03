import { CreatePostClient } from "./CreatePostClient";

export default function CreatePostRoute({
    params,
}: {
    params: { id: string };
}) {
    return <CreatePostClient subjectId={decodeURIComponent(params.id)} />;
}
