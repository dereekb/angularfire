import { ɵisSupportedError } from '@angular/fire';
import { isSupported } from 'firebase/messaging';
const isMessagingSupportedPromiseSymbol = '__angularfire_symbol__messagingIsSupported';
const isMessagingSupportedValueSymbol = '__angularfire_symbol__messagingIsSupportedValue';
globalThis[isMessagingSupportedPromiseSymbol] ||= isSupported().then(it => globalThis[isMessagingSupportedValueSymbol] = it).catch(() => globalThis[isMessagingSupportedValueSymbol] = false);
export const isMessagingSupportedFactory = {
    async: () => globalThis[isMessagingSupportedPromiseSymbol],
    sync: () => {
        const ret = globalThis[isMessagingSupportedValueSymbol];
        if (ret === undefined) {
            throw new Error(ɵisSupportedError('Messaging'));
        }
        return ret;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtbWVzc2FnaW5nLXN1cHBvcnRlZC1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21lc3NhZ2luZy9pcy1tZXNzYWdpbmctc3VwcG9ydGVkLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVqRCxNQUFNLGlDQUFpQyxHQUFHLDRDQUE0QyxDQUFDO0FBQ3ZGLE1BQU0sK0JBQStCLEdBQUcsaURBQWlELENBQUM7QUFFMUYsVUFBVSxDQUFDLGlDQUFpQyxDQUFDLEtBQUssV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ3hFLFVBQVUsQ0FBQywrQkFBK0IsQ0FBQyxHQUFHLEVBQUUsQ0FDakQsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQ1gsVUFBVSxDQUFDLCtCQUErQixDQUFDLEdBQUcsS0FBSyxDQUNwRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUc7SUFDekMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQztJQUMxRCxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ1QsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDeEQsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFDM0UsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IMm1aXNTdXBwb3J0ZWRFcnJvciB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgaXNTdXBwb3J0ZWQgfSBmcm9tICdmaXJlYmFzZS9tZXNzYWdpbmcnO1xuXG5jb25zdCBpc01lc3NhZ2luZ1N1cHBvcnRlZFByb21pc2VTeW1ib2wgPSAnX19hbmd1bGFyZmlyZV9zeW1ib2xfX21lc3NhZ2luZ0lzU3VwcG9ydGVkJztcbmNvbnN0IGlzTWVzc2FnaW5nU3VwcG9ydGVkVmFsdWVTeW1ib2wgPSAnX19hbmd1bGFyZmlyZV9zeW1ib2xfX21lc3NhZ2luZ0lzU3VwcG9ydGVkVmFsdWUnO1xuXG5nbG9iYWxUaGlzW2lzTWVzc2FnaW5nU3VwcG9ydGVkUHJvbWlzZVN5bWJvbF0gfHw9IGlzU3VwcG9ydGVkKCkudGhlbihpdCA9PlxuICBnbG9iYWxUaGlzW2lzTWVzc2FnaW5nU3VwcG9ydGVkVmFsdWVTeW1ib2xdID0gaXRcbikuY2F0Y2goKCkgPT5cbiAgZ2xvYmFsVGhpc1tpc01lc3NhZ2luZ1N1cHBvcnRlZFZhbHVlU3ltYm9sXSA9IGZhbHNlXG4pO1xuXG5leHBvcnQgY29uc3QgaXNNZXNzYWdpbmdTdXBwb3J0ZWRGYWN0b3J5ID0ge1xuICBhc3luYzogKCkgPT4gZ2xvYmFsVGhpc1tpc01lc3NhZ2luZ1N1cHBvcnRlZFByb21pc2VTeW1ib2xdLFxuICBzeW5jOiAoKSA9PiB7XG4gICAgY29uc3QgcmV0ID0gZ2xvYmFsVGhpc1tpc01lc3NhZ2luZ1N1cHBvcnRlZFZhbHVlU3ltYm9sXTtcbiAgICBpZiAocmV0ID09PSB1bmRlZmluZWQpIHsgdGhyb3cgbmV3IEVycm9yKMm1aXNTdXBwb3J0ZWRFcnJvcignTWVzc2FnaW5nJykpOyB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufTtcbiJdfQ==