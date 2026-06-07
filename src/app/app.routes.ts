import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { ContactmeComponent } from './contactme/contactme.component';
import { MyworksComponent } from './myworks/myworks.component';
import { BlogsComponent } from './blogs/blogs.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BlogsDetailsComponent } from './blogs-details/blogs-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { languageGuard } from './services/language.guard';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'en',
        pathMatch: 'full',
    },
    {
        path: ':lang',
        canActivate: [languageGuard],
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'about-me',
                component: AboutmeComponent,
            },
            {
                path: 'contact-me',
                component: ContactmeComponent,
            },
            {
                path: 'my-works',
                component: MyworksComponent,
            },
            {
                path: 'my-works/:id',
                component: WorkDetailsComponent,
            },
            {
                path: 'blogs/:id',
                component: BlogsDetailsComponent,
            },
            {
                path: 'blogs',
                component: BlogsComponent,
            },
            {
                path: 'admin-login',
                component: AdminLoginComponent,
                data: { hideChrome: true },
            },
            {
                path: 'control-panel',
                component: DashboardComponent,
                canActivate: [authGuard],
                data: { hideChrome: true },
            },
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'en',
    },
];
