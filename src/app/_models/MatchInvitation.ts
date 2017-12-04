
export class MatchInvitation{
public hallId:number;
public refId:number;
public date: Date;
public hour:string;
public teamA_id:number;
public teamB_id:number;
public salary:String;


	public setHallId(hallId: number){this.hallId=hallId}
	public setRefId(refId:number){this.refId=refId}
	public setDate(date: Date){this.date=date}
	public setHour(hour: string){this.hour=hour}
	public setTeamA(teamA_id: number){this.teamA_id=teamA_id}
	public setTeamB(teamB_id: number){this.teamB_id=teamB_id}
	public setSalary(salary:String){this.salary=salary}
}