import { Routes } from '@angular/router';
import { AuthpageComponent } from './pages/authpage/authpage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { homeGuard } from './core/guards/home.guard';
import { PostComponent } from './pages/post/post.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { authGuard } from './core/guards/auth.guard';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { SearchComponent } from './pages/search/search.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { AddTripPostComponent } from './pages/add-trip-post/add-trip-post.component';
import { TripComponent } from './pages/trip/trip.component';
import { EditTripComponent } from './shared/widgets/edit-trip/edit-trip.component';
import { ChatpageComponent } from './pages/chatpage/chatpage.component';
import { SinglechatComponent } from './pages/singlechat/singlechat.component';
import { PostItemComponent } from './shared/widgets/post-item/post-item.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminDashComponent } from './shared/widgets/admin/admin-dash/admin-dash.component';
import { AdminLoginComponent } from './shared/widgets/admin/admin-login/admin-login.component';
import { UsermanagementComponent } from './shared/widgets/admin/usermanagement/usermanagement.component';

export const routes: Routes = [
    {
        path: "", component:HomepageComponent,canActivateChild:[homeGuard],
        children:[
            {path:'',component:TripComponent},
            {path:'posts',component:PostComponent},
            {path:'posts/:id',component:PostComponent},
            {path:'trips/:id',component:TripComponent},
            {path:'edit-trip/:id',component:EditTripComponent},
            {path:'create',component:AddTripPostComponent},
            {path:'profile',component:UserprofileComponent},
            {path:'profile/:id',component:UserprofileComponent},
            {path:'edit-profile',component:EditprofileComponent},
            {path:'search',component:SearchComponent},
            {path:'notification',component:NotificationComponent},
            {path:'chats',component:ChatpageComponent},
            {path:'chats/:id',component:SinglechatComponent},
        ]
    },
    {
        path: 'signin',component:AuthpageComponent,canActivate:[authGuard]
    },
    {
        path: 'signup',component:AuthpageComponent,canActivate:[authGuard]
    },
    {
        path: 'admin',component:AdminPageComponent,
        children:[
            {path:'',component:AdminDashComponent},
            {path:'login',component:AdminLoginComponent},
            {path:'usermanagement',component:UsermanagementComponent}
        ]
    }
];
