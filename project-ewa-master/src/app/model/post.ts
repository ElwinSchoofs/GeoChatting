import {User} from './user';

export class Post {
  id: number;
  message: string;
  latitude: number;
  longitude: number;
  attachmentPath: string;
  createdAt: Date;
  isActive: boolean;
  createdBy: User;
  viewed: User[] = [];

  /**
   * Creates a new instance of Post class.
   *
   * @param message The post's message
   * @param latitude The post's latitude position
   * @param longitude The post's longitude position
   * @param createdBy The post's creator
   * @param attachmentPath OPTIONAL: The post's attachment/image
   */
  constructor(message: string, latitude: number, longitude: number, createdBy: User,attachmentPath?: string) {
    this.message = message;
    this.latitude = latitude;
    this.longitude = longitude;
    this.attachmentPath = attachmentPath;
    this.createdAt = new Date();
    this.createdBy = createdBy;
    this.isActive = true;
  }

  addView(user: User) {
    this.viewed.push(user);
  }

  getViews() {
    return this.viewed;
  }

  /**
   * This methods builds up a real instance of this class. Some objects in
   * Typescript might look like an instance of a class, but it's not. It does
   * have the same properties, however it doesn't have access to the class' methods.
   * This method prevents this by recreating the object.
   *
   * @param post
   */
  static returnObject(post: Post){
    let newPost: Post = new Post(post.message, post.latitude, post.longitude, post.createdBy);
    newPost.id = post.id;
    newPost.createdAt = post.createdAt;
    newPost.isActive = post.isActive;
    newPost.viewed = post.viewed;
    return newPost;
  }
}
