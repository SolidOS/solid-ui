/* Move up or down, skip disabled options */
export function getNextEnabledIndex(currentIndex, options, direction) {
    if (!options.length) {
        return -1;
    }
    if (options.every(option => option.disabled)) {
        return -1;
    }
    const optionsCount = options.length;
    let nextIndex = currentIndex;
    do {
        nextIndex = (nextIndex + direction + optionsCount) % optionsCount;
    } while (options[nextIndex].disabled);
    return nextIndex;
}
/* Handle 'Home' and 'End' keys and initial highlight */
export function getFirstEnabledIndex(options) {
    if (!options.length) {
        return -1;
    }
    return getNextEnabledIndex(-1, options, 1);
}
export function getLastEnabledIndex(options) {
    if (!options.length) {
        return -1;
    }
    return getNextEnabledIndex(options.length, options, -1);
}
/* Sync current value to active index */
export function findOptionIndexByValue(options, value) {
    if (value === undefined) {
        return -1;
    }
    return options.findIndex(option => option.value === value);
}
/* Map keyboard events to actions */
export function getListboxActionFromKey(key) {
    switch (key) {
        case 'ArrowDown':
            return 'next';
        case 'ArrowUp':
            return 'previous';
        case 'Home':
            return 'first';
        case 'End':
            return 'last';
        case 'Enter':
        case ' ':
            return 'select';
        case 'Escape':
            return 'close';
        default:
            return 'none';
    }
}
//# sourceMappingURL=keyboard.js.map