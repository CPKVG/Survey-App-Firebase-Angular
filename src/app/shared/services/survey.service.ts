
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore  } from '@angular/fire/firestore';
import { map, switchMap, take, tap } from 'rxjs/operators';
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

  calcQuery$: any[]=[];
  // calcQuery$: any[]=[];
  calcArr$:any[]=[];
  queryCount$:any[]=[]; //number of surveys submitted


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


    deleteUserSurvey(url:any){//delete doc subcollection of surveys 

      const collections = this.afs.collection("users").doc(this.user.uid).collection("surveys").doc(url)
      collections.delete()

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
          console.log(url,"url, _service")
          // this.calcQuery$ = []
        this.afs.collection('surveyCollect', ref => ref.where('uid', '==', url))
          .snapshotChanges().pipe(take(1)).subscribe((a: any) => {
            let arr: any[] = []
            a.forEach((b: any) => {
            let data = b.payload.doc.data()

            console.log(data,"data, _service")
            arr.push(data)
            
            return arr
            });
            console.log(arr,"arr,_service")

            this.query$ = arr

            //if gate (when no ones submitted a survey)
            console.log(arr.length, "arr length")
            if(arr.length !== 0){
              this.calcQuery$ = this.caculateStats(arr)
            }else{
              this.calcQuery$ = []
            }
            // console.log(this.calcQuery$,"calcQuery$")
            this.queryCount$.push(arr.length) //no of surveys
            
            this.calcArr$.push(this.calcQuery$)
            // console.log(this.query$,"this.Query")
            return this.calcQuery$

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



        // surveyDownloadData(url:string, fileType:string){ 
        //   console.log(url,  "url")
        //   this.getSurveyDetail(url)
          
        //   console.log(this.calcQuery$, "calcQuery in surveyDownloadData ")
        //   let fileName = ''
        //   // const data = ''
        //   if(fileType == 'json'){ 
        //     fileName = url + ".txt";
        //   }
        //   if(fileType == 'csv'){
        //     fileName = url + ".cvs";
        //   }

        //   // const fileName = url + fileType;
        //   console.log(fileName,"fileName")
        //   const blob = new Blob([JSON.stringify(this.calcQuery$)], { type: 'application/json' });
        //   // var a = document.createElement("a");
        //   // a.href = URL.createObjectURL(blob);
          
        //   // a.download = fileName;
        //   // a.click();
        //   return {blob, fileName }
        // } 


        
    }




