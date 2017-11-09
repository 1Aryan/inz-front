
export class Team{
	private description:string;
	private city:string;
	private name:string;

  public setDescription(description: string){this.description = description}
  public setCity(city: string) {this.city =city}
  public setName(name: string){this.name = name}
 
  public getDescription(){return this.description}
  public getCity(){return this.city}
  public getName(){return this.name}
}