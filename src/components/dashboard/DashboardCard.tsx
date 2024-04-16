import "@/resources/styling/components/dashboard/card.scss";
import React from 'react'
import Link from "next/link";
import Image from "next/image";

type DashboardCardTypes = "standard" | "withButton";

type dashboardCardProps = {
  type: DashboardCardTypes,
  imgSrc?: string,
  projectName?: string,
  projectDesc?: string,
  children?: React.ReactNode,
  url?: string,
}

const variants = {
  "standard": "standardCard",
  "withButton": "withButtonCard",
}

function DashboardCard({ imgSrc, type, projectDesc, projectName, children, url }: dashboardCardProps) {
  let cardLayout;

  switch (type) {
    case "standard":
      cardLayout = (
        <Link className={variants[type ?? "default"]} href={url ?? ''}>
          <Image src={imgSrc || ""} alt="cardImage" width={1000} height={1000} className="d-cardImage" />
          <div className="cardTxt">
            <h2>{projectName}</h2>
            <p>{projectDesc}</p>

          </div>
        </Link>
      )
      break;

    case "withButton":
      cardLayout = (
        <Link className={variants[type ?? "default"]} href={url ?? ''}>
          <Image src={imgSrc || ""} alt="cardImage" width={1000} height={1000} className="d-cardImage" />
          <div className="cardTxt">
            <h2>{projectName}</h2>
            <p>{projectDesc}</p>
            {children}
          </div>
        </Link>
      )
      break;
  }

  return cardLayout;
}

export default DashboardCard;
