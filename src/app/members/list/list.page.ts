import { AuthenticationService } from './../../services/authentication.service';
import { MyApiService } from './../../services/myapiservice.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  observableResult: Observable<any>;
  peopleData = [];
  next = "";
  constructor(private authService: AuthenticationService, private router: Router, public myApi:MyApiService) {
    this.observableResult = this.myApi.getPeople();
    this.observableResult.subscribe(data => {
      console.log('api result: ', data);
      this.peopleData = data.results;
      this.next = data.next;
    })
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');

      this.observableResult = this.myApi.getMorePeople(this.next);
      this.observableResult.subscribe(data => {
        console.log('api result: ', data);
        var newArray = this.peopleData.concat(data.results);
        this.peopleData = newArray;
        this.next = data.next;
        event.target.complete();
      })
    }, 2500);
  }

  goToDetails(character) {
    this.myApi.setCurrentCharacter(character);     
    this.router.navigate(['/members/details']);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
