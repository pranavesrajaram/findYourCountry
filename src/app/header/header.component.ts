import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
isGreen: boolean = false;

  onContribute(){
    const link=document.createElement('a');
    link.href="https://github.com/pranavesrajaram";
    link.click();
  }

  onClickFav(){
   this.isGreen = !this.isGreen;
  }
}
