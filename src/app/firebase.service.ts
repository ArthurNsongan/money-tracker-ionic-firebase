import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName = "money-track-ionic"
  constructor(
    private firestore: AngularFirestore
  ) { }

  getTransactions() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  addTransactionToCollection(data) {
    return this.firestore.collection(this.collectionName).add(data);
  }

  updateTransactionToCollection(id, data) {
    return this.firestore.doc(this.collectionName + '/' + id).update(data);
  }

  getSingleTransaction(id) {
    return this.firestore.doc(this.collectionName + '/' + id).valueChanges();
  }

  deleteTransaction(id) {
    return this.firestore.doc(this.collectionName + '/' + id).delete();
  }
}
