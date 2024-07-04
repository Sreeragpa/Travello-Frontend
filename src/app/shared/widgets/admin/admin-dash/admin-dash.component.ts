import { Component } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import { GraphComponent, graphTypes } from "../graph/graph.component";
import { IStatisticsData } from '../../../../core/models/trip.model';
import { GraphService } from '../../../../core/services/graph.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-admin-dash',
    standalone: true,
    templateUrl: './admin-dash.component.html',
    styleUrl: './admin-dash.component.css',
    imports: [GraphComponent]
})

export class AdminDashComponent {
  userStatistics!: IStatisticsData[]
  postStatistics!: IStatisticsData[]
  tripStatistics!: IStatisticsData[]
  graphLoading:number = 0
  graphTypes = graphTypes
  constructor(private adminService: AdminService,private dataService: GraphService, private router: Router){}
  ngOnInit() {
    this.getPostGraph()
    this.getTripGraph()
    this.getUserGraph()
  }
  getPostGraph(period: number = 7) {
    // console.log(period);
    
    this.adminService.getPostStatistics(period).subscribe({
      next:(res)=>{
        console.log(res);
        this.dataService.updatePostStatistics(res.data)
        // this.postStatistics = res.data;
        // this.graphLoading++;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  getTripGraph(period: number = 7) {
    this.adminService.getTripStatistics(period).subscribe({
      next:(res)=>{
        console.log(res);
        this.dataService.updateTripStatistics(res.data)

        // this.tripStatistics = res.data
        // this.graphLoading++;

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  getUserGraph(period: number = 7){
    this.adminService.getUserStatistics(period).subscribe({
      next:(res)=>{
        console.log(res);
        this.dataService.updateUserStatistics(res.data)

        // this.userStatistics = res.data
        // this.graphLoading++;

      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }




}


