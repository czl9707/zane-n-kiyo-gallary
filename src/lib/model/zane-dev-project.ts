import type { CardInfo, ImageInfo } from "@/lib/model/common.type";

const apiKey = import.meta.env.ADMIN_APIKEY as string;

interface ZaneDevProjectDto {
    title: string,
    tags?: string[],
    externalLink: string,
    startDate: number,
    endDate?: number,
    description: string,
    cover: ImageInfo,
}

export type {
    ZaneDevProjectDto as Dto,
}

const DEVPROJECT_ENDPOINT = `${import.meta.env.ADMIN_URL}/api/zaneDevProject`;

export async function getAllAsCardInfo(): Promise<CardInfo[]> {
    return await fetch(
        `${DEVPROJECT_ENDPOINT}`,
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

export function asCard(dto: ZaneDevProjectDto): CardInfo {
    return {
        author: "Zane",
        title: dto.title as string,
        href: dto.externalLink,
        date: new Date(dto.startDate),
        img: dto.cover,
        hrefText: "View Project"
    }
}