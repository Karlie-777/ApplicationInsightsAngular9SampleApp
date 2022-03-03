import { Component } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appInsightsAngular9SampleApp'
  constructor( private router: Router) {

    const appInsights = new ApplicationInsights({ config: {
    instrumentationKey: 'YOUR_INSTRUMENTATION_KEY_GOES_HERE'
    //enableAutoRouteTracking: true (this will auto add pageview with duration 0)
    } });
    appInsights.loadAppInsights();
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        appInsights.startTrackPage(router.url)
      }
      if (event instanceof NavigationEnd) {
          appInsights.stopTrackPage(router.url,router.url)
      }
    });
  }
}
