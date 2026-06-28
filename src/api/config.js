const BASE_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net';

export const API = {
        HOT_COLLECTIONS: `${BASE_URL}/hotCollections`,
        NEW_ITEMS: `${BASE_URL}/newItems`,
        TOP_SELLERS: `${BASE_URL}/topSellers`,
        EXPLORE_ITEMS: `${BASE_URL}/explore`,
        AUTHOR_DETAIL: `${BASE_URL}/authors?author=`,
        ITEM_DETAILS: `${BASE_URL}/itemDetails?nftId=`,
};