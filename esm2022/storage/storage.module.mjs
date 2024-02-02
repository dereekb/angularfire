import { InjectionToken, Injector, NgModule, NgZone, Optional } from '@angular/core';
import { VERSION, ɵAngularFireSchedulers, ɵgetDefaultInstanceOf } from '@angular/fire';
import { ɵAppCheckInstances } from '@angular/fire';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AuthInstances } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { STORAGE_PROVIDER_NAME, Storage, StorageInstances } from './storage';
import * as i0 from "@angular/core";
export const PROVIDED_STORAGE_INSTANCES = new InjectionToken('angularfire2.storage-instances');
export function defaultStorageInstanceFactory(provided, defaultApp) {
    const defaultStorage = ɵgetDefaultInstanceOf(STORAGE_PROVIDER_NAME, provided, defaultApp);
    return defaultStorage && new Storage(defaultStorage);
}
export function storageInstanceFactory(fn) {
    return (zone, injector) => {
        const storage = zone.runOutsideAngular(() => fn(injector));
        return new Storage(storage);
    };
}
const STORAGE_INSTANCES_PROVIDER = {
    provide: StorageInstances,
    deps: [
        [new Optional(), PROVIDED_STORAGE_INSTANCES],
    ]
};
const DEFAULT_STORAGE_INSTANCE_PROVIDER = {
    provide: Storage,
    useFactory: defaultStorageInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_STORAGE_INSTANCES],
        FirebaseApp,
    ]
};
export class StorageModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'gcs');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: StorageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: StorageModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: StorageModule, providers: [
            DEFAULT_STORAGE_INSTANCE_PROVIDER,
            STORAGE_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: StorageModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_STORAGE_INSTANCE_PROVIDER,
                        STORAGE_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return []; } });
export function provideStorage(fn, ...deps) {
    return {
        ngModule: StorageModule,
        providers: [{
                provide: PROVIDED_STORAGE_INSTANCES,
                useFactory: storageInstanceFactory(fn),
                multi: true,
                deps: [
                    NgZone,
                    Injector,
                    ɵAngularFireSchedulers,
                    FirebaseApps,
                    // Defensively load Auth first, if provided
                    [new Optional(), AuthInstances],
                    [new Optional(), ɵAppCheckInstances],
                    ...deps,
                ]
            }]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3RvcmFnZS9zdG9yYWdlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBdUIsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDOztBQUU3RSxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLGNBQWMsQ0FBWSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRTFHLE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxRQUFxQyxFQUFFLFVBQXVCO0lBQzFHLE1BQU0sY0FBYyxHQUFHLHFCQUFxQixDQUFrQixxQkFBcUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0csT0FBTyxjQUFjLElBQUksSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxFQUEyQztJQUNoRixPQUFPLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsRUFBRTtRQUMxQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSwwQkFBMEIsQ0FBRTtLQUM5QztDQUNGLENBQUM7QUFFRixNQUFNLGlDQUFpQyxHQUFHO0lBQ3hDLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLFVBQVUsRUFBRSw2QkFBNkI7SUFDekMsSUFBSSxFQUFFO1FBQ0osQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLDBCQUEwQixDQUFFO1FBQzdDLFdBQVc7S0FDWjtDQUNGLENBQUM7QUFRRixNQUFNLE9BQU8sYUFBYTtJQUN4QjtRQUNFLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO3dHQUhVLGFBQWE7eUdBQWIsYUFBYTt5R0FBYixhQUFhLGFBTGI7WUFDVCxpQ0FBaUM7WUFDakMsMEJBQTBCO1NBQzNCOzs0RkFFVSxhQUFhO2tCQU56QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxpQ0FBaUM7d0JBQ2pDLDBCQUEwQjtxQkFDM0I7aUJBQ0Y7O0FBT0QsTUFBTSxVQUFVLGNBQWMsQ0FBQyxFQUEyQyxFQUFFLEdBQUcsSUFBVztJQUN4RixPQUFPO1FBQ0wsUUFBUSxFQUFFLGFBQWE7UUFDdkIsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLDBCQUEwQjtnQkFDbkMsVUFBVSxFQUFFLHNCQUFzQixDQUFDLEVBQUUsQ0FBQztnQkFDdEMsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFO29CQUNKLE1BQU07b0JBQ04sUUFBUTtvQkFDUixzQkFBc0I7b0JBQ3RCLFlBQVk7b0JBQ1osMkNBQTJDO29CQUMzQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsYUFBYSxDQUFFO29CQUNoQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsa0JBQWtCLENBQUU7b0JBQ3JDLEdBQUcsSUFBSTtpQkFDUjthQUNGLENBQUM7S0FDSCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuLCBJbmplY3RvciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE5nWm9uZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04sIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLCDJtWdldERlZmF1bHRJbnN0YW5jZU9mIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyDJtUFwcENoZWNrSW5zdGFuY2VzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBGaXJlYmFzZUFwcCwgRmlyZWJhc2VBcHBzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hcHAnO1xuaW1wb3J0IHsgQXV0aEluc3RhbmNlcyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvYXV0aCc7XG5pbXBvcnQgeyByZWdpc3RlclZlcnNpb24gfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgRmlyZWJhc2VTdG9yYWdlIH0gZnJvbSAnZmlyZWJhc2Uvc3RvcmFnZSc7XG5pbXBvcnQgeyBTVE9SQUdFX1BST1ZJREVSX05BTUUsIFN0b3JhZ2UsIFN0b3JhZ2VJbnN0YW5jZXMgfSBmcm9tICcuL3N0b3JhZ2UnO1xuXG5leHBvcnQgY29uc3QgUFJPVklERURfU1RPUkFHRV9JTlNUQU5DRVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48U3RvcmFnZVtdPignYW5ndWxhcmZpcmUyLnN0b3JhZ2UtaW5zdGFuY2VzJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0U3RvcmFnZUluc3RhbmNlRmFjdG9yeShwcm92aWRlZDogRmlyZWJhc2VTdG9yYWdlW118dW5kZWZpbmVkLCBkZWZhdWx0QXBwOiBGaXJlYmFzZUFwcCkge1xuICBjb25zdCBkZWZhdWx0U3RvcmFnZSA9IMm1Z2V0RGVmYXVsdEluc3RhbmNlT2Y8RmlyZWJhc2VTdG9yYWdlPihTVE9SQUdFX1BST1ZJREVSX05BTUUsIHByb3ZpZGVkLCBkZWZhdWx0QXBwKTtcbiAgcmV0dXJuIGRlZmF1bHRTdG9yYWdlICYmIG5ldyBTdG9yYWdlKGRlZmF1bHRTdG9yYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3JhZ2VJbnN0YW5jZUZhY3RvcnkoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IEZpcmViYXNlU3RvcmFnZSkge1xuICByZXR1cm4gKHpvbmU6IE5nWm9uZSwgaW5qZWN0b3I6IEluamVjdG9yKSA9PiB7XG4gICAgY29uc3Qgc3RvcmFnZSA9IHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gZm4oaW5qZWN0b3IpKTtcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2Uoc3RvcmFnZSk7XG4gIH07XG59XG5cbmNvbnN0IFNUT1JBR0VfSU5TVEFOQ0VTX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBTdG9yYWdlSW5zdGFuY2VzLFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9TVE9SQUdFX0lOU1RBTkNFUyBdLFxuICBdXG59O1xuXG5jb25zdCBERUZBVUxUX1NUT1JBR0VfSU5TVEFOQ0VfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IFN0b3JhZ2UsXG4gIHVzZUZhY3Rvcnk6IGRlZmF1bHRTdG9yYWdlSW5zdGFuY2VGYWN0b3J5LFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9TVE9SQUdFX0lOU1RBTkNFUyBdLFxuICAgIEZpcmViYXNlQXBwLFxuICBdXG59O1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBERUZBVUxUX1NUT1JBR0VfSU5TVEFOQ0VfUFJPVklERVIsXG4gICAgU1RPUkFHRV9JTlNUQU5DRVNfUFJPVklERVIsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU3RvcmFnZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdnY3MnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVN0b3JhZ2UoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IEZpcmViYXNlU3RvcmFnZSwgLi4uZGVwczogYW55W10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JhZ2VNb2R1bGU+IHtcbiAgcmV0dXJuIHtcbiAgICBuZ01vZHVsZTogU3RvcmFnZU1vZHVsZSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICBwcm92aWRlOiBQUk9WSURFRF9TVE9SQUdFX0lOU1RBTkNFUyxcbiAgICAgIHVzZUZhY3Rvcnk6IHN0b3JhZ2VJbnN0YW5jZUZhY3RvcnkoZm4pLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbXG4gICAgICAgIE5nWm9uZSxcbiAgICAgICAgSW5qZWN0b3IsXG4gICAgICAgIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLFxuICAgICAgICBGaXJlYmFzZUFwcHMsXG4gICAgICAgIC8vIERlZmVuc2l2ZWx5IGxvYWQgQXV0aCBmaXJzdCwgaWYgcHJvdmlkZWRcbiAgICAgICAgW25ldyBPcHRpb25hbCgpLCBBdXRoSW5zdGFuY2VzIF0sXG4gICAgICAgIFtuZXcgT3B0aW9uYWwoKSwgybVBcHBDaGVja0luc3RhbmNlcyBdLFxuICAgICAgICAuLi5kZXBzLFxuICAgICAgXVxuICAgIH1dXG4gIH07XG59XG4iXX0=