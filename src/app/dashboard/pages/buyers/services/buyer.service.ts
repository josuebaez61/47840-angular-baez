import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Buyer, CreateBuyerPayload } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BuyerService {
  private _buyers$ = new BehaviorSubject<Buyer[]>([]);
  private readonly baseUrl = environment.baseApiUrl + '/buyers';
  public buyers$ = this._buyers$.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadBuyers(): void {
    this.httpClient.get<Buyer[]>(this.baseUrl).subscribe({
      next: (buyers) => {
        this._buyers$.next(buyers); // EMITIR LOS DATOS AL BEHAVIOR SUBJECT
      },
      error: () => {
        // MANEJAR ERROR AL CARGAR LOS COMPRADORES
      },
    });
  }

  createBuyer(payload: CreateBuyerPayload, afterCreate?: () => void): void {
    this.httpClient.post<Buyer>(this.baseUrl, payload).subscribe({
      next: () => {
        this.loadBuyers(); // RECARGAR EL LISTADO DESPUES DE CREAR UNO NUEVO
        if (afterCreate) afterCreate();
      },
      error: () => {
        // MANEJAR ERROR AL CARGAR LOS COMPRADORES
      },
    });
  }

  deleteBuyerById(id: number): void {
    this.httpClient.delete(this.baseUrl + '/' + id).subscribe({
      next: () => {
        this.loadBuyers(); // RECARGAR EL LISTADO DESPUES DE ELIMINAR UNO
      },
      error: () => {
        // MANEJAR ERROR AL CARGAR LOS COMPRADORES
      },
    });
  }

  clearBuyers(): void {
    this._buyers$.next([]);
  }
}
