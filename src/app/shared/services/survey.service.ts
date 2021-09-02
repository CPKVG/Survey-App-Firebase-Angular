
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore  } from '@angular/fire/firestore';
import { flatMap, map, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Survey } from '../services/survey.model'


@Injectable({ providedIn: 'root' })

  
export class SurveyService {

  surveys: Observable<Survey[]>;
  
  private user:any
  router: any;
  items: any;
  query$: any;
  calcQuery$: any;

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

        getSurvey(routeId:string){ //fetch data for participants to read {users => doc => surveys => doc}
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


        createCollectionSurvey(data:[]){
          const collections = this.afs.collection("surveyCollect")

          return collections.add(data)
          // const _id = this.id
          

        }

        //data from participants collective data {surveyCollect => doc}
        getSurveyDetail(url:string){
        
        this.afs.collection('surveyCollect', ref => ref.where('uid', '==', url))
          .snapshotChanges().pipe(take(1)).subscribe((a: any) => {
            let arr: any[] = []
            a.forEach((b: any) => {
            let data = b.payload.doc.data()
            
            arr.push(data)
            return arr
            });
            console.log(arr)
            this.query$ = arr
            
            this.calcQuery$ = this.caculateStats(arr)
            
            return this.calcQuery$, this.query$

        })
        
        } 
  
        caculateStats(data: any){
          let arrScoring: any[] = []

          //get all default question and answers as scoring template 
          data[0].sections.forEach((a:any) =>{
            a.answers.forEach((b:any)=>{
             return arrScoring.push({question:a.question, answer:b.answer,value:0}) 
            })
          return arrScoring
          })
          //reducer to add value to each occurence via selectedAnswers example** {{question:x, answer:y, value:z}}, z = occurence 

          //create arrSelectedAnswers similar to arrScoring 
          let arrSelectedAnswers:any[] = []
          data.forEach((a:any) =>{
            a.sections.forEach((b: any) => {
              return arrSelectedAnswers.push({question:b.question, selectedAnswer:b.selectedAnswer})
            });
          return arrSelectedAnswers
          })

          arrSelectedAnswers.forEach(a => {
            arrScoring.forEach(b=>{
              if(a.question == b.question && a.selectedAnswer == b.answer){
                b.value ++ //updates arrScoring
              }
            })
            
          });
          console.log(arrScoring)
          return arrScoring

        }
        
    }




