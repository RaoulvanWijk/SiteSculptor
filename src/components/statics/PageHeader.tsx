import React from 'react'
import "@/resources/styling/components/statics/pageHeader.scss"

type pageHeaderProps = {
    headerName: string;
    subHeaderName: string;
}

export default function PageHeader({headerName, subHeaderName}: pageHeaderProps) {
  return (
    <div className="pageHeader">
        <h1>{headerName}</h1>
        <p>{subHeaderName}</p>
    </div>
  )
}
