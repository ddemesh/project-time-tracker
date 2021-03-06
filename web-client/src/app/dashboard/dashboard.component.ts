import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  portalType: string;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.portalType = this.auth.getPortalType();
  }

}
