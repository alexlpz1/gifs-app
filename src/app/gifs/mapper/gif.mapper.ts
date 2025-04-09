import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";



export class GifMapper {
    static mapGiphyItemToGif(item: GiphyItem): Gif {
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url,
        }
        
    }
    static mapGiphyItemsToArray(items: GiphyItem[]): Gif[] {
        return items.map(this.mapGiphyItemToGif)

    }

}