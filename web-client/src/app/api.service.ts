import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatSpinner} from '@angular/material/progress-spinner';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host = 'http://localhost:8080/';
  private authUrl = this.host + 'auth/';
  private calendarUrl = this.host + 'calendar';
  private databaseUrl = this.host + 'database';
  private customerUrl = this.host + 'customer';
  private managedProjectUrl = this.host + 'project';
  private employeeUrl = this.host + 'employee';
  private projectUrl = this.host + 'user/project';
  private vacationUrl = this.host + 'user/vacation';
  private reportUrl = this.host + 'user/report';
  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();
  private _token: string;

  constructor(private http: HttpClient, private overlay: Overlay) { }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  login(tokenRequest) {
    return this.http.post(this.authUrl + 'token', tokenRequest);
  }

  loadProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.projectUrl, this.getAuthHeaders());
  }

  loadTasks(projectId): Observable<any[]> {
    return this.http.get<any[]>(`${this.projectUrl}/${projectId}/task`, this.getAuthHeaders());
  }

  createTask(projectId, task): Observable<any> {
    return this.http.post<any[]>(`${this.projectUrl}/${projectId}/task`, task, this.getAuthHeaders());
  }

  updateTask(projectId, task): Observable<any> {
    return this.http.put<any[]>(`${this.projectUrl}/${projectId}/task`, task, this.getAuthHeaders());
  }

  loadReports(): Observable<any[]> {
    return this.http.get<any[]>(this.reportUrl, this.getAuthHeaders());
  }

  createReport(report): Observable<any[]> {
    return this.http.post<any[]>(this.reportUrl, report, this.getAuthHeaders());
  }

  updateReport(report): Observable<any[]> {
    return this.http.put<any[]>(this.reportUrl, report, this.getAuthHeaders());
  }

  loadVacations(): Observable<any[]> {
    return this.http.get<any[]>(this.vacationUrl, this.getAuthHeaders());
  }

  requestVacation(vacation): Observable<any> {
    return this.http.post<any[]>(this.vacationUrl, vacation, this.getAuthHeaders());
  }

  loadTeamVacations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.vacationUrl}/team`, this.getAuthHeaders());
  }

  loadManagedVacations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.vacationUrl}/managed`, this.getAuthHeaders());
  }

  acceptVacation(vacationId): Observable<any> {
    return this.http.post<any[]>(`${this.vacationUrl}/${vacationId}/accept`, null, this.getAuthHeaders());
  }

  rejectVacation(vacationId): Observable<any> {
    return this.http.post<any[]>(`${this.vacationUrl}/${vacationId}/reject`, null, this.getAuthHeaders());
  }

  loadCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.customerUrl, this.getAuthHeaders());
  }

  createCustomer(customer) {
    return this.http.post<any>(this.customerUrl, customer, this.getAuthHeaders());
  }

  updateCustomer(customer) {
    return this.http.put<any>(`${this.customerUrl}/${customer.id}`, customer, this.getAuthHeaders());
  }

  deleteCustomer(customer) {
    return this.http.delete<any>(`${this.customerUrl}/${customer.id}`, this.getAuthHeaders());
  }

  loadPositions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.employeeUrl}/position`, this.getAuthHeaders());
  }

  changePositions(userId, position): Observable<any> {
    return this.http.post<any>(`${this.employeeUrl}/${userId}/position`, position, this.getAuthHeaders());
  }

  giveBonus(userId, bonus): Observable<any> {
    return this.http.post<any>(`${this.employeeUrl}/${bonus.project.id}/${userId}/bonus`, bonus, this.getAuthHeaders());
  }

  loadEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.employeeUrl, this.getAuthHeaders());
  }

  loadManagedProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.managedProjectUrl, this.getAuthHeaders());
  }

  createProject(project): Observable<any[]> {
    return this.http.post<any[]>(this.managedProjectUrl, project, this.getAuthHeaders());
  }

  updateProject(project): Observable<any[]> {
    return this.http.put<any[]>(this.managedProjectUrl, project, this.getAuthHeaders());
  }

  attachProject(project): Observable<any> {
    return this.http.post<any>(`${this.managedProjectUrl}/${project.id}/attach`, null, this.getAuthHeaders());
  }

  endProject(project, endDate): Observable<any> {
    return this.http.post<any>(`${this.managedProjectUrl}/${project.id}/finish?finishDate=${endDate}`, null, this.getAuthHeaders());
  }

  loadCalendars(): Observable<any[]> {
    return this.http.get<any[]>(this.calendarUrl, this.getAuthHeaders());
  }

  addCalendar(calendar): Observable<any> {
    return this.http.post<any>(this.calendarUrl, calendar, this.getAuthHeaders());
  }

  deleteCalendar(calendar): Observable<any> {
    return this.http.delete<any>(`${this.calendarUrl}/${calendar.id}`, this.getAuthHeaders());
  }

  loadHolidays(calendar) {
    return this.http.get<any[]>(`${this.calendarUrl}/${calendar.id}/holiday`, this.getAuthHeaders());
  }

  loadCurrentHolidays() {
    return this.http.get<any[]>(`${this.calendarUrl}/holiday`, this.getAuthHeaders());
  }

  createHoliday(calendar, holiday) {
    return this.http.post<any>(`${this.calendarUrl}/${calendar.id}/holiday`, holiday, this.getAuthHeaders());
  }

  deleteHoliday(calendar, holiday) {
    return this.http.delete<any>(`${this.calendarUrl}/${calendar.id}/holiday/${holiday.id}`, this.getAuthHeaders());
  }

  loadUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.authUrl + 'user', this.getAuthHeaders());
  }

  createUser(user) {
    return this.http.post<any>(this.authUrl + 'user', user, this.getAuthHeaders());
  }

  updateUser(user) {
    return this.http.put<any>(`${this.authUrl}user`, user, this.getAuthHeaders());
  }

  deleteUser(user) {
    return this.http.delete<any>(`${this.authUrl}user/${user.id}`, this.getAuthHeaders());
  }

  backupDatabase() {
    return this.http.post(`${this.databaseUrl}/backup`, null, { responseType: 'text', headers: this.getAuthHeaders().headers });
  }

  restoreDatabase(file) {
    const formData = new FormData();
    console.log(file);
    formData.append('file', file, file.name.split('.')[0]);
    return this.http.post(`${this.databaseUrl}/restore`, formData,
        {
          headers: this.getAuthHeaders().headers
        });
  }

  executeInDatabase(query) {
    return this.http.post(`${this.databaseUrl}/exec`, query, this.getAuthHeaders());
  }

  private getAuthHeaders() {
    return {headers: {'Authorization': this.token}};
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically()
    });
  }

  //TODO: add stopSpinner inside finalize<T>(callback: () => void): MonoTypeOperatorFunction<T> to all http calls
  private showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(MatSpinner));
  }

  private stopSpinner() {
    this.spinnerRef.detach();
  }
}
