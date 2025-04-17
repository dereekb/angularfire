import { ɵgetAllInstancesOf as _getAllInstancesOf, ɵgetDefaultInstanceOf as _getDefaultInstanceOf, VERSION, ɵAngularFireSchedulers as _AngularFireSchedulers, ɵzoneWrap as _zoneWrap } from '@angular/fire';
import { timer, from } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { InjectionToken, Optional, NgModule, makeEnvironmentProviders, NgZone, Injector } from '@angular/core';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AppCheckInstances } from '@angular/fire/app-check';
import { registerVersion } from 'firebase/app';
import { authState as authState$1, idToken as idToken$1, user as user$1 } from 'rxfire/auth';
import { applyActionCode as applyActionCode$1, beforeAuthStateChanged as beforeAuthStateChanged$1, checkActionCode as checkActionCode$1, confirmPasswordReset as confirmPasswordReset$1, connectAuthEmulator as connectAuthEmulator$1, createUserWithEmailAndPassword as createUserWithEmailAndPassword$1, deleteUser as deleteUser$1, fetchSignInMethodsForEmail as fetchSignInMethodsForEmail$1, getAdditionalUserInfo as getAdditionalUserInfo$1, getAuth as getAuth$1, getIdToken as getIdToken$1, getIdTokenResult as getIdTokenResult$1, getMultiFactorResolver as getMultiFactorResolver$1, getRedirectResult as getRedirectResult$1, initializeAuth as initializeAuth$1, initializeRecaptchaConfig as initializeRecaptchaConfig$1, isSignInWithEmailLink as isSignInWithEmailLink$1, linkWithCredential as linkWithCredential$1, linkWithPhoneNumber as linkWithPhoneNumber$1, linkWithPopup as linkWithPopup$1, linkWithRedirect as linkWithRedirect$1, onAuthStateChanged as onAuthStateChanged$1, onIdTokenChanged as onIdTokenChanged$1, parseActionCodeURL as parseActionCodeURL$1, reauthenticateWithCredential as reauthenticateWithCredential$1, reauthenticateWithPhoneNumber as reauthenticateWithPhoneNumber$1, reauthenticateWithPopup as reauthenticateWithPopup$1, reauthenticateWithRedirect as reauthenticateWithRedirect$1, reload as reload$1, revokeAccessToken as revokeAccessToken$1, sendEmailVerification as sendEmailVerification$1, sendPasswordResetEmail as sendPasswordResetEmail$1, sendSignInLinkToEmail as sendSignInLinkToEmail$1, setPersistence as setPersistence$1, signInAnonymously as signInAnonymously$1, signInWithCredential as signInWithCredential$1, signInWithCustomToken as signInWithCustomToken$1, signInWithEmailAndPassword as signInWithEmailAndPassword$1, signInWithEmailLink as signInWithEmailLink$1, signInWithPhoneNumber as signInWithPhoneNumber$1, signInWithPopup as signInWithPopup$1, signInWithRedirect as signInWithRedirect$1, signOut as signOut$1, unlink as unlink$1, updateCurrentUser as updateCurrentUser$1, updateEmail as updateEmail$1, updatePassword as updatePassword$1, updatePhoneNumber as updatePhoneNumber$1, updateProfile as updateProfile$1, useDeviceLanguage as useDeviceLanguage$1, validatePassword as validatePassword$1, verifyBeforeUpdateEmail as verifyBeforeUpdateEmail$1, verifyPasswordResetCode as verifyPasswordResetCode$1 } from 'firebase/auth';
export * from 'firebase/auth';

const AUTH_PROVIDER_NAME = 'auth';
class Auth {
    constructor(auth) {
        return auth;
    }
}
class AuthInstances {
    constructor() {
        return _getAllInstancesOf(AUTH_PROVIDER_NAME);
    }
}
const authInstance$ = timer(0, 300).pipe(concatMap(() => from(_getAllInstancesOf(AUTH_PROVIDER_NAME))), distinct());

const PROVIDED_AUTH_INSTANCES = new InjectionToken('angularfire2.auth-instances');
function defaultAuthInstanceFactory(provided, defaultApp) {
    const defaultAuth = _getDefaultInstanceOf(AUTH_PROVIDER_NAME, provided, defaultApp);
    return defaultAuth && new Auth(defaultAuth);
}
function authInstanceFactory(fn) {
    return (zone, injector) => {
        const auth = zone.runOutsideAngular(() => fn(injector));
        return new Auth(auth);
    };
}
const AUTH_INSTANCES_PROVIDER = {
    provide: AuthInstances,
    deps: [
        [new Optional(), PROVIDED_AUTH_INSTANCES],
    ]
};
const DEFAULT_AUTH_INSTANCE_PROVIDER = {
    provide: Auth,
    useFactory: defaultAuthInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_AUTH_INSTANCES],
        FirebaseApp,
    ]
};
class AuthModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'auth');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.13", ngImport: i0, type: AuthModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthModule, providers: [
            DEFAULT_AUTH_INSTANCE_PROVIDER,
            AUTH_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_AUTH_INSTANCE_PROVIDER,
                        AUTH_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: () => [] });
function provideAuth(fn, ...deps) {
    registerVersion('angularfire', VERSION.full, 'auth');
    return makeEnvironmentProviders([
        DEFAULT_AUTH_INSTANCE_PROVIDER,
        AUTH_INSTANCES_PROVIDER,
        {
            provide: PROVIDED_AUTH_INSTANCES,
            useFactory: authInstanceFactory(fn),
            multi: true,
            deps: [
                NgZone,
                Injector,
                _AngularFireSchedulers,
                FirebaseApps,
                [new Optional(), AppCheckInstances],
                ...deps,
            ]
        }
    ]);
}

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const authState = _zoneWrap(authState$1, true);
const idToken = _zoneWrap(idToken$1, true);
const user = _zoneWrap(user$1, true);

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const applyActionCode = _zoneWrap(applyActionCode$1, true);
const beforeAuthStateChanged = _zoneWrap(beforeAuthStateChanged$1, true);
const checkActionCode = _zoneWrap(checkActionCode$1, true);
const confirmPasswordReset = _zoneWrap(confirmPasswordReset$1, true, 2);
const connectAuthEmulator = _zoneWrap(connectAuthEmulator$1, true);
const createUserWithEmailAndPassword = _zoneWrap(createUserWithEmailAndPassword$1, true, 2);
const deleteUser = _zoneWrap(deleteUser$1, true, 2);
const fetchSignInMethodsForEmail = _zoneWrap(fetchSignInMethodsForEmail$1, true, 2);
const getAdditionalUserInfo = _zoneWrap(getAdditionalUserInfo$1, true, 2);
const getAuth = _zoneWrap(getAuth$1, true);
const getIdToken = _zoneWrap(getIdToken$1, true);
const getIdTokenResult = _zoneWrap(getIdTokenResult$1, true);
const getMultiFactorResolver = _zoneWrap(getMultiFactorResolver$1, true);
const getRedirectResult = _zoneWrap(getRedirectResult$1, true);
const initializeAuth = _zoneWrap(initializeAuth$1, true);
const initializeRecaptchaConfig = _zoneWrap(initializeRecaptchaConfig$1, true);
const isSignInWithEmailLink = _zoneWrap(isSignInWithEmailLink$1, true);
const linkWithCredential = _zoneWrap(linkWithCredential$1, true, 2);
const linkWithPhoneNumber = _zoneWrap(linkWithPhoneNumber$1, true, 2);
const linkWithPopup = _zoneWrap(linkWithPopup$1, true, 2);
const linkWithRedirect = _zoneWrap(linkWithRedirect$1, true, 2);
const onAuthStateChanged = _zoneWrap(onAuthStateChanged$1, true);
const onIdTokenChanged = _zoneWrap(onIdTokenChanged$1, true);
const parseActionCodeURL = _zoneWrap(parseActionCodeURL$1, true);
const reauthenticateWithCredential = _zoneWrap(reauthenticateWithCredential$1, true, 2);
const reauthenticateWithPhoneNumber = _zoneWrap(reauthenticateWithPhoneNumber$1, true, 2);
const reauthenticateWithPopup = _zoneWrap(reauthenticateWithPopup$1, true, 2);
const reauthenticateWithRedirect = _zoneWrap(reauthenticateWithRedirect$1, true, 2);
const reload = _zoneWrap(reload$1, true, 2);
const revokeAccessToken = _zoneWrap(revokeAccessToken$1, true, 2);
const sendEmailVerification = _zoneWrap(sendEmailVerification$1, true, 2);
const sendPasswordResetEmail = _zoneWrap(sendPasswordResetEmail$1, true, 2);
const sendSignInLinkToEmail = _zoneWrap(sendSignInLinkToEmail$1, true, 2);
const setPersistence = _zoneWrap(setPersistence$1, true);
const signInAnonymously = _zoneWrap(signInAnonymously$1, true, 2);
const signInWithCredential = _zoneWrap(signInWithCredential$1, true, 2);
const signInWithCustomToken = _zoneWrap(signInWithCustomToken$1, true, 2);
const signInWithEmailAndPassword = _zoneWrap(signInWithEmailAndPassword$1, true, 2);
const signInWithEmailLink = _zoneWrap(signInWithEmailLink$1, true, 2);
const signInWithPhoneNumber = _zoneWrap(signInWithPhoneNumber$1, true, 2);
const signInWithPopup = _zoneWrap(signInWithPopup$1, true, 2);
const signInWithRedirect = _zoneWrap(signInWithRedirect$1, true, 2);
const signOut = _zoneWrap(signOut$1, true, 2);
const unlink = _zoneWrap(unlink$1, true, 2);
const updateCurrentUser = _zoneWrap(updateCurrentUser$1, true, 2);
const updateEmail = _zoneWrap(updateEmail$1, true, 2);
const updatePassword = _zoneWrap(updatePassword$1, true, 2);
const updatePhoneNumber = _zoneWrap(updatePhoneNumber$1, true, 2);
const updateProfile = _zoneWrap(updateProfile$1, true, 2);
const useDeviceLanguage = _zoneWrap(useDeviceLanguage$1, true, 2);
const validatePassword = _zoneWrap(validatePassword$1, true, 2);
const verifyBeforeUpdateEmail = _zoneWrap(verifyBeforeUpdateEmail$1, true, 2);
const verifyPasswordResetCode = _zoneWrap(verifyPasswordResetCode$1, true, 2);

/**
 * Generated bundle index. Do not edit.
 */

export { Auth, AuthInstances, AuthModule, applyActionCode, authInstance$, authState, beforeAuthStateChanged, checkActionCode, confirmPasswordReset, connectAuthEmulator, createUserWithEmailAndPassword, deleteUser, fetchSignInMethodsForEmail, getAdditionalUserInfo, getAuth, getIdToken, getIdTokenResult, getMultiFactorResolver, getRedirectResult, idToken, initializeAuth, initializeRecaptchaConfig, isSignInWithEmailLink, linkWithCredential, linkWithPhoneNumber, linkWithPopup, linkWithRedirect, onAuthStateChanged, onIdTokenChanged, parseActionCodeURL, provideAuth, reauthenticateWithCredential, reauthenticateWithPhoneNumber, reauthenticateWithPopup, reauthenticateWithRedirect, reload, revokeAccessToken, sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, setPersistence, signInAnonymously, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, signInWithEmailLink, signInWithPhoneNumber, signInWithPopup, signInWithRedirect, signOut, unlink, updateCurrentUser, updateEmail, updatePassword, updatePhoneNumber, updateProfile, useDeviceLanguage, user, validatePassword, verifyBeforeUpdateEmail, verifyPasswordResetCode };
//# sourceMappingURL=angular-fire-auth.mjs.map
