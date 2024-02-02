import { InjectionToken, NgZone } from '@angular/core';
import { ɵAngularFireSchedulers } from '@angular/fire';
import { ɵPromiseProxy } from '@angular/fire/compat';
import { FirebaseOptions } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { Settings } from './interfaces';
import * as i0 from "@angular/core";
export type ConfigTemplate = Record<string, string | number | boolean>;
export declare const SETTINGS: InjectionToken<firebase.remoteConfig.Settings>;
export declare const DEFAULTS: InjectionToken<ConfigTemplate>;
export interface AngularFireRemoteConfig extends ɵPromiseProxy<firebase.remoteConfig.RemoteConfig> {
}
export declare class Value implements firebase.remoteConfig.Value {
    _source: firebase.remoteConfig.ValueSource;
    _value: string;
    asBoolean(): boolean;
    asString(): string;
    asNumber(): number;
    getSource(): firebase.remoteConfig.ValueSource;
    constructor(_source: firebase.remoteConfig.ValueSource, _value: string);
}
export declare class Parameter extends Value {
    key: string;
    fetchTimeMillis: number;
    constructor(key: string, fetchTimeMillis: number, source: firebase.remoteConfig.ValueSource, value: string);
}
export declare const filterRemote: () => MonoTypeOperatorFunction<Parameter | Parameter[]>;
export declare const filterFresh: (howRecentInMillis: number) => MonoTypeOperatorFunction<Parameter | Parameter[]>;
export declare class AngularFireRemoteConfig {
    private zone;
    readonly changes: Observable<Parameter>;
    readonly parameters: Observable<Parameter[]>;
    readonly numbers: Observable<Record<string, number | undefined>> & Record<string, Observable<number>>;
    readonly booleans: Observable<Record<string, boolean | undefined>> & Record<string, Observable<boolean>>;
    readonly strings: Observable<Record<string, string | undefined>> & Record<string, Observable<string | undefined>>;
    constructor(options: FirebaseOptions, name: string | null | undefined, settings: Settings | null, defaultConfig: ConfigTemplate | null, zone: NgZone, schedulers: ɵAngularFireSchedulers, platformId: Object);
    static ɵfac: i0.ɵɵFactoryDeclaration<AngularFireRemoteConfig, [null, { optional: true; }, { optional: true; }, { optional: true; }, null, null, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AngularFireRemoteConfig>;
}
export declare const budget: <T>(interval: number) => MonoTypeOperatorFunction<T>;
export declare function scanToObject(): OperatorFunction<Parameter, Record<string, string | undefined>>;
export declare function scanToObject(to: 'numbers'): OperatorFunction<Parameter, Record<string, number | undefined>>;
export declare function scanToObject(to: 'booleans'): OperatorFunction<Parameter, Record<string, boolean | undefined>>;
export declare function scanToObject(to: 'strings'): OperatorFunction<Parameter, Record<string, string | undefined>>;
export declare function scanToObject<T extends ConfigTemplate>(template: T): OperatorFunction<Parameter, T & Record<string, string | undefined>>;
export declare function mapToObject(): OperatorFunction<Parameter[], Record<string, string | undefined>>;
export declare function mapToObject(to: 'numbers'): OperatorFunction<Parameter[], Record<string, number | undefined>>;
export declare function mapToObject(to: 'booleans'): OperatorFunction<Parameter[], Record<string, boolean | undefined>>;
export declare function mapToObject(to: 'strings'): OperatorFunction<Parameter[], Record<string, string | undefined>>;
export declare function mapToObject<T extends ConfigTemplate>(template: T): OperatorFunction<Parameter[], T & Record<string, string | undefined>>;
