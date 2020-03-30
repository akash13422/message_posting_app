import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';





@Injectable({providedIn:'root'})

export class PostsService {
  private posts:Post[] =[];
  private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient){}



  getPosts(){
    this.http.get<{massage:string,posts:any}>('http://127.0.0.1:3000/api/posts')
    // .pipe(map((postData) => {

    // }))

   .subscribe((postData)=> {
       console.log('ddd');
       this.posts = postData.posts;
       this.postsUpdated.next(this.posts);
   });

 }

deletePost(postId:string){
  this.http.delete("http://127.0.0.1:3000/api/posts"+postId)
  .subscribe(()=>{
    console.log('Deleted!');
  });
}


  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }


  addPost(title:string,content:string){
    const post:Post = {id:null,title:title,content:content};
    this.http.post<{message:string}>("http://127.0.0.1:3000/api/posts",post).subscribe(
      responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next(this.posts);
      });
  }








}
