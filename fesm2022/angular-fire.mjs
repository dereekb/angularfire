import * as i0 from '@angular/core';
import { Version, assertInInjectionContext, inject, Injector, ExperimentalPendingTasks, isDevMode, NgZone, Injectable, runInInjectionContext, EnvironmentInjector } from '@angular/core';
import { getApps } from 'firebase/app';
import { Observable, queueScheduler, asyncScheduler } from 'rxjs';
import { subscribeOn, observeOn } from 'rxjs/operators';

const VERSION = new Version('ANGULARFIRE2_VERSION');
const ɵisSupportedError = (module) => `The APP_INITIALIZER that is "making" isSupported() sync for the sake of convenient DI has not resolved in this
context. Rather than injecting ${module} in the constructor, first ensure that ${module} is supported by calling
\`await isSupported()\`, then retrieve the instance from the injector manually \`injector.get(${module})\`.`;
function ɵgetDefaultInstanceOf(identifier, provided, defaultApp) {
    if (provided) {
        // Was provide* only called once? If so grab that
        if (provided.length === 1) {
            return provided[0];
        }
        const providedUsingDefaultApp = provided.filter((it) => it.app === defaultApp);
        // Was provide* only called once, using the default app? If so use that
        if (providedUsingDefaultApp.length === 1) {
            return providedUsingDefaultApp[0];
        }
    }
    // Grab the default instance from the defaultApp
    const defaultAppWithContainer = defaultApp;
    const provider = defaultAppWithContainer.container.getProvider(identifier);
    return provider.getImmediate({ optional: true });
}
const ɵgetAllInstancesOf = (identifier, app) => {
    const apps = app ? [app] : getApps();
    const instances = [];
    apps.forEach((app) => {
        const provider = app.container.getProvider(identifier);
        provider.instances.forEach((instance) => {
            if (!instances.includes(instance)) {
                instances.push(instance);
            }
        });
    });
    return instances;
};

// MARK: Angular 18 Compat w/ Pending Tasks
/*
  NOTE: This is a temporary implementation of pending tasks for Angular 18.

  It seems like these are mainly necessary for SSR which is not supported in dbx-components, so it shouldn't matter.
*/
/**
 * Theoretically equivalent to PendingTasks.run() in Angular 19...
 *
 * @param pendingTasks
 * @param fn
 * @returns
 */
function runPendingTask(pendingTasks, fn) {
    const removeTask = pendingTasks.add();
    return fn().finally(removeTask);
}
/**
 * Theoretically equivalent to PendingTasks.pendingUntilEvent() in Angular 19...
 
 * Operator which makes the application unstable until the observable emits, completes, errors, or is unsubscribed.
 *
 * Use this operator in observables whose subscriptions are important for rendering and should be included in SSR serialization.
 *
 * @param injector The `Injector` to use during creation. If this is not provided, the current injection context will be used instead (via `inject`).
 *
 * @experimental
 */
function pendingUntilEvent(injector) {
    if (injector === undefined) {
        assertInInjectionContext(pendingUntilEvent);
        injector = inject(Injector);
    }
    const taskService = injector.get(ExperimentalPendingTasks);
    return (sourceObservable) => {
        return new Observable((originalSubscriber) => {
            // create a new task on subscription
            const removeTask = taskService.add();
            let cleanedUp = false;
            function cleanupTask() {
                if (cleanedUp) {
                    return;
                }
                removeTask();
                cleanedUp = true;
            }
            const innerSubscription = sourceObservable.subscribe({
                next: (v) => {
                    originalSubscriber.next(v);
                    cleanupTask();
                },
                complete: () => {
                    originalSubscriber.complete();
                    cleanupTask();
                },
                error: (e) => {
                    originalSubscriber.error(e);
                    cleanupTask();
                },
            });
            innerSubscription.add(() => {
                originalSubscriber.unsubscribe();
                cleanupTask();
            });
            return innerSubscription;
        });
    };
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["SILENT"] = 0] = "SILENT";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["VERBOSE"] = 2] = "VERBOSE";
})(LogLevel || (LogLevel = {}));
var currentLogLevel = (isDevMode() && typeof Zone !== "undefined") ? LogLevel.WARN : LogLevel.SILENT;
const setLogLevel = (logLevel) => currentLogLevel = logLevel;
/**
 * Schedules tasks so that they are invoked inside the Zone that is passed in the constructor.
 */
class ɵZoneScheduler {
    zone;
    delegate;
    constructor(zone, delegate = queueScheduler) {
        this.zone = zone;
        this.delegate = delegate;
    }
    now() {
        return this.delegate.now();
    }
    schedule(work, delay, state) {
        const targetZone = this.zone;
        // Wrap the specified work function to make sure that if nested scheduling takes place the
        // work is executed in the correct zone
        const workInZone = function (state) {
            if (targetZone) {
                targetZone.runGuarded(() => {
                    work.apply(this, [state]);
                });
            }
            else {
                work.apply(this, [state]);
            }
        };
        // Scheduling itself needs to be run in zone to ensure setInterval calls for async scheduling are done
        // inside the correct zone. This scheduler needs to schedule asynchronously always to ensure that
        // firebase emissions are never synchronous. Specifying a delay causes issues with the queueScheduler delegate.
        return this.delegate.schedule(workInZone, delay, state);
    }
}
class ɵAngularFireSchedulers {
    outsideAngular;
    insideAngular;
    constructor() {
        const ngZone = inject(NgZone);
        this.outsideAngular = ngZone.runOutsideAngular(() => new ɵZoneScheduler(typeof Zone === 'undefined' ? undefined : Zone.current));
        this.insideAngular = ngZone.run(() => new ɵZoneScheduler(typeof Zone === 'undefined' ? undefined : Zone.current, asyncScheduler));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ɵAngularFireSchedulers, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ɵAngularFireSchedulers, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: ɵAngularFireSchedulers, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });
var alreadyWarned = false;
function warnOutsideInjectionContext(original, logLevel) {
    if (!alreadyWarned && (currentLogLevel > LogLevel.SILENT || isDevMode())) {
        alreadyWarned = true;
        console.warn("Calling Firebase APIs outside of an Injection context may destabilize your application leading to subtle change-detection and hydration bugs. Find more at https://github.com/angular/angularfire/blob/main/docs/zones.md");
    }
    if (currentLogLevel >= logLevel) {
        console.warn(`Firebase API called outside injection context: ${original.name}`);
    }
}
function runOutsideAngular(fn) {
    const ngZone = inject(NgZone, { optional: true });
    if (!ngZone) {
        return fn();
    }
    return ngZone.runOutsideAngular(() => fn());
}
function run(fn) {
    const ngZone = inject(NgZone, { optional: true });
    if (!ngZone) {
        return fn();
    }
    return ngZone.run(() => fn());
}
const zoneWrapFn = (it, taskDone, injector) => {
    return (...args) => {
        if (taskDone) {
            setTimeout(taskDone, 0);
        }
        return runInInjectionContext(injector, () => run(() => it.apply(this, args)));
    };
};
const ɵzoneWrap = (it, blockUntilFirst, logLevel) => {
    logLevel ||= blockUntilFirst ? LogLevel.WARN : LogLevel.VERBOSE;
    // function() is needed for the arguments object
    return function () {
        let taskDone;
        const _arguments = arguments;
        let schedulers;
        let pendingTasks;
        let injector;
        try {
            schedulers = inject(ɵAngularFireSchedulers);
            pendingTasks = inject(ExperimentalPendingTasks);
            injector = inject(EnvironmentInjector);
        }
        catch (e) {
            warnOutsideInjectionContext(it, logLevel);
            return it.apply(this, _arguments);
        }
        // if this is a callback function, e.g, onSnapshot, we should create a pending task and complete it
        // only once one of the callback functions is tripped.
        for (let i = 0; i < arguments.length; i++) {
            if (typeof _arguments[i] === 'function') {
                if (blockUntilFirst) {
                    taskDone ||= run(() => pendingTasks.add());
                }
                // TODO create a microtask to track callback functions
                _arguments[i] = zoneWrapFn(_arguments[i], taskDone, injector);
            }
        }
        const ret = runOutsideAngular(() => it.apply(this, _arguments));
        if (!blockUntilFirst) {
            if (ret instanceof Observable) {
                return ret.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
            }
            else {
                return run(() => ret);
            }
        }
        if (ret instanceof Observable) {
            return ret.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), pendingUntilEvent(injector));
        }
        else if (ret instanceof Promise) {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            return run(() => new Promise((resolve, reject) => {
                runPendingTask(pendingTasks, () => ret).then((it) => runInInjectionContext(injector, () => run(() => resolve(it))), (reason) => runInInjectionContext(injector, () => run(() => reject(reason))));
            }));
        }
        else if (typeof ret === 'function' && taskDone) {
            // Handle unsubscribe
            // function() is needed for the arguments object
            return function () {
                setTimeout(taskDone, 0);
                return ret.apply(this, arguments);
            };
        }
        else {
            // TODO how do we handle storage uploads in Zone? and other stuff with cancel() etc?
            return run(() => ret);
        }
    };
};

/**
 * Generated bundle index. Do not edit.
 */

export { LogLevel, VERSION, pendingUntilEvent, runPendingTask, setLogLevel, ɵAngularFireSchedulers, ɵZoneScheduler, ɵgetAllInstancesOf, ɵgetDefaultInstanceOf, ɵisSupportedError, ɵzoneWrap };
//# sourceMappingURL=angular-fire.mjs.map
