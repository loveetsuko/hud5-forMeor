import { Component, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { AppSettings } from './service/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	appEvent = new EventEmitter<string>();
	appLoaded: boolean = false;
	
	constructor(public appSettings: AppSettings) {
		console.log('constructor got run')
	 }
	
	handleSetCover(coverClass: string) {
		console.log('handleSetCover got run')
		var htmlElm = document.querySelector('html');
		if (htmlElm) {
			for (var x = 0; x < document.documentElement.classList.length; x++) {
				var targetClass = document.documentElement.classList[x];
				if (targetClass.search('bg-cover-') > -1) {
					htmlElm.classList.remove(targetClass);
				}
			}
			htmlElm.classList.add(coverClass);
		}
	}

	handleSetMode(mode: string) {
		console.log('handleSetMode got run')
		document.documentElement.setAttribute('data-bs-theme', mode);
		this.appEvent.emit('theme-reload');
	}

	handleSetTheme(themeClass: string) {

		console.log('handleSetTheme got run')
		for (var x = 0; x < document.body.classList.length; x++) {
			var targetClass = document.body.classList[x];
			if (targetClass.search('theme-') > -1) {
				document.body.classList.remove(targetClass);
			}
		}
		document.body.classList.add(themeClass);
		this.appEvent.emit('theme-reload');
	}
	
	ngOnInit() {

		console.log('ngOnInit got run')

		var elm = document.body;
		if (elm) {
			elm.classList.add('app-init');
		}
		if (this.appSettings.appMode) {
			this.handleSetMode(this.appSettings.appMode);
		}
		if (this.appSettings.appTheme) {
			this.handleSetTheme(this.appSettings.appTheme);
		}
		if (this.appSettings.appCover) {
			this.handleSetCover(this.appSettings.appCover);
		}
	}
	
	ngAfterViewInit() {
		console.log('ngAfterViewInit got run')
		this.appLoaded = true;
	}
}
