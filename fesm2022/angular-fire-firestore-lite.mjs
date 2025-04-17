import { ɵgetAllInstancesOf as _getAllInstancesOf, ɵgetDefaultInstanceOf as _getDefaultInstanceOf, VERSION, ɵAngularFireSchedulers as _AngularFireSchedulers, ɵzoneWrap as _zoneWrap } from '@angular/fire';
import { timer, from } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { InjectionToken, Optional, NgModule, makeEnvironmentProviders, NgZone, Injector } from '@angular/core';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AppCheckInstances } from '@angular/fire/app-check';
import { AuthInstances } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { collection as collection$1, collectionCount as collectionCount$1, collectionCountSnap as collectionCountSnap$1, collectionData as collectionData$1, doc as doc$1, docData as docData$1, fromRef as fromRef$1, snapToData as snapToData$1 } from 'rxfire/firestore/lite';
import { addDoc as addDoc$1, aggregateFieldEqual as aggregateFieldEqual$1, aggregateQuerySnapshotEqual as aggregateQuerySnapshotEqual$1, and as and$1, collection as collection$2, collectionGroup as collectionGroup$1, connectFirestoreEmulator as connectFirestoreEmulator$1, deleteDoc as deleteDoc$1, deleteField as deleteField$1, doc as doc$2, documentId as documentId$1, endAt as endAt$1, endBefore as endBefore$1, getAggregate as getAggregate$1, getCount as getCount$1, getDoc as getDoc$1, getDocs as getDocs$1, getFirestore as getFirestore$1, increment as increment$1, initializeFirestore as initializeFirestore$1, limit as limit$1, limitToLast as limitToLast$1, or as or$1, orderBy as orderBy$1, query as query$1, queryEqual as queryEqual$1, refEqual as refEqual$1, runTransaction as runTransaction$1, setDoc as setDoc$1, setLogLevel as setLogLevel$1, snapshotEqual as snapshotEqual$1, startAfter as startAfter$1, startAt as startAt$1, sum as sum$1, terminate as terminate$1, updateDoc as updateDoc$1, vector as vector$1, where as where$1, writeBatch as writeBatch$1 } from 'firebase/firestore/lite';
export * from 'firebase/firestore/lite';

class Firestore {
    constructor(firestore) {
        return firestore;
    }
}
const FIRESTORE_PROVIDER_NAME = 'firestore/lite';
class FirestoreInstances {
    constructor() {
        return _getAllInstancesOf(FIRESTORE_PROVIDER_NAME);
    }
}
const firestoreInstance$ = timer(0, 300).pipe(concatMap(() => from(_getAllInstancesOf(FIRESTORE_PROVIDER_NAME))), distinct());

const PROVIDED_FIRESTORE_INSTANCES = new InjectionToken('angularfire2.firestore-lite-instances');
function defaultFirestoreInstanceFactory(provided, defaultApp) {
    const defaultFirestore = _getDefaultInstanceOf(FIRESTORE_PROVIDER_NAME, provided, defaultApp);
    return defaultFirestore && new Firestore(defaultFirestore);
}
function firestoreInstanceFactory(fn) {
    return (zone, injector) => {
        const firestore = zone.runOutsideAngular(() => fn(injector));
        return new Firestore(firestore);
    };
}
const FIRESTORE_INSTANCES_PROVIDER = {
    provide: FirestoreInstances,
    deps: [
        [new Optional(), PROVIDED_FIRESTORE_INSTANCES],
    ]
};
const DEFAULT_FIRESTORE_INSTANCE_PROVIDER = {
    provide: Firestore,
    useFactory: defaultFirestoreInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_FIRESTORE_INSTANCES],
        FirebaseApp,
    ]
};
class FirestoreModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'lite');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FirestoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.13", ngImport: i0, type: FirestoreModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FirestoreModule, providers: [
            DEFAULT_FIRESTORE_INSTANCE_PROVIDER,
            FIRESTORE_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: FirestoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_FIRESTORE_INSTANCE_PROVIDER,
                        FIRESTORE_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: () => [] });
function provideFirestore(fn, ...deps) {
    registerVersion('angularfire', VERSION.full, 'lite');
    return makeEnvironmentProviders([
        DEFAULT_FIRESTORE_INSTANCE_PROVIDER,
        FIRESTORE_INSTANCES_PROVIDER,
        {
            provide: PROVIDED_FIRESTORE_INSTANCES,
            useFactory: firestoreInstanceFactory(fn),
            multi: true,
            deps: [
                NgZone,
                Injector,
                _AngularFireSchedulers,
                FirebaseApps,
                // Firestore+Auth work better if Auth is loaded first
                [new Optional(), AuthInstances],
                [new Optional(), AppCheckInstances],
                ...deps,
            ]
        }
    ]);
}

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const collectionSnapshots = _zoneWrap(collection$1, true);
const collectionCount = _zoneWrap(collectionCount$1, true);
const collectionCountSnap = _zoneWrap(collectionCountSnap$1, true);
const collectionData = _zoneWrap(collectionData$1, true);
const docSnapshots = _zoneWrap(doc$1, true);
const docData = _zoneWrap(docData$1, true);
const fromRef = _zoneWrap(fromRef$1, true);
const snapToData = _zoneWrap(snapToData$1, true);

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const addDoc = _zoneWrap(addDoc$1, true, 2);
const aggregateFieldEqual = _zoneWrap(aggregateFieldEqual$1, true, 2);
const aggregateQuerySnapshotEqual = _zoneWrap(aggregateQuerySnapshotEqual$1, true, 2);
const and = _zoneWrap(and$1, true, 2);
const collection = _zoneWrap(collection$2, true, 2);
const collectionGroup = _zoneWrap(collectionGroup$1, true, 2);
const connectFirestoreEmulator = _zoneWrap(connectFirestoreEmulator$1, true);
const deleteDoc = _zoneWrap(deleteDoc$1, true, 2);
const deleteField = _zoneWrap(deleteField$1, true, 2);
const doc = _zoneWrap(doc$2, true, 2);
const documentId = _zoneWrap(documentId$1, true, 2);
const endAt = _zoneWrap(endAt$1, true, 2);
const endBefore = _zoneWrap(endBefore$1, true, 2);
const getAggregate = _zoneWrap(getAggregate$1, true);
const getCount = _zoneWrap(getCount$1, true);
const getDoc = _zoneWrap(getDoc$1, true);
const getDocs = _zoneWrap(getDocs$1, true);
const getFirestore = _zoneWrap(getFirestore$1, true);
const increment = _zoneWrap(increment$1, true, 2);
const initializeFirestore = _zoneWrap(initializeFirestore$1, true);
const limit = _zoneWrap(limit$1, true, 2);
const limitToLast = _zoneWrap(limitToLast$1, true, 2);
const or = _zoneWrap(or$1, true, 2);
const orderBy = _zoneWrap(orderBy$1, true, 2);
const query = _zoneWrap(query$1, true, 2);
const queryEqual = _zoneWrap(queryEqual$1, true, 2);
const refEqual = _zoneWrap(refEqual$1, true, 2);
const runTransaction = _zoneWrap(runTransaction$1, true);
const setDoc = _zoneWrap(setDoc$1, true, 2);
const setLogLevel = _zoneWrap(setLogLevel$1, true);
const snapshotEqual = _zoneWrap(snapshotEqual$1, true, 2);
const startAfter = _zoneWrap(startAfter$1, true, 2);
const startAt = _zoneWrap(startAt$1, true, 2);
const sum = _zoneWrap(sum$1, true, 2);
const terminate = _zoneWrap(terminate$1, true);
const updateDoc = _zoneWrap(updateDoc$1, true, 2);
const vector = _zoneWrap(vector$1, true, 2);
const where = _zoneWrap(where$1, true, 2);
const writeBatch = _zoneWrap(writeBatch$1, true, 2);

/**
 * Generated bundle index. Do not edit.
 */

export { Firestore, FirestoreInstances, FirestoreModule, addDoc, aggregateFieldEqual, aggregateQuerySnapshotEqual, and, collection, collectionCount, collectionCountSnap, collectionData, collectionGroup, collectionSnapshots, connectFirestoreEmulator, deleteDoc, deleteField, doc, docData, docSnapshots, documentId, endAt, endBefore, firestoreInstance$, fromRef, getAggregate, getCount, getDoc, getDocs, getFirestore, increment, initializeFirestore, limit, limitToLast, or, orderBy, provideFirestore, query, queryEqual, refEqual, runTransaction, setDoc, setLogLevel, snapToData, snapshotEqual, startAfter, startAt, sum, terminate, updateDoc, vector, where, writeBatch };
//# sourceMappingURL=angular-fire-firestore-lite.mjs.map
