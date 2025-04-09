import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';

import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';


const GIF_KEY = 'gifs'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '[]'
  const gifs = JSON.parse(gifsFromLocalStorage)
  console.log(gifs)
  return gifs
}
 


@Injectable({providedIn: 'root'})
export class GifService {
    
    private http = inject(HttpClient)


    trendingGifs = signal<Gif[]>([])
    trendingGifsLoading = signal(true)
    
    searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage())
    searchHistotyKeys = computed(() => Object.keys(this.searchHistory()))

    searchResults: any;



    constructor() { 
        this.loadTrendingGifs()
    }

    saveGifsToLocalStorage = effect(() => {
      const historyString = JSON.stringify(this.searchHistory())
      localStorage.setItem('gifs', historyString)
    })




    loadTrendingGifs() {
      this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        }
      }).subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToArray(resp.data);
        this.trendingGifs.set(gifs);  
        this.trendingGifsLoading.set(false);
        console.log(gifs); 
      });
    }





    searchGifs( query: string) {
      return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q:query,
        }
      }).pipe(
        map( ({data}) => data),
        map( (items) => GifMapper.mapGiphyItemsToArray(items) ),

        // TODO: Historial
        tap( items => {
          this.searchHistory.update( history => ({
            ...history,
            [query.toLowerCase()]: items,
          }))
        })
      )



      // .subscribe((resp) => {
      //   const gifs = GifMapper.mapGiphyItemsToArray(resp.data);
        
      //   console.log({search: gifs}); 
      // });
    }
    
    getHistoryGifs(query:string){
      return this.searchHistory()[query] ?? []
    }

      
}

    
