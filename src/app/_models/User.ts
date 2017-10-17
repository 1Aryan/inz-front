
export class User{
	
	private name: string;
	private lastname: string;
	private year: number;
	private email: string;
	private phone: string;
	private password: string;
  private role: string;
  private id: number;
  
	private team_id: number;
	private position: string;
	private category: string;
constructor(){}

  public setName(name: string){this.name = name}
  public setLastName(lastname: string){this.lastname = lastname}
  public setEmail(email: string){this.email = email}
  public setPhone(phone: string){this.phone = phone}
  public setYear(year: number){this.year = year}
  public setPassword(password: string){this.password = password}
  public setCategory(category : string){this.category = category}
  public setPosition(position: string){this.position = position}
  public setRole(role: string){this.role = role}

  public getName(){return this.name}
  public getLastName(){return this.name}
  public getEmail(){return this.email}
  public getPhone(){return this.phone}
  public getYear(){return this.year}
  public getPassword(){return this.password}
  public getCategory(){return this.category}
  public getPosition(){return this.position}
}