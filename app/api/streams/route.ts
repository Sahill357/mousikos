 


import { prismaClient } from "@/app/lib/db";
// import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
 
// @ts-expect-error xoxo
import youtubesearchapi from "youtube-search-api";
const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const CreateStreamsSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamsSchema.parse(await req.json());
        const itYt =  data.url.match(YT_REGEX)
        

        if (!itYt){
            return NextResponse.json({
                message: "wrong url format"
            }, {
                status: 411
            })
        }
         

        const extractedId = data.url.split("?v=")[1];

        const res  = await  youtubesearchapi.GetVideoDetails(extractedId);
        console.log(res.title);
        const thumbnails = res.thumbnail.thumbnails;

        thumbnails.sort((a:{width: number}, b: {width: number}) => a.width < b.width ? -1 : 1);
        
        
        

        const stream = await   prismaClient.stream.create({
            data:{
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "Cant find video",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ??   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBYYFhUjvNhBJ9SwQTv8X3PyQVtd-EejwOMQ&s",
                bigImg: thumbnails[thumbnails.length - 1].url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBYYFhUjvNhBJ9SwQTv8X3PyQVtd-EejwOMQ&s"


            }
        });

        return NextResponse.json({
            message: "Added Streams",
            id: stream.id
        })
 
    } catch (e) {
        console.log(e);
        
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        });
    }
}


export async function GET(req: NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    if (!creatorId) {
        return NextResponse.json({
            message: "Error"
        }, {
            status: 411
        })
    }
    const streams = await prismaClient.stream.findMany({
        where: {
            userId : creatorId  
        },
        include: {
            _count: {
                select: {
                    upvotes: true
                }
            },
            upvotes: {
                where: {
                    userId: creatorId
                }
            }
        }
    });

    return NextResponse.json({
        streams: streams.map(({_count, ...rest}) => ({
            ...rest,
            upvotes: _count.upvotes,
            haveUpvoted: rest.upvotes.length ? true : false
        }))
    })

}
