import { isPlatformServer } from '@angular/common';
import { InjectionToken, Injector, NgModule, NgZone, Optional, PLATFORM_ID, isDevMode } from '@angular/core';
import { VERSION, ɵAPP_CHECK_PROVIDER_NAME, ɵAngularFireSchedulers, ɵAppCheckInstances, ɵgetDefaultInstanceOf } from '@angular/fire';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { registerVersion } from 'firebase/app';
import { AppCheck } from './app-check';
import * as i0 from "@angular/core";
export const PROVIDED_APP_CHECK_INSTANCES = new InjectionToken('angularfire2.app-check-instances');
export function defaultAppCheckInstanceFactory(provided, defaultApp) {
    const defaultAppCheck = ɵgetDefaultInstanceOf(ɵAPP_CHECK_PROVIDER_NAME, provided, defaultApp);
    return defaultAppCheck && new AppCheck(defaultAppCheck);
}
const LOCALHOSTS = ['localhost', '0.0.0.0', '127.0.0.1'];
const isLocalhost = typeof window !== 'undefined' && LOCALHOSTS.includes(window.location.hostname);
export function appCheckInstanceFactory(fn) {
    return (zone, injector, platformId) => {
        // Node should use admin token provider, browser devmode and localhost should use debug token
        if (!isPlatformServer(platformId) && (isDevMode() || isLocalhost)) {
            globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN ??= true;
        }
        const appCheck = zone.runOutsideAngular(() => fn(injector));
        return new AppCheck(appCheck);
    };
}
const APP_CHECK_INSTANCES_PROVIDER = {
    provide: ɵAppCheckInstances,
    deps: [
        [new Optional(), PROVIDED_APP_CHECK_INSTANCES],
    ]
};
const DEFAULT_APP_CHECK_INSTANCE_PROVIDER = {
    provide: AppCheck,
    useFactory: defaultAppCheckInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_APP_CHECK_INSTANCES],
        FirebaseApp,
        PLATFORM_ID,
    ]
};
export class AppCheckModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'app-check');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AppCheckModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AppCheckModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AppCheckModule, providers: [
            DEFAULT_APP_CHECK_INSTANCE_PROVIDER,
            APP_CHECK_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AppCheckModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_APP_CHECK_INSTANCE_PROVIDER,
                        APP_CHECK_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return []; } });
export function provideAppCheck(fn, ...deps) {
    return {
        ngModule: AppCheckModule,
        providers: [{
                provide: PROVIDED_APP_CHECK_INSTANCES,
                useFactory: appCheckInstanceFactory(fn),
                multi: true,
                deps: [
                    NgZone,
                    Injector,
                    PLATFORM_ID,
                    ɵAngularFireSchedulers,
                    FirebaseApps,
                    ...deps,
                ]
            }]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNoZWNrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAtY2hlY2svYXBwLWNoZWNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBdUIsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSSxPQUFPLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHNCQUFzQixFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JJLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUV2QyxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBYSxrQ0FBa0MsQ0FBQyxDQUFDO0FBRS9HLE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxRQUFzQyxFQUFFLFVBQXVCO0lBQzVHLE1BQU0sZUFBZSxHQUFHLHFCQUFxQixDQUFtQix3QkFBd0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDaEgsT0FBTyxlQUFlLElBQUksSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN6RCxNQUFNLFdBQVcsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRW5HLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxFQUE0QztJQUNqRixPQUFPLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsVUFBbUIsRUFBRSxFQUFFO1FBQ2hFLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRTtZQUNqRSxVQUFVLENBQUMsNkJBQTZCLEtBQUssSUFBSSxDQUFDO1NBQ25EO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sNEJBQTRCLEdBQUc7SUFDbkMsT0FBTyxFQUFFLGtCQUFrQjtJQUMzQixJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsNEJBQTRCLENBQUU7S0FDaEQ7Q0FDRixDQUFDO0FBRUYsTUFBTSxtQ0FBbUMsR0FBRztJQUMxQyxPQUFPLEVBQUUsUUFBUTtJQUNqQixVQUFVLEVBQUUsOEJBQThCO0lBQzFDLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSw0QkFBNEIsQ0FBRTtRQUMvQyxXQUFXO1FBQ1gsV0FBVztLQUNaO0NBQ0YsQ0FBQztBQVFGLE1BQU0sT0FBTyxjQUFjO0lBQ3pCO1FBQ0UsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzVELENBQUM7d0dBSFUsY0FBYzt5R0FBZCxjQUFjO3lHQUFkLGNBQWMsYUFMZDtZQUNULG1DQUFtQztZQUNuQyw0QkFBNEI7U0FDN0I7OzRGQUVVLGNBQWM7a0JBTjFCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULG1DQUFtQzt3QkFDbkMsNEJBQTRCO3FCQUM3QjtpQkFDRjs7QUFPRCxNQUFNLFVBQVUsZUFBZSxDQUFDLEVBQTRDLEVBQUUsR0FBRyxJQUFXO0lBQzFGLE9BQU87UUFDTCxRQUFRLEVBQUUsY0FBYztRQUN4QixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsNEJBQTRCO2dCQUNyQyxVQUFVLEVBQUUsdUJBQXVCLENBQUMsRUFBRSxDQUFDO2dCQUN2QyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0osTUFBTTtvQkFDTixRQUFRO29CQUNSLFdBQVc7b0JBQ1gsc0JBQXNCO29CQUN0QixZQUFZO29CQUNaLEdBQUcsSUFBSTtpQkFDUjthQUNGLENBQUM7S0FDSCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgTmdab25lLCBPcHRpb25hbCwgUExBVEZPUk1fSUQsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVkVSU0lPTiwgybVBUFBfQ0hFQ0tfUFJPVklERVJfTkFNRSwgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsIMm1QXBwQ2hlY2tJbnN0YW5jZXMsIMm1Z2V0RGVmYXVsdEluc3RhbmNlT2YgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IEZpcmViYXNlQXBwLCBGaXJlYmFzZUFwcHMgfSBmcm9tICdAYW5ndWxhci9maXJlL2FwcCc7XG5pbXBvcnQgeyByZWdpc3RlclZlcnNpb24gfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgQXBwQ2hlY2sgYXMgRmlyZWJhc2VBcHBDaGVjayB9IGZyb20gJ2ZpcmViYXNlL2FwcC1jaGVjayc7XG5pbXBvcnQgeyBBcHBDaGVjayB9IGZyb20gJy4vYXBwLWNoZWNrJztcblxuZXhwb3J0IGNvbnN0IFBST1ZJREVEX0FQUF9DSEVDS19JTlNUQU5DRVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48QXBwQ2hlY2tbXT4oJ2FuZ3VsYXJmaXJlMi5hcHAtY2hlY2staW5zdGFuY2VzJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0QXBwQ2hlY2tJbnN0YW5jZUZhY3RvcnkocHJvdmlkZWQ6IEZpcmViYXNlQXBwQ2hlY2tbXXx1bmRlZmluZWQsIGRlZmF1bHRBcHA6IEZpcmViYXNlQXBwKSB7XG4gIGNvbnN0IGRlZmF1bHRBcHBDaGVjayA9IMm1Z2V0RGVmYXVsdEluc3RhbmNlT2Y8RmlyZWJhc2VBcHBDaGVjaz4oybVBUFBfQ0hFQ0tfUFJPVklERVJfTkFNRSwgcHJvdmlkZWQsIGRlZmF1bHRBcHApO1xuICByZXR1cm4gZGVmYXVsdEFwcENoZWNrICYmIG5ldyBBcHBDaGVjayhkZWZhdWx0QXBwQ2hlY2spO1xufVxuXG5jb25zdCBMT0NBTEhPU1RTID0gWydsb2NhbGhvc3QnLCAnMC4wLjAuMCcsICcxMjcuMC4wLjEnXTtcbmNvbnN0IGlzTG9jYWxob3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgTE9DQUxIT1NUUy5pbmNsdWRlcyh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUpO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwQ2hlY2tJbnN0YW5jZUZhY3RvcnkoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IEZpcmViYXNlQXBwQ2hlY2spIHtcbiAgIHJldHVybiAoem9uZTogTmdab25lLCBpbmplY3RvcjogSW5qZWN0b3IsIHBsYXRmb3JtSWQ6IHVua25vd24pID0+IHtcbiAgICAvLyBOb2RlIHNob3VsZCB1c2UgYWRtaW4gdG9rZW4gcHJvdmlkZXIsIGJyb3dzZXIgZGV2bW9kZSBhbmQgbG9jYWxob3N0IHNob3VsZCB1c2UgZGVidWcgdG9rZW5cbiAgICBpZiAoIWlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCkgJiYgKGlzRGV2TW9kZSgpIHx8IGlzTG9jYWxob3N0KSkge1xuICAgICAgZ2xvYmFsVGhpcy5GSVJFQkFTRV9BUFBDSEVDS19ERUJVR19UT0tFTiA/Pz0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgYXBwQ2hlY2sgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGZuKGluamVjdG9yKSk7XG4gICAgcmV0dXJuIG5ldyBBcHBDaGVjayhhcHBDaGVjayk7XG4gIH07XG59XG5cbmNvbnN0IEFQUF9DSEVDS19JTlNUQU5DRVNfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IMm1QXBwQ2hlY2tJbnN0YW5jZXMsXG4gIGRlcHM6IFtcbiAgICBbbmV3IE9wdGlvbmFsKCksIFBST1ZJREVEX0FQUF9DSEVDS19JTlNUQU5DRVMgXSxcbiAgXVxufTtcblxuY29uc3QgREVGQVVMVF9BUFBfQ0hFQ0tfSU5TVEFOQ0VfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IEFwcENoZWNrLFxuICB1c2VGYWN0b3J5OiBkZWZhdWx0QXBwQ2hlY2tJbnN0YW5jZUZhY3RvcnksXG4gIGRlcHM6IFtcbiAgICBbbmV3IE9wdGlvbmFsKCksIFBST1ZJREVEX0FQUF9DSEVDS19JTlNUQU5DRVMgXSxcbiAgICBGaXJlYmFzZUFwcCxcbiAgICBQTEFURk9STV9JRCxcbiAgXVxufTtcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgREVGQVVMVF9BUFBfQ0hFQ0tfSU5TVEFOQ0VfUFJPVklERVIsXG4gICAgQVBQX0NIRUNLX0lOU1RBTkNFU19QUk9WSURFUixcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDaGVja01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdhcHAtY2hlY2snKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUFwcENoZWNrKGZuOiAoaW5qZWN0b3I6IEluamVjdG9yKSA9PiBGaXJlYmFzZUFwcENoZWNrLCAuLi5kZXBzOiBhbnlbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QXBwQ2hlY2tNb2R1bGU+IHtcbiAgcmV0dXJuIHtcbiAgICBuZ01vZHVsZTogQXBwQ2hlY2tNb2R1bGUsXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgcHJvdmlkZTogUFJPVklERURfQVBQX0NIRUNLX0lOU1RBTkNFUyxcbiAgICAgIHVzZUZhY3Rvcnk6IGFwcENoZWNrSW5zdGFuY2VGYWN0b3J5KGZuKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW1xuICAgICAgICBOZ1pvbmUsXG4gICAgICAgIEluamVjdG9yLFxuICAgICAgICBQTEFURk9STV9JRCxcbiAgICAgICAgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsXG4gICAgICAgIEZpcmViYXNlQXBwcyxcbiAgICAgICAgLi4uZGVwcyxcbiAgICAgIF1cbiAgICB9XVxuICB9O1xufVxuIl19