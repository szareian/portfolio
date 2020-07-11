import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { NewsComponent } from "../../pages/news/news.component";
import { PlayerSearchComponent } from '../../pages/player-search/player-search.component'; 
import { PlayerSeasonAvgComponent } from '../../pages/player-season-avg/player-season-avg.component';

import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    NewsComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    PlayerSearchComponent,
    PlayerSeasonAvgComponent
  ]
})
export class AdminLayoutModule {}
