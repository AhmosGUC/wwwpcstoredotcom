import { Component, OnInit } from '@angular/core';
import { Computer } from '../computer';
import { Response } from '../response'
import { ComputerService } from '../computer.service';
import { PageEvent } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css']
})
export class ComputerListComponent implements OnInit {
  response: Response;
  computers: Computer[] = [];
  pageLimit: Number = 10;
  pageNumber: Number = 1;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  gridCol: Number;
  cpuOpt: string[] = [];
  ramOpt: string[] = [];
  opSysOpt: string[] = [];
  inchesOpt: string[] = [];
  companyQry: string = "";
  productQry: string = "";
  cpuQry: string[] = [];
  ramQry: string[] = [];
  opSysQry: string[] = [];
  inchesQry: string[] = [];
  filters: Object = {};

  constructor(private computerService: ComputerService, private deviceService: DeviceDetectorService) { }




  ngOnInit() {
    this.response = new Response(0, 0, []);
    this.setGridSize();
    this.getOptions();
    this.getComputers();
  }
  onResize(event) {
    this.setGridSize();
  }
  setGridSize(): void {
    if (window.innerWidth <= 600) {
      this.gridCol = 1;
    } else if (window.innerWidth <= 1000) {
      this.gridCol = 2;
    } else {
      this.gridCol = 3;
    }
  }
  getOptions(): void {
    this.computerService.getCPU().subscribe(result => {
      const res = result['cpus'].sort();
      this.cpuOpt = res;
    });
    this.computerService.getRAM().subscribe(result => {
      const res = result['rams'].sort();
      this.ramOpt = res;
    });
    this.computerService.getOpSys().subscribe(result => {
      const res = result['opsys'].sort();
      this.opSysOpt = res;
    });
    this.computerService.getInches().subscribe(result => {
      const res = result['inches'].sort();
      this.inchesOpt = res;
    });

  };
  getComputers(): void {
    this.computerService.getComputers(this.pageLimit, this.pageNumber, this.filters).subscribe(response => {
      this.response = response
      this.computers = this.response.result;
    }
    );
  }
  pageChangeEventHandler(event: PageEvent): void {
    this.pageLimit = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.getComputers();
  }

  searchReq(): void {
    this.filters = {
      company: this.companyQry,
      product: this.productQry,
      cpu: this.cpuQry,
      ram: this.ramQry,
      opSys: this.opSysQry,
      inches: this.inchesQry
    };
    this.getComputers();
  }
}
