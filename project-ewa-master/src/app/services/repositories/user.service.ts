import {Injectable} from '@angular/core';
import {User} from "../../model/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly ACCESS_URL: string = "http://localhost:8080/users";
  private updateUrl: string = "http://localhost:8080/users/";
  private users: User[];

  constructor(private httpClient: HttpClient) {
    this.users = [];
    this.findAll().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.users.push(User.returnObject(res[i]));
      }
    });
  }

  public findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.ACCESS_URL);
  }

  public findById(id: number): User {
    return undefined;
  }

  public deleteById(id: number): any {
    const url = this.updateUrl + id;
    return this.httpClient.delete<User>(url);
  }

  public save(entity: User): Observable<User> {
    this.users.push(entity);
    console.log(this.users);
    return this.httpClient.post<User>(this.ACCESS_URL, entity);
  }

  public update(entity: User): Observable<User> {
    const url = this.updateUrl + entity.getId();
    console.log(entity);
    return this.httpClient.put<User>(url, entity);
  }

  public addPoints(points: number, entity: User){
    const url = this.updateUrl + entity.getId() + "/add-points";
    return this.httpClient.post<User>(url, points);
  }

  public getUsers(): User[] {
    return this.users;
  }
}
