
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
  query$: any;

  
  calcQuery$: any[]=[];
  // calcQuery$: any[]=[];
  calcArr$:any[]=[];
  queryCount$:any[]=[]; //number of surveys submitted

  chartQuery$: any[] =[]
  questionTypeList$:any[]=[]

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
        this.getSurveyUrl(url)
        }

        setChartData(data:any){
          this.chartQuery$.push(data)
          console.log(this.chartQuery$,"this.chartQuery")
          return this.chartQuery$
        }

        getSurveyUrl(url:string){
          this.afs.collection('surveyCollect', ref => ref.where('uid', '==', url))
          .snapshotChanges().pipe(take(1)).subscribe((a: any) => {
            let arr: any[] = []
            a.forEach((b: any) => {
            let data = b.payload.doc.data()

            // console.log(data,"data, _service")
            arr.push(data)
            return arr
            });
            this.getSurveyStats(arr)
        })

      }
        
        getSurveyStats(arr:any){

          if(arr.length !== 0){
            // console.log(arr,"ARR")
            
            // arr.forEach((a:any, index:number) => {
            //   a.sections.forEach((b:any) => {
            //     console.log(b," i am b")

            //   });
            this.calcQuery$ = this.caculateStats(arr);
            

              // switch(arr.length !== 0 && arr[index].sections[index].questionType){ // need to account for sections with different question types****
              //   case 'Multichoice':
              //     this.calcQuery$ = this.caculateStats(arr);
              //     break;
              //   case 'Free Text':
              //     this.calcQuery$ = this.caculateStatsFT(arr);
              //     break;
              //   case 'True/False':
              //     this.calcQuery$ = this.caculateStats(arr);
              //     break;
              //   default: 
              //     this.calcQuery$ = [];
              // }
              this.queryCount$.push(arr.length) 
              let questionTypeArr:any[] = []
            arr.forEach((a:any) => {
              a.sections.forEach((b:any) => {
                questionTypeArr.push(b.questionType)
                return questionTypeArr
              });
              
            });
            this.questionTypeList$.push(this.filterTypes(questionTypeArr))
            
              // console.log(this.calcQuery$)
              this.calcArr$.push(this.calcQuery$)
              // console.log(this.calcArr$,"this.calcArr$")
            };
          }


          // console.log(this.calcArr$,"this.calcArr")
          // this.chartQuery$.push(arr)

          // return this.calcQuery$
        
          filterTypes(arr:any){
            let uniqueValues = arr.filter((item: any, i: any, ar: string | any[]) => ar.indexOf(item) === i);
            return uniqueValues
          }
        
        
// /*FREE TEXT QUESTIONTYPES */
//         caculateStatsFT(data: any){ // return list of free text data 
//           let arrTypedAnswers: any[] = []
//           // console.log(data[0].sections,"data[0].sections")
//           data.forEach((a:any) =>{
//             a.sections.forEach((b:any) =>{
//               return arrTypedAnswers.push({
//                 question:b.question, 
//                 selectedAnswer:b.selectedAnswer
//               })
//             })
          
//           })
//           // console.log(arrTypedAnswers,"arrTypedAnswers")
//           return arrTypedAnswers
//         }

  /*MULTICHOICE && TRUE/FALSE QUESTIONTYPES */
      caculateStats(data: any){
        // console.log(data,"DATA")
          let arrScoring: any[] = []
          let freeTextArr: any[] = []
          // console.log(arrScoring,"arrScoring")
          // console.log(data[0],"data[0]")
          //get all default question and answers as scoring template 
            data[0].sections.forEach((a:any, index:number) =>{
             
                if(a.questionType == "Free Text"){ //** need to fix true false value not appearing {answer:true} */
                  a.answers.forEach((b:any)=>{

                    return arrScoring.push({
                      id:index,
                      question:a.question,
                      answer:freeTextArr,
                      questionType:a.questionType
                  })   
                   })
                }else{
                  a.answers.forEach((b:any)=>{
                
                    return arrScoring.push({
                      id:index,
                      question:a.question,
                      answer:b.answer,
                      questionType:a.questionType,
                      value:0
                  })   
                   })
                }


  
            return arrScoring
            })
            console.log(arrScoring)
          //reducer to add value to each occurence via selectedAnswers example** {{question:x, answer:y, value:z}}, z = occurence 

          //create arrSelectedAnswers similar to arrScoring 
          let arrSelectedAnswers:any[] = []
          data.forEach((a:any) =>{
            a.sections.forEach((b: any) => {
              console.log(b.selectedAnswer)
              return arrSelectedAnswers.push({question:b.question, selectedAnswer:b.selectedAnswer,questionType:b.questionType})
            });
          return arrSelectedAnswers
          })
          console.log(arrSelectedAnswers,"arrSelectedAnswers")
          arrSelectedAnswers.forEach(a => {
            if(a.questionType == 'Free Text'){
              console.log(a.selectedAnswer)
              freeTextArr.push(a.selectedAnswer)
            } 
            arrScoring.forEach(b=>{
              if(a.question == b.question && a.selectedAnswer == b.answer){
                b.value ++ //updates arrScoring
              }
            
            })
            
          });

          return arrScoring

        }

  /*TRUE/FALSE QUESTIONTYPES */
  // caculateStatsBool(data: any){
  //   let arrScoring: any[] = []


  //   //get all default question and answers as scoring template 
  //   console.log(data[0],"data[0]")
  //     data[0].sections.forEach((a:any) =>{
  //       a.answers.forEach((b:any)=>{
  //        return arrScoring.push(
  //        {question:a.question, answer:'True',value:0},
  //        {question:a.question, answer:'False',value:0}
  //        ) 
  //       })
      
  //     return arrScoring
  //     })

  //     console.log(arrScoring,"arrScoring")

  //   //reducer to add value to each occurence via selectedAnswers example** {{question:x, answer:y, value:z}}, z = occurence 

  //   //create arrSelectedAnswers similar to arrScoring 
  //   let arrSelectedAnswers:any[] = []
  //   data.forEach((a:any) =>{
  //     a.sections.forEach((b: any) => {
  //       return arrSelectedAnswers.push({question:b.question, selectedAnswer:b.selectedAnswer})
  //     });
  //   return arrSelectedAnswers
  //   })

  //   arrSelectedAnswers.forEach(a => {
  //     arrScoring.forEach(b=>{
  //       if(a.question == b.question && a.selectedAnswer == b.answer){
  //         b.value ++ //updates arrScoring
  //       }
  //     })
      
  //   });

  //   return arrScoring

  //   }


    // section off surveydata into what chartQuery could read

      chartQuery(){
        let showData:any[] = []
        this.surveys.pipe(take(1)).subscribe(result => {
          showData.push(result)
            showData[0].forEach((a:any) =>{

          })


        })
        return showData
      

    }

  }
  


