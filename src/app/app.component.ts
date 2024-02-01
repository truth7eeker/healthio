import { Component } from '@angular/core'

import { RouterOutlet } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { NgHttpLoaderModule } from 'ng-http-loader';
import { Spinkit } from 'ng-http-loader';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, HttpClientModule, NgHttpLoaderModule],
   templateUrl: './app.component.html',
})
export class AppComponent {
   public spinkit = Spinkit;
}
