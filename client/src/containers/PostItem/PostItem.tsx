import React from 'react'
import { EntityId } from "@reduxjs/toolkit"
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { selectPostById } from '../../redux/features/post/postSlice'
import classes from './PostItem.module.scss'
import { TimeAgo } from '../../components/timeago/TimeAgo'

export default function PostItem ({ postId }: { postId: EntityId}) {
    const post = useSelector((state: RootState) => selectPostById(state, postId))
    if (!post) {
        return null
    }

    return (
        <div className={classes.container}>
            <p>{post.title}</p> 
            <p>{post.content}</p>
            <p>by {post.email}{<TimeAgo timestamp={post.createdAt} />}</p>
        </div>
    )
}

