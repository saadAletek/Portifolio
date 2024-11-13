import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { ContactmeComponent } from './contactme/contactme.component';
import { MyworksComponent } from './myworks/myworks.component';
import { BlogsComponent } from './blogs/blogs.component';

export const routes: Routes = [
    {
        path : '',
        component : HomeComponent,
    },
    {
        path : 'about-me',
        component : AboutmeComponent,
    },
    {
        path : 'contact-me',
        component : ContactmeComponent,
    },
    {
        path : 'my-works',
        component : MyworksComponent,
    },
    {
        path : 'blogs',
        component : BlogsComponent,
    }
];
