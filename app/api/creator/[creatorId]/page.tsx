import StreamView from "@/app/components/streamView";

export default function ({
    params: {
        creatorId
    }
}:{
    params: {
        creatorId: string;
    }
}) {
    return 
    <div><StreamView creatorId={creatorId}/></div>
}