export const formatDescription = (html: string) => {
    // Replace opening and closing <p> tags with new lines, and remove all other tags
    const plainText = html.replace(/<\/p>/gi, '\n').replace(/<p>/gi, '\n').replace(/<[^>]+>/g, '');
    return plainText.trim(); // Trim leading and trailing new lines
};

export const timeAgo = (date: any) => {
    const currentDate: any = new Date();
    const pastDate: any = new Date(date);
    const seconds = Math.floor((currentDate - pastDate) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
}

export const isEmptyObject = (obj: object): boolean => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}