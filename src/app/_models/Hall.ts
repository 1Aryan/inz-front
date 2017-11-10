
export class Hall{
	private description:string;
	private price:string;
	private adress:string;
	private city:string;
	private number:string;

  public setDescription(description: string){this.description = description}
  public setPrice(price: string){this.price = price}
  public setAdress(adress: string){this.adress = adress}
  public setCity(city: string) {this.city =city}
  public setNumber(number: string){this.number = number}
 
  public getDescription(){return this.description}
  public getPrice(){return this.price}
  public getAdress(){return this.adress}
  public getCity(){return this.city}
  public getNumber(){return this.number}
}