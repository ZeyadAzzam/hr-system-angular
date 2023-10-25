import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from '../classes/announcement';
import { AnnouncementService } from '../services/announcement.service';


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {


  announcement: Announcement = new Announcement();
  announcements: Announcement[] = [];
  id:number= 0;
  isEditMode: boolean = false;

  constructor(private announcementService: AnnouncementService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
      this.getAnnouncements();



      this.id=this.route.snapshot.params['id'];
      this.announcementService.getAnnouncementById(this.id).subscribe(data =>{
        this.announcement=data;
      })
  }


  private getAnnouncements(){
    this.announcementService.getAnnouncementList().subscribe(data => {
      this.announcements = data;
    })
  }


  deleteAnnouncement(id:number){
    this.announcementService.deleteAnnouncement(id).subscribe( data =>{
      this.getAnnouncements();
    })
  }

  editAnnouncement(announcement: Announcement){
    this.announcement={...announcement};
    this.isEditMode = true;

  }


  saveAnnouncement(){
    this.announcementService.createAnnouncement(this.announcement).subscribe(data =>{
      this.getAnnouncements();
    })
  }

  onSubmit(){
    this.saveAnnouncement();
    this.router.navigate(['/announcements']);
  }

  onSubmitUpdate(){
   this.announcementService.updateAnnouncement(this.id,this.announcement).subscribe(data =>{
     this.router.navigate(['/announcements']);
   }) 
  }

}
