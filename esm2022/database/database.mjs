import { ɵgetAllInstancesOf } from '@angular/fire';
import { from, timer } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
export class Database {
    constructor(database) {
        return database;
    }
}
export const DATABASE_PROVIDER_NAME = 'database';
export class DatabaseInstances {
    constructor() {
        return ɵgetAllInstancesOf(DATABASE_PROVIDER_NAME);
    }
}
export const databaseInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(DATABASE_PROVIDER_NAME))), distinct());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0YWJhc2UvZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNckQsTUFBTSxPQUFPLFFBQVE7SUFDbkIsWUFBWSxRQUEwQjtRQUNwQyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxVQUFVLENBQUM7QUFLakQsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QjtRQUNFLE9BQU8sa0JBQWtCLENBQW1CLHNCQUFzQixDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ2pELFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQW1CLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxFQUNuRixRQUFRLEVBQUUsQ0FDWCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgybVnZXRBbGxJbnN0YW5jZXNPZiB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgRGF0YWJhc2UgYXMgRmlyZWJhc2VEYXRhYmFzZSB9IGZyb20gJ2ZpcmViYXNlL2RhdGFiYXNlJztcbmltcG9ydCB7IGZyb20sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGRpc3RpbmN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyBzZWUgbm90ZXMgaW4gY29yZS9maXJlYmFzZS5hcHAubW9kdWxlLnRzIGZvciB3aHkgd2UncmUgYnVpbGRpbmcgdGhlIGNsYXNzIGxpa2UgdGhpc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YWJhc2UgZXh0ZW5kcyBGaXJlYmFzZURhdGFiYXNlIHt9XG5cbmV4cG9ydCBjbGFzcyBEYXRhYmFzZSB7XG4gIGNvbnN0cnVjdG9yKGRhdGFiYXNlOiBGaXJlYmFzZURhdGFiYXNlKSB7XG4gICAgcmV0dXJuIGRhdGFiYXNlO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBEQVRBQkFTRV9QUk9WSURFUl9OQU1FID0gJ2RhdGFiYXNlJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YWJhc2VJbnN0YW5jZXMgZXh0ZW5kcyBBcnJheTxGaXJlYmFzZURhdGFiYXNlPiB7fVxuXG5leHBvcnQgY2xhc3MgRGF0YWJhc2VJbnN0YW5jZXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICByZXR1cm4gybVnZXRBbGxJbnN0YW5jZXNPZjxGaXJlYmFzZURhdGFiYXNlPihEQVRBQkFTRV9QUk9WSURFUl9OQU1FKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZGF0YWJhc2VJbnN0YW5jZSQgPSB0aW1lcigwLCAzMDApLnBpcGUoXG4gIGNvbmNhdE1hcCgoKSA9PiBmcm9tKMm1Z2V0QWxsSW5zdGFuY2VzT2Y8RmlyZWJhc2VEYXRhYmFzZT4oREFUQUJBU0VfUFJPVklERVJfTkFNRSkpKSxcbiAgZGlzdGluY3QoKSxcbik7XG4iXX0=