import { AuthenticationService } from './../../services/authentication.service';
import { MyApiService } from './../../services/myapiservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  character = {};
  extraInfo: Observable<any>;
  constructor(private authService: AuthenticationService, private router: Router, public myApi:MyApiService) { 
    this.character = myApi.getCurrentCharacter();
    this.extraInfo = myApi.getExtraInfo();
  }

  goToList() {  
    this.router.navigate(['/members/list']);
  }

  ngOnInit() {
  }

}
