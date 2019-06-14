import { Injectable } from '@angular/core';
import { Search } from './search.model';



@Injectable({
    providedIn: 'root'
  })
  export class SearchService {
      formData : Search;
  }