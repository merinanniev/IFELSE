import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import * as Highcharts from 'highcharts';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EditMemberComponent } from '../edit-member/edit-member.component';

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.scss']
})
export class RightContainerComponent implements OnInit {
  select_all = false;
  columnHeader = {};
  dataSource = new MatTableDataSource<any>();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  selection = new SelectionModel(true, []);
  isselected: boolean;
  tableLength: number;
  constructor(private service: ApiServicesService,public dialog: MatDialog) { }
  displayedColumns = ['select', 'name', 'status', 'role', 'license', 'teams', 'action']

  ngOnInit() {
    this.createCharts();
    this.getTeamMembers();
  }

  getTeamMembers() {
    this.service.getTeamMembers().subscribe(data => {
      this.dataSource.data = data.grid_data
      data.grid_columns.forEach(element => {
        this.columnHeader[element.column_key] = element.column_name
      });
      this.tableLength  = this.dataSource.data.length;
      this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
      this.dataSource.paginator = this.paginator.toArray()[0];
    })
  }

  deleteTeamMember(id: any) {
    let i = this.dataSource.data.findIndex(x => x.id == id)
    this.dataSource.data.splice(i, 1)
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.tableLength = this.dataSource.data.length
  }

  editTeamMember(id: any) {
    this.dialog.open(EditMemberComponent, {
      width: '500px',
      data: {memberInfo:id}
    });
  }

  onSelectAll(e: any): void {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      const item = this.dataSource.data[i];
      item.isselected = e;
    }
  }

  createCharts() {
    // @ts-ignore
    this.chart1 = Highcharts.chart('container1', {
      chart: {
        type: 'column',
        height: 300
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          text: 'Month',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Security Rating',
        },
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
      credits: {
        enabled: false
      },
      series: [
        {
          data: [39, 49, 40, 20, 50, 10, 20, 30, 40, 80, 10, 17],
          color: '#E6E6FA'
        },
        {
          data: [20, 20, 30, 20, 10, 10, 20, 30, 40, 80, 10, 17],
          color: '#7373E3'
        },
        {
          data: [15, 30, 40, 70, 20, 10, 20, 30, 40, 80, 10, 17],
          color: '#4D4DDB'
        }

      ],
    });
    // @ts-ignore
    this.chart2 = Highcharts.chart('container2', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: 300
      },
      title: {
        text: '',
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: [
          ['', 73.86],
          ['', 11.97],

        ]
      }], colors: ['#7373E3', '#E6E6FA'],
    });
  }
}
