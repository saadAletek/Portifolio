import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { myWork } from '../../app/pageData'

@Component({
  selector: 'app-work-details',
  standalone: true,
  imports: [],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.scss'
})
export class WorkDetailsComponent {
  id: string | null = null;
  allWorks = myWork;
  activatedWork : any

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.filterWorkById()
  }

  filterWorkById(): void {
    if (this.id) {
      this.activatedWork = this.allWorks.find(work => work.id === parseInt(this.id!, 10));
    }
  }


}
