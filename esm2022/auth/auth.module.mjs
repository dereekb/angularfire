import { InjectionToken, Injector, NgModule, NgZone, Optional } from '@angular/core';
import { VERSION, ɵAngularFireSchedulers, ɵgetDefaultInstanceOf } from '@angular/fire';
import { ɵAppCheckInstances } from '@angular/fire';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { registerVersion } from 'firebase/app';
import { AUTH_PROVIDER_NAME, Auth, AuthInstances } from './auth';
import * as i0 from "@angular/core";
export const PROVIDED_AUTH_INSTANCES = new InjectionToken('angularfire2.auth-instances');
export function defaultAuthInstanceFactory(provided, defaultApp) {
    const defaultAuth = ɵgetDefaultInstanceOf(AUTH_PROVIDER_NAME, provided, defaultApp);
    return defaultAuth && new Auth(defaultAuth);
}
export function authInstanceFactory(fn) {
    return (zone, injector) => {
        const auth = zone.runOutsideAngular(() => fn(injector));
        return new Auth(auth);
    };
}
const AUTH_INSTANCES_PROVIDER = {
    provide: AuthInstances,
    deps: [
        [new Optional(), PROVIDED_AUTH_INSTANCES],
    ]
};
const DEFAULT_AUTH_INSTANCE_PROVIDER = {
    provide: Auth,
    useFactory: defaultAuthInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_AUTH_INSTANCES],
        FirebaseApp,
    ]
};
export class AuthModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'auth');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AuthModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AuthModule, providers: [
            DEFAULT_AUTH_INSTANCE_PROVIDER,
            AUTH_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AuthModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_AUTH_INSTANCE_PROVIDER,
                        AUTH_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return []; } });
export function provideAuth(fn, ...deps) {
    return {
        ngModule: AuthModule,
        providers: [{
                provide: PROVIDED_AUTH_INSTANCES,
                useFactory: authInstanceFactory(fn),
                multi: true,
                deps: [
                    NgZone,
                    Injector,
                    ɵAngularFireSchedulers,
                    FirebaseApps,
                    [new Optional(), ɵAppCheckInstances],
                    ...deps,
                ]
            }]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXV0aC9hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBdUIsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRS9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDOztBQUVqRSxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLGNBQWMsQ0FBUyw2QkFBNkIsQ0FBQyxDQUFDO0FBRWpHLE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxRQUFrQyxFQUFFLFVBQXVCO0lBQ3BHLE1BQU0sV0FBVyxHQUFHLHFCQUFxQixDQUFlLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsRyxPQUFPLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEVBQXdDO0lBQzFFLE9BQU8sQ0FBQyxJQUFZLEVBQUUsUUFBa0IsRUFBRSxFQUFFO1FBQzFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLHVCQUF1QixHQUFHO0lBQzlCLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSx1QkFBdUIsQ0FBRTtLQUMzQztDQUNGLENBQUM7QUFFRixNQUFNLDhCQUE4QixHQUFHO0lBQ3JDLE9BQU8sRUFBRSxJQUFJO0lBQ2IsVUFBVSxFQUFFLDBCQUEwQjtJQUN0QyxJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsdUJBQXVCLENBQUU7UUFDMUMsV0FBVztLQUNaO0NBQ0YsQ0FBQztBQVFGLE1BQU0sT0FBTyxVQUFVO0lBQ3JCO1FBQ0UsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7d0dBSFUsVUFBVTt5R0FBVixVQUFVO3lHQUFWLFVBQVUsYUFMVjtZQUNULDhCQUE4QjtZQUM5Qix1QkFBdUI7U0FDeEI7OzRGQUVVLFVBQVU7a0JBTnRCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULDhCQUE4Qjt3QkFDOUIsdUJBQXVCO3FCQUN4QjtpQkFDRjs7QUFPRCxNQUFNLFVBQVUsV0FBVyxDQUFDLEVBQXdDLEVBQUUsR0FBRyxJQUFXO0lBQ2xGLE9BQU87UUFDTCxRQUFRLEVBQUUsVUFBVTtRQUNwQixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxVQUFVLEVBQUUsbUJBQW1CLENBQUMsRUFBRSxDQUFDO2dCQUNuQyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0osTUFBTTtvQkFDTixRQUFRO29CQUNSLHNCQUFzQjtvQkFDdEIsWUFBWTtvQkFDWixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsa0JBQWtCLENBQUU7b0JBQ3JDLEdBQUcsSUFBSTtpQkFDUjthQUNGLENBQUM7S0FDSCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuLCBJbmplY3RvciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE5nWm9uZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04sIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLCDJtWdldERlZmF1bHRJbnN0YW5jZU9mIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyDJtUFwcENoZWNrSW5zdGFuY2VzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBGaXJlYmFzZUFwcCwgRmlyZWJhc2VBcHBzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hcHAnO1xuaW1wb3J0IHsgcmVnaXN0ZXJWZXJzaW9uIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IEF1dGggYXMgRmlyZWJhc2VBdXRoIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5pbXBvcnQgeyBBVVRIX1BST1ZJREVSX05BTUUsIEF1dGgsIEF1dGhJbnN0YW5jZXMgfSBmcm9tICcuL2F1dGgnO1xuXG5leHBvcnQgY29uc3QgUFJPVklERURfQVVUSF9JTlNUQU5DRVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48QXV0aFtdPignYW5ndWxhcmZpcmUyLmF1dGgtaW5zdGFuY2VzJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0QXV0aEluc3RhbmNlRmFjdG9yeShwcm92aWRlZDogRmlyZWJhc2VBdXRoW118dW5kZWZpbmVkLCBkZWZhdWx0QXBwOiBGaXJlYmFzZUFwcCkge1xuICBjb25zdCBkZWZhdWx0QXV0aCA9IMm1Z2V0RGVmYXVsdEluc3RhbmNlT2Y8RmlyZWJhc2VBdXRoPihBVVRIX1BST1ZJREVSX05BTUUsIHByb3ZpZGVkLCBkZWZhdWx0QXBwKTtcbiAgcmV0dXJuIGRlZmF1bHRBdXRoICYmIG5ldyBBdXRoKGRlZmF1bHRBdXRoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhJbnN0YW5jZUZhY3RvcnkoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IEZpcmViYXNlQXV0aCkge1xuICByZXR1cm4gKHpvbmU6IE5nWm9uZSwgaW5qZWN0b3I6IEluamVjdG9yKSA9PiB7XG4gICAgY29uc3QgYXV0aCA9IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gZm4oaW5qZWN0b3IpKTtcbiAgICByZXR1cm4gbmV3IEF1dGgoYXV0aCk7XG4gIH07XG59XG5cbmNvbnN0IEFVVEhfSU5TVEFOQ0VTX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBBdXRoSW5zdGFuY2VzLFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9BVVRIX0lOU1RBTkNFUyBdLFxuICBdXG59O1xuXG5jb25zdCBERUZBVUxUX0FVVEhfSU5TVEFOQ0VfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IEF1dGgsXG4gIHVzZUZhY3Rvcnk6IGRlZmF1bHRBdXRoSW5zdGFuY2VGYWN0b3J5LFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9BVVRIX0lOU1RBTkNFUyBdLFxuICAgIEZpcmViYXNlQXBwLFxuICBdXG59O1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBERUZBVUxUX0FVVEhfSU5TVEFOQ0VfUFJPVklERVIsXG4gICAgQVVUSF9JTlNUQU5DRVNfUFJPVklERVIsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQXV0aE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdhdXRoJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVBdXRoKGZuOiAoaW5qZWN0b3I6IEluamVjdG9yKSA9PiBGaXJlYmFzZUF1dGgsIC4uLmRlcHM6IGFueVtdKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBdXRoTW9kdWxlPiB7XG4gIHJldHVybiB7XG4gICAgbmdNb2R1bGU6IEF1dGhNb2R1bGUsXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgcHJvdmlkZTogUFJPVklERURfQVVUSF9JTlNUQU5DRVMsXG4gICAgICB1c2VGYWN0b3J5OiBhdXRoSW5zdGFuY2VGYWN0b3J5KGZuKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW1xuICAgICAgICBOZ1pvbmUsXG4gICAgICAgIEluamVjdG9yLFxuICAgICAgICDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgICAgICAgRmlyZWJhc2VBcHBzLFxuICAgICAgICBbbmV3IE9wdGlvbmFsKCksIMm1QXBwQ2hlY2tJbnN0YW5jZXMgXSxcbiAgICAgICAgLi4uZGVwcyxcbiAgICAgIF1cbiAgICB9XVxuICB9O1xufVxuIl19