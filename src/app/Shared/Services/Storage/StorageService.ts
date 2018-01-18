import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, Optional} from '@angular/core';

/**
 * A service that handles storing data in the local storage of a browser.
 */
@Injectable()
export class StorageService {
    /**
     * Prefix used for storing values.
     */
    private static prefix: string = 'app';

    /**
     * The storage reference.
     */
    private store: Storage;

    /**
     * Constructor
     */
    public constructor(@Optional() @Inject(DOCUMENT) document: any) {
        this.store = document ? document.defaultView.localStorage : null;
        if (!this.store) {
            console.error('Warning: No localStorage engine.');
        }
    }

    /**
     * Generates the storage keys.
     */
    private static toKey(key: string): string {
        return StorageService.prefix + ':' + key;
    }

    /**
     * Gets a value from storage.
     */
    public get<TType>(key: string): TType {
        if (!this.store) {
            return void(0);
        }
        let value = this.store.getItem(StorageService.toKey(key));
        try {
            return JSON.parse(value) as TType;
        } catch (error) {
            console.error(error);
        }
        return void(0);
    }

    /**
     * Reads a value as a string.
     */
    public getString(key: string): string {
        let value = this.get(key);
        return typeof value === 'string'
            ? value
            : void(0);
    }

    /**
     * Checks if a key is used in the store.
     */
    public has(key: string): boolean {
        if (!this.store) {
            return false;
        }
        key = StorageService.toKey(key);
        for (let i = 0, c = this.store.length; i < c; i++) {
            if (this.store.key(i) === key) {
                return true;
            }
        }
        return false;
    }

    /**
     * Assigns a value to the store.
     */
    public set(key: string, value: any): boolean {
        if (!this.store) {
            return false;
        }
        try {
            this.store.setItem(StorageService.toKey(key), JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    /**
     * Removes a value from the store.
     */
    public remove(key: string): boolean {
        if (!this.store) {
            return false;
        }
        try {
            if (this.has(key)) {
                this.store.removeItem(StorageService.toKey(key));
                return true;
            } else {
                console.debug('Key not found', key);
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    /**
     * Erases everything in the store.
     */
    public clear(): this {
        if (this.store) {
            this.store.clear();
        }
        return this;
    }
}
