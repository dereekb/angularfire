/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EnvironmentInjector, ExperimentalPendingTasks, Injectable, NgZone, inject, isDevMode, runInInjectionContext } from '@angular/core';
import { Observable, asyncScheduler, queueScheduler } from 'rxjs';
import { observeOn, subscribeOn } from 'rxjs/operators';
import { pendingUntilEvent, runPendingTask } from './pendingtasks';
import * as i0 from "@angular/core";
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["SILENT"] = 0] = "SILENT";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["VERBOSE"] = 2] = "VERBOSE";
})(LogLevel || (LogLevel = {}));
var currentLogLevel = (isDevMode() && typeof Zone !== "undefined") ? LogLevel.WARN : LogLevel.SILENT;
export const setLogLevel = (logLevel) => currentLogLevel = logLevel;
/**
 * Schedules tasks so that they are invoked inside the Zone that is passed in the constructor.
 */
export class ɵZoneScheduler {
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
export class ɵAngularFireSchedulers {
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
export const ɵzoneWrap = (it, blockUntilFirst, logLevel) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvem9uZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQXNEO0FBQ3RELE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsd0JBQXdCLEVBQ3hCLFVBQVUsRUFFVixNQUFNLEVBRU4sTUFBTSxFQUNOLFNBQVMsRUFDVCxxQkFBcUIsRUFDdEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVMLFVBQVUsRUFJVixjQUFjLEVBQ2QsY0FBYyxFQUNmLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBSW5FLE1BQU0sQ0FBTixJQUFZLFFBSVg7QUFKRCxXQUFZLFFBQVE7SUFDbEIsMkNBQVksQ0FBQTtJQUNaLHVDQUFVLENBQUE7SUFDViw2Q0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQUpXLFFBQVEsS0FBUixRQUFRLFFBSW5CO0FBR0QsSUFBSSxlQUFlLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUVyRyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFrQixFQUFFLEVBQUUsQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO0FBRTlFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFDTDtJQUFtQjtJQUF2QyxZQUFvQixJQUFTLEVBQVUsV0FBZ0IsY0FBYztRQUFqRCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7SUFDckUsQ0FBQztJQUVELEdBQUc7UUFDRCxPQUFPLElBQUksQ0FBQyxR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QyxDQUFDO1lBQ3BDLENBQUMsQ0FBQztRQUNKLENBQUM7YUFBTSxDQUFDO1lBQ04sb0ZBQW9GO1lBQ3BGLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFRLENBQUM7QUFDWCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbmltcG9ydCB7XG4gIEVudmlyb25tZW50SW5qZWN0b3IsXG4gIEV4cGVyaW1lbnRhbFBlbmRpbmdUYXNrcyxcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgYXNzZXJ0SW5JbmplY3Rpb25Db250ZXh0LFxuICBpbmplY3QsXG4gIGlzRGV2TW9kZSxcbiAgcnVuSW5JbmplY3Rpb25Db250ZXh0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uLFxuICBPYnNlcnZhYmxlLFxuICBTY2hlZHVsZXJBY3Rpb24sXG4gIFNjaGVkdWxlckxpa2UsXG4gIFN1YnNjcmlwdGlvbixcbiAgYXN5bmNTY2hlZHVsZXIsXG4gIHF1ZXVlU2NoZWR1bGVyXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgb2JzZXJ2ZU9uLCBzdWJzY3JpYmVPbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHBlbmRpbmdVbnRpbEV2ZW50LCBydW5QZW5kaW5nVGFzayB9IGZyb20gJy4vcGVuZGluZ3Rhc2tzJztcblxuZGVjbGFyZSBjb25zdCBab25lOiB7IGN1cnJlbnQ6IHVua25vd24gfSB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGVudW0gTG9nTGV2ZWwge1xuICBcIlNJTEVOVFwiID0gMCxcbiAgXCJXQVJOXCIgPSAxLFxuICBcIlZFUkJPU0VcIiA9IDIsXG59XG5cblxudmFyIGN1cnJlbnRMb2dMZXZlbCA9IChpc0Rldk1vZGUoKSAmJiB0eXBlb2YgWm9uZSAhPT0gXCJ1bmRlZmluZWRcIikgPyBMb2dMZXZlbC5XQVJOIDogTG9nTGV2ZWwuU0lMRU5UO1xuXG5leHBvcnQgY29uc3Qgc2V0TG9nTGV2ZWwgPSAobG9nTGV2ZWw6IExvZ0xldmVsKSA9PiBjdXJyZW50TG9nTGV2ZWwgPSBsb2dMZXZlbDtcblxuLyoqXG4gKiBTY2hlZHVsZXMgdGFza3Mgc28gdGhhdCB0aGV5IGFyZSBpbnZva2VkIGluc2lkZSB0aGUgWm9uZSB0aGF0IGlzIHBhc3NlZCBpbiB0aGUgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyDJtVpvbmVTY2hlZHVsZXIgaW1wbGVtZW50cyBTY2hlZHVsZXJMaWtlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB6b25lOiBhbnksIHByaXZhdGUgZGVsZWdhdGU6IGFueSA9IHF1ZXVlU2NoZWR1bGVyKSB7XG4gIH1cblxuICBub3coKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubm93KCk7XG4gIH1cblxuICBzY2hlZHVsZSh3b3JrOiAodGhpczogU2NoZWR1bGVyQWN0aW9uPGFueT4sIHN0YXRlPzogYW55KSA9PiB2b2lkLCBkZWxheT86IG51bWJlciwgc3RhdGU/OiBhbnkpOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IHRhcmdldFpvbmUgPSB0aGlzLnpvbmU7XG4gICAgLy8gV3JhcCB0aGUgc3BlY2lmaWVkIHdvcmsgZnVuY3Rpb24gdG8gbWFrZSBzdXJlIHRoYXQgaWYgbmVzdGVkIHNjaGVkdWxpbmcgdGFrZXMgcGxhY2UgdGhlXG4gICAgLy8gd29yayBpcyBleGVjdXRlZCBpbiB0aGUgY29ycmVjdCB6b25lXG4gICAgY29uc3Qgd29ya0luWm9uZSA9IGZ1bmN0aW9uICh0aGlzOiBTY2hlZHVsZXJBY3Rpb248YW55Piwgc3RhdGU6IGFueSkge1xuICAgICAgaWYgKHRhcmdldFpvbmUpIHtcbiAgICAgICAgdGFyZ2V0Wm9uZS5ydW5HdWFyZGVkKCgpID0+IHtcbiAgICAgICAgICB3b3JrLmFwcGx5KHRoaXMsIFtzdGF0ZV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdvcmsuYXBwbHkodGhpcywgW3N0YXRlXSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFNjaGVkdWxpbmcgaXRzZWxmIG5lZWRzIHRvIGJlIHJ1biBpbiB6b25lIHRvIGVuc3VyZSBzZXRJbnRlcnZhbCBjYWxscyBmb3IgYXN5bmMgc2NoZWR1bGluZyBhcmUgZG9uZVxuICAgIC8vIGluc2lkZSB0aGUgY29ycmVjdCB6b25lLiBUaGlzIHNjaGVkdWxlciBuZWVkcyB0byBzY2hlZHVsZSBhc3luY2hyb25vdXNseSBhbHdheXMgdG8gZW5zdXJlIHRoYXRcbiAgICAvLyBmaXJlYmFzZSBlbWlzc2lvbnMgYXJlIG5ldmVyIHN5bmNocm9ub3VzLiBTcGVjaWZ5aW5nIGEgZGVsYXkgY2F1c2VzIGlzc3VlcyB3aXRoIHRoZSBxdWV1ZVNjaGVkdWxlciBkZWxlZ2F0ZS5cbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5zY2hlZHVsZSh3b3JrSW5ab25lLCBkZWxheSwgc3RhdGUpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyB7XG4gIHB1YmxpYyByZWFkb25seSBvdXRzaWRlQW5ndWxhcjogybVab25lU2NoZWR1bGVyO1xuICBwdWJsaWMgcmVhZG9ubHkgaW5zaWRlQW5ndWxhcjogybVab25lU2NoZWR1bGVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IG5nWm9uZSA9IGluamVjdChOZ1pvbmUpO1xuICAgIHRoaXMub3V0c2lkZUFuZ3VsYXIgPSBuZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoXG4gICAgICAoKSA9PiBuZXcgybVab25lU2NoZWR1bGVyKHR5cGVvZiBab25lID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFpvbmUuY3VycmVudClcbiAgICApO1xuICAgIHRoaXMuaW5zaWRlQW5ndWxhciA9IG5nWm9uZS5ydW4oXG4gICAgICAoKSA9PiBuZXcgybVab25lU2NoZWR1bGVyKFxuICAgICAgICB0eXBlb2YgWm9uZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBab25lLmN1cnJlbnQsXG4gICAgICAgIGFzeW5jU2NoZWR1bGVyXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuXG52YXIgYWxyZWFkeVdhcm5lZCA9IGZhbHNlO1xuZnVuY3Rpb24gd2Fybk91dHNpZGVJbmplY3Rpb25Db250ZXh0KG9yaWdpbmFsOiBhbnksIGxvZ0xldmVsOiBMb2dMZXZlbCkge1xuICBpZiAoIWFscmVhZHlXYXJuZWQgJiYgKGN1cnJlbnRMb2dMZXZlbCA+IExvZ0xldmVsLlNJTEVOVCB8fCBpc0Rldk1vZGUoKSkpIHtcbiAgICBhbHJlYWR5V2FybmVkID0gdHJ1ZTtcbiAgICBjb25zb2xlLndhcm4oXCJDYWxsaW5nIEZpcmViYXNlIEFQSXMgb3V0c2lkZSBvZiBhbiBJbmplY3Rpb24gY29udGV4dCBtYXkgZGVzdGFiaWxpemUgeW91ciBhcHBsaWNhdGlvbiBsZWFkaW5nIHRvIHN1YnRsZSBjaGFuZ2UtZGV0ZWN0aW9uIGFuZCBoeWRyYXRpb24gYnVncy4gRmluZCBtb3JlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXJmaXJlL2Jsb2IvbWFpbi9kb2NzL3pvbmVzLm1kXCIpO1xuICB9XG4gIGlmIChjdXJyZW50TG9nTGV2ZWwgPj0gbG9nTGV2ZWwpIHtcbiAgICBjb25zb2xlLndhcm4oYEZpcmViYXNlIEFQSSBjYWxsZWQgb3V0c2lkZSBpbmplY3Rpb24gY29udGV4dDogJHtvcmlnaW5hbC5uYW1lfWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJ1bk91dHNpZGVBbmd1bGFyPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpOiBUIHtcbiAgY29uc3Qgbmdab25lID0gaW5qZWN0KE5nWm9uZSwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcbiAgaWYgKCFuZ1pvbmUpIHsgcmV0dXJuIGZuKCk7IH1cbiAgcmV0dXJuIG5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBmbigpKTtcbn1cblxuZnVuY3Rpb24gcnVuPFQ+KGZuOiAoLi4uYXJnczogYW55W10pID0+IFQpOiBUIHtcbiAgY29uc3Qgbmdab25lID0gaW5qZWN0KE5nWm9uZSwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcbiAgaWYgKCFuZ1pvbmUpIHsgcmV0dXJuIGZuKCk7IH1cbiAgcmV0dXJuIG5nWm9uZS5ydW4oKCkgPT4gZm4oKSk7XG59XG5cbmNvbnN0IHpvbmVXcmFwRm4gPSAoXG4gIGl0OiAoLi4uYXJnczogYW55W10pID0+IGFueSxcbiAgdGFza0RvbmU6IFZvaWRGdW5jdGlvbiB8IHVuZGVmaW5lZCxcbiAgaW5qZWN0b3I6IEVudmlyb25tZW50SW5qZWN0b3IsXG4pID0+IHtcbiAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGlmICh0YXNrRG9uZSkge1xuICAgICAgc2V0VGltZW91dCh0YXNrRG9uZSwgMCk7XG4gICAgfVxuICAgIHJldHVybiBydW5JbkluamVjdGlvbkNvbnRleHQoaW5qZWN0b3IsICgpID0+IHJ1bigoKSA9PiBpdC5hcHBseSh0aGlzLCBhcmdzKSkpO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IMm1em9uZVdyYXAgPSA8VCA9IHVua25vd24+KGl0OiBULCBibG9ja1VudGlsRmlyc3Q6IGJvb2xlYW4sIGxvZ0xldmVsPzogTG9nTGV2ZWwpOiBUID0+IHtcbiAgbG9nTGV2ZWwgfHw9IGJsb2NrVW50aWxGaXJzdCA/IExvZ0xldmVsLldBUk4gOiBMb2dMZXZlbC5WRVJCT1NFO1xuICAvLyBmdW5jdGlvbigpIGlzIG5lZWRlZCBmb3IgdGhlIGFyZ3VtZW50cyBvYmplY3RcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdGFza0RvbmU6IFZvaWRGdW5jdGlvbiB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuICAgIGxldCBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycztcbiAgICBsZXQgcGVuZGluZ1Rhc2tzOiBFeHBlcmltZW50YWxQZW5kaW5nVGFza3M7XG4gICAgbGV0IGluamVjdG9yOiBFbnZpcm9ubWVudEluamVjdG9yO1xuXG4gICAgdHJ5IHtcbiAgICAgIHNjaGVkdWxlcnMgPSBpbmplY3QoybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMpO1xuICAgICAgcGVuZGluZ1Rhc2tzID0gaW5qZWN0KEV4cGVyaW1lbnRhbFBlbmRpbmdUYXNrcyk7XG4gICAgICBpbmplY3RvciA9IGluamVjdChFbnZpcm9ubWVudEluamVjdG9yKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB3YXJuT3V0c2lkZUluamVjdGlvbkNvbnRleHQoaXQsIGxvZ0xldmVsKTtcbiAgICAgIHJldHVybiAoaXQgYXMgYW55KS5hcHBseSh0aGlzLCBfYXJndW1lbnRzKTtcbiAgICB9XG4gICAgLy8gaWYgdGhpcyBpcyBhIGNhbGxiYWNrIGZ1bmN0aW9uLCBlLmcsIG9uU25hcHNob3QsIHdlIHNob3VsZCBjcmVhdGUgYSBwZW5kaW5nIHRhc2sgYW5kIGNvbXBsZXRlIGl0XG4gICAgLy8gb25seSBvbmNlIG9uZSBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25zIGlzIHRyaXBwZWQuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0eXBlb2YgX2FyZ3VtZW50c1tpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoYmxvY2tVbnRpbEZpcnN0KSB7XG4gICAgICAgICAgdGFza0RvbmUgfHw9IHJ1bigoKSA9PiBwZW5kaW5nVGFza3MuYWRkKCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8gY3JlYXRlIGEgbWljcm90YXNrIHRvIHRyYWNrIGNhbGxiYWNrIGZ1bmN0aW9uc1xuICAgICAgICBfYXJndW1lbnRzW2ldID0gem9uZVdyYXBGbihfYXJndW1lbnRzW2ldLCB0YXNrRG9uZSwgaW5qZWN0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByZXQgPSBydW5PdXRzaWRlQW5ndWxhcigoKSA9PiAoaXQgYXMgYW55KS5hcHBseSh0aGlzLCBfYXJndW1lbnRzKSk7XG4gICAgaWYgKCFibG9ja1VudGlsRmlyc3QpIHtcbiAgICAgIGlmIChyZXQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIHJldHVybiByZXQucGlwZShcbiAgICAgICAgICBzdWJzY3JpYmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBydW4oKCkgPT4gcmV0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJldCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgIHJldHVybiByZXQucGlwZShcbiAgICAgICAgc3Vic2NyaWJlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpLFxuICAgICAgICBwZW5kaW5nVW50aWxFdmVudChpbmplY3RvciksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocmV0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1taXN1c2VkLXByb21pc2VzXG4gICAgICByZXR1cm4gcnVuKFxuICAgICAgICAoKSA9PlxuICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJ1blBlbmRpbmdUYXNrKHBlbmRpbmdUYXNrcywgKCkgPT4gcmV0KS50aGVuKFxuICAgICAgICAgICAgICAoaXQpID0+IHJ1bkluSW5qZWN0aW9uQ29udGV4dChpbmplY3RvciwgKCkgPT4gcnVuKCgpID0+IHJlc29sdmUoaXQpKSksXG4gICAgICAgICAgICAgIChyZWFzb24pID0+IHJ1bkluSW5qZWN0aW9uQ29udGV4dChpbmplY3RvciwgKCkgPT4gcnVuKCgpID0+IHJlamVjdChyZWFzb24pKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJldCA9PT0gJ2Z1bmN0aW9uJyAmJiB0YXNrRG9uZSkge1xuICAgICAgLy8gSGFuZGxlIHVuc3Vic2NyaWJlXG4gICAgICAvLyBmdW5jdGlvbigpIGlzIG5lZWRlZCBmb3IgdGhlIGFyZ3VtZW50cyBvYmplY3RcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFRpbWVvdXQodGFza0RvbmUsIDApO1xuICAgICAgICByZXR1cm4gcmV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPIGhvdyBkbyB3ZSBoYW5kbGUgc3RvcmFnZSB1cGxvYWRzIGluIFpvbmU/IGFuZCBvdGhlciBzdHVmZiB3aXRoIGNhbmNlbCgpIGV0Yz9cbiAgICAgIHJldHVybiBydW4oKCkgPT4gcmV0KTtcbiAgICB9XG4gIH0gYXMgYW55O1xufTtcbiJdfQ==