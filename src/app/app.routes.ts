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

export const routes: Routes = [
    {
        path: "", component:HomepageComponent,canActivate:[homeGuard],
        children:[
            {path:'',component:TripComponent},
            {path:'posts',component:PostComponent},
            {path:'posts/:id',component:PostComponent},
            // {path:'trips',component:TripComponent},
            {path:'addpost',component:AddTripPostComponent},
            {path:'profile',component:UserprofileComponent},
            {path:'edit-profile',component:EditprofileComponent},
            {path:'search',component:SearchComponent},
            {path:'notification',component:NotificationComponent}
        ]
    },
    {
        path: 'signin',component:AuthpageComponent,canActivate:[authGuard]
    },
    {
        path: 'signup',component:AuthpageComponent,canActivate:[authGuard]
    }
];
