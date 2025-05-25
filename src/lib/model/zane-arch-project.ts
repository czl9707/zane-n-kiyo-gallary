import type { CardInfo, ImageInfo } from "@/lib/model/common.type";

const apiKey = import.meta.env.ADMIN_APIKEY as string;

interface ZaneArchProjectDto {
    title: string,
    subTitle: string,
    tags?: string[],
    link: string,
    startDate: number,
    endDate?: number,
    location?: string,
    contributors?: string,
    description: string,
    cover: ImageInfo,
}

export type {
    ZaneArchProjectDto as Dto,
}

const ARCHPROJECT_ENDPOINT = `${import.meta.env.ADMIN_URL}/api/zaneArchProject`;

export async function getAllAsCardInfo(): Promise<CardInfo[]> {
    return await fetch(
        `${ARCHPROJECT_ENDPOINT}?select[content]=false`,
        {
            headers: {
                Authorization: `users API-Key ${apiKey}`,
            }
        }
    ).then(
        async req => await req.json()
    ).then(
        data => data.docs.map(asCard)
    );
}

export function asCard(dto: ZaneArchProjectDto): CardInfo {
    return {
        author: "Zane",
        title: dto.title as string,
        href: `https://zane-portfolio.kiyo-n-zane.com/as/architect/project/${dto.link}`,
        date: new Date(dto.startDate),
        img: dto.cover,
        hrefText: "View Project"
    }
}