import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; // ✅ important

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
     provideHttpClient()  // ✅ Add this line

  ]
  
}).catch(err => console.error(err));
