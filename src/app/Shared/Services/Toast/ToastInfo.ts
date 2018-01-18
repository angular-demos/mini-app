import * as _ from 'lodash';

/**
 * Describes what a toast message is.
 */
export class ToastInfo {
    /**
     * Bootstrap CSS class
     */
    public static Success: string = 'success';

    /**
     * Bootstrap CSS class
     */
    public static Info: string = 'info';

    /**
     * Bootstrap CSS class
     */
    public static Warning: string = 'warning';

    /**
     * Bootstrap CSS class
     */
    public static Danger: string = 'danger';

    /**
     * An incrementing ID for each toast.
     */
    public static nextId: number = 0;

    /**
     * Allows for track by in templates ngFor
     */
    public readonly id: number;

    /**
     * One of the above static types.
     */
    public readonly type: string;

    /**
     * The title
     */
    public readonly title?: string;

    /**
     * The icon
     */
    public readonly icon?: string;

    /**
     * The message
     */
    public readonly message: string;

    /**
     * A timeout to remove the toast. Set to 0 for forever.
     */
    public readonly timeout: number;

    /**
     * Optional debug data to append to the toast.
     */
    public readonly debug: any;

    /**
     * Constructor
     */
    public constructor(type: string, message: string, params?: any) {
        params = params || {};
        this.id = ToastInfo.nextId++;
        this.type = type;
        this.message = message;
        this.title = params['title'] || null;
        this.icon = params['icon'] || null;
        this.debug = params['debug'] || null;
        this.timeout = type === 'danger' ? 0 : 2;
    }

    /**
     * Verifies that one of the types sent from the server is supported. Defaults to success if not found.
     */
    public static validType(type: string): string {
        if (type === 'error') {
            return ToastInfo.Danger;
        }
        return _.find([
            ToastInfo.Success,
            ToastInfo.Info,
            ToastInfo.Warning,
            ToastInfo.Danger
        ], (value) => value === type.toLowerCase()) || ToastInfo.Success;
    }
}
