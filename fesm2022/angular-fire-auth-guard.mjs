import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i2 from '@angular/fire/auth';
import { user } from '@angular/fire/auth';
import * as i1 from '@angular/router';
import { of, pipe } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { VERSION } from '@angular/fire';
import { registerVersion } from 'firebase/app';

const loggedIn = map(user => !!user);
class AuthGuard {
    router;
    auth;
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    canActivate = (next, state) => {
        const authPipeFactory = next.data.authGuardPipe || (() => loggedIn);
        return user(this.auth).pipe(take(1), authPipeFactory(next, state), map(can => {
            if (typeof can === 'boolean') {
                return can;
            }
            else if (Array.isArray(can)) {
                return this.router.createUrlTree(can);
            }
            else {
                // TODO(EdricChan03): Add tests
                return this.router.parseUrl(can);
            }
        }));
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthGuard, deps: [{ token: i1.Router }, { token: i2.Auth }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthGuard, providedIn: 'any' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: () => [{ type: i1.Router }, { type: i2.Auth }] });
const canActivate = (pipe) => ({
    canActivate: [AuthGuard], data: { authGuardPipe: pipe }
});
const isNotAnonymous = map(user => !!user && !user.isAnonymous);
const idTokenResult = switchMap((user) => user ? user.getIdTokenResult() : of(null));
const emailVerified = map(user => !!user && user.emailVerified);
const customClaims = pipe(idTokenResult, map(idTokenResult => idTokenResult ? idTokenResult.claims : []));
const hasCustomClaim = 
// eslint-disable-next-line no-prototype-builtins
(claim) => pipe(customClaims, map(claims => claims.hasOwnProperty(claim)));
const redirectUnauthorizedTo = (redirect) => pipe(loggedIn, map(loggedIn => loggedIn || redirect));
const redirectLoggedInTo = (redirect) => pipe(loggedIn, map(loggedIn => loggedIn && redirect || true));

class AuthGuardModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'auth-guard');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthGuardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.13", ngImport: i0, type: AuthGuardModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthGuardModule, providers: [AuthGuard] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: AuthGuardModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AuthGuard]
                }]
        }], ctorParameters: () => [] });

/**
 * Generated bundle index. Do not edit.
 */

export { AuthGuard, AuthGuardModule, canActivate, customClaims, emailVerified, hasCustomClaim, idTokenResult, isNotAnonymous, loggedIn, redirectLoggedInTo, redirectUnauthorizedTo };
//# sourceMappingURL=angular-fire-auth-guard.mjs.map
