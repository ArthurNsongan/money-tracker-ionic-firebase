import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  moneyTransactions: any;
  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) {
    this.firebaseService.getTransactions().subscribe((res: any) => {
      this.moneyTransactions = res.map(e => {
        return {
          id: e.payload.doc.id,
          type: e.payload.doc.data()['type'],
          title: e.payload.doc.data()['title'],
          subTitle: e.payload.doc.data()['subTitle'],
          amount: e.payload.doc.data()['amount'],
        }
      })
      console.log(this.moneyTransactions)
    }, (err: any) => {
      console.log(err);
    })
  }

  deleteTransaction(id) {
    this.firebaseService.deleteTransaction(id);
    this.router.navigateByUrl("/home")
  }

}
