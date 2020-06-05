
import { MemberEditeComponent } from '../members/member-edite/member-edite.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditeComponent>{
    canDeactivate(component: MemberEditeComponent){
        if (component.editForm.dirty) {
            return confirm('Are u sure you want to continue? Any unsaved changes will be lost?');
        }
        return true;
    }
}