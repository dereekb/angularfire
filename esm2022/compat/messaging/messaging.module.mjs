import { NgModule } from '@angular/core';
import { VERSION } from '@angular/fire';
import firebase from 'firebase/compat/app';
import { AngularFireMessaging } from './messaging';
import * as i0 from "@angular/core";
export class AngularFireMessagingModule {
    constructor() {
        firebase.registerVersion('angularfire', VERSION.full, 'fcm-compat');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireMessagingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AngularFireMessagingModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireMessagingModule, providers: [AngularFireMessaging] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireMessagingModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AngularFireMessaging]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnaW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wYXQvbWVzc2FnaW5nL21lc3NhZ2luZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7QUFLbkQsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQztRQUNFLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdEUsQ0FBQzt3R0FIVSwwQkFBMEI7eUdBQTFCLDBCQUEwQjt5R0FBMUIsMEJBQTBCLGFBRjFCLENBQUUsb0JBQW9CLENBQUU7OzRGQUV4QiwwQkFBMEI7a0JBSHRDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUUsb0JBQW9CLENBQUU7aUJBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9jb21wYXQvYXBwJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlTWVzc2FnaW5nIH0gZnJvbSAnLi9tZXNzYWdpbmcnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFsgQW5ndWxhckZpcmVNZXNzYWdpbmcgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZU1lc3NhZ2luZ01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGZpcmViYXNlLnJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdmY20tY29tcGF0Jyk7XG4gIH1cbn1cbiJdfQ==