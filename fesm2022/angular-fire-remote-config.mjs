import { ɵgetAllInstancesOf, ɵisSupportedError, ɵgetDefaultInstanceOf, VERSION, ɵAngularFireSchedulers, ɵzoneWrap } from '@angular/fire';
import { timer, from } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { InjectionToken, Optional, APP_INITIALIZER, NgModule, NgZone, Injector } from '@angular/core';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { registerVersion } from 'firebase/app';
import { isSupported as isSupported$1, activate as activate$1, ensureInitialized as ensureInitialized$1, fetchAndActivate as fetchAndActivate$1, fetchConfig as fetchConfig$1, getAll as getAll$2, getBoolean as getBoolean$2, getNumber as getNumber$2, getRemoteConfig as getRemoteConfig$1, getString as getString$2, getValue as getValue$2, setLogLevel as setLogLevel$1 } from 'firebase/remote-config';
export * from 'firebase/remote-config';
import { getValue as getValue$1, getString as getString$1, getNumber as getNumber$1, getBoolean as getBoolean$1, getAll as getAll$1 } from 'rxfire/remote-config';

class RemoteConfig {
    constructor(remoteConfig) {
        return remoteConfig;
    }
}
const REMOTE_CONFIG_PROVIDER_NAME = 'remote-config';
class RemoteConfigInstances {
    constructor() {
        return ɵgetAllInstancesOf(REMOTE_CONFIG_PROVIDER_NAME);
    }
}
const remoteConfigInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(REMOTE_CONFIG_PROVIDER_NAME))), distinct());

const isRemoteConfigSupportedValueSymbol = '__angularfire_symbol__remoteConfigIsSupportedValue';
const isRemoteConfigSupportedPromiseSymbol = '__angularfire_symbol__remoteConfigIsSupported';
globalThis[isRemoteConfigSupportedPromiseSymbol] ||= isSupported$1().then(it => globalThis[isRemoteConfigSupportedValueSymbol] = it).catch(() => globalThis[isRemoteConfigSupportedValueSymbol] = false);
const isRemoteConfigSupportedFactory = {
    async: () => globalThis[isRemoteConfigSupportedPromiseSymbol],
    sync: () => {
        const ret = globalThis[isRemoteConfigSupportedValueSymbol];
        if (ret === undefined) {
            throw new Error(ɵisSupportedError('RemoteConfig'));
        }
        return ret;
    }
};

const PROVIDED_REMOTE_CONFIG_INSTANCES = new InjectionToken('angularfire2.remote-config-instances');
function defaultRemoteConfigInstanceFactory(provided, defaultApp) {
    if (!isRemoteConfigSupportedFactory.sync()) {
        return null;
    }
    const defaultRemoteConfig = ɵgetDefaultInstanceOf(REMOTE_CONFIG_PROVIDER_NAME, provided, defaultApp);
    return defaultRemoteConfig && new RemoteConfig(defaultRemoteConfig);
}
function remoteConfigInstanceFactory(fn) {
    return (zone, injector) => {
        if (!isRemoteConfigSupportedFactory.sync()) {
            return null;
        }
        const remoteConfig = zone.runOutsideAngular(() => fn(injector));
        return new RemoteConfig(remoteConfig);
    };
}
const REMOTE_CONFIG_INSTANCES_PROVIDER = {
    provide: RemoteConfigInstances,
    deps: [
        [new Optional(), PROVIDED_REMOTE_CONFIG_INSTANCES],
    ]
};
const DEFAULT_REMOTE_CONFIG_INSTANCE_PROVIDER = {
    provide: RemoteConfig,
    useFactory: defaultRemoteConfigInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_REMOTE_CONFIG_INSTANCES],
        FirebaseApp,
    ]
};
class RemoteConfigModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'rc');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: RemoteConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: RemoteConfigModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: RemoteConfigModule, providers: [
            DEFAULT_REMOTE_CONFIG_INSTANCE_PROVIDER,
            REMOTE_CONFIG_INSTANCES_PROVIDER,
            {
                provide: APP_INITIALIZER,
                useValue: isRemoteConfigSupportedFactory.async,
                multi: true,
            },
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: RemoteConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_REMOTE_CONFIG_INSTANCE_PROVIDER,
                        REMOTE_CONFIG_INSTANCES_PROVIDER,
                        {
                            provide: APP_INITIALIZER,
                            useValue: isRemoteConfigSupportedFactory.async,
                            multi: true,
                        },
                    ]
                }]
        }], ctorParameters: function () { return []; } });
function provideRemoteConfig(fn, ...deps) {
    return {
        ngModule: RemoteConfigModule,
        providers: [{
                provide: PROVIDED_REMOTE_CONFIG_INSTANCES,
                useFactory: remoteConfigInstanceFactory(fn),
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

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const getValueChanges = ɵzoneWrap(getValue$1, true);
const getStringChanges = ɵzoneWrap(getString$1, true);
const getNumberChanges = ɵzoneWrap(getNumber$1, true);
const getBooleanChanges = ɵzoneWrap(getBoolean$1, true);
const getAllChanges = ɵzoneWrap(getAll$1, true);

const isSupported = isRemoteConfigSupportedFactory.async;

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const activate = ɵzoneWrap(activate$1, true);
const ensureInitialized = ɵzoneWrap(ensureInitialized$1, true);
const fetchAndActivate = ɵzoneWrap(fetchAndActivate$1, true);
const fetchConfig = ɵzoneWrap(fetchConfig$1, true);
const getAll = ɵzoneWrap(getAll$2, true);
const getBoolean = ɵzoneWrap(getBoolean$2, true);
const getNumber = ɵzoneWrap(getNumber$2, true);
const getRemoteConfig = ɵzoneWrap(getRemoteConfig$1, true);
const getString = ɵzoneWrap(getString$2, true);
const getValue = ɵzoneWrap(getValue$2, true);
const setLogLevel = ɵzoneWrap(setLogLevel$1, true);

/**
 * Generated bundle index. Do not edit.
 */

export { RemoteConfig, RemoteConfigInstances, RemoteConfigModule, activate, ensureInitialized, fetchAndActivate, fetchConfig, getAll, getAllChanges, getBoolean, getBooleanChanges, getNumber, getNumberChanges, getRemoteConfig, getString, getStringChanges, getValue, getValueChanges, isSupported, provideRemoteConfig, remoteConfigInstance$, setLogLevel };
//# sourceMappingURL=angular-fire-remote-config.mjs.map
