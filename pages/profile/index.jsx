import ProfileDetails from '@/components/profile/ProfileDetails'
import MainHeader from '@/components/shared/headers/MainHeader'
import MainSidebarFixed from '@/components/shared/sidebar/MainSidebarFixed'
import React, { Fragment } from 'react'
import MobileHeader from '@/components/MobileHeader'
import MobileFooter from '@/components/shared/MobileFooter'
function Profile() {
  return (
    <Fragment>
      <MainHeader title='Doob'/>
      <MobileHeader/>
      <MainSidebarFixed />
      <ProfileDetails />
      <MobileFooter />
    </Fragment>
  )
}

export default Profile