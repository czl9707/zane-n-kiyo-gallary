import type { CardInfo } from "@/lib/model/common.type";

const CARD_WIDTH_RATIO = 5;

function calcImgHeightRatio(cardInfo: CardInfo)
{
    return Math.round(cardInfo.img.height / cardInfo.img.width * CARD_WIDTH_RATIO)
}

function calcCardHeightRatio(cardInfo: CardInfo)
{
    return calcImgHeightRatio(cardInfo) + (cardInfo.href == undefined ? 0 : 1);
}

export {
    CARD_WIDTH_RATIO,
    calcCardHeightRatio,
    calcImgHeightRatio,
}
