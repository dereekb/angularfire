import { APP_INITIALIZER, InjectionToken, Injector, NgModule, NgZone, Optional } from '@angular/core';
import { VERSION, ɵAngularFireSchedulers, ɵgetDefaultInstanceOf } from '@angular/fire';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { registerVersion } from 'firebase/app';
import { ANALYTICS_PROVIDER_NAME, Analytics, AnalyticsInstances } from './analytics';
import { isAnalyticsSupportedFactory } from './is-analytics-supported-factory';
import { ScreenTrackingService } from './screen-tracking.service';
import { UserTrackingService } from './user-tracking.service';
import * as i0 from "@angular/core";
import * as i1 from "./screen-tracking.service";
import * as i2 from "./user-tracking.service";
export const PROVIDED_ANALYTICS_INSTANCES = new InjectionToken('angularfire2.analytics-instances');
export function defaultAnalyticsInstanceFactory(provided, defaultApp) {
    if (!isAnalyticsSupportedFactory.sync()) {
        return null;
    }
    const defaultAnalytics = ɵgetDefaultInstanceOf(ANALYTICS_PROVIDER_NAME, provided, defaultApp);
    return defaultAnalytics && new Analytics(defaultAnalytics);
}
export function analyticsInstanceFactory(fn) {
    return (zone, injector) => {
        if (!isAnalyticsSupportedFactory.sync()) {
            return null;
        }
        const analytics = zone.runOutsideAngular(() => fn(injector));
        return new Analytics(analytics);
    };
}
const ANALYTICS_INSTANCES_PROVIDER = {
    provide: AnalyticsInstances,
    deps: [
        [new Optional(), PROVIDED_ANALYTICS_INSTANCES],
    ]
};
const DEFAULT_ANALYTICS_INSTANCE_PROVIDER = {
    provide: Analytics,
    useFactory: defaultAnalyticsInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_ANALYTICS_INSTANCES],
        FirebaseApp,
    ]
};
export class AnalyticsModule {
    constructor(_screenTrackingService, _userTrackingService) {
        registerVersion('angularfire', VERSION.full, 'analytics');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AnalyticsModule, deps: [{ token: i1.ScreenTrackingService, optional: true }, { token: i2.UserTrackingService, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AnalyticsModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AnalyticsModule, providers: [
            DEFAULT_ANALYTICS_INSTANCE_PROVIDER,
            ANALYTICS_INSTANCES_PROVIDER,
            {
                provide: APP_INITIALIZER,
                useValue: isAnalyticsSupportedFactory.async,
                multi: true,
            }
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AnalyticsModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_ANALYTICS_INSTANCE_PROVIDER,
                        ANALYTICS_INSTANCES_PROVIDER,
                        {
                            provide: APP_INITIALIZER,
                            useValue: isAnalyticsSupportedFactory.async,
                            multi: true,
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.ScreenTrackingService, decorators: [{
                    type: Optional
                }] }, { type: i2.UserTrackingService, decorators: [{
                    type: Optional
                }] }]; } });
export function provideAnalytics(fn, ...deps) {
    return {
        ngModule: AnalyticsModule,
        providers: [{
                provide: PROVIDED_ANALYTICS_INSTANCES,
                useFactory: analyticsInstanceFactory(fn),
                multi: true,
                deps: [
                    NgZone,
                    Injector,
                    ɵAngularFireSchedulers,
                    FirebaseApps,
                    ...deps,
                ]
            }]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hbmFseXRpY3MvYW5hbHl0aWNzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNILE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFFOUQsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUcsSUFBSSxjQUFjLENBQWMsa0NBQWtDLENBQUMsQ0FBQztBQUVoSCxNQUFNLFVBQVUsK0JBQStCLENBQUMsUUFBdUMsRUFBRSxVQUF1QjtJQUM5RyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFBRSxPQUFPLElBQUksQ0FBQztLQUFFO0lBQ3pELE1BQU0sZ0JBQWdCLEdBQUcscUJBQXFCLENBQW9CLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqSCxPQUFPLGdCQUFnQixJQUFJLElBQUksU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxFQUE2QztJQUNwRixPQUFPLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztTQUFFO1FBQ3pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLDRCQUE0QixHQUFHO0lBQ25DLE9BQU8sRUFBRSxrQkFBa0I7SUFDM0IsSUFBSSxFQUFFO1FBQ0osQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLDRCQUE0QixDQUFFO0tBQ2hEO0NBQ0YsQ0FBQztBQUVGLE1BQU0sbUNBQW1DLEdBQUc7SUFDMUMsT0FBTyxFQUFFLFNBQVM7SUFDbEIsVUFBVSxFQUFFLCtCQUErQjtJQUMzQyxJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsNEJBQTRCLENBQUU7UUFDL0MsV0FBVztLQUNaO0NBQ0YsQ0FBQztBQWFGLE1BQU0sT0FBTyxlQUFlO0lBQzFCLFlBQ2Msc0JBQTZDLEVBQzdDLG9CQUF5QztRQUVyRCxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUQsQ0FBQzt3R0FOVSxlQUFlO3lHQUFmLGVBQWU7eUdBQWYsZUFBZSxhQVZmO1lBQ1QsbUNBQW1DO1lBQ25DLDRCQUE0QjtZQUM1QjtnQkFDRSxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsUUFBUSxFQUFFLDJCQUEyQixDQUFDLEtBQUs7Z0JBQzNDLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjs7NEZBRVUsZUFBZTtrQkFYM0IsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsbUNBQW1DO3dCQUNuQyw0QkFBNEI7d0JBQzVCOzRCQUNFLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixRQUFRLEVBQUUsMkJBQTJCLENBQUMsS0FBSzs0QkFDM0MsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7OzBCQUdJLFFBQVE7OzBCQUNSLFFBQVE7O0FBTWIsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEVBQTZDLEVBQUUsR0FBRyxJQUFXO0lBQzVGLE9BQU87UUFDTCxRQUFRLEVBQUUsZUFBZTtRQUN6QixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsNEJBQTRCO2dCQUNyQyxVQUFVLEVBQUUsd0JBQXdCLENBQUMsRUFBRSxDQUFDO2dCQUN4QyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0osTUFBTTtvQkFDTixRQUFRO29CQUNSLHNCQUFzQjtvQkFDdEIsWUFBWTtvQkFDWixHQUFHLElBQUk7aUJBQ1I7YUFDRixDQUFDO0tBQ0gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE5nWm9uZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04sIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLCDJtWdldERlZmF1bHRJbnN0YW5jZU9mIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBGaXJlYmFzZUFwcCwgRmlyZWJhc2VBcHBzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hcHAnO1xuaW1wb3J0IHsgQW5hbHl0aWNzIGFzIEZpcmViYXNlQW5hbHl0aWNzIH0gZnJvbSAnZmlyZWJhc2UvYW5hbHl0aWNzJztcbmltcG9ydCB7IHJlZ2lzdGVyVmVyc2lvbiB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBBTkFMWVRJQ1NfUFJPVklERVJfTkFNRSwgQW5hbHl0aWNzLCBBbmFseXRpY3NJbnN0YW5jZXMgfSBmcm9tICcuL2FuYWx5dGljcyc7XG5pbXBvcnQgeyBpc0FuYWx5dGljc1N1cHBvcnRlZEZhY3RvcnkgfSBmcm9tICcuL2lzLWFuYWx5dGljcy1zdXBwb3J0ZWQtZmFjdG9yeSc7XG5pbXBvcnQgeyBTY3JlZW5UcmFja2luZ1NlcnZpY2UgfSBmcm9tICcuL3NjcmVlbi10cmFja2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJUcmFja2luZ1NlcnZpY2UgfSBmcm9tICcuL3VzZXItdHJhY2tpbmcuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBQUk9WSURFRF9BTkFMWVRJQ1NfSU5TVEFOQ0VTID0gbmV3IEluamVjdGlvblRva2VuPEFuYWx5dGljc1tdPignYW5ndWxhcmZpcmUyLmFuYWx5dGljcy1pbnN0YW5jZXMnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRBbmFseXRpY3NJbnN0YW5jZUZhY3RvcnkocHJvdmlkZWQ6IEZpcmViYXNlQW5hbHl0aWNzW118dW5kZWZpbmVkLCBkZWZhdWx0QXBwOiBGaXJlYmFzZUFwcCkge1xuICBpZiAoIWlzQW5hbHl0aWNzU3VwcG9ydGVkRmFjdG9yeS5zeW5jKCkpIHsgcmV0dXJuIG51bGw7IH1cbiAgY29uc3QgZGVmYXVsdEFuYWx5dGljcyA9IMm1Z2V0RGVmYXVsdEluc3RhbmNlT2Y8RmlyZWJhc2VBbmFseXRpY3M+KEFOQUxZVElDU19QUk9WSURFUl9OQU1FLCBwcm92aWRlZCwgZGVmYXVsdEFwcCk7XG4gIHJldHVybiBkZWZhdWx0QW5hbHl0aWNzICYmIG5ldyBBbmFseXRpY3MoZGVmYXVsdEFuYWx5dGljcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmFseXRpY3NJbnN0YW5jZUZhY3RvcnkoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IEZpcmViYXNlQW5hbHl0aWNzKSB7XG4gIHJldHVybiAoem9uZTogTmdab25lLCBpbmplY3RvcjogSW5qZWN0b3IpID0+IHtcbiAgICBpZiAoIWlzQW5hbHl0aWNzU3VwcG9ydGVkRmFjdG9yeS5zeW5jKCkpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBjb25zdCBhbmFseXRpY3MgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGZuKGluamVjdG9yKSk7XG4gICAgcmV0dXJuIG5ldyBBbmFseXRpY3MoYW5hbHl0aWNzKTtcbiAgfTtcbn1cblxuY29uc3QgQU5BTFlUSUNTX0lOU1RBTkNFU19QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogQW5hbHl0aWNzSW5zdGFuY2VzLFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9BTkFMWVRJQ1NfSU5TVEFOQ0VTIF0sXG4gIF1cbn07XG5cbmNvbnN0IERFRkFVTFRfQU5BTFlUSUNTX0lOU1RBTkNFX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBBbmFseXRpY3MsXG4gIHVzZUZhY3Rvcnk6IGRlZmF1bHRBbmFseXRpY3NJbnN0YW5jZUZhY3RvcnksXG4gIGRlcHM6IFtcbiAgICBbbmV3IE9wdGlvbmFsKCksIFBST1ZJREVEX0FOQUxZVElDU19JTlNUQU5DRVMgXSxcbiAgICBGaXJlYmFzZUFwcCxcbiAgXVxufTtcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgREVGQVVMVF9BTkFMWVRJQ1NfSU5TVEFOQ0VfUFJPVklERVIsXG4gICAgQU5BTFlUSUNTX0lOU1RBTkNFU19QUk9WSURFUixcbiAgICB7XG4gICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICB1c2VWYWx1ZTogaXNBbmFseXRpY3NTdXBwb3J0ZWRGYWN0b3J5LmFzeW5jLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIF9zY3JlZW5UcmFja2luZ1NlcnZpY2U6IFNjcmVlblRyYWNraW5nU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBfdXNlclRyYWNraW5nU2VydmljZTogVXNlclRyYWNraW5nU2VydmljZSxcbiAgKSB7XG4gICAgcmVnaXN0ZXJWZXJzaW9uKCdhbmd1bGFyZmlyZScsIFZFUlNJT04uZnVsbCwgJ2FuYWx5dGljcycpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQW5hbHl0aWNzKGZuOiAoaW5qZWN0b3I6IEluamVjdG9yKSA9PiBGaXJlYmFzZUFuYWx5dGljcywgLi4uZGVwczogYW55W10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFuYWx5dGljc01vZHVsZT4ge1xuICByZXR1cm4ge1xuICAgIG5nTW9kdWxlOiBBbmFseXRpY3NNb2R1bGUsXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgcHJvdmlkZTogUFJPVklERURfQU5BTFlUSUNTX0lOU1RBTkNFUyxcbiAgICAgIHVzZUZhY3Rvcnk6IGFuYWx5dGljc0luc3RhbmNlRmFjdG9yeShmbiksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgTmdab25lLFxuICAgICAgICBJbmplY3RvcixcbiAgICAgICAgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsXG4gICAgICAgIEZpcmViYXNlQXBwcyxcbiAgICAgICAgLi4uZGVwcyxcbiAgICAgIF1cbiAgICB9XVxuICB9O1xufVxuIl19