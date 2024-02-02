import { InjectionToken, Injector, NgModule, NgZone, Optional } from '@angular/core';
import { VERSION, ɵAngularFireSchedulers, ɵgetDefaultInstanceOf } from '@angular/fire';
import { ɵAppCheckInstances } from '@angular/fire';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AuthInstances } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { FUNCTIONS_PROVIDER_NAME, Functions, FunctionsInstances } from './functions';
import * as i0 from "@angular/core";
export const PROVIDED_FUNCTIONS_INSTANCES = new InjectionToken('angularfire2.functions-instances');
export function defaultFunctionsInstanceFactory(provided, defaultApp) {
    const defaultAuth = ɵgetDefaultInstanceOf(FUNCTIONS_PROVIDER_NAME, provided, defaultApp);
    return defaultAuth && new Functions(defaultAuth);
}
export function functionsInstanceFactory(fn) {
    return (zone, injector) => {
        const functions = zone.runOutsideAngular(() => fn(injector));
        return new Functions(functions);
    };
}
const FUNCTIONS_INSTANCES_PROVIDER = {
    provide: FunctionsInstances,
    deps: [
        [new Optional(), PROVIDED_FUNCTIONS_INSTANCES],
    ]
};
const DEFAULT_FUNCTIONS_INSTANCE_PROVIDER = {
    provide: Functions,
    useFactory: defaultFunctionsInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_FUNCTIONS_INSTANCES],
        FirebaseApp,
    ]
};
export class FunctionsModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'fn');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FunctionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: FunctionsModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FunctionsModule, providers: [
            DEFAULT_FUNCTIONS_INSTANCE_PROVIDER,
            FUNCTIONS_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FunctionsModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_FUNCTIONS_INSTANCE_PROVIDER,
                        FUNCTIONS_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return []; } });
export function provideFunctions(fn, ...deps) {
    return {
        ngModule: FunctionsModule,
        providers: [{
                provide: PROVIDED_FUNCTIONS_INSTANCES,
                useFactory: functionsInstanceFactory(fn),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvZnVuY3Rpb25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBdUIsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUVyRixNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBYyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRWhILE1BQU0sVUFBVSwrQkFBK0IsQ0FBQyxRQUF1QyxFQUFFLFVBQXVCO0lBQzlHLE1BQU0sV0FBVyxHQUFHLHFCQUFxQixDQUFvQix1QkFBdUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDNUcsT0FBTyxXQUFXLElBQUksSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxFQUE2QztJQUNwRixPQUFPLENBQUMsSUFBWSxFQUFFLFFBQWtCLEVBQUUsRUFBRTtRQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDN0QsT0FBTyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSw0QkFBNEIsR0FBRztJQUNuQyxPQUFPLEVBQUUsa0JBQWtCO0lBQzNCLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSw0QkFBNEIsQ0FBRTtLQUNoRDtDQUNGLENBQUM7QUFFRixNQUFNLG1DQUFtQyxHQUFHO0lBQzFDLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFVBQVUsRUFBRSwrQkFBK0I7SUFDM0MsSUFBSSxFQUFFO1FBQ0osQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLDRCQUE0QixDQUFFO1FBQy9DLFdBQVc7S0FDWjtDQUNGLENBQUM7QUFRRixNQUFNLE9BQU8sZUFBZTtJQUMxQjtRQUNFLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO3dHQUhVLGVBQWU7eUdBQWYsZUFBZTt5R0FBZixlQUFlLGFBTGY7WUFDVCxtQ0FBbUM7WUFDbkMsNEJBQTRCO1NBQzdCOzs0RkFFVSxlQUFlO2tCQU4zQixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxtQ0FBbUM7d0JBQ25DLDRCQUE0QjtxQkFDN0I7aUJBQ0Y7O0FBT0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEVBQTZDLEVBQUUsR0FBRyxJQUFXO0lBQzVGLE9BQU87UUFDTCxRQUFRLEVBQUUsZUFBZTtRQUN6QixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsNEJBQTRCO2dCQUNyQyxVQUFVLEVBQUUsd0JBQXdCLENBQUMsRUFBRSxDQUFDO2dCQUN4QyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0osTUFBTTtvQkFDTixRQUFRO29CQUNSLHNCQUFzQjtvQkFDdEIsWUFBWTtvQkFDWiwyQ0FBMkM7b0JBQzNDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxhQUFhLENBQUU7b0JBQ2hDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxrQkFBa0IsQ0FBRTtvQkFDckMsR0FBRyxJQUFJO2lCQUNSO2FBQ0YsQ0FBQztLQUNILENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgTmdab25lLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVkVSU0lPTiwgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsIMm1Z2V0RGVmYXVsdEluc3RhbmNlT2YgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IMm1QXBwQ2hlY2tJbnN0YW5jZXMgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IEZpcmViYXNlQXBwLCBGaXJlYmFzZUFwcHMgfSBmcm9tICdAYW5ndWxhci9maXJlL2FwcCc7XG5pbXBvcnQgeyBBdXRoSW5zdGFuY2VzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hdXRoJztcbmltcG9ydCB7IHJlZ2lzdGVyVmVyc2lvbiB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBGdW5jdGlvbnMgYXMgRmlyZWJhc2VGdW5jdGlvbnMgfSBmcm9tICdmaXJlYmFzZS9mdW5jdGlvbnMnO1xuaW1wb3J0IHsgRlVOQ1RJT05TX1BST1ZJREVSX05BTUUsIEZ1bmN0aW9ucywgRnVuY3Rpb25zSW5zdGFuY2VzIH0gZnJvbSAnLi9mdW5jdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgUFJPVklERURfRlVOQ1RJT05TX0lOU1RBTkNFUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxGdW5jdGlvbnNbXT4oJ2FuZ3VsYXJmaXJlMi5mdW5jdGlvbnMtaW5zdGFuY2VzJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0RnVuY3Rpb25zSW5zdGFuY2VGYWN0b3J5KHByb3ZpZGVkOiBGaXJlYmFzZUZ1bmN0aW9uc1tdfHVuZGVmaW5lZCwgZGVmYXVsdEFwcDogRmlyZWJhc2VBcHApIHtcbiAgY29uc3QgZGVmYXVsdEF1dGggPSDJtWdldERlZmF1bHRJbnN0YW5jZU9mPEZpcmViYXNlRnVuY3Rpb25zPihGVU5DVElPTlNfUFJPVklERVJfTkFNRSwgcHJvdmlkZWQsIGRlZmF1bHRBcHApO1xuICByZXR1cm4gZGVmYXVsdEF1dGggJiYgbmV3IEZ1bmN0aW9ucyhkZWZhdWx0QXV0aCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmdW5jdGlvbnNJbnN0YW5jZUZhY3RvcnkoZm46IChpbmplY3RvcjogSW5qZWN0b3IpID0+IEZpcmViYXNlRnVuY3Rpb25zKSB7XG4gIHJldHVybiAoem9uZTogTmdab25lLCBpbmplY3RvcjogSW5qZWN0b3IpID0+IHtcbiAgICBjb25zdCBmdW5jdGlvbnMgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGZuKGluamVjdG9yKSk7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbnMoZnVuY3Rpb25zKTtcbiAgfTtcbn1cblxuY29uc3QgRlVOQ1RJT05TX0lOU1RBTkNFU19QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogRnVuY3Rpb25zSW5zdGFuY2VzLFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9GVU5DVElPTlNfSU5TVEFOQ0VTIF0sXG4gIF1cbn07XG5cbmNvbnN0IERFRkFVTFRfRlVOQ1RJT05TX0lOU1RBTkNFX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBGdW5jdGlvbnMsXG4gIHVzZUZhY3Rvcnk6IGRlZmF1bHRGdW5jdGlvbnNJbnN0YW5jZUZhY3RvcnksXG4gIGRlcHM6IFtcbiAgICBbbmV3IE9wdGlvbmFsKCksIFBST1ZJREVEX0ZVTkNUSU9OU19JTlNUQU5DRVMgXSxcbiAgICBGaXJlYmFzZUFwcCxcbiAgXVxufTtcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgREVGQVVMVF9GVU5DVElPTlNfSU5TVEFOQ0VfUFJPVklERVIsXG4gICAgRlVOQ1RJT05TX0lOU1RBTkNFU19QUk9WSURFUixcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBGdW5jdGlvbnNNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICByZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAnZm4nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUZ1bmN0aW9ucyhmbjogKGluamVjdG9yOiBJbmplY3RvcikgPT4gRmlyZWJhc2VGdW5jdGlvbnMsIC4uLmRlcHM6IGFueVtdKTogTW9kdWxlV2l0aFByb3ZpZGVyczxGdW5jdGlvbnNNb2R1bGU+IHtcbiAgcmV0dXJuIHtcbiAgICBuZ01vZHVsZTogRnVuY3Rpb25zTW9kdWxlLFxuICAgIHByb3ZpZGVyczogW3tcbiAgICAgIHByb3ZpZGU6IFBST1ZJREVEX0ZVTkNUSU9OU19JTlNUQU5DRVMsXG4gICAgICB1c2VGYWN0b3J5OiBmdW5jdGlvbnNJbnN0YW5jZUZhY3RvcnkoZm4pLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbXG4gICAgICAgIE5nWm9uZSxcbiAgICAgICAgSW5qZWN0b3IsXG4gICAgICAgIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLFxuICAgICAgICBGaXJlYmFzZUFwcHMsXG4gICAgICAgIC8vIERlZmVuc2l2ZWx5IGxvYWQgQXV0aCBmaXJzdCwgaWYgcHJvdmlkZWRcbiAgICAgICAgW25ldyBPcHRpb25hbCgpLCBBdXRoSW5zdGFuY2VzIF0sXG4gICAgICAgIFtuZXcgT3B0aW9uYWwoKSwgybVBcHBDaGVja0luc3RhbmNlcyBdLFxuICAgICAgICAuLi5kZXBzLFxuICAgICAgXVxuICAgIH1dXG4gIH07XG59XG4iXX0=