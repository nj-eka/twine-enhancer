import { ModalWrapper } from '../shared/ModalWrapper';
import {TagsModal} from './components/TagsModal';
import { collectTags } from './story/collectTags';

function createTagsModal(onSubmit, tags) {
    return new ModalWrapper({
        slotted: TagsModal,
        title: chrome.i18n.getMessage('tagsDlgTitle'),
        onSubmit,
        tags,
    });
}

let modal;

function onSubmit() {
    window.location.reload();
}

export function manageTags() {
    if (!modal) {
        modal = createTagsModal(onSubmit, collectTags());
    }

    ModalWrapper.attach(modal);

    modal.show();
}