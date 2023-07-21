import { Component, EventEmitter, Output } from '@angular/core';
import { retry } from 'rxjs';
import { ForumService } from 'src/app/services/forum.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
      constructor(private forumService : ForumService,private  userAut:UserAuthService){}
//    k: this.userAut.getToken();
  public focus: boolean;
  visiblePopup: boolean =false;
  textareaValue: string = '';
  imguser ="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-avatar&psig=AOvVaw0NMC--lwzVgNZkyWW4DK6b&ust=1689975606299000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjclfCfnoADFQAAAAAdAAAAABAE";
   loaded: boolean;
  Posts : any;

  ngOnInit(): void {
   this.loadData();
   this.Posts.reverse();
    console.log("pooooooosts",this.Posts);

  }
  async loadData() {
    try {
    const a = await this.forumService.getPosts().toPromise();
    console.log("pooooooosts in",a);
    this.Posts=a;
    // const likeLength=a.postComments.size();
    this.loaded=true;
      // You can use the variable 'a' here after the asynchronous operation is completed.
    } catch (error) {
      // Handle errors if any
      console.log(error);
      alert(error.error);
      this.loaded=false;
    //   return false;
    }
  }
  async deletPost(id){
    try {
        const a = await this.forumService.deletePost(id).toPromise();
        this.loadData();
    } catch (error) {
        console.log(error)
    }
  }
  async addComment(id,comm){
    try {
      
      const  comment =  {
            "commentBody":comm,
        };
        console.log('Adding comment:', comment);
         const a = await this.forumService.addComment(id,comment).toPromise();
        
         this.loadData();
    // Reset the textarea value after adding the comment if needed
    
        // this.loadData();
    } catch (error) {
        console.log(error)
        alert(error.error);
    }
  }
  async addLike(id){
    try {
      
      const  PostLike =  {
        "isLiked":true
        };
         const a = await this.forumService.addLike(id,PostLike).toPromise();
         this.loadData();
    // Reset the textarea value after adding the comment if needed
    
        // this.loadData();
    } catch (error) {
        console.log(error)
        alert(error.error);
    }
  }
  async addPost(postTitle,postbody){
    try {
      
      const  post =  {
            "postTitle":postTitle,
            "body":postbody
        };
        console.log('Adding post:', post);
         const a = await this.forumService.addPost(post).toPromise();
         this.visiblePopup=false;
        this.closePopup.emit(null);

         this.loadData();
    // Reset the textarea value after adding the comment if needed
    
        // this.loadData();
    } catch (error) {
        console.log(error)
        alert(error.error);
    }
  }
  
  
//   openSearch(word) {
// //   const result= this.Posts.filter(e=>e.postTitle==word);
// for(const p in this.Posts){
// if
// }

// }
inputValue: string = '';

@Output() closePopup: EventEmitter<string> = new EventEmitter<string>();

onCancelClick(): void {
  this.closePopup.emit(null); // Emit null to indicate cancel
}

onOKClick(title,body): void {
  this.closePopup.emit(this.inputValue);
}
// closeSearch() {
//     document.body.classList.remove("g-navbar-search-shown");
//     setTimeout(function () {
//         document.body.classList.remove("g-navbar-search-show");
//         document.body.classList.add("g-navbar-search-hiding");
//     }, 150);
//     setTimeout(function () {
//         document.body.classList.remove("g-navbar-search-hiding");
//         document.body.classList.add("g-navbar-search-hidden");
//     }, 300);
//     setTimeout(function () {
//         document.body.classList.remove("g-navbar-search-hidden");
//     }, 500);
// }

}
