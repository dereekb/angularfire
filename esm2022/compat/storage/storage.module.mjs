import { NgModule } from '@angular/core';
import { VERSION } from '@angular/fire';
import firebase from 'firebase/compat/app';
import { GetDownloadURLPipeModule } from './pipes/storageUrl.pipe';
import { AngularFireStorage } from './storage';
import * as i0 from "@angular/core";
export class AngularFireStorageModule {
    constructor() {
        firebase.registerVersion('angularfire', VERSION.full, 'gcs-compat');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireStorageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: AngularFireStorageModule, exports: [GetDownloadURLPipeModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireStorageModule, providers: [AngularFireStorage], imports: [GetDownloadURLPipeModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: AngularFireStorageModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [GetDownloadURLPipeModule],
                    providers: [AngularFireStorage]
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcGF0L3N0b3JhZ2Uvc3RvcmFnZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFNL0MsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQztRQUNFLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdEUsQ0FBQzt3R0FIVSx3QkFBd0I7eUdBQXhCLHdCQUF3QixZQUh4Qix3QkFBd0I7eUdBR3hCLHdCQUF3QixhQUZ4QixDQUFFLGtCQUFrQixDQUFFLFlBRHRCLHdCQUF3Qjs7NEZBR3hCLHdCQUF3QjtrQkFKcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSx3QkFBd0IsQ0FBRTtvQkFDckMsU0FBUyxFQUFFLENBQUUsa0JBQWtCLENBQUU7aUJBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9jb21wYXQvYXBwJztcbmltcG9ydCB7IEdldERvd25sb2FkVVJMUGlwZU1vZHVsZSB9IGZyb20gJy4vcGlwZXMvc3RvcmFnZVVybC5waXBlJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFsgR2V0RG93bmxvYWRVUkxQaXBlTW9kdWxlIF0sXG4gIHByb3ZpZGVyczogWyBBbmd1bGFyRmlyZVN0b3JhZ2UgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZVN0b3JhZ2VNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBmaXJlYmFzZS5yZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAnZ2NzLWNvbXBhdCcpO1xuICB9XG59XG4iXX0=