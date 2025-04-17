import { ɵgetAllInstancesOf as _getAllInstancesOf, ɵgetDefaultInstanceOf as _getDefaultInstanceOf, VERSION, ɵAngularFireSchedulers as _AngularFireSchedulers, ɵzoneWrap as _zoneWrap } from '@angular/fire';
import { timer, from } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { InjectionToken, Optional, NgModule, makeEnvironmentProviders, NgZone, Injector } from '@angular/core';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AppCheckInstances } from '@angular/fire/app-check';
import { AuthInstances } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { auditTrail as auditTrail$1, changeToData as changeToData$1, fromRef as fromRef$1, list as list$1, listVal as listVal$1, object as object$1, objectVal as objectVal$1, stateChanges as stateChanges$1 } from 'rxfire/database';
export { ListenEvent, ListenerMethods } from 'rxfire/database';
import { child as child$1, connectDatabaseEmulator as connectDatabaseEmulator$1, enableLogging as enableLogging$1, endAt as endAt$1, endBefore as endBefore$1, equalTo as equalTo$1, forceLongPolling as forceLongPolling$1, forceWebSockets as forceWebSockets$1, get as get$1, getDatabase as getDatabase$1, goOffline as goOffline$1, goOnline as goOnline$1, increment as increment$1, limitToFirst as limitToFirst$1, limitToLast as limitToLast$1, off as off$1, onChildAdded as onChildAdded$1, onChildChanged as onChildChanged$1, onChildMoved as onChildMoved$1, onChildRemoved as onChildRemoved$1, onDisconnect as onDisconnect$1, onValue as onValue$1, orderByChild as orderByChild$1, orderByKey as orderByKey$1, orderByPriority as orderByPriority$1, orderByValue as orderByValue$1, push as push$1, query as query$1, ref as ref$1, refFromURL as refFromURL$1, remove as remove$1, runTransaction as runTransaction$1, set as set$1, setPriority as setPriority$1, setWithPriority as setWithPriority$1, startAfter as startAfter$1, startAt as startAt$1, update as update$1 } from 'firebase/database';
export * from 'firebase/database';

class Database {
    constructor(database) {
        return database;
    }
}
const DATABASE_PROVIDER_NAME = 'database';
class DatabaseInstances {
    constructor() {
        return _getAllInstancesOf(DATABASE_PROVIDER_NAME);
    }
}
const databaseInstance$ = timer(0, 300).pipe(concatMap(() => from(_getAllInstancesOf(DATABASE_PROVIDER_NAME))), distinct());

const PROVIDED_DATABASE_INSTANCES = new InjectionToken('angularfire2.database-instances');
function defaultDatabaseInstanceFactory(provided, defaultApp) {
    const defaultDatabase = _getDefaultInstanceOf(DATABASE_PROVIDER_NAME, provided, defaultApp);
    return defaultDatabase && new Database(defaultDatabase);
}
function databaseInstanceFactory(fn) {
    return (zone, injector) => {
        const database = zone.runOutsideAngular(() => fn(injector));
        return new Database(database);
    };
}
const DATABASE_INSTANCES_PROVIDER = {
    provide: DatabaseInstances,
    deps: [
        [new Optional(), PROVIDED_DATABASE_INSTANCES],
    ]
};
const DEFAULT_DATABASE_INSTANCE_PROVIDER = {
    provide: Database,
    useFactory: defaultDatabaseInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_DATABASE_INSTANCES],
        FirebaseApp,
    ]
};
class DatabaseModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'rtdb');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DatabaseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.13", ngImport: i0, type: DatabaseModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DatabaseModule, providers: [
            DEFAULT_DATABASE_INSTANCE_PROVIDER,
            DATABASE_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DatabaseModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_DATABASE_INSTANCE_PROVIDER,
                        DATABASE_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: () => [] });
function provideDatabase(fn, ...deps) {
    registerVersion('angularfire', VERSION.full, 'rtdb');
    return makeEnvironmentProviders([
        DEFAULT_DATABASE_INSTANCE_PROVIDER,
        DATABASE_INSTANCES_PROVIDER,
        {
            provide: PROVIDED_DATABASE_INSTANCES,
            useFactory: databaseInstanceFactory(fn),
            multi: true,
            deps: [
                NgZone,
                Injector,
                _AngularFireSchedulers,
                FirebaseApps,
                // Database+Auth work better if Auth is loaded first
                [new Optional(), AuthInstances],
                [new Optional(), AppCheckInstances],
                ...deps,
            ]
        }
    ]);
}

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const auditTrail = _zoneWrap(auditTrail$1, true);
const changeToData = _zoneWrap(changeToData$1, true);
const fromRef = _zoneWrap(fromRef$1, true);
const list = _zoneWrap(list$1, true);
const listVal = _zoneWrap(listVal$1, true);
const object = _zoneWrap(object$1, true);
const objectVal = _zoneWrap(objectVal$1, true);
const stateChanges = _zoneWrap(stateChanges$1, true);

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const child = _zoneWrap(child$1, true, 2);
const connectDatabaseEmulator = _zoneWrap(connectDatabaseEmulator$1, true);
const enableLogging = _zoneWrap(enableLogging$1, true);
const endAt = _zoneWrap(endAt$1, true, 2);
const endBefore = _zoneWrap(endBefore$1, true, 2);
const equalTo = _zoneWrap(equalTo$1, true, 2);
const forceLongPolling = _zoneWrap(forceLongPolling$1, true);
const forceWebSockets = _zoneWrap(forceWebSockets$1, true);
const get = _zoneWrap(get$1, true);
const getDatabase = _zoneWrap(getDatabase$1, true);
const goOffline = _zoneWrap(goOffline$1, true);
const goOnline = _zoneWrap(goOnline$1, true);
const increment = _zoneWrap(increment$1, true, 2);
const limitToFirst = _zoneWrap(limitToFirst$1, true, 2);
const limitToLast = _zoneWrap(limitToLast$1, true, 2);
const off = _zoneWrap(off$1, true);
const onChildAdded = _zoneWrap(onChildAdded$1, true);
const onChildChanged = _zoneWrap(onChildChanged$1, true);
const onChildMoved = _zoneWrap(onChildMoved$1, true);
const onChildRemoved = _zoneWrap(onChildRemoved$1, true);
const onDisconnect = _zoneWrap(onDisconnect$1, true);
const onValue = _zoneWrap(onValue$1, true);
const orderByChild = _zoneWrap(orderByChild$1, true, 2);
const orderByKey = _zoneWrap(orderByKey$1, true, 2);
const orderByPriority = _zoneWrap(orderByPriority$1, true, 2);
const orderByValue = _zoneWrap(orderByValue$1, true, 2);
const push = _zoneWrap(push$1, true, 2);
const query = _zoneWrap(query$1, true, 2);
const ref = _zoneWrap(ref$1, true, 2);
const refFromURL = _zoneWrap(refFromURL$1, true, 2);
const remove = _zoneWrap(remove$1, true, 2);
const runTransaction = _zoneWrap(runTransaction$1, true);
const set = _zoneWrap(set$1, true, 2);
const setPriority = _zoneWrap(setPriority$1, true, 2);
const setWithPriority = _zoneWrap(setWithPriority$1, true, 2);
const startAfter = _zoneWrap(startAfter$1, true, 2);
const startAt = _zoneWrap(startAt$1, true, 2);
const update = _zoneWrap(update$1, true, 2);

/**
 * Generated bundle index. Do not edit.
 */

export { Database, DatabaseInstances, DatabaseModule, auditTrail, changeToData, child, connectDatabaseEmulator, databaseInstance$, enableLogging, endAt, endBefore, equalTo, forceLongPolling, forceWebSockets, fromRef, get, getDatabase, goOffline, goOnline, increment, limitToFirst, limitToLast, list, listVal, object, objectVal, off, onChildAdded, onChildChanged, onChildMoved, onChildRemoved, onDisconnect, onValue, orderByChild, orderByKey, orderByPriority, orderByValue, provideDatabase, push, query, ref, refFromURL, remove, runTransaction, set, setPriority, setWithPriority, startAfter, startAt, stateChanges, update };
//# sourceMappingURL=angular-fire-database.mjs.map
