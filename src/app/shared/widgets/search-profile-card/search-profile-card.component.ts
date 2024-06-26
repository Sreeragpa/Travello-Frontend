import { Component, Input } from '@angular/core';
import IUser from '../../../core/models/user.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-profile-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-profile-card.component.html',
  styleUrl: './search-profile-card.component.css'
})
export class SearchProfileCardComponent {
  @Input() profiles:IUser[] = []
}
