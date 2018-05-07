import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';''

@NgModule({
    imports: [ RouterModule, CommonModule, FormsModule, NgbModalModule ],
    declarations: [ NavbarComponent],
    entryComponents: [ ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
