import { InjectionToken, Injector, NgModule, NgZone, Optional, makeEnvironmentProviders, } from '@angular/core';
import { VERSION, ɵAngularFireSchedulers, ɵgetDefaultInstanceOf } from '@angular/fire';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AppCheckInstances } from '@angular/fire/app-check';
import { registerVersion } from 'firebase/app';
import { VERTEX_AI_PROVIDER_NAME, VertexAI, VertexAIInstances } from './vertexai';
import * as i0 from "@angular/core";
export const PROVIDED_VERTEX_AI_INSTANCES = new InjectionToken('angularfire2.vertexai-instances');
export function defaultVertexAIInstanceFactory(provided, defaultApp) {
    const defaultVertexAI = ɵgetDefaultInstanceOf(VERTEX_AI_PROVIDER_NAME, provided, defaultApp);
    return defaultVertexAI && new VertexAI(defaultVertexAI);
}
export function vertexAIInstanceFactory(fn) {
    return (zone, injector) => {
        const vertexAI = zone.runOutsideAngular(() => fn(injector));
        return new VertexAI(vertexAI);
    };
}
const VERTEX_AI_INSTANCES_PROVIDER = {
    provide: VertexAIInstances,
    deps: [
        [new Optional(), PROVIDED_VERTEX_AI_INSTANCES],
    ]
};
const DEFAULT_VERTEX_AI_INSTANCE_PROVIDER = {
    provide: VertexAI,
    useFactory: defaultVertexAIInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_VERTEX_AI_INSTANCES],
        FirebaseApp,
    ]
};
export class VertexAIModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'vertexai');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: VertexAIModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.13", ngImport: i0, type: VertexAIModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: VertexAIModule, providers: [
            DEFAULT_VERTEX_AI_INSTANCE_PROVIDER,
            VERTEX_AI_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: VertexAIModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_VERTEX_AI_INSTANCE_PROVIDER,
                        VERTEX_AI_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: () => [] });
export function provideVertexAI(fn, ...deps) {
    registerVersion('angularfire', VERSION.full, 'vertexai');
    return makeEnvironmentProviders([
        DEFAULT_VERTEX_AI_INSTANCE_PROVIDER,
        VERTEX_AI_INSTANCES_PROVIDER,
        {
            provide: PROVIDED_VERTEX_AI_INSTANCES,
            useFactory: vertexAIInstanceFactory(fn),
            multi: true,
            deps: [
                NgZone,
                Injector,
                ɵAngularFireSchedulers,
                FirebaseApps,
                [new Optional(), AppCheckInstances],
                ...deps,
            ]
        }
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGV4YWkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3ZlcnRleGFpL3ZlcnRleGFpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsY0FBYyxFQUNkLFFBQVEsRUFDUixRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUix3QkFBd0IsR0FDekIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFFbEYsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQUcsSUFBSSxjQUFjLENBQWEsaUNBQWlDLENBQUMsQ0FBQztBQUU5RyxNQUFNLFVBQVUsOEJBQThCLENBQUMsUUFBc0MsRUFBRSxVQUF1QjtJQUM1RyxNQUFNLGVBQWUsR0FBRyxxQkFBcUIsQ0FBbUIsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQy9HLE9BQU8sZUFBZSxJQUFJLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsRUFBNEM7SUFDbEYsT0FBTyxDQUFDLElBQVksRUFBRSxRQUFrQixFQUFFLEVBQUU7UUFDMUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sNEJBQTRCLEdBQUc7SUFDbkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsNEJBQTRCLENBQUU7S0FDaEQ7Q0FDRixDQUFDO0FBRUYsTUFBTSxtQ0FBbUMsR0FBRztJQUMxQyxPQUFPLEVBQUUsUUFBUTtJQUNqQixVQUFVLEVBQUUsOEJBQThCO0lBQzFDLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSw0QkFBNEIsQ0FBRTtRQUMvQyxXQUFXO0tBQ1o7Q0FDRixDQUFDO0FBUUYsTUFBTSxPQUFPLGNBQWM7SUFDekI7UUFDRSxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQzt3R0FIVSxjQUFjO3lHQUFkLGNBQWM7eUdBQWQsY0FBYyxhQUxkO1lBQ1QsbUNBQW1DO1lBQ25DLDRCQUE0QjtTQUM3Qjs7NEZBRVUsY0FBYztrQkFOMUIsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsbUNBQW1DO3dCQUNuQyw0QkFBNEI7cUJBQzdCO2lCQUNGOztBQU9ELE1BQU0sVUFBVSxlQUFlLENBQUMsRUFBNEMsRUFBRSxHQUFHLElBQVc7SUFDMUYsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXpELE9BQU8sd0JBQXdCLENBQUM7UUFDOUIsbUNBQW1DO1FBQ25DLDRCQUE0QjtRQUM1QjtZQUNFLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsVUFBVSxFQUFFLHVCQUF1QixDQUFDLEVBQUUsQ0FBQztZQUN2QyxLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRTtnQkFDSixNQUFNO2dCQUNOLFFBQVE7Z0JBQ1Isc0JBQXNCO2dCQUN0QixZQUFZO2dCQUNaLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxpQkFBaUIsQ0FBRTtnQkFDcEMsR0FBRyxJQUFJO2FBQ1I7U0FDRjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbnZpcm9ubWVudFByb3ZpZGVycyxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxuICBOZ01vZHVsZSxcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbiAgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZFUlNJT04sIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLCDJtWdldERlZmF1bHRJbnN0YW5jZU9mIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBGaXJlYmFzZUFwcCwgRmlyZWJhc2VBcHBzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hcHAnO1xuaW1wb3J0IHsgQXBwQ2hlY2tJbnN0YW5jZXMgfSBmcm9tICdAYW5ndWxhci9maXJlL2FwcC1jaGVjayc7XG5pbXBvcnQgeyByZWdpc3RlclZlcnNpb24gfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgVmVydGV4QUkgYXMgRmlyZWJhc2VWZXJ0ZXhBSSB9IGZyb20gJ2ZpcmViYXNlL3ZlcnRleGFpJztcbmltcG9ydCB7IFZFUlRFWF9BSV9QUk9WSURFUl9OQU1FLCBWZXJ0ZXhBSSwgVmVydGV4QUlJbnN0YW5jZXMgfSBmcm9tICcuL3ZlcnRleGFpJztcblxuZXhwb3J0IGNvbnN0IFBST1ZJREVEX1ZFUlRFWF9BSV9JTlNUQU5DRVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48VmVydGV4QUlbXT4oJ2FuZ3VsYXJmaXJlMi52ZXJ0ZXhhaS1pbnN0YW5jZXMnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRWZXJ0ZXhBSUluc3RhbmNlRmFjdG9yeShwcm92aWRlZDogRmlyZWJhc2VWZXJ0ZXhBSVtdfHVuZGVmaW5lZCwgZGVmYXVsdEFwcDogRmlyZWJhc2VBcHApIHtcbiAgY29uc3QgZGVmYXVsdFZlcnRleEFJID0gybVnZXREZWZhdWx0SW5zdGFuY2VPZjxGaXJlYmFzZVZlcnRleEFJPihWRVJURVhfQUlfUFJPVklERVJfTkFNRSwgcHJvdmlkZWQsIGRlZmF1bHRBcHApO1xuICByZXR1cm4gZGVmYXVsdFZlcnRleEFJICYmIG5ldyBWZXJ0ZXhBSShkZWZhdWx0VmVydGV4QUkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVydGV4QUlJbnN0YW5jZUZhY3RvcnkoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IEZpcmViYXNlVmVydGV4QUkpIHtcbiAgcmV0dXJuICh6b25lOiBOZ1pvbmUsIGluamVjdG9yOiBJbmplY3RvcikgPT4ge1xuICAgIGNvbnN0IHZlcnRleEFJID0gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBmbihpbmplY3RvcikpO1xuICAgIHJldHVybiBuZXcgVmVydGV4QUkodmVydGV4QUkpO1xuICB9O1xufVxuXG5jb25zdCBWRVJURVhfQUlfSU5TVEFOQ0VTX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBWZXJ0ZXhBSUluc3RhbmNlcyxcbiAgZGVwczogW1xuICAgIFtuZXcgT3B0aW9uYWwoKSwgUFJPVklERURfVkVSVEVYX0FJX0lOU1RBTkNFUyBdLFxuICBdXG59O1xuXG5jb25zdCBERUZBVUxUX1ZFUlRFWF9BSV9JTlNUQU5DRV9QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogVmVydGV4QUksXG4gIHVzZUZhY3Rvcnk6IGRlZmF1bHRWZXJ0ZXhBSUluc3RhbmNlRmFjdG9yeSxcbiAgZGVwczogW1xuICAgIFtuZXcgT3B0aW9uYWwoKSwgUFJPVklERURfVkVSVEVYX0FJX0lOU1RBTkNFUyBdLFxuICAgIEZpcmViYXNlQXBwLFxuICBdXG59O1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBERUZBVUxUX1ZFUlRFWF9BSV9JTlNUQU5DRV9QUk9WSURFUixcbiAgICBWRVJURVhfQUlfSU5TVEFOQ0VTX1BST1ZJREVSLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFZlcnRleEFJTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgcmVnaXN0ZXJWZXJzaW9uKCdhbmd1bGFyZmlyZScsIFZFUlNJT04uZnVsbCwgJ3ZlcnRleGFpJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVWZXJ0ZXhBSShmbjogKGluamVjdG9yOiBJbmplY3RvcikgPT4gRmlyZWJhc2VWZXJ0ZXhBSSwgLi4uZGVwczogYW55W10pOiBFbnZpcm9ubWVudFByb3ZpZGVycyB7XG4gIHJlZ2lzdGVyVmVyc2lvbignYW5ndWxhcmZpcmUnLCBWRVJTSU9OLmZ1bGwsICd2ZXJ0ZXhhaScpO1xuXG4gIHJldHVybiBtYWtlRW52aXJvbm1lbnRQcm92aWRlcnMoW1xuICAgIERFRkFVTFRfVkVSVEVYX0FJX0lOU1RBTkNFX1BST1ZJREVSLFxuICAgIFZFUlRFWF9BSV9JTlNUQU5DRVNfUFJPVklERVIsXG4gICAge1xuICAgICAgcHJvdmlkZTogUFJPVklERURfVkVSVEVYX0FJX0lOU1RBTkNFUyxcbiAgICAgIHVzZUZhY3Rvcnk6IHZlcnRleEFJSW5zdGFuY2VGYWN0b3J5KGZuKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW1xuICAgICAgICBOZ1pvbmUsXG4gICAgICAgIEluamVjdG9yLFxuICAgICAgICDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgICAgICAgRmlyZWJhc2VBcHBzLFxuICAgICAgICBbbmV3IE9wdGlvbmFsKCksIEFwcENoZWNrSW5zdGFuY2VzIF0sXG4gICAgICAgIC4uLmRlcHMsXG4gICAgICBdXG4gICAgfVxuICBdKTtcbn1cbiJdfQ==