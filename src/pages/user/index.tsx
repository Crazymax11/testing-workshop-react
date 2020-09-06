import React from 'react'
import Skeleton from 'react-loading-skeleton';
import { User as UserI } from '../../clients/usersClient'

interface Props {
    user: UserI | undefined,
    isLoading: boolean,
    error: true
    getUser(): {}
}

export const User = (props: Props) => {
    if (!props.user) {
        props.getUser();
        return <UserSkeleton/>
    }

    if (props.isLoading) {
        return <UserSkeleton/>
    }

    if (props.error) {
        return <div>
            errror
        </div>
    }

    return <div>
        <Field body={props.user?.name} title='name'/>
        <Field body={props.user?.username} title='name'/>
        <Field body={props.user?.email} title='email'/>
        <Field body={props.user?.website} title='website'/>
    </div>
}

export const UserSkeleton = () => {
  return <Skeleton />;
}


function Field(props: {
    title: string,
    body: string;
}) {
    return <div>
        <div>{props.title}</div>
        <div>{props.body}</div>
    </div>
}