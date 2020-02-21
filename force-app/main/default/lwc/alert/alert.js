import { LightningElement, api } from 'lwc';
import { assert, normalizeString } from 'c/utilsPrivate';

const VALID_VARIANT_VALUES = [
    'standard',
    'info',
    'warning',
    'error',
    'offline'
];

export default class Alert extends LightningElement {
    _variant = 'standard';
    @api iconName = '';
    @api alertText;
    @api allowClose = false;
    @api linkHref;
    @api linkText;

    @api get variant() {
        return this._variant;
    }

    set variant(value) {
        assert(
            VALID_VARIANT_VALUES.indexOf(value) !== -1,
            `Invalid type attribute value of ${value}. Must be one of ${VALID_VARIANT_VALUES}.`
        );

        this._variant = normalizeString(value, {
            fallbackValue: 'standard',
            validValues: VALID_VARIANT_VALUES
        });
    }

    get alertClasses() {
        var variantClass;
        switch (this.variant) {
            case 'info':
            case 'standard':
                variantClass = 'slds-theme_info';
                break;
            case 'warning':
                variantClass = 'slds-theme_warning';
                break;
            case 'error':
                variantClass = 'slds-theme_error';
                break;
            case 'offline':
                variantClass = 'slds-theme_offline';
                break;
            default:
                variantClass = 'slds-theme_info';
        }
        return (
            'slds-notify slds-notify_alert slds-theme_alert-texture ' +
            variantClass
        );
    }

    get alertIcon() {
        return this.iconName;
    }

    get alertIconVariant() {
        if (this.variant === 'warning') {
            return 'standard';
        }
        return 'inverse';
    }
}
