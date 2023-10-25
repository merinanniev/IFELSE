import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LeftContainerComponent } from './left-container/left-container.component';
import { RightContainerComponent } from './right-container/right-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog'
import { EditMemberComponent } from './edit-member/edit-member.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LeftContainerComponent,
    RightContainerComponent,
    EditMemberComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class DashboardModule { }
