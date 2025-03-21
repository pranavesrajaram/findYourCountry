import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  onGoto(){
    let link=document.createElement('a');
    link.href="https://www.linkedin.com/in/pranavesrajaram24";
    link.click();
  }

  onGithub(){
    let link=document.createElement('a');
    link.href='https://github.com/pranavesrajaram';
    link.click();
  }

}
