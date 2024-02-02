import { NgModule } from '@angular/core';
import { VERSION } from '@angular/fire';
import firebase from 'firebase/compat/app';
import { AngularFireRemoteConfig } from './remote-config';
import * as i0 from "@angular/core";
export class AngularFireRemoteConfigModule {
    constructor() {
        firebase.registerVersion('angularfire', VERSION.full, 'rc-compat');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireRemoteConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AngularFireRemoteConfigModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireRemoteConfigModule, providers: [AngularFireRemoteConfig] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireRemoteConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AngularFireRemoteConfig]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLWNvbmZpZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcGF0L3JlbW90ZS1jb25maWcvcmVtb3RlLWNvbmZpZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUsxRCxNQUFNLE9BQU8sNkJBQTZCO0lBQ3RDO1FBQ0ksUUFBUSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN2RSxDQUFDO3dHQUhRLDZCQUE2Qjt5R0FBN0IsNkJBQTZCO3lHQUE3Qiw2QkFBNkIsYUFGN0IsQ0FBRSx1QkFBdUIsQ0FBRTs7NEZBRTNCLDZCQUE2QjtrQkFIekMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBRSx1QkFBdUIsQ0FBRTtpQkFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVSZW1vdGVDb25maWcgfSBmcm9tICcuL3JlbW90ZS1jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFsgQW5ndWxhckZpcmVSZW1vdGVDb25maWcgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZVJlbW90ZUNvbmZpZ01vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGZpcmViYXNlLnJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICdyYy1jb21wYXQnKTtcbiAgICB9XG59XG4iXX0=