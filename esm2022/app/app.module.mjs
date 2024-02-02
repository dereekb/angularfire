import { Inject, InjectionToken, Injector, VERSION as NG_VERSION, NgModule, NgZone, Optional, PLATFORM_ID, } from '@angular/core';
import { VERSION, ɵAngularFireSchedulers } from '@angular/fire';
import { getApp, registerVersion } from 'firebase/app';
import { FirebaseApp, FirebaseApps } from './app';
import * as i0 from "@angular/core";
export function defaultFirebaseAppFactory(provided) {
    // Use the provided app, if there is only one, otherwise fetch the default app
    if (provided && provided.length === 1) {
        return provided[0];
    }
    return new FirebaseApp(getApp());
}
// With FIREBASE_APPS I wanted to capture the default app instance, if it is initialized by
// the reserved URL; ɵPROVIDED_FIREBASE_APPS is not for public consumption and serves to ensure that all
// provideFirebaseApp(...) calls are satisfied before FirebaseApp$ or FirebaseApp is resolved
export const PROVIDED_FIREBASE_APPS = new InjectionToken('angularfire2._apps');
// Injecting FirebaseApp will now only inject the default Firebase App
// this allows allows beginners to import /__/firebase/init.js to auto initialize Firebase App
// from the reserved URL.
const DEFAULT_FIREBASE_APP_PROVIDER = {
    provide: FirebaseApp,
    useFactory: defaultFirebaseAppFactory,
    deps: [
        [new Optional(), PROVIDED_FIREBASE_APPS],
    ],
};
const FIREBASE_APPS_PROVIDER = {
    provide: FirebaseApps,
    deps: [
        [new Optional(), PROVIDED_FIREBASE_APPS],
    ],
};
export function firebaseAppFactory(fn) {
    return (zone, injector) => {
        const app = zone.runOutsideAngular(() => fn(injector));
        return new FirebaseApp(app);
    };
}
export class FirebaseAppModule {
    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(platformId) {
        registerVersion('angularfire', VERSION.full, 'core');
        registerVersion('angularfire', VERSION.full, 'app');
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        registerVersion('angular', NG_VERSION.full, platformId.toString());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FirebaseAppModule, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: FirebaseAppModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FirebaseAppModule, providers: [
            DEFAULT_FIREBASE_APP_PROVIDER,
            FIREBASE_APPS_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FirebaseAppModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_FIREBASE_APP_PROVIDER,
                        FIREBASE_APPS_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
// Calling initializeApp({ ... }, 'name') multiple times will add more FirebaseApps into the FIREBASE_APPS
// injection scope. This allows developers to more easily work with multiple Firebase Applications. Downside
// is that DI for app name and options doesn't really make sense anymore.
export function provideFirebaseApp(fn, ...deps) {
    return {
        ngModule: FirebaseAppModule,
        providers: [{
                provide: PROVIDED_FIREBASE_APPS,
                useFactory: firebaseAppFactory(fn),
                multi: true,
                deps: [
                    NgZone,
                    Injector,
                    ɵAngularFireSchedulers,
                    ...deps,
                ],
            }],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsTUFBTSxFQUNOLGNBQWMsRUFDZCxRQUFRLEVBRVIsT0FBTyxJQUFJLFVBQVUsRUFDckIsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUErQixNQUFNLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sT0FBTyxDQUFDOztBQUVsRCxNQUFNLFVBQVUseUJBQXlCLENBQUMsUUFBaUM7SUFDekUsOEVBQThFO0lBQzlFLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQUUsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBRTtJQUM5RCxPQUFPLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELDJGQUEyRjtBQUMzRix3R0FBd0c7QUFDeEcsNkZBQTZGO0FBQzdGLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLElBQUksY0FBYyxDQUFnQixvQkFBb0IsQ0FBQyxDQUFDO0FBRTlGLHNFQUFzRTtBQUN0RSw4RkFBOEY7QUFDOUYseUJBQXlCO0FBQ3pCLE1BQU0sNkJBQTZCLEdBQUc7SUFDcEMsT0FBTyxFQUFFLFdBQVc7SUFDcEIsVUFBVSxFQUFFLHlCQUF5QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsc0JBQXNCLENBQUU7S0FDMUM7Q0FDRixDQUFDO0FBRUYsTUFBTSxzQkFBc0IsR0FBRztJQUM3QixPQUFPLEVBQUUsWUFBWTtJQUNyQixJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsc0JBQXNCLENBQUU7S0FDMUM7Q0FDRixDQUFDO0FBRUYsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEVBQXdDO0lBQ3pFLE9BQU8sQ0FBQyxJQUFZLEVBQUUsUUFBa0IsRUFBRSxFQUFFO1FBQzFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFRRCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLHdEQUF3RDtJQUN4RCxZQUFpQyxVQUFrQjtRQUNqRCxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELGdFQUFnRTtRQUNoRSxlQUFlLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQzt3R0FQVSxpQkFBaUIsa0JBRVIsV0FBVzt5R0FGcEIsaUJBQWlCO3lHQUFqQixpQkFBaUIsYUFMakI7WUFDVCw2QkFBNkI7WUFDN0Isc0JBQXNCO1NBQ3ZCOzs0RkFFVSxpQkFBaUI7a0JBTjdCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULDZCQUE2Qjt3QkFDN0Isc0JBQXNCO3FCQUN2QjtpQkFDRjs7MEJBR2MsTUFBTTsyQkFBQyxXQUFXOztBQVFqQywwR0FBMEc7QUFDMUcsNEdBQTRHO0FBQzVHLHlFQUF5RTtBQUN6RSxNQUFNLFVBQVUsa0JBQWtCLENBQUMsRUFBd0MsRUFBRSxHQUFHLElBQVc7SUFDekYsT0FBTztRQUNMLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsVUFBVSxFQUFFLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztnQkFDbEMsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFO29CQUNKLE1BQU07b0JBQ04sUUFBUTtvQkFDUixzQkFBc0I7b0JBQ3RCLEdBQUcsSUFBSTtpQkFDUjthQUNGLENBQUM7S0FDSCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBWRVJTSU9OIGFzIE5HX1ZFUlNJT04sXG4gIE5nTW9kdWxlLFxuICBOZ1pvbmUsXG4gIE9wdGlvbmFsLFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWRVJTSU9OLCDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgRmlyZWJhc2VBcHAgYXMgSUZpcmViYXNlQXBwLCBnZXRBcHAsIHJlZ2lzdGVyVmVyc2lvbiB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBGaXJlYmFzZUFwcCwgRmlyZWJhc2VBcHBzIH0gZnJvbSAnLi9hcHAnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEZpcmViYXNlQXBwRmFjdG9yeShwcm92aWRlZDogRmlyZWJhc2VBcHBbXXx1bmRlZmluZWQpIHtcbiAgLy8gVXNlIHRoZSBwcm92aWRlZCBhcHAsIGlmIHRoZXJlIGlzIG9ubHkgb25lLCBvdGhlcndpc2UgZmV0Y2ggdGhlIGRlZmF1bHQgYXBwXG4gIGlmIChwcm92aWRlZCAmJiBwcm92aWRlZC5sZW5ndGggPT09IDEpIHsgcmV0dXJuIHByb3ZpZGVkWzBdOyB9XG4gIHJldHVybiBuZXcgRmlyZWJhc2VBcHAoZ2V0QXBwKCkpO1xufVxuXG4vLyBXaXRoIEZJUkVCQVNFX0FQUFMgSSB3YW50ZWQgdG8gY2FwdHVyZSB0aGUgZGVmYXVsdCBhcHAgaW5zdGFuY2UsIGlmIGl0IGlzIGluaXRpYWxpemVkIGJ5XG4vLyB0aGUgcmVzZXJ2ZWQgVVJMOyDJtVBST1ZJREVEX0ZJUkVCQVNFX0FQUFMgaXMgbm90IGZvciBwdWJsaWMgY29uc3VtcHRpb24gYW5kIHNlcnZlcyB0byBlbnN1cmUgdGhhdCBhbGxcbi8vIHByb3ZpZGVGaXJlYmFzZUFwcCguLi4pIGNhbGxzIGFyZSBzYXRpc2ZpZWQgYmVmb3JlIEZpcmViYXNlQXBwJCBvciBGaXJlYmFzZUFwcCBpcyByZXNvbHZlZFxuZXhwb3J0IGNvbnN0IFBST1ZJREVEX0ZJUkVCQVNFX0FQUFMgPSBuZXcgSW5qZWN0aW9uVG9rZW48RmlyZWJhc2VBcHBbXT4oJ2FuZ3VsYXJmaXJlMi5fYXBwcycpO1xuXG4vLyBJbmplY3RpbmcgRmlyZWJhc2VBcHAgd2lsbCBub3cgb25seSBpbmplY3QgdGhlIGRlZmF1bHQgRmlyZWJhc2UgQXBwXG4vLyB0aGlzIGFsbG93cyBhbGxvd3MgYmVnaW5uZXJzIHRvIGltcG9ydCAvX18vZmlyZWJhc2UvaW5pdC5qcyB0byBhdXRvIGluaXRpYWxpemUgRmlyZWJhc2UgQXBwXG4vLyBmcm9tIHRoZSByZXNlcnZlZCBVUkwuXG5jb25zdCBERUZBVUxUX0ZJUkVCQVNFX0FQUF9QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogRmlyZWJhc2VBcHAsXG4gIHVzZUZhY3Rvcnk6IGRlZmF1bHRGaXJlYmFzZUFwcEZhY3RvcnksXG4gIGRlcHM6IFtcbiAgICBbbmV3IE9wdGlvbmFsKCksIFBST1ZJREVEX0ZJUkVCQVNFX0FQUFMgXSxcbiAgXSxcbn07XG5cbmNvbnN0IEZJUkVCQVNFX0FQUFNfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IEZpcmViYXNlQXBwcyxcbiAgZGVwczogW1xuICAgIFtuZXcgT3B0aW9uYWwoKSwgUFJPVklERURfRklSRUJBU0VfQVBQUyBdLFxuICBdLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmViYXNlQXBwRmFjdG9yeShmbjogKGluamVjdG9yOiBJbmplY3RvcikgPT4gSUZpcmViYXNlQXBwKSB7XG4gIHJldHVybiAoem9uZTogTmdab25lLCBpbmplY3RvcjogSW5qZWN0b3IpID0+IHtcbiAgICBjb25zdCBhcHAgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGZuKGluamVjdG9yKSk7XG4gICAgcmV0dXJuIG5ldyBGaXJlYmFzZUFwcChhcHApO1xuICB9O1xufVxuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBERUZBVUxUX0ZJUkVCQVNFX0FQUF9QUk9WSURFUixcbiAgICBGSVJFQkFTRV9BUFBTX1BST1ZJREVSLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEZpcmViYXNlQXBwTW9kdWxlIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0KSB7XG4gICAgcmVnaXN0ZXJWZXJzaW9uKCdhbmd1bGFyZmlyZScsIFZFUlNJT04uZnVsbCwgJ2NvcmUnKTtcbiAgICByZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAnYXBwJyk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1iYXNlLXRvLXN0cmluZ1xuICAgIHJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcicsIE5HX1ZFUlNJT04uZnVsbCwgcGxhdGZvcm1JZC50b1N0cmluZygpKTtcbiAgfVxufVxuXG4vLyBDYWxsaW5nIGluaXRpYWxpemVBcHAoeyAuLi4gfSwgJ25hbWUnKSBtdWx0aXBsZSB0aW1lcyB3aWxsIGFkZCBtb3JlIEZpcmViYXNlQXBwcyBpbnRvIHRoZSBGSVJFQkFTRV9BUFBTXG4vLyBpbmplY3Rpb24gc2NvcGUuIFRoaXMgYWxsb3dzIGRldmVsb3BlcnMgdG8gbW9yZSBlYXNpbHkgd29yayB3aXRoIG11bHRpcGxlIEZpcmViYXNlIEFwcGxpY2F0aW9ucy4gRG93bnNpZGVcbi8vIGlzIHRoYXQgREkgZm9yIGFwcCBuYW1lIGFuZCBvcHRpb25zIGRvZXNuJ3QgcmVhbGx5IG1ha2Ugc2Vuc2UgYW55bW9yZS5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlRmlyZWJhc2VBcHAoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IElGaXJlYmFzZUFwcCwgLi4uZGVwczogYW55W10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEZpcmViYXNlQXBwTW9kdWxlPiB7XG4gIHJldHVybiB7XG4gICAgbmdNb2R1bGU6IEZpcmViYXNlQXBwTW9kdWxlLFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgIHByb3ZpZGU6IFBST1ZJREVEX0ZJUkVCQVNFX0FQUFMsXG4gICAgICB1c2VGYWN0b3J5OiBmaXJlYmFzZUFwcEZhY3RvcnkoZm4pLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbXG4gICAgICAgIE5nWm9uZSxcbiAgICAgICAgSW5qZWN0b3IsXG4gICAgICAgIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLFxuICAgICAgICAuLi5kZXBzLFxuICAgICAgXSxcbiAgICB9XSxcbiAgfTtcbn1cbiJdfQ==