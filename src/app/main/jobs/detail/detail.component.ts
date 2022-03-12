import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetail } from 'src/app/models/project-detail.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  loading: boolean = false;

  id: string;

  projectDetail: ProjectDetail;

  constructor(private router: ActivatedRoute, private service: ProjectService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getProjectById();
  }

  getProjectById() {
    this.service.getProjectDetail(this.id).subscribe(result => {
      if (result.body != null) {
        var response: any = result.body;
        this.projectDetail = response;
        this.loading = true;
      }
    });
  }

}
