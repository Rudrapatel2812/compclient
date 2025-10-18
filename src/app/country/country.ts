import { Component } from '@angular/core';
import { CountryData } from './country-data';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from '../weather-data';
import { environment } from '../../environments/environment.development';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-country',
  imports: [RouterLink, RouterModule],
  templateUrl: './country.html',
  styleUrl: './country.scss'
})
export class Country {

  countries: CountryData[] = [];
country: any;
  constructor(http:HttpClient) {
    http.get<CountryData[]>(environment.apiUrl+"api/countries").subscribe(result => {
      this.countries = result;
  });
 }

}
