
import { ExperimentalPendingTasks, Injector, assertInInjectionContext, inject } from "@angular/core";
import { MonoTypeOperatorFunction, Observable } from "rxjs";

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
export function runPendingTask(pendingTasks: ExperimentalPendingTasks, fn: () => Promise<unknown>): Promise<unknown> {
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
export function pendingUntilEvent<T>(injector?: Injector): MonoTypeOperatorFunction<T> {
  if (injector === undefined) {
    assertInInjectionContext(pendingUntilEvent);
    injector = inject(Injector);
  }
  const taskService = injector.get(ExperimentalPendingTasks);

  return (sourceObservable) => {
    return new Observable<T>((originalSubscriber) => {
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
