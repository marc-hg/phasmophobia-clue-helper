import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GhostsService {
  ghosts: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.ghosts = firestore.collection('ghosts').valueChanges();
  }
}
