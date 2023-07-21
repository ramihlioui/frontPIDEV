import { Injectable } from '@angular/core';
import {UserAuthService} from './user-auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Entity/UserModel';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  requestHeaders = new HttpHeaders({"No-Auth":"True"});
  requestHeaders2 = new HttpHeaders(    {"Authorization":"Bearer"+ `Bearer ${this.userAut.getToken()}`});

  PATH = "http://localhost:8080";
  constructor(private httpClient:HttpClient,private router:Router,private  userAut:UserAuthService) { }
 
  
  public getPosts(){
   
    console.log("getting posts");
    return  this.httpClient.get(this.PATH+"/post",{headers : this.requestHeaders2});
  }
  public deletePost(id){
   
    console.log("deleting posts");
    return  this.httpClient.delete(this.PATH+"/post/"+id,{headers : this.requestHeaders2});
  }
  public addComment(id,comm){
    const PostComment = comm;
    return  this.httpClient.post<any>(this.PATH+"/post/addComment/"+id,PostComment,{headers : this.requestHeaders2});

  }
  public addPost(post){
    const Post = post;
    return  this.httpClient.post<any>(this.PATH+"/post/",Post,{headers : this.requestHeaders2});
  }


  public addLike(id,like){
    const PostLike = like;
    return  this.httpClient.post<any>(this.PATH+"/post/addLike/"+id,PostLike,{headers : this.requestHeaders2});

  }
  public searchPost(){

  }

}
