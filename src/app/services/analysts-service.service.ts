import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { AnalystCard } from '../models/AnalystCard';

@Injectable({
  providedIn: 'root',
})
export class AnalystsServiceService {
  constructor() {}

  // Simula uma chamada HTTP para obter os dados dos analistas
  getAnalystData(): Observable<AnalystCard[]> {
    const data: AnalystCard[] = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        id: `${i}`,
        name: `name ${i}`,
        profileURL: '',
        sector: 'asd',
        photoURL: 'asd',
      });
    }
    // Retorna um Observable com os dados, simulando um atraso na resposta
    return of(data).pipe(delay(1000));
  }
}
