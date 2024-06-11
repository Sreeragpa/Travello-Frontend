import { Component } from '@angular/core';
import { AddPostComponent } from "../add-post/add-post.component";
import { AddTripComponent } from "../../shared/widgets/add-trip/add-trip.component";
import { CommonModule } from '@angular/common';
import { SlideNavComponent } from "../../shared/widgets/slide-nav/slide-nav.component";

@Component({
    selector: 'app-add-trip-post',
    standalone: true,
    templateUrl: './add-trip-post.component.html',
    styleUrl: './add-trip-post.component.css',
    imports: [AddPostComponent, AddTripComponent, CommonModule, SlideNavComponent]
})
export class AddTripPostComponent {
    nav: string = "Post"
    navItems: string[] = ["Post","Trip"]

    changeNav(route: string){
        this.nav = route
    }
}
