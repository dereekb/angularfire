import { EnvironmentProviders, Injector, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Messaging as FirebaseMessaging } from 'firebase/messaging';
import { Messaging } from './messaging';
import * as i0 from "@angular/core";
export declare function defaultMessagingInstanceFactory(provided: FirebaseMessaging[] | undefined, defaultApp: FirebaseApp, platformId: object): Messaging;
export declare function messagingInstanceFactory(fn: (injector: Injector) => FirebaseMessaging): (zone: NgZone, injector: Injector, platformId: object) => Messaging;
export declare class MessagingModule {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<MessagingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MessagingModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MessagingModule>;
}
export declare function provideMessaging(fn: (injector: Injector) => FirebaseMessaging, ...deps: any[]): EnvironmentProviders;
