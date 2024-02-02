import { NgModule, Optional } from '@angular/core';
import { VERSION } from '@angular/fire';
import firebase from 'firebase/compat/app';
import { AngularFireAnalytics } from './analytics';
import { ScreenTrackingService } from './screen-tracking.service';
import { UserTrackingService } from './user-tracking.service';
import * as i0 from "@angular/core";
import * as i1 from "./analytics";
import * as i2 from "./screen-tracking.service";
import * as i3 from "./user-tracking.service";
export class AngularFireAnalyticsModule {
    constructor(analytics, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    screenTracking, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userTracking) {
        firebase.registerVersion('angularfire', VERSION.full, 'analytics-compat');
        // calling anything on analytics will eagerly load the SDK
        analytics.app.then(() => undefined);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAnalyticsModule, deps: [{ token: i1.AngularFireAnalytics }, { token: i2.ScreenTrackingService, optional: true }, { token: i3.UserTrackingService, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAnalyticsModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAnalyticsModule, providers: [AngularFireAnalytics] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireAnalyticsModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AngularFireAnalytics]
                }]
        }], ctorParameters: function () { return [{ type: i1.AngularFireAnalytics }, { type: i2.ScreenTrackingService, decorators: [{
                    type: Optional
                }] }, { type: i3.UserTrackingService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wYXQvYW5hbHl0aWNzL2FuYWx5dGljcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLFFBQVEsTUFBTSxxQkFBcUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7O0FBSzlELE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFDRSxTQUErQjtJQUMvQiw2REFBNkQ7SUFDakQsY0FBcUM7SUFDakQsNkRBQTZEO0lBQ2pELFlBQWlDO1FBRTdDLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUMxRSwwREFBMEQ7UUFDMUQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQzt3R0FYVSwwQkFBMEI7eUdBQTFCLDBCQUEwQjt5R0FBMUIsMEJBQTBCLGFBRjFCLENBQUUsb0JBQW9CLENBQUU7OzRGQUV4QiwwQkFBMEI7a0JBSHRDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUUsb0JBQW9CLENBQUU7aUJBQ3BDOzswQkFLSSxRQUFROzswQkFFUixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvY29tcGF0L2FwcCc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZUFuYWx5dGljcyB9IGZyb20gJy4vYW5hbHl0aWNzJztcbmltcG9ydCB7IFNjcmVlblRyYWNraW5nU2VydmljZSB9IGZyb20gJy4vc2NyZWVuLXRyYWNraW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclRyYWNraW5nU2VydmljZSB9IGZyb20gJy4vdXNlci10cmFja2luZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbIEFuZ3VsYXJGaXJlQW5hbHl0aWNzIF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVBbmFseXRpY3NNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhbmFseXRpY3M6IEFuZ3VsYXJGaXJlQW5hbHl0aWNzLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBAT3B0aW9uYWwoKSBzY3JlZW5UcmFja2luZzogU2NyZWVuVHJhY2tpbmdTZXJ2aWNlLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBAT3B0aW9uYWwoKSB1c2VyVHJhY2tpbmc6IFVzZXJUcmFja2luZ1NlcnZpY2UsXG4gICkge1xuICAgIGZpcmViYXNlLnJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdhbmFseXRpY3MtY29tcGF0Jyk7XG4gICAgLy8gY2FsbGluZyBhbnl0aGluZyBvbiBhbmFseXRpY3Mgd2lsbCBlYWdlcmx5IGxvYWQgdGhlIFNES1xuICAgIGFuYWx5dGljcy5hcHAudGhlbigoKSA9PiB1bmRlZmluZWQpO1xuICB9XG59XG4iXX0=