
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore  } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Survey } from '../services/survey.model'


@Injectable({ providedIn: 'root' })

  
export class SurveyService {

  surveys: Observable<Survey[]>;
  
  private user:any
  router: any;
  items: any;

  
    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        ) {
          //fetch subcollections
            this.surveys = this.afs.collectionGroup("surveys").snapshotChanges().pipe(
                map((actions: any[]) => actions.map(a => {
                  const data = a.payload.doc.data() as Survey;
                  const uid = a.payload.doc.id
                  return {uid, ...data };
                }))
              );
              //get uid for users
              // this.afAuth.authState.pipe(
              //   switchMap(user => {
              //     if (user) {
              //       return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
              //     } else {
              //       return of(null);
              //     }
              //   })
              // );
              afAuth.authState.subscribe(user => {
                this.user = user;
            })


        }
    
    createUserSurvey(data:[]){

        const collections = this.afs.collection("users").doc(this.user.uid).collection("surveys")
        const _id = this.afs.createId(); // custom id for surveys **db structure : [users => uid => surveys => _id]**

        const _data = { 
          ...data, 
          id : _id 
        } 
        return collections.doc(_id).set(_data) //doc id is custom gen, since no way of fetching relavant doc.
    }

        getSurvey(routeId:string){
         return this.afs.collectionGroup('surveys').snapshotChanges().pipe(map(actions => {
              return actions.map(a => {

                const _id = a.payload.doc.id; // find if statement for routeId == id
                if(_id == routeId){
                  const data = a.payload.doc.data();
                  return data;
                }
              })
              
            })

          )

        }



  }


