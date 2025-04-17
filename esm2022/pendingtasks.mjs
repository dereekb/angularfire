import { ExperimentalPendingTasks, Injector, assertInInjectionContext, inject } from "@angular/core";
import { Observable } from "rxjs";
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
export function runPendingTask(pendingTasks, fn) {
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
export function pendingUntilEvent(injector) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZ3Rhc2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BlbmRpbmd0YXNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQTRCLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU1RCwyQ0FBMkM7QUFFM0M7Ozs7RUFJRTtBQUVGOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsWUFBc0MsRUFBRSxFQUEwQjtJQUMvRixNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUksUUFBbUI7SUFDdEQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDM0Isd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM1QyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFFM0QsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUU7UUFDMUIsT0FBTyxJQUFJLFVBQVUsQ0FBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDOUMsb0NBQW9DO1lBQ3BDLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVyQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsU0FBUyxXQUFXO2dCQUNsQixJQUFJLFNBQVMsRUFBRSxDQUFDO29CQUNkLE9BQU87Z0JBQ1QsQ0FBQztnQkFFRCxVQUFVLEVBQUUsQ0FBQztnQkFDYixTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ25CLENBQUM7WUFFRCxNQUFNLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztnQkFDbkQsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1Ysa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixXQUFXLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCxRQUFRLEVBQUUsR0FBRyxFQUFFO29CQUNiLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM5QixXQUFXLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDWCxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLFdBQVcsRUFBRSxDQUFDO2dCQUNoQixDQUFDO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDekIsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2pDLFdBQVcsRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxpQkFBaUIsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEV4cGVyaW1lbnRhbFBlbmRpbmdUYXNrcywgSW5qZWN0b3IsIGFzc2VydEluSW5qZWN0aW9uQ29udGV4dCwgaW5qZWN0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbi8vIE1BUks6IEFuZ3VsYXIgMTggQ29tcGF0IHcvIFBlbmRpbmcgVGFza3NcblxuLypcbiAgTk9URTogVGhpcyBpcyBhIHRlbXBvcmFyeSBpbXBsZW1lbnRhdGlvbiBvZiBwZW5kaW5nIHRhc2tzIGZvciBBbmd1bGFyIDE4LlxuXG4gIEl0IHNlZW1zIGxpa2UgdGhlc2UgYXJlIG1haW5seSBuZWNlc3NhcnkgZm9yIFNTUiB3aGljaCBpcyBub3Qgc3VwcG9ydGVkIGluIGRieC1jb21wb25lbnRzLCBzbyBpdCBzaG91bGRuJ3QgbWF0dGVyLlxuKi9cblxuLyoqXG4gKiBUaGVvcmV0aWNhbGx5IGVxdWl2YWxlbnQgdG8gUGVuZGluZ1Rhc2tzLnJ1bigpIGluIEFuZ3VsYXIgMTkuLi5cbiAqIFxuICogQHBhcmFtIHBlbmRpbmdUYXNrcyBcbiAqIEBwYXJhbSBmbiBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gcnVuUGVuZGluZ1Rhc2socGVuZGluZ1Rhc2tzOiBFeHBlcmltZW50YWxQZW5kaW5nVGFza3MsIGZuOiAoKSA9PiBQcm9taXNlPHVua25vd24+KTogUHJvbWlzZTx1bmtub3duPiB7XG4gIGNvbnN0IHJlbW92ZVRhc2sgPSBwZW5kaW5nVGFza3MuYWRkKCk7XG4gIHJldHVybiBmbigpLmZpbmFsbHkocmVtb3ZlVGFzayk7XG59XG5cbi8qKlxuICogVGhlb3JldGljYWxseSBlcXVpdmFsZW50IHRvIFBlbmRpbmdUYXNrcy5wZW5kaW5nVW50aWxFdmVudCgpIGluIEFuZ3VsYXIgMTkuLi5cbiBcbiAqIE9wZXJhdG9yIHdoaWNoIG1ha2VzIHRoZSBhcHBsaWNhdGlvbiB1bnN0YWJsZSB1bnRpbCB0aGUgb2JzZXJ2YWJsZSBlbWl0cywgY29tcGxldGVzLCBlcnJvcnMsIG9yIGlzIHVuc3Vic2NyaWJlZC5cbiAqXG4gKiBVc2UgdGhpcyBvcGVyYXRvciBpbiBvYnNlcnZhYmxlcyB3aG9zZSBzdWJzY3JpcHRpb25zIGFyZSBpbXBvcnRhbnQgZm9yIHJlbmRlcmluZyBhbmQgc2hvdWxkIGJlIGluY2x1ZGVkIGluIFNTUiBzZXJpYWxpemF0aW9uLlxuICpcbiAqIEBwYXJhbSBpbmplY3RvciBUaGUgYEluamVjdG9yYCB0byB1c2UgZHVyaW5nIGNyZWF0aW9uLiBJZiB0aGlzIGlzIG5vdCBwcm92aWRlZCwgdGhlIGN1cnJlbnQgaW5qZWN0aW9uIGNvbnRleHQgd2lsbCBiZSB1c2VkIGluc3RlYWQgKHZpYSBgaW5qZWN0YCkuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGVuZGluZ1VudGlsRXZlbnQ8VD4oaW5qZWN0b3I/OiBJbmplY3Rvcik6IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbjxUPiB7XG4gIGlmIChpbmplY3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXNzZXJ0SW5JbmplY3Rpb25Db250ZXh0KHBlbmRpbmdVbnRpbEV2ZW50KTtcbiAgICBpbmplY3RvciA9IGluamVjdChJbmplY3Rvcik7XG4gIH1cbiAgY29uc3QgdGFza1NlcnZpY2UgPSBpbmplY3Rvci5nZXQoRXhwZXJpbWVudGFsUGVuZGluZ1Rhc2tzKTtcblxuICByZXR1cm4gKHNvdXJjZU9ic2VydmFibGUpID0+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8VD4oKG9yaWdpbmFsU3Vic2NyaWJlcikgPT4ge1xuICAgICAgLy8gY3JlYXRlIGEgbmV3IHRhc2sgb24gc3Vic2NyaXB0aW9uXG4gICAgICBjb25zdCByZW1vdmVUYXNrID0gdGFza1NlcnZpY2UuYWRkKCk7XG5cbiAgICAgIGxldCBjbGVhbmVkVXAgPSBmYWxzZTtcbiAgICAgIGZ1bmN0aW9uIGNsZWFudXBUYXNrKCkge1xuICAgICAgICBpZiAoY2xlYW5lZFVwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlVGFzaygpO1xuICAgICAgICBjbGVhbmVkVXAgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbm5lclN1YnNjcmlwdGlvbiA9IHNvdXJjZU9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogKHYpID0+IHtcbiAgICAgICAgICBvcmlnaW5hbFN1YnNjcmliZXIubmV4dCh2KTtcbiAgICAgICAgICBjbGVhbnVwVGFzaygpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIG9yaWdpbmFsU3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIGNsZWFudXBUYXNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoZSkgPT4ge1xuICAgICAgICAgIG9yaWdpbmFsU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICAgICAgICBjbGVhbnVwVGFzaygpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBpbm5lclN1YnNjcmlwdGlvbi5hZGQoKCkgPT4ge1xuICAgICAgICBvcmlnaW5hbFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY2xlYW51cFRhc2soKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGlubmVyU3Vic2NyaXB0aW9uO1xuICAgIH0pO1xuICB9O1xufVxuIl19