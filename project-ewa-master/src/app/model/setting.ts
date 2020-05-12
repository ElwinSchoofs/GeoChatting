export class Setting{
  id: number;
  name: string;
  content: string;

  constructor(id: number, name: string, content: string) {
    this.id = id;
    this.name = name;
    this.content = content;
  }

  getName(){
    return this.name;
  }

  getContent(){
    return this.content;
  }
  getId(){
    return this.id;
  }
  setName(_name: string){
    this.name = _name;
  }
  setContent(_content: string){
    this.content= _content;
  }

  static returnObject(settings: Setting) {
    return new Setting(settings.id, settings.name, settings.content);
  }
}
