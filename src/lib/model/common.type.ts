export interface ImageInfo {
    url: string,
    width: number,
    height: number,
    alt: string,
}

export interface CardInfo {
    title: string,
    date: Date,
    img: ImageInfo,
    href?: string,
    linkText?: string,
}