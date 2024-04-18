import "@/resources/styling/components/dashboard/card.scss";
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import DefaultButton from "../interactives/Button";
import { FolderPen, Wrench, Trash2 } from 'lucide-react';
import { deleteProject } from "./deleteProject";

type DashboardCardTypes = "standard" | "withButton";

type dashboardCardProps = {
  type: DashboardCardTypes,
  imgSrc?: string,
  projectName?: string,
  projectDesc?: string,
  children?: React.ReactNode,
  url?: string,
  projectID?: string,
}

const variants = {
  "standard": "standardCard",
  "withButton": "withButtonCard",
}

function DashboardCard({ imgSrc, type, projectDesc, projectName, children, url, projectID }: dashboardCardProps) {
  let cardLayout;

  const handleDeleteProject = () => {
    if (projectID) {
      deleteProject(projectID);
      location.reload();
    }
  };

  switch (type) {
    case "standard":
      cardLayout = (
        <Link className={variants[type ?? "default"]} href={url ?? ''}>
          <Image src={imgSrc || ""} alt="cardImage" width={1000} height={1000} className="d-cardImage" />
          <div className="cardTxt">
            <h2>{projectName}</h2>
            <p>{projectDesc}</p>
            <div className="hoverOptions">
              <DefaultButton type="link"><FolderPen /></DefaultButton>
              <DefaultButton type="link"><Wrench /></DefaultButton>
              <DefaultButton type="link" onClick={handleDeleteProject}><Trash2 /></DefaultButton>
            </div>
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
