import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, UnaryFunction } from 'rxjs';
import * as i0 from "@angular/core";
export type AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthPipe;
export type AuthPipe = UnaryFunction<Observable<User | null>, Observable<boolean | string | any[]>>;
export declare const loggedIn: AuthPipe;
export declare class AuthGuard implements CanActivate {
    private router;
    private auth;
    constructor(router: Router, auth: Auth);
    canActivate: (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | import("@angular/router").UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthGuard>;
}
export declare const canActivate: (pipe: AuthPipeGenerator) => {
    canActivate: (typeof AuthGuard)[];
    data: {
        authGuardPipe: AuthPipeGenerator;
    };
};
export declare const isNotAnonymous: AuthPipe;
export declare const idTokenResult: import("rxjs").OperatorFunction<User, import("@firebase/auth").IdTokenResult>;
export declare const emailVerified: AuthPipe;
export declare const customClaims: UnaryFunction<Observable<User>, Observable<any[] | import("@firebase/auth").ParsedToken>>;
export declare const hasCustomClaim: (claim: string) => AuthPipe;
export declare const redirectUnauthorizedTo: (redirect: string | any[]) => AuthPipe;
export declare const redirectLoggedInTo: (redirect: string | any[]) => AuthPipe;
