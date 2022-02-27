import { formatDistanceToNow, parseISO } from 'date-fns'
import { FC } from 'react'
import { TimeAgoProps } from '../../types'

export const TimeAgo:FC<TimeAgoProps> = ({ timestamp }) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
