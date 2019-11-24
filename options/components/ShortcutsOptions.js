import { L10nComponent } from '../../shared/L10nComponent';
import { Shortcut } from './Shortcut.js';

export class ShortcutsOptions extends L10nComponent {
    // fields with visible buttons and optional shortcuts
    get shortcutFields() {
        return ['editJs', 'editCss', 'proofRead', 'publish', 'export', 'snap', 'theme', 'snippet', 'media', 'run', 'debug', 'openOptions'];
    }

    render() {
        return this.html`
            <fieldset>
                <legend>${this.$t('enableShortcuts')}</legend>
                <table class="shortcutGrid">
                    <thead>
                        <tr>
                            <th>Action name</th>
                            <th>Show button?</th>
                            <th>Shortcut <abbr title="Clear text to disable shortcut">*</abbr></th>
                        </tr>
                    </thead>
    
                    ${this.shortcutFields.map((name) => Shortcut.for({ enabled: this.state[name], name, hotKey: this.state[`${name}Hk`] }))}
                </table>
            </fieldset>
        `;
    }
}