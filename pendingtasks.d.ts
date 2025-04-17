import { ExperimentalPendingTasks, Injector } from "@angular/core";
import { MonoTypeOperatorFunction } from "rxjs";
/**
 * Theoretically equivalent to PendingTasks.run() in Angular 19...
 *
 * @param pendingTasks
 * @param fn
 * @returns
 */
export declare function runPendingTask(pendingTasks: ExperimentalPendingTasks, fn: () => Promise<unknown>): Promise<unknown>;
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
export declare function pendingUntilEvent<T>(injector?: Injector): MonoTypeOperatorFunction<T>;
