import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, delay, repeat, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home-intro',
  templateUrl: './home-intro.component.html',
  styleUrls: ['./home-intro.component.css']
})
export class HomeIntroComponent implements OnInit {
  public textLineWithStatuses: { text: string, status: string }[];

  constructor(private router: Router) {
    this.textLineWithStatuses = [];
  }

  public ngOnInit(): void {
    this.consoleBlink()
      .pipe(
        switchMap(() => this.downloading()),
        switchMap(() => this.initializing()))
      .subscribe(() => this.router.navigateByUrl('/menu'));
  }

  private consoleBlink(): Observable<boolean> {
    const repeats = 4;
    const blinkTimeInMs = 500;

    const index = this.textLineWithStatuses.push({ text: '', status: '' });

    const values = ['_', ' '];
    for (let i = 0; i < values.length; i++) {
      of(values[i])
        .pipe(
          delay(blinkTimeInMs * values.length),
          repeat(repeats),
          delay(blinkTimeInMs * i)
        )
        .subscribe((value) => this.textLineWithStatuses[index - 1].text = value);
    }

    return of(true)
      .pipe(
        delay((repeats + 1) * values.length * blinkTimeInMs),
        tap(() => this.textLineWithStatuses.pop()));
  }

  private downloading(): Observable<boolean> {
    const repeats = 5;
    const blinkTimeInMs = 250;

    const index = this.textLineWithStatuses.push({ text: 'Downloading', status: '?' });

    const values = ['/', '|', '\\', '-'];
    for (let i = 0; i < values.length; i++) {
      of(values[i])
        .pipe(
          delay(blinkTimeInMs * values.length),
          repeat(repeats),
          delay(blinkTimeInMs * i)
        )
        .subscribe((value) => this.textLineWithStatuses[index - 1].status = value);
    }

    return of(true)
      .pipe(
        delay((repeats + 1) * values.length * blinkTimeInMs),
        tap(() => this.textLineWithStatuses[index - 1].status = '+'));
  }

  private initializing(): Observable<boolean> {
    const repeats = 5;
    const blinkTimeInMs = 250;

    const index = this.textLineWithStatuses.push({ text: 'Initializing', status: '?' });

    const values = ['/', '|', '\\', '-'];
    for (let i = 0; i < values.length; i++) {
      of(values[i])
        .pipe(
          delay(blinkTimeInMs * values.length),
          repeat(repeats),
          delay(blinkTimeInMs * i)
        )
        .subscribe((value) => this.textLineWithStatuses[index - 1].status = value);
    }

    return of(true)
      .pipe(
        delay((repeats + 1) * values.length * blinkTimeInMs),
        tap(() => this.textLineWithStatuses[index - 1].status = '+'));
  }
}
