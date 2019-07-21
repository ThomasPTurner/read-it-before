const timeSince = ( created_at ) => { 
    const timeSince = (new Date(Date.now())- new Date(created_at)) / 1000 / 60
    if (timeSince > 60 * 24) return `posted ${Math.floor(timeSince/60/24)} days ago`
    if (timeSince > 60) return `posted ${Math.floor(timeSince/60)} hours ago`
    if (timeSince < 60) return "posted less than an hour ago" 
}

export default { timeSince }