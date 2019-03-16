import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MyApiService {
  public baseUrl: "https://www.swapi.co/api/";
  public films: "films";
  public people: "people";
  public planets: "planets";
  public species: "species";
  public starships: "starships";
  public vehicles: "vehicles";

  constructor(public http: HttpClient) { }

  private character = {};
  private extraInfo = {
    homeworld: "",
    species: "",
    starships: [],
    vehicles: []
  };

  setCurrentCharacter(character) {
    this.character = character;

    let temporaryInfo = {
      homeworld: "",
      species: "",
      starships: [],
      vehicles: [],
      films: []
    };

    // Forks and merges in rxjs here?
    this.http.get(character.homeworld).subscribe(characterHomeworld => {
      temporaryInfo.homeworld = characterHomeworld.name;
      this.http.get(character.species[0]).subscribe(characterSpecies => {
        temporaryInfo.species = characterSpecies.name;
        character.starships.forEach(starship => {
          this.http.get(starship).subscribe(shipInfo => {
            temporaryInfo.starships.push(shipInfo.name);
          });
        });
        character.vehicles.forEach(vehicle => {
          this.http.get(vehicle).subscribe(vehicleInfo => {
            temporaryInfo.vehicles.push(vehicleInfo.name);
          });
        });
        character.films.forEach(film => {
          this.http.get(film).subscribe(filmInfo => {
            temporaryInfo.films.push(filmInfo.title);
          });
        });
      })
    })
    this.extraInfo = temporaryInfo;
  }

  getCurrentCharacter() {
    return this.character;
  }

  getExtraInfo() {
    return this.extraInfo;
  }

  getPeople() {
    return this.http.get('https://www.swapi.co/api/people');
  }

  getMorePeople(nextUrl: string) {
    return this.http.get(nextUrl);
  }
}
