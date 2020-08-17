import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { KEY_CODE } from 'src/models/key-codes.model';
import { interval } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.css']
})
export class HomeAboutComponent implements OnInit {
  public fullTextBlocks: string[];
  public emptyTextBlock: string;

  public textBlockIndex: number;
  public isTextBlockReady: boolean;

  constructor(private router: Router) {
    this.fullTextBlocks = [
      'Welcome to IVAXOR!',
      'We are a few man that know how to use a computer at max.',
      'Mainly we are developing products for ourselfs. But sometimes they come to a big world of open-source.',
      'Also we can do DevOps, design, managment and more.',
      'Our primary stack is .NET, but we can do Java too. Also familiar with Docker and Kubernetes.'
    ];

    this.emptyTextBlock = '';

    this.textBlockIndex = 0;
    this.isTextBlockReady = false;
  }

  public ngOnInit(): void {
    this.renderTextBlock(this.textBlockIndex);
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    console.log(event);

    switch (event.keyCode) {
      case KEY_CODE.ENTER:
      case KEY_CODE.DOWN_ARROW:
        if (!this.isTextBlockReady) {
          return;
        }

        this.onNextTextBlockClick();
        break;

      case KEY_CODE.LEFT_ARROW:
      case KEY_CODE.ESCAPE:
        this.onReturnClick();
        break;
    }
  }

  public onNextTextBlockClick(): void {
    this.isTextBlockReady = false;
    this.emptyTextBlock = '';

    if (this.textBlockIndex < this.fullTextBlocks.length - 1) {
      this.textBlockIndex++;
    } else {
      this.textBlockIndex = 0;
    }

    this.renderTextBlock(this.textBlockIndex);
  }

  public onReturnClick(): void {
    this.router.navigateByUrl('/menu');
  }

  private renderTextBlock(index: number): void {
    const subscription = interval(50)
      .pipe(
        map(() => {
          const newChar = this.fullTextBlocks[index].charAt(this.emptyTextBlock.length);
          return newChar;
        }),
        tap((newChar) => this.emptyTextBlock += newChar),
        filter(() => this.fullTextBlocks[index].length === this.emptyTextBlock.length))
      .subscribe(() => {
        subscription.unsubscribe();
        this.isTextBlockReady = true;
      });
  }
}
