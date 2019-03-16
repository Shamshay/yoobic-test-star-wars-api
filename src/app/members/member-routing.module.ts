import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'details', loadChildren: './details/details.module#DetailsPageModule' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MemberRoutingModule { }
