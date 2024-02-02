import { ComponentFactoryResolver, Injectable, NgZone, Optional } from '@angular/core';
import { VERSION } from '@angular/fire';
import { ɵscreenViewEvent } from '@angular/fire/analytics';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { switchMap } from 'rxjs/operators';
import { AngularFireAnalytics } from './analytics';
import { UserTrackingService } from './user-tracking.service';
import * as i0 from "@angular/core";
import * as i1 from "./analytics";
import * as i2 from "@angular/router";
import * as i3 from "@angular/platform-browser";
import * as i4 from "./user-tracking.service";
const SCREEN_VIEW_EVENT = 'screen_view';
export class ScreenTrackingService {
    disposable;
    constructor(analytics, router, title, componentFactoryResolver, zone, userTrackingService) {
        firebase.registerVersion('angularfire', VERSION.full, 'compat-screen-tracking');
        if (!router || !analytics) {
            return this;
        }
        zone.runOutsideAngular(() => {
            this.disposable = ɵscreenViewEvent(router, title, componentFactoryResolver).pipe(switchMap(async (params) => {
                if (userTrackingService) {
                    await userTrackingService.initialized;
                }
                return await analytics.logEvent(SCREEN_VIEW_EVENT, params);
            })).subscribe();
        });
    }
    ngOnDestroy() {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: ScreenTrackingService, deps: [{ token: i1.AngularFireAnalytics }, { token: i2.Router, optional: true }, { token: i3.Title, optional: true }, { token: i0.ComponentFactoryResolver }, { token: i0.NgZone }, { token: i4.UserTrackingService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: ScreenTrackingService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: ScreenTrackingService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AngularFireAnalytics }, { type: i2.Router, decorators: [{
                    type: Optional
                }] }, { type: i3.Title, decorators: [{
                    type: Optional
                }] }, { type: i0.ComponentFactoryResolver }, { type: i0.NgZone }, { type: i4.UserTrackingService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuLXRyYWNraW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcGF0L2FuYWx5dGljcy9zY3JlZW4tdHJhY2tpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQUU5RCxNQUFNLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztBQUd4QyxNQUFNLE9BQU8scUJBQXFCO0lBRXhCLFVBQVUsQ0FBMkI7SUFFN0MsWUFDRSxTQUErQixFQUNuQixNQUFjLEVBQ2QsS0FBWSxFQUN4Qix3QkFBa0QsRUFDbEQsSUFBWSxFQUNBLG1CQUF3QztRQUVwRCxRQUFRLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQzVFLFNBQVMsQ0FBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQUU7Z0JBQ3ZCLElBQUksbUJBQW1CLEVBQUU7b0JBQ3ZCLE1BQU0sbUJBQW1CLENBQUMsV0FBVyxDQUFDO2lCQUN2QztnQkFDRCxPQUFPLE1BQU0sU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUMsQ0FDTCxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7d0dBOUJVLHFCQUFxQjs0R0FBckIscUJBQXFCOzs0RkFBckIscUJBQXFCO2tCQURqQyxVQUFVOzswQkFPTixRQUFROzswQkFDUixRQUFROzswQkFHUixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RhYmxlLCBOZ1pvbmUsIE9uRGVzdHJveSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IMm1c2NyZWVuVmlld0V2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hbmFseXRpY3MnO1xuaW1wb3J0IHsgVGl0bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvY29tcGF0L2FwcCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlQW5hbHl0aWNzIH0gZnJvbSAnLi9hbmFseXRpY3MnO1xuaW1wb3J0IHsgVXNlclRyYWNraW5nU2VydmljZSB9IGZyb20gJy4vdXNlci10cmFja2luZy5zZXJ2aWNlJztcblxuY29uc3QgU0NSRUVOX1ZJRVdfRVZFTlQgPSAnc2NyZWVuX3ZpZXcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2NyZWVuVHJhY2tpbmdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGRpc3Bvc2FibGU6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhbmFseXRpY3M6IEFuZ3VsYXJGaXJlQW5hbHl0aWNzLFxuICAgIEBPcHRpb25hbCgpIHJvdXRlcjogUm91dGVyLFxuICAgIEBPcHRpb25hbCgpIHRpdGxlOiBUaXRsZSxcbiAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICB6b25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgdXNlclRyYWNraW5nU2VydmljZTogVXNlclRyYWNraW5nU2VydmljZSxcbiAgKSB7XG4gICAgZmlyZWJhc2UucmVnaXN0ZXJWZXJzaW9uKCdhbmd1bGFyZmlyZScsIFZFUlNJT04uZnVsbCwgJ2NvbXBhdC1zY3JlZW4tdHJhY2tpbmcnKTtcbiAgICBpZiAoIXJvdXRlciB8fCAhYW5hbHl0aWNzKSB7IHJldHVybiB0aGlzOyB9XG4gICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmRpc3Bvc2FibGUgPSDJtXNjcmVlblZpZXdFdmVudChyb3V0ZXIsIHRpdGxlLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIHBhcmFtcyA9PiB7XG4gICAgICAgICAgICBpZiAodXNlclRyYWNraW5nU2VydmljZSkge1xuICAgICAgICAgICAgICBhd2FpdCB1c2VyVHJhY2tpbmdTZXJ2aWNlLmluaXRpYWxpemVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGFuYWx5dGljcy5sb2dFdmVudChTQ1JFRU5fVklFV19FVkVOVCwgcGFyYW1zKTtcbiAgICAgICAgICB9KVxuICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmRpc3Bvc2FibGUpIHtcbiAgICAgIHRoaXMuZGlzcG9zYWJsZS51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=