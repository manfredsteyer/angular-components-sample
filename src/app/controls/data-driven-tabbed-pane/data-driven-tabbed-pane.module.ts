import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataDrivenTabbedPaneComponent } from '../data-driven-tabbed-pane/data-driven-tabbed-pane.component';
import { DataDrivenTabComponent } from '../data-driven-tabbed-pane/data-driven-tab.component';
import { DataDrivenPagerComponent } from '../data-driven-tabbed-pane/data-driven-pager.component';
import { DataDrivenListTabComponent } from '../data-driven-tabbed-pane/data-driven-list-tab.component';
import { DataDrivenDetailTabComponent } from '../data-driven-tabbed-pane/data-driven-detail-tab.component';
import { DataDrivenInheritanceListTabComponent } from './data-driven-inheritance-list-tab.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DataDrivenTabbedPaneComponent,
        DataDrivenTabComponent,
        DataDrivenPagerComponent,
        DataDrivenListTabComponent,
        DataDrivenDetailTabComponent,
        DataDrivenInheritanceListTabComponent
    ],
    exports: [
        DataDrivenTabbedPaneComponent,
        DataDrivenTabComponent,
        DataDrivenListTabComponent,
        DataDrivenDetailTabComponent,
        DataDrivenInheritanceListTabComponent
    ]
})
export class DataDrivenTabbedPaneModule {
}
