import { Inject, InjectionToken, Injector, VERSION as NG_VERSION, NgModule, NgZone, Optional, PLATFORM_ID, makeEnvironmentProviders, } from '@angular/core';
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
        const platformId = injector.get(PLATFORM_ID);
        registerVersion('angularfire', VERSION.full, 'core');
        registerVersion('angularfire', VERSION.full, 'app');
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        registerVersion('angular', NG_VERSION.full, platformId.toString());
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FirebaseAppModule, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.13", ngImport: i0, type: FirebaseAppModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FirebaseAppModule, providers: [
            DEFAULT_FIREBASE_APP_PROVIDER,
            FIREBASE_APPS_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FirebaseAppModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_FIREBASE_APP_PROVIDER,
                        FIREBASE_APPS_PROVIDER,
                    ]
                }]
        }], ctorParameters: () => [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }] });
// Calling initializeApp({ ... }, 'name') multiple times will add more FirebaseApps into the FIREBASE_APPS
// injection scope. This allows developers to more easily work with multiple Firebase Applications. Downside
// is that DI for app name and options doesn't really make sense anymore.
export function provideFirebaseApp(fn, ...deps) {
    return makeEnvironmentProviders([
        DEFAULT_FIREBASE_APP_PROVIDER,
        FIREBASE_APPS_PROVIDER,
        {
            provide: PROVIDED_FIREBASE_APPS,
            useFactory: firebaseAppFactory(fn),
            multi: true,
            deps: [
                NgZone,
                Injector,
                ɵAngularFireSchedulers,
                ...deps,
            ],
        }
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsTUFBTSxFQUNOLGNBQWMsRUFDZCxRQUFRLEVBQ1IsT0FBTyxJQUFJLFVBQVUsRUFDckIsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxFQUNYLHdCQUF3QixHQUN6QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBK0IsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRixPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLE9BQU8sQ0FBQzs7QUFFbEQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLFFBQWlDO0lBQ3pFLDhFQUE4RTtJQUM5RSxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQzlELE9BQU8sSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsMkZBQTJGO0FBQzNGLHdHQUF3RztBQUN4Ryw2RkFBNkY7QUFDN0YsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxjQUFjLENBQWdCLG9CQUFvQixDQUFDLENBQUM7QUFFOUYsc0VBQXNFO0FBQ3RFLDhGQUE4RjtBQUM5Rix5QkFBeUI7QUFDekIsTUFBTSw2QkFBNkIsR0FBRztJQUNwQyxPQUFPLEVBQUUsV0FBVztJQUNwQixVQUFVLEVBQUUseUJBQXlCO0lBQ3JDLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxzQkFBc0IsQ0FBRTtLQUMxQztDQUNGLENBQUM7QUFFRixNQUFNLHNCQUFzQixHQUFHO0lBQzdCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxzQkFBc0IsQ0FBRTtLQUMxQztDQUNGLENBQUM7QUFFRixNQUFNLFVBQVUsa0JBQWtCLENBQUMsRUFBd0M7SUFDekUsT0FBTyxDQUFDLElBQVksRUFBRSxRQUFrQixFQUFFLEVBQUU7UUFDMUMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELGdFQUFnRTtRQUNoRSxlQUFlLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFbkUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVFELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsd0RBQXdEO0lBQ3hELFlBQWlDLFVBQWtCO1FBQ2pELGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsZ0VBQWdFO1FBQ2hFLGVBQWUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO3dHQVBVLGlCQUFpQixrQkFFUixXQUFXO3lHQUZwQixpQkFBaUI7eUdBQWpCLGlCQUFpQixhQUxqQjtZQUNULDZCQUE2QjtZQUM3QixzQkFBc0I7U0FDdkI7OzRGQUVVLGlCQUFpQjtrQkFON0IsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsNkJBQTZCO3dCQUM3QixzQkFBc0I7cUJBQ3ZCO2lCQUNGOzswQkFHYyxNQUFNOzJCQUFDLFdBQVc7O0FBUWpDLDBHQUEwRztBQUMxRyw0R0FBNEc7QUFDNUcseUVBQXlFO0FBQ3pFLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxFQUF3QyxFQUFFLEdBQUcsSUFBVztJQUN6RixPQUFPLHdCQUF3QixDQUFDO1FBQzlCLDZCQUE2QjtRQUM3QixzQkFBc0I7UUFDdEI7WUFDRSxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7WUFDbEMsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUU7Z0JBQ0osTUFBTTtnQkFDTixRQUFRO2dCQUNSLHNCQUFzQjtnQkFDdEIsR0FBRyxJQUFJO2FBQ1I7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbnZpcm9ubWVudFByb3ZpZGVycyxcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIFZFUlNJT04gYXMgTkdfVkVSU0lPTixcbiAgTmdNb2R1bGUsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIFBMQVRGT1JNX0lELFxuICBtYWtlRW52aXJvbm1lbnRQcm92aWRlcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVkVSU0lPTiwgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IEZpcmViYXNlQXBwIGFzIElGaXJlYmFzZUFwcCwgZ2V0QXBwLCByZWdpc3RlclZlcnNpb24gfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgRmlyZWJhc2VBcHAsIEZpcmViYXNlQXBwcyB9IGZyb20gJy4vYXBwJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRGaXJlYmFzZUFwcEZhY3RvcnkocHJvdmlkZWQ6IEZpcmViYXNlQXBwW118dW5kZWZpbmVkKSB7XG4gIC8vIFVzZSB0aGUgcHJvdmlkZWQgYXBwLCBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgb3RoZXJ3aXNlIGZldGNoIHRoZSBkZWZhdWx0IGFwcFxuICBpZiAocHJvdmlkZWQgJiYgcHJvdmlkZWQubGVuZ3RoID09PSAxKSB7IHJldHVybiBwcm92aWRlZFswXTsgfVxuICByZXR1cm4gbmV3IEZpcmViYXNlQXBwKGdldEFwcCgpKTtcbn1cblxuLy8gV2l0aCBGSVJFQkFTRV9BUFBTIEkgd2FudGVkIHRvIGNhcHR1cmUgdGhlIGRlZmF1bHQgYXBwIGluc3RhbmNlLCBpZiBpdCBpcyBpbml0aWFsaXplZCBieVxuLy8gdGhlIHJlc2VydmVkIFVSTDsgybVQUk9WSURFRF9GSVJFQkFTRV9BUFBTIGlzIG5vdCBmb3IgcHVibGljIGNvbnN1bXB0aW9uIGFuZCBzZXJ2ZXMgdG8gZW5zdXJlIHRoYXQgYWxsXG4vLyBwcm92aWRlRmlyZWJhc2VBcHAoLi4uKSBjYWxscyBhcmUgc2F0aXNmaWVkIGJlZm9yZSBGaXJlYmFzZUFwcCQgb3IgRmlyZWJhc2VBcHAgaXMgcmVzb2x2ZWRcbmV4cG9ydCBjb25zdCBQUk9WSURFRF9GSVJFQkFTRV9BUFBTID0gbmV3IEluamVjdGlvblRva2VuPEZpcmViYXNlQXBwW10+KCdhbmd1bGFyZmlyZTIuX2FwcHMnKTtcblxuLy8gSW5qZWN0aW5nIEZpcmViYXNlQXBwIHdpbGwgbm93IG9ubHkgaW5qZWN0IHRoZSBkZWZhdWx0IEZpcmViYXNlIEFwcFxuLy8gdGhpcyBhbGxvd3MgYWxsb3dzIGJlZ2lubmVycyB0byBpbXBvcnQgL19fL2ZpcmViYXNlL2luaXQuanMgdG8gYXV0byBpbml0aWFsaXplIEZpcmViYXNlIEFwcFxuLy8gZnJvbSB0aGUgcmVzZXJ2ZWQgVVJMLlxuY29uc3QgREVGQVVMVF9GSVJFQkFTRV9BUFBfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IEZpcmViYXNlQXBwLFxuICB1c2VGYWN0b3J5OiBkZWZhdWx0RmlyZWJhc2VBcHBGYWN0b3J5LFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9GSVJFQkFTRV9BUFBTIF0sXG4gIF0sXG59O1xuXG5jb25zdCBGSVJFQkFTRV9BUFBTX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBGaXJlYmFzZUFwcHMsXG4gIGRlcHM6IFtcbiAgICBbbmV3IE9wdGlvbmFsKCksIFBST1ZJREVEX0ZJUkVCQVNFX0FQUFMgXSxcbiAgXSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlYmFzZUFwcEZhY3RvcnkoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IElGaXJlYmFzZUFwcCkge1xuICByZXR1cm4gKHpvbmU6IE5nWm9uZSwgaW5qZWN0b3I6IEluamVjdG9yKSA9PiB7XG4gICAgY29uc3QgcGxhdGZvcm1JZCA9IGluamVjdG9yLmdldChQTEFURk9STV9JRCk7XG4gICAgcmVnaXN0ZXJWZXJzaW9uKCdhbmd1bGFyZmlyZScsIFZFUlNJT04uZnVsbCwgJ2NvcmUnKTtcbiAgICByZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAnYXBwJyk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1iYXNlLXRvLXN0cmluZ1xuICAgIHJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcicsIE5HX1ZFUlNJT04uZnVsbCwgcGxhdGZvcm1JZC50b1N0cmluZygpKTtcblxuICAgIGNvbnN0IGFwcCA9IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gZm4oaW5qZWN0b3IpKTtcbiAgICByZXR1cm4gbmV3IEZpcmViYXNlQXBwKGFwcCk7XG4gIH07XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIERFRkFVTFRfRklSRUJBU0VfQVBQX1BST1ZJREVSLFxuICAgIEZJUkVCQVNFX0FQUFNfUFJPVklERVIsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VBcHBNb2R1bGUge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3QpIHtcbiAgICByZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAnY29yZScpO1xuICAgIHJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdhcHAnKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWJhc2UtdG8tc3RyaW5nXG4gICAgcmVnaXN0ZXJWZXJzaW9uKCdhbmd1bGFyJywgTkdfVkVSU0lPTi5mdWxsLCBwbGF0Zm9ybUlkLnRvU3RyaW5nKCkpO1xuICB9XG59XG5cbi8vIENhbGxpbmcgaW5pdGlhbGl6ZUFwcCh7IC4uLiB9LCAnbmFtZScpIG11bHRpcGxlIHRpbWVzIHdpbGwgYWRkIG1vcmUgRmlyZWJhc2VBcHBzIGludG8gdGhlIEZJUkVCQVNFX0FQUFNcbi8vIGluamVjdGlvbiBzY29wZS4gVGhpcyBhbGxvd3MgZGV2ZWxvcGVycyB0byBtb3JlIGVhc2lseSB3b3JrIHdpdGggbXVsdGlwbGUgRmlyZWJhc2UgQXBwbGljYXRpb25zLiBEb3duc2lkZVxuLy8gaXMgdGhhdCBESSBmb3IgYXBwIG5hbWUgYW5kIG9wdGlvbnMgZG9lc24ndCByZWFsbHkgbWFrZSBzZW5zZSBhbnltb3JlLlxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVGaXJlYmFzZUFwcChmbjogKGluamVjdG9yOiBJbmplY3RvcikgPT4gSUZpcmViYXNlQXBwLCAuLi5kZXBzOiBhbnlbXSk6IEVudmlyb25tZW50UHJvdmlkZXJzIHtcbiAgcmV0dXJuIG1ha2VFbnZpcm9ubWVudFByb3ZpZGVycyhbXG4gICAgREVGQVVMVF9GSVJFQkFTRV9BUFBfUFJPVklERVIsXG4gICAgRklSRUJBU0VfQVBQU19QUk9WSURFUixcbiAgICB7XG4gICAgICBwcm92aWRlOiBQUk9WSURFRF9GSVJFQkFTRV9BUFBTLFxuICAgICAgdXNlRmFjdG9yeTogZmlyZWJhc2VBcHBGYWN0b3J5KGZuKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW1xuICAgICAgICBOZ1pvbmUsXG4gICAgICAgIEluamVjdG9yLFxuICAgICAgICDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgICAgICAgLi4uZGVwcyxcbiAgICAgIF0sXG4gICAgfVxuICBdKVxufVxuIl19