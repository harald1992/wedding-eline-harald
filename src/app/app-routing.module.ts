import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PartyComponent } from './pages/party/party.component';
import { PhotosComponent } from './pages/photos/photos.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'party', component: PartyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
