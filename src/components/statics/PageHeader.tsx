import React from 'react'
import "@/resources/styling/components/statics/pageHeader.scss"

type pageHeaderProps = {
    headerName: string;
    children?: string;
}

export default function PageHeader({headerName, children}: pageHeaderProps) {
  return (
    <div className="pageHeader">
        <h1>{headerName}</h1>
        <p>{children}</p>
    </div>
  )
}
