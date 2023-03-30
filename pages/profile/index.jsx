import ProfileDetails from '@/components/profile/ProfileDetails'
import MainHeader from '@/components/shared/headers/MainHeader'
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed'
import React, { Fragment } from 'react'

function Profile() {
  return (
    <Fragment>
        <MainHeader />
        <MainSidebarFixed />
        <ProfileDetails />
    </Fragment>
  )
}

export default Profile