//pl-PL
export function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('pl-PL', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
}