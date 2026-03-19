// Test setup
import { beforeEach, afterEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock crypto.subtle for password hashing
window.crypto = {
    subtle: {
        digest: async (algorithm, data) => {
            return new Uint8Array([1, 2, 3, 4, 5]);
        }
    }
};

// Reset localStorage before each test
beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    localStorage.clear();
});
