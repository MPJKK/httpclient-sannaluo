import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-http-test',
    templateUrl: './http-test.component.html',
    styleUrls: ['./http-test.component.scss']
})
export class HttpTestComponent implements OnInit {

    public tulos: string = 'Moro';
    apitulos = 'Hei taas!';
    kuvatulos;
    apikaupunki;
    saatulos;
    lampotila;
    apiosoite = 'http://media.mw.metropolia.fi/wbma';
    kuvaosoite = 'http://media.mw.metropolia.fi/wbma/uploads/';
    saaosoite = 'http://samples.openweathermap.org/data/2.5/weather?q=London&APPID=b6907d289e10d714a6e88b30761fae22';

    constructor(private http: HttpClient) {
    }

    getJson() {
        interface MyInterface {
            license: string;
        }

        this.http.get<MyInterface>('assets/package.json').subscribe((data) => {
            console.log(data);
            this.tulos = data.license;
        });
    }

    getFromApi() {
        this.http.get(this.apiosoite + '/media').subscribe((data) => {
            console.log(data);
            console.log(data[0].filename);
            this.kuvatulos = this.kuvaosoite + data[0].filename;
        });
    }

    getWeather() {
        interface WeatherInterface {
            name: string;
            weather: any;
            main: any;
        }

        this.http.get<WeatherInterface>(this.saaosoite).subscribe((data) => {
            console.log(data);
            this.apikaupunki = data.name;
            this.saatulos = data.weather[0].description;
            this.lampotila = data.main.temp;
        });
    }

    ngOnInit() {
        this.getJson();
        this.getFromApi();
        this.getWeather();
    }

}
