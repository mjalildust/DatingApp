import {Routes} from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditeComponent } from './members/member-edite/member-edite.component';
import { MemberEditeResolver } from './_resolvers/member-edite.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'lists', component: ListsComponent},
            { path: 'members', component: MemberListComponent,
                    resolve: { users: MemberListResolver}},
            { path: 'members/:id', component: MemberDetailComponent,
                    resolve: { user: MemberDetailResolver}},
            { path: 'member/edite', component: MemberEditeComponent,
                    resolve: {user: MemberEditeResolver}, canDeactivate: [PreventUnsavedChanges ]},
            { path: 'messages', component: MessagesComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];