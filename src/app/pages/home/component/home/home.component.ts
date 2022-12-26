import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('input') input!: ElementRef;

  displayedColumns: string[] = ['position', 'name', 'web', 'domain', 'country'];

  universityList: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 50;
  tableSizes: any = [3, 6, 9, 12];

  isLoading: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getUsUniversity();
  }

  //Get All US University
  getUsUniversity(): void {
    this.isLoading = true;
    this.homeService.getUsUniversity().subscribe(
      (response) => {
        this.isLoading = false;
        this.universityList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    // For searching keyup
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(160), // maximum 1 req every 150ms
        distinctUntilChanged(), // eliminate duplicate value
        tap(() => {
          this.searchUniversity();
        })
      )
    .subscribe();
  }

  //Search University by Name
  searchUniversity() {
    this.isLoading = true;
    this.homeService.getUsUniversityByName(
      this.input.nativeElement.value
    ).subscribe(
      (response) => {
        this.isLoading = false;
        this.universityList = response;
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getUsUniversity();
  }
  
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUsUniversity();
  }

}
