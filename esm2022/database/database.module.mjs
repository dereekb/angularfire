import { InjectionToken, Injector, NgModule, NgZone, Optional, makeEnvironmentProviders, } from '@angular/core';
import { VERSION, ɵAngularFireSchedulers, ɵgetDefaultInstanceOf } from '@angular/fire';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AppCheckInstances } from '@angular/fire/app-check';
import { AuthInstances } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { DATABASE_PROVIDER_NAME, Database, DatabaseInstances } from './database';
import * as i0 from "@angular/core";
export const PROVIDED_DATABASE_INSTANCES = new InjectionToken('angularfire2.database-instances');
export function defaultDatabaseInstanceFactory(provided, defaultApp) {
    const defaultDatabase = ɵgetDefaultInstanceOf(DATABASE_PROVIDER_NAME, provided, defaultApp);
    return defaultDatabase && new Database(defaultDatabase);
}
export function databaseInstanceFactory(fn) {
    return (zone, injector) => {
        const database = zone.runOutsideAngular(() => fn(injector));
        return new Database(database);
    };
}
const DATABASE_INSTANCES_PROVIDER = {
    provide: DatabaseInstances,
    deps: [
        [new Optional(), PROVIDED_DATABASE_INSTANCES],
    ]
};
const DEFAULT_DATABASE_INSTANCE_PROVIDER = {
    provide: Database,
    useFactory: defaultDatabaseInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_DATABASE_INSTANCES],
        FirebaseApp,
    ]
};
export class DatabaseModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'rtdb');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DatabaseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.13", ngImport: i0, type: DatabaseModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DatabaseModule, providers: [
            DEFAULT_DATABASE_INSTANCE_PROVIDER,
            DATABASE_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DatabaseModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_DATABASE_INSTANCE_PROVIDER,
                        DATABASE_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: () => [] });
export function provideDatabase(fn, ...deps) {
    registerVersion('angularfire', VERSION.full, 'rtdb');
    return makeEnvironmentProviders([
        DEFAULT_DATABASE_INSTANCE_PROVIDER,
        DATABASE_INSTANCES_PROVIDER,
        {
            provide: PROVIDED_DATABASE_INSTANCES,
            useFactory: databaseInstanceFactory(fn),
            multi: true,
            deps: [
                NgZone,
                Injector,
                ɵAngularFireSchedulers,
                FirebaseApps,
                // Database+Auth work better if Auth is loaded first
                [new Optional(), AuthInstances],
                [new Optional(), AppCheckInstances],
                ...deps,
            ]
        }
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGFiYXNlL2RhdGFiYXNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsY0FBYyxFQUNkLFFBQVEsRUFDUixRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUix3QkFBd0IsR0FDekIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRS9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7O0FBRWpGLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLElBQUksY0FBYyxDQUFhLGlDQUFpQyxDQUFDLENBQUM7QUFFN0csTUFBTSxVQUFVLDhCQUE4QixDQUFDLFFBQXNDLEVBQUUsVUFBdUI7SUFDNUcsTUFBTSxlQUFlLEdBQUcscUJBQXFCLENBQW1CLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM5RyxPQUFPLGVBQWUsSUFBSSxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRUQsTUFBTSxVQUFVLHVCQUF1QixDQUFDLEVBQTRDO0lBQ2xGLE9BQU8sQ0FBQyxJQUFZLEVBQUUsUUFBa0IsRUFBRSxFQUFFO1FBQzFDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1RCxPQUFPLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLDJCQUEyQixHQUFHO0lBQ2xDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsSUFBSSxFQUFFO1FBQ0osQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLDJCQUEyQixDQUFFO0tBQy9DO0NBQ0YsQ0FBQztBQUVGLE1BQU0sa0NBQWtDLEdBQUc7SUFDekMsT0FBTyxFQUFFLFFBQVE7SUFDakIsVUFBVSxFQUFFLDhCQUE4QjtJQUMxQyxJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsMkJBQTJCLENBQUU7UUFDOUMsV0FBVztLQUNaO0NBQ0YsQ0FBQztBQVFGLE1BQU0sT0FBTyxjQUFjO0lBQ3pCO1FBQ0UsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7d0dBSFUsY0FBYzt5R0FBZCxjQUFjO3lHQUFkLGNBQWMsYUFMZDtZQUNULGtDQUFrQztZQUNsQywyQkFBMkI7U0FDNUI7OzRGQUVVLGNBQWM7a0JBTjFCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULGtDQUFrQzt3QkFDbEMsMkJBQTJCO3FCQUM1QjtpQkFDRjs7QUFPRCxNQUFNLFVBQVUsZUFBZSxDQUFDLEVBQTRDLEVBQUUsR0FBRyxJQUFXO0lBQzFGLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRCxPQUFPLHdCQUF3QixDQUFDO1FBQzlCLGtDQUFrQztRQUNsQywyQkFBMkI7UUFDM0I7WUFDRSxPQUFPLEVBQUUsMkJBQTJCO1lBQ3BDLFVBQVUsRUFBRSx1QkFBdUIsQ0FBQyxFQUFFLENBQUM7WUFDdkMsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUU7Z0JBQ0osTUFBTTtnQkFDTixRQUFRO2dCQUNSLHNCQUFzQjtnQkFDdEIsWUFBWTtnQkFDWixvREFBb0Q7Z0JBQ3BELENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxhQUFhLENBQUU7Z0JBQ2hDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxpQkFBaUIsQ0FBRTtnQkFDcEMsR0FBRyxJQUFJO2FBQ1I7U0FDRjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbnZpcm9ubWVudFByb3ZpZGVycyxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxuICBOZ01vZHVsZSxcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbiAgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04sIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLCDJtWdldERlZmF1bHRJbnN0YW5jZU9mIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBGaXJlYmFzZUFwcCwgRmlyZWJhc2VBcHBzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hcHAnO1xuaW1wb3J0IHsgQXBwQ2hlY2tJbnN0YW5jZXMgfSBmcm9tICdAYW5ndWxhci9maXJlL2FwcC1jaGVjayc7XG5pbXBvcnQgeyBBdXRoSW5zdGFuY2VzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hdXRoJztcbmltcG9ydCB7IHJlZ2lzdGVyVmVyc2lvbiB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBEYXRhYmFzZSBhcyBGaXJlYmFzZURhdGFiYXNlIH0gZnJvbSAnZmlyZWJhc2UvZGF0YWJhc2UnO1xuaW1wb3J0IHsgREFUQUJBU0VfUFJPVklERVJfTkFNRSwgRGF0YWJhc2UsIERhdGFiYXNlSW5zdGFuY2VzIH0gZnJvbSAnLi9kYXRhYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBQUk9WSURFRF9EQVRBQkFTRV9JTlNUQU5DRVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48RGF0YWJhc2VbXT4oJ2FuZ3VsYXJmaXJlMi5kYXRhYmFzZS1pbnN0YW5jZXMnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHREYXRhYmFzZUluc3RhbmNlRmFjdG9yeShwcm92aWRlZDogRmlyZWJhc2VEYXRhYmFzZVtdfHVuZGVmaW5lZCwgZGVmYXVsdEFwcDogRmlyZWJhc2VBcHApIHtcbiAgY29uc3QgZGVmYXVsdERhdGFiYXNlID0gybVnZXREZWZhdWx0SW5zdGFuY2VPZjxGaXJlYmFzZURhdGFiYXNlPihEQVRBQkFTRV9QUk9WSURFUl9OQU1FLCBwcm92aWRlZCwgZGVmYXVsdEFwcCk7XG4gIHJldHVybiBkZWZhdWx0RGF0YWJhc2UgJiYgbmV3IERhdGFiYXNlKGRlZmF1bHREYXRhYmFzZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhYmFzZUluc3RhbmNlRmFjdG9yeShmbjogKGluamVjdG9yOiBJbmplY3RvcikgPT4gRmlyZWJhc2VEYXRhYmFzZSkge1xuICByZXR1cm4gKHpvbmU6IE5nWm9uZSwgaW5qZWN0b3I6IEluamVjdG9yKSA9PiB7XG4gICAgY29uc3QgZGF0YWJhc2UgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGZuKGluamVjdG9yKSk7XG4gICAgcmV0dXJuIG5ldyBEYXRhYmFzZShkYXRhYmFzZSk7XG4gIH07XG59XG5cbmNvbnN0IERBVEFCQVNFX0lOU1RBTkNFU19QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogRGF0YWJhc2VJbnN0YW5jZXMsXG4gIGRlcHM6IFtcbiAgICBbbmV3IE9wdGlvbmFsKCksIFBST1ZJREVEX0RBVEFCQVNFX0lOU1RBTkNFUyBdLFxuICBdXG59O1xuXG5jb25zdCBERUZBVUxUX0RBVEFCQVNFX0lOU1RBTkNFX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBEYXRhYmFzZSxcbiAgdXNlRmFjdG9yeTogZGVmYXVsdERhdGFiYXNlSW5zdGFuY2VGYWN0b3J5LFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9EQVRBQkFTRV9JTlNUQU5DRVMgXSxcbiAgICBGaXJlYmFzZUFwcCxcbiAgXVxufTtcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgREVGQVVMVF9EQVRBQkFTRV9JTlNUQU5DRV9QUk9WSURFUixcbiAgICBEQVRBQkFTRV9JTlNUQU5DRVNfUFJPVklERVIsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YWJhc2VNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICByZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAncnRkYicpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlRGF0YWJhc2UoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IEZpcmViYXNlRGF0YWJhc2UsIC4uLmRlcHM6IGFueVtdKTogRW52aXJvbm1lbnRQcm92aWRlcnMge1xuICByZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAncnRkYicpO1xuICByZXR1cm4gbWFrZUVudmlyb25tZW50UHJvdmlkZXJzKFtcbiAgICBERUZBVUxUX0RBVEFCQVNFX0lOU1RBTkNFX1BST1ZJREVSLFxuICAgIERBVEFCQVNFX0lOU1RBTkNFU19QUk9WSURFUixcbiAgICB7XG4gICAgICBwcm92aWRlOiBQUk9WSURFRF9EQVRBQkFTRV9JTlNUQU5DRVMsXG4gICAgICB1c2VGYWN0b3J5OiBkYXRhYmFzZUluc3RhbmNlRmFjdG9yeShmbiksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgTmdab25lLFxuICAgICAgICBJbmplY3RvcixcbiAgICAgICAgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsXG4gICAgICAgIEZpcmViYXNlQXBwcyxcbiAgICAgICAgLy8gRGF0YWJhc2UrQXV0aCB3b3JrIGJldHRlciBpZiBBdXRoIGlzIGxvYWRlZCBmaXJzdFxuICAgICAgICBbbmV3IE9wdGlvbmFsKCksIEF1dGhJbnN0YW5jZXMgXSxcbiAgICAgICAgW25ldyBPcHRpb25hbCgpLCBBcHBDaGVja0luc3RhbmNlcyBdLFxuICAgICAgICAuLi5kZXBzLFxuICAgICAgXVxuICAgIH1cbiAgXSk7XG59XG4iXX0=