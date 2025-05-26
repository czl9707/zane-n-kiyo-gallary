import type { CardInfo, ImageInfo } from "@/lib/model/common.type";

const apiKey = import.meta.env.ADMIN_APIKEY as string;

interface KiyoDesignProjectDto {
    title: string,
    subTitle:string,
    tags?: string[],
    link: string,
    startDate: number,
    endDate?: number,
    description: string,
    cover: ImageInfo,
}

export type {
    KiyoDesignProjectDto as Dto,
}

const DEVPROJECT_ENDPOINT = `${import.meta.env.ADMIN_URL}/api/kiyoDesignProject`;

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

export function asCard(dto: KiyoDesignProjectDto): CardInfo {
    return {
        author: "Kiyo",
        title: dto.title as string,
        href: undefined,
        date: new Date(dto.startDate),
        img: dto.cover,
        hrefText: undefined
    }
}