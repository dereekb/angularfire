import { ɵgetAllInstancesOf } from '@angular/fire';
import { from, timer } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
export class Storage {
    constructor(auth) {
        return auth;
    }
}
export const STORAGE_PROVIDER_NAME = 'storage';
export class StorageInstances {
    constructor() {
        return ɵgetAllInstancesOf(STORAGE_PROVIDER_NAME);
    }
}
export const storageInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(STORAGE_PROVIDER_NAME))), distinct());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdG9yYWdlL3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNckQsTUFBTSxPQUFPLE9BQU87SUFDbEIsWUFBWSxJQUFxQjtRQUMvQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLFNBQVMsQ0FBQztBQUsvQyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCO1FBQ0UsT0FBTyxrQkFBa0IsQ0FBa0IscUJBQXFCLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDaEQsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBa0IscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQ2pGLFFBQVEsRUFBRSxDQUNYLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyDJtWdldEFsbEluc3RhbmNlc09mIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBGaXJlYmFzZVN0b3JhZ2UgfSBmcm9tICdmaXJlYmFzZS9zdG9yYWdlJztcbmltcG9ydCB7IGZyb20sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGRpc3RpbmN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyBzZWUgbm90ZXMgaW4gY29yZS9maXJlYmFzZS5hcHAubW9kdWxlLnRzIGZvciB3aHkgd2UncmUgYnVpbGRpbmcgdGhlIGNsYXNzIGxpa2UgdGhpc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmFnZSBleHRlbmRzIEZpcmViYXNlU3RvcmFnZSB7fVxuXG5leHBvcnQgY2xhc3MgU3RvcmFnZSB7XG4gIGNvbnN0cnVjdG9yKGF1dGg6IEZpcmViYXNlU3RvcmFnZSkge1xuICAgIHJldHVybiBhdXRoO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBTVE9SQUdFX1BST1ZJREVSX05BTUUgPSAnc3RvcmFnZSc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JhZ2VJbnN0YW5jZXMgZXh0ZW5kcyBBcnJheTxGaXJlYmFzZVN0b3JhZ2U+IHt9XG5cbmV4cG9ydCBjbGFzcyBTdG9yYWdlSW5zdGFuY2VzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgcmV0dXJuIMm1Z2V0QWxsSW5zdGFuY2VzT2Y8RmlyZWJhc2VTdG9yYWdlPihTVE9SQUdFX1BST1ZJREVSX05BTUUpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzdG9yYWdlSW5zdGFuY2UkID0gdGltZXIoMCwgMzAwKS5waXBlKFxuICBjb25jYXRNYXAoKCkgPT4gZnJvbSjJtWdldEFsbEluc3RhbmNlc09mPEZpcmViYXNlU3RvcmFnZT4oU1RPUkFHRV9QUk9WSURFUl9OQU1FKSkpLFxuICBkaXN0aW5jdCgpLFxuKTtcbiJdfQ==