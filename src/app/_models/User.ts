

export class User{
	
	private name: string;
	private lastname: string;
	private year: number;
	private email: string;
	private phone: string;
	private password: string;
  private role: string;
  private id: number;


	private category: string;

  

  public setName(name: string){this.name = name}
  public setLastName(lastname: string){this.lastname = lastname}
  public setEmail(email: string){this.email = email}
  public setPhone(phone: string){this.phone = phone}
  public setYear(year: number){this.year = year}
  public setPassword(password: string){this.password = password}
  public setCategory(category : string){this.category = category}
  public setRole(role: string){this.role = role}
  // public setTeamId(teamId : number){this.teamId = teamId}

  // public getTeamId(){return this.teamId}
  public getName(){return this.name}
  public getLastName(){return this.name}
  public getEmail(){return this.email}
  public getPhone(){return this.phone}
  public getYear(){return this.year}
  public getPassword(){return this.password}
  public getCategory(){return this.category}

}