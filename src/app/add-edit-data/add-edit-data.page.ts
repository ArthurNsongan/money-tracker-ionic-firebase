import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-edit-data',
  templateUrl: './add-edit-data.page.html',
  styleUrls: ['./add-edit-data.page.scss'],
})
export class AddEditDataPage implements OnInit {

  isEdit: boolean;
  loading:boolean;
  id: string;
  title: string;
  type: string;
  subTitle: string;
  amount: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
  ) { 
    this.loading = false;
    this.route.params.subscribe((data: any) => {
      console.log(data);
      if(data.type == 'add') {
        this.isEdit = false;
      } else {
        this.isEdit = true;
        this.id = data.id;
      }
      this.firebaseService.getSingleTransaction(data.id).subscribe((data: any) => {
        this.type = data.type;
        this.title = data.title;
        this.subTitle = data.subTitle;
        this.amount = data.amount;
      })
    })
  }

  ngOnInit() {
  }

  addTransaction() {
    this.loading = true;
    let data = {
      type: this.type,
      title: this.title,
      subTitle: this.subTitle,
      amount: this.amount
    }

    this.isEdit === false ? this.firebaseService.addTransactionToCollection(data).then((res: any) => {
      console.log(res);
      this.loading = false;
      this.router.navigateByUrl('/home') 
    }) : this.firebaseService.updateTransactionToCollection(this.id, data).then((res: any) => {
      console.log(res);
      this.loading = false;
      this.router.navigateByUrl('/home') 
    });
  }

}
