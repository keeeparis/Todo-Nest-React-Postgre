import { formatDistanceToNow, parseISO } from 'date-fns'
import ru from 'date-fns/esm/locale/ru/index.js'
import { FC } from 'react'
import { TimeAgoProps } from '../../types'

export const TimeAgo:FC<TimeAgoProps> = ({ timestamp }) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date, { locale: ru })
        timeAgo = `${timePeriod} назад`
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
