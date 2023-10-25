import { Component, OnInit } from '@angular/core';
import { Project } from '../classes/project';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  isFormVisible: boolean = false;

  project:Project = new Project();
  projects: Project[] = [];
  searchQueryName: string = '';
  id: number =0;
  isEditMode: boolean = false;

  constructor(private projectService: ProjectService,private router:Router,  private activatedRoute: ActivatedRoute,private route:ActivatedRoute){}
  
  toggleProjectForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  ngOnInit(): void {
      this.getProject()


      this.id=this.route.snapshot.params['id'];

      this.projectService.getProjectById(this.id).subscribe(data =>{
        this.project=data;
      })
  }


  private getProject() {
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data;
    })
  }

  deleteProject(id:number){
    this.projectService.deleteProject(id).subscribe( data =>{
      this.getProject();
    })
  }

  editProject(project: Project){
    this.project={...project};
    this.isFormVisible = true;
    this.isEditMode = true;
  }

  saveProject() {
    this.projectService.createProject(this.project).subscribe(data =>{
      this.getProject();
    })
  }


  gotoProjectList(){
    this.router.navigate(['/project'])
  }

  onSubmit() {
    this.saveProject();
    this.router.navigate(['.'], { relativeTo: this.activatedRoute });
  }



  //search bar
  resetProjectList() {
    this.getProject();
  }

  searchProject() {
    if (this.searchQueryName.trim() === '') {

      this.resetProjectList();
    } else {

      this.projects = this.projects.filter(project => {
        const Name = `${project.projectName}`;
        return Name.toLowerCase().includes(this.searchQueryName.toLowerCase());
      });
    }
  }


  //Update
  onSubmitUpdate(){
    this.projectService.updateProject(this.id,this.project).subscribe( data =>{
      this.gotoProjectList();
      
    })
  }


  getStatus(project: any): string {
    const currentDate = new Date();
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
  
    if (currentDate < startDate) {
      return "Upcoming";
    } else if (currentDate >= startDate && currentDate <= endDate) {
      return "Ongoing";
    } else {
      return "Finished";
    }
  }
}
