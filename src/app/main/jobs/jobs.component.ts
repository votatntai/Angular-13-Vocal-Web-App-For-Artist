import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  loading: boolean = false;

  projects: Project[];

  totalPage: number = 0;

  pageSize: number = 12;

  pageNumber: number = 1;

  isAsc: boolean = true;

  isProcess: boolean = false;

  constructor(private service: ProjectService) { }

  ngOnInit(): void {
    this.getArtistProject();
  }

  private getArtistProject() {
    this.service.getArtistProject(this.pageNumber, this.pageSize, this.isAsc, this.isProcess).subscribe(result => {
      if (result.body != null) {
        var response: any = result.body;
        var totalRow = response['totalRow'];
        this.totalPage = Math.ceil(totalRow / this.pageSize);
        this.projects = response['data'];
        this.loading = true;
      }
    });
  }

  nextPage() {
    if (this.pageNumber < this.totalPage) {
      this.loading = false;
      this.pageNumber += 1;
      this.getArtistProject();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.loading = false;
      this.pageNumber -= 1;
      this.getArtistProject();
    }
  }

  specificPage(number: number) {
    this.loading = false;
    this.pageNumber = number;
    this.getArtistProject();
  }

}
