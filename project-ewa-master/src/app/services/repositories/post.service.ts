import {Injectable} from '@angular/core';
import {Post} from "../../model/post";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly ACCESS_URL: string = "http://localhost:8080/posts";
  private posts: Post[];

  constructor(private httpClient: HttpClient) {
    this.posts = [];
    this.findAll();
  }

  public findAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.ACCESS_URL);
  }

  public findById(id: number): Post {
    return undefined;
  }

  public save(entity: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.ACCESS_URL, entity);
  }

  public deleteById(id: number): boolean {
    return false;
  }

}
