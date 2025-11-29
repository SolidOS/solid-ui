import { authn, authSession } from 'solid-logic';
import { style } from '../style';
import { getName, getPod, getPodOwner } from '../utils/headerFooterHelpers';
const DEFAULT_SOLID_PROJECT_URL = 'https://solidproject.org';
const DEFAULT_SOLID_PROJECT_NAME = 'solidproject.org';
/**
 * Initialize footer component, the footer object returned depends on whether the user is authenticated.
 * @param store the data store
 * @returns the footer
 */
export async function initFooter(store, options) {
    const footer = document.getElementById('PageFooter');
    if (!footer) {
        return;
    }
    const pod = getPod();
    const podOwner = await getPodOwner(pod, store);
    rebuildFooter(footer, store, pod, podOwner, options)();
    authSession.events.on('login', rebuildFooter(footer, store, pod, podOwner, options));
    authSession.events.on('logout', rebuildFooter(footer, store, pod, podOwner, options));
}
/**
 * @ignore exporting this only for the unit test
 */
export function rebuildFooter(footer, store, pod, podOwner, options) {
    return async () => {
        const user = authn.currentUser();
        footer.innerHTML = '';
        footer.appendChild(await createControllerInfoBlock(store, user, pod, podOwner, options));
    };
}
/**
 * @ignore exporting this only for the unit test
 */
export function createControllerInfoBlock(store, user, pod, podOwner, options) {
    const profileLinkContainer = document.createElement('div');
    if (!pod || !podOwner || (user && user.equals(podOwner))) {
        return profileLinkContainer;
    }
    profileLinkContainer.setAttribute('style', style.footer);
    const podLinkPre = document.createElement('span');
    podLinkPre.innerText = 'You\'re visiting ';
    const podLink = document.createElement('a');
    podLink.href = pod.uri;
    podLink.innerText = 'the Pod';
    const profileLinkPre = document.createElement('span');
    profileLinkPre.innerText = ' controlled by ';
    const profileLink = document.createElement('a');
    profileLink.href = podOwner.uri;
    profileLink.innerText = getName(store, podOwner);
    const solidProjectLinkPre = document.createElement('span');
    solidProjectLinkPre.innerText = '. For more info, check out ';
    const solidProjectLink = document.createElement('a');
    solidProjectLink.href = options && options.solidProjectUrl ? options.solidProjectUrl : DEFAULT_SOLID_PROJECT_URL;
    solidProjectLink.innerText = options && options.solidProjectName ? options.solidProjectName : DEFAULT_SOLID_PROJECT_NAME;
    const solidProjectLinkPost = document.createElement('span');
    solidProjectLinkPost.innerText = '.';
    profileLinkContainer.appendChild(podLinkPre);
    profileLinkContainer.appendChild(podLink);
    profileLinkContainer.appendChild(profileLinkPre);
    profileLinkContainer.appendChild(profileLink);
    profileLinkContainer.appendChild(solidProjectLinkPre);
    profileLinkContainer.appendChild(solidProjectLink);
    profileLinkContainer.appendChild(solidProjectLinkPost);
    return profileLinkContainer;
}
//# sourceMappingURL=index.js.map