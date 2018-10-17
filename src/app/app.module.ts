import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopnavComponent } from './topnav/topnav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangeModule } from './shared/daterange/daterange.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopnavComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    DateRangeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
