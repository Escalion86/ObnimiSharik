import React, { useState } from 'react'
import Title from '@blocks/admin/Title'

const PageContent = ({ data, page }) => {
  return (
    <div className="h-screen">
      <Title text={page.header} />
      Hi all
    </div>
  )
}

export default PageContent
