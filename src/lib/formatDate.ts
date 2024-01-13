export function formatDate(dateString: string) {
    if (!dateString) {
        return '';
    }

    const dateTime = dateString.includes('T')
        ? dateString
        : `${dateString}T00:00:00Z`;

    return new Date(dateTime).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
}
