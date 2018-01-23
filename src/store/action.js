export const TOGGLE_LOADING = 'TOGGLE_LOADING';

export function toggleLoading(status = true) {
    return { type: TOGGLE_LOADING, status };
}