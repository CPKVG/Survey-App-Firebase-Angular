import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })

export class SurveyService {
    private user: any;
    
    constructor(

        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        
        ) {
            afAuth.authState.subscribe(user => {
                this.user = user;
            })
        }
    
    createUserSurvey(data:[]){
        // return console.log(this.user.uid)
        return new Promise<any>((resolve, reject) =>{
            this.afs
                .collection("users")
                .doc(this.user.uid)
                .collection("surveys")
                .add(data)
                .then(res => {}, err => reject(err));
        });
    }
        

 

}

