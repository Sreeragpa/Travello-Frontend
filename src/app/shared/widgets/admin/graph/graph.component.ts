import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import ApexCharts from 'apexcharts';
import { IStatisticsData } from '../../../../core/models/trip.model';
import { GraphService } from '../../../../core/services/graph.service';

export enum graphTypes {
  Posts = "Posts",
  Trips = "Trips",
  Users = "Users"
}

@Component({
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input({ required: true }) graph!: graphTypes;
  @Output() onPeriodChange: EventEmitter<number> = new EventEmitter<number>();
  
  @ViewChild('chart', { static: true }) chartElement!: ElementRef;

  data!: IStatisticsData[] | null;
  selectedPeriod: number = 7;
  labels!: string[];
  datas!: number[];
  dropdownOpen: boolean = false;
  chart!: ApexCharts;
  labelCount: number | undefined = 0

  constructor(private dataService: GraphService) { }

  ngOnInit() {
    this.subscribeToData();
  }

  subscribeToData() {
    if (this.graph === graphTypes.Users) {
      this.dataService.userStatistics$.subscribe(data => {
        this.data = data;
        this.labelCount = data?.length
        this.updateGraph();
      });
    } else if (this.graph === graphTypes.Posts) {
      this.dataService.postStatistics$.subscribe(data => {
        this.data = data;
        this.labelCount = data?.length
        this.updateGraph();
      });
    } else if (this.graph === graphTypes.Trips) {
      this.dataService.tripStatistics$.subscribe(data => {
        this.data = data;
        this.labelCount = data?.length
        this.updateGraph();
      });
    }
  }

  onChange(period: number) {
    this.selectedPeriod = period;
    this.onPeriodChange.emit(period);
    this.toggleDropdown();
  }

  isSelected(period: number): boolean {
    return this.selectedPeriod === period;
  }

  updateGraph() {
    if (this.data) {
      this.labels = this.data.map(item => item._id);
      this.datas = this.data.map(item => item.count);
      if (this.chart) {
        this.chart.updateSeries([{
          name: `New ${this.graph}`,
          data: this.datas
        }]);
        this.chart.updateOptions({
          xaxis: {
            categories: this.labels
          }
        });
      } else {
        this.initChart();
      }
    }
  }

  initChart() {
    const options = {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0
        },
      },
      series: [{
        name: `New ${this.graph}`,
        data: this.datas,
        color: "#1A56DB",
      }],
      xaxis: {
        categories: this.labels,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };

    this.chart = new ApexCharts(this.chartElement.nativeElement, options);
    this.chart.render();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  getPeriodText(period: number): string {
    switch (period) {
      case 1:
        return 'Yesterday';
      case 0:
        return 'Today';
      case 7:
        return 'Last 7 days';
      case 30:
        return 'Last 30 days';
      case 90:
        return 'Last 90 days';
      default:
        return 'Last 7 days';
    }
  }
}
