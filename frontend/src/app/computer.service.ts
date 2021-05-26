import { Injectable } from '@angular/core';
import { Computer } from './computer'
import { Response } from './response'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private computersUrl = 'http://localhost:8080/computers';

  constructor(private http: HttpClient) { }

  getComputers(pageLimit: Number, pageNumber: Number, filters: Object): Observable<Response> {
    const qry = `/search?limit=${pageLimit}&page=${pageNumber}`;
    const computers = this.http.post<Response>(this.computersUrl + qry, filters);
    return computers;
  }

  getCPU(): Observable<JSON> {
    const qry = '/cpu';
    const res = this.http.get<JSON>(this.computersUrl + qry);
    return res;
  }
  getRAM(): Observable<JSON> {
    const qry = '/ram';
    const res = this.http.get<JSON>(this.computersUrl + qry);
    return res;
  }
  getOpSys(): Observable<JSON> {
    const qry = '/opsys';
    const res = this.http.get<JSON>(this.computersUrl + qry);
    return res;
  }
  getInches(): Observable<JSON> {
    const qry = '/inches';
    const res = this.http.get<JSON>(this.computersUrl + qry);
    return res;
  }
}
