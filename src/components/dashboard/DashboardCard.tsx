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
  clickEvent?: React.MouseEventHandler<HTMLDivElement>,
}

const variants = {
  "standard": "standardCard",
  "withButton": "withButtonCard",
}

function DashboardCard({ imgSrc, type, projectDesc, projectName, children, clickEvent }: dashboardCardProps) {
  let cardLayout;

  switch (type) {
    case "standard":
      cardLayout = (
        <div className={variants[type ?? "default"]} onClick={clickEvent || undefined}>
          <Image src={imgSrc || ""} alt="cardImage" width={1000} height={1000} className="d-cardImage" />
          <div className="cardTxt">
            <h2>{projectName}</h2>
            <p>{projectDesc}</p>
            
          </div>
        </div>
      )
      break;

    case "withButton":
      cardLayout = (
        <div className={variants[type ?? "default"]} onClick={clickEvent || undefined}>
          <Image src={imgSrc || ""} alt="cardImage" width={1000} height={1000} className="d-cardImage" />
          <div className="cardTxt">
            <h2>{projectName}</h2>
            <p>{projectDesc}</p>
            {children}
          </div>
        </div>
      )
      break;
    }

    return cardLayout;
}

export default DashboardCard;
