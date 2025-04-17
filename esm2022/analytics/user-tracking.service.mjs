import { Injectable, Injector, NgZone } from '@angular/core';
import { VERSION } from '@angular/fire';
import { Auth, authState } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { Analytics } from './analytics';
import { isSupported, setUserId } from './firebase';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/auth";
export class UserTrackingService {
    initialized;
    disposables = [];
    constructor(auth, zone, injector) {
        registerVersion('angularfire', VERSION.full, 'user-tracking');
        let resolveInitialized;
        this.initialized = zone.runOutsideAngular(() => new Promise(resolve => { resolveInitialized = resolve; }));
        // The APP_INITIALIZER that is making isSupported() sync for the sake of convenient DI
        // may not be done when services are initialized. Guard the functionality by first ensuring
        // that the (global) promise has resolved, then get Analytics from the injector.
        isSupported().then(() => {
            const analytics = injector.get(Analytics);
            if (analytics) {
                this.disposables = [
                    // TODO add credential tracking back in
                    authState(auth).subscribe(user => {
                        setUserId(analytics, user?.uid);
                        resolveInitialized();
                    }),
                ];
            }
            else {
                resolveInitialized();
            }
        });
    }
    ngOnDestroy() {
        this.disposables.forEach(it => it.unsubscribe());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: UserTrackingService, deps: [{ token: i1.Auth }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: UserTrackingService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: UserTrackingService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.Auth }, { type: i0.NgZone }, { type: i0.Injector }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci10cmFja2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuYWx5dGljcy91c2VyLXRyYWNraW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRS9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxZQUFZLENBQUM7OztBQUdwRCxNQUFNLE9BQU8sbUJBQW1CO0lBRWQsV0FBVyxDQUFnQjtJQUNuQyxXQUFXLEdBQW1CLEVBQUUsQ0FBQztJQUV6QyxZQUNFLElBQVUsRUFDVixJQUFZLEVBQ1osUUFBa0I7UUFFbEIsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzlELElBQUksa0JBQThCLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNHLHNGQUFzRjtRQUN0RiwyRkFBMkY7UUFDM0YsZ0ZBQWdGO1FBQ2hGLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxXQUFXLEdBQUc7b0JBQ2pCLHVDQUF1QztvQkFDdkMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDL0IsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ2hDLGtCQUFrQixFQUFFLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQztpQkFDSCxDQUFDO1lBQ0osQ0FBQztpQkFBTSxDQUFDO2dCQUNOLGtCQUFrQixFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7d0dBbENVLG1CQUFtQjs0R0FBbkIsbUJBQW1COzs0RkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBBdXRoLCBhdXRoU3RhdGUgfSBmcm9tICdAYW5ndWxhci9maXJlL2F1dGgnO1xuaW1wb3J0IHsgcmVnaXN0ZXJWZXJzaW9uIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQW5hbHl0aWNzIH0gZnJvbSAnLi9hbmFseXRpY3MnO1xuaW1wb3J0IHsgaXNTdXBwb3J0ZWQsIHNldFVzZXJJZCB9IGZyb20gJy4vZmlyZWJhc2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlclRyYWNraW5nU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHVibGljIHJlYWRvbmx5IGluaXRpYWxpemVkOiBQcm9taXNlPHZvaWQ+O1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGF1dGg6IEF1dGgsXG4gICAgem9uZTogTmdab25lLFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgKSB7XG4gICAgcmVnaXN0ZXJWZXJzaW9uKCdhbmd1bGFyZmlyZScsIFZFUlNJT04uZnVsbCwgJ3VzZXItdHJhY2tpbmcnKTtcbiAgICBsZXQgcmVzb2x2ZUluaXRpYWxpemVkOiAoKSA9PiB2b2lkO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4geyByZXNvbHZlSW5pdGlhbGl6ZWQgPSByZXNvbHZlOyB9KSk7XG4gICAgLy8gVGhlIEFQUF9JTklUSUFMSVpFUiB0aGF0IGlzIG1ha2luZyBpc1N1cHBvcnRlZCgpIHN5bmMgZm9yIHRoZSBzYWtlIG9mIGNvbnZlbmllbnQgRElcbiAgICAvLyBtYXkgbm90IGJlIGRvbmUgd2hlbiBzZXJ2aWNlcyBhcmUgaW5pdGlhbGl6ZWQuIEd1YXJkIHRoZSBmdW5jdGlvbmFsaXR5IGJ5IGZpcnN0IGVuc3VyaW5nXG4gICAgLy8gdGhhdCB0aGUgKGdsb2JhbCkgcHJvbWlzZSBoYXMgcmVzb2x2ZWQsIHRoZW4gZ2V0IEFuYWx5dGljcyBmcm9tIHRoZSBpbmplY3Rvci5cbiAgICBpc1N1cHBvcnRlZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgYW5hbHl0aWNzID0gaW5qZWN0b3IuZ2V0KEFuYWx5dGljcyk7XG4gICAgICBpZiAoYW5hbHl0aWNzKSB7XG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBbXG4gICAgICAgICAgLy8gVE9ETyBhZGQgY3JlZGVudGlhbCB0cmFja2luZyBiYWNrIGluXG4gICAgICAgICAgYXV0aFN0YXRlKGF1dGgpLnN1YnNjcmliZSh1c2VyID0+IHtcbiAgICAgICAgICAgIHNldFVzZXJJZChhbmFseXRpY3MsIHVzZXI/LnVpZCk7XG4gICAgICAgICAgICByZXNvbHZlSW5pdGlhbGl6ZWQoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmVJbml0aWFsaXplZCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5mb3JFYWNoKGl0ID0+IGl0LnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=