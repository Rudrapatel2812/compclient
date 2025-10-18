import { Component } from '@angular/core';
import { CountryData } from '../country/country-data';
import { PopulationData } from './population-data';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { R } from '@angular/cdk/keycodes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-population',
  imports: [RouterLink],
  templateUrl: './country-population.html',
  styleUrl: './country-population.scss'
})
export class CountryPopulation {
  country!: PopulationData;
  
  constructor(http:HttpClient) {
    http.get<PopulationData>(environment.apiUrl+'api/Countries/population/26').subscribe(result => {
      this.country = result;
  });
 }

}
