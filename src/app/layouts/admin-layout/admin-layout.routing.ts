import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { NewsComponent } from "../../pages/news/news.component";
import { TeamScheduleComponent } from "../../pages/team-schedule/team-schedule.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "schedule", component: TeamScheduleComponent },
  { path: "news", component: NewsComponent },
];
