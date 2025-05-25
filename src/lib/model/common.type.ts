export interface ImageInfo {
    url: string,
    width: number,
    height: number,
    alt: string,
}

interface CardInfoWithHref {
    author: "Kiyo"|"Zane",
    title: string,
    date: Date,
    img: ImageInfo,
    href: string,
    hrefText: string,
}

interface CardInfoWithoutHref {
    author: "Kiyo"|"Zane",
    title: string,
    date: Date,
    img: ImageInfo,
    href: undefined,
    hrefText: undefined,
}

export type CardInfo = CardInfoWithHref | CardInfoWithoutHref;