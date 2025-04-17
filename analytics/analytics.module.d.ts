import { EnvironmentProviders, InjectionToken, Injector, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Analytics as FirebaseAnalytics } from 'firebase/analytics';
import { Analytics } from './analytics';
import { ScreenTrackingService } from './screen-tracking.service';
import { UserTrackingService } from './user-tracking.service';
import * as i0 from "@angular/core";
export declare const PROVIDED_ANALYTICS_INSTANCES: InjectionToken<Analytics[]>;
export declare function defaultAnalyticsInstanceFactory(provided: FirebaseAnalytics[] | undefined, defaultApp: FirebaseApp, platformId: object): Analytics;
export declare function analyticsInstanceFactory(fn: (injector: Injector) => FirebaseAnalytics): (zone: NgZone, injector: Injector, platformId: object) => Analytics;
export declare class AnalyticsModule {
    constructor(_screenTrackingService: ScreenTrackingService, _userTrackingService: UserTrackingService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AnalyticsModule, [{ optional: true; }, { optional: true; }]>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AnalyticsModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AnalyticsModule>;
}
export declare function provideAnalytics(fn: (injector: Injector) => FirebaseAnalytics, ...deps: any[]): EnvironmentProviders;
