import "@/resources/styling/components/dashboard/card.scss";
import React, { useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import DefaultButton from "../interactives/Button";
import { FolderPen, Wrench, Trash2 } from 'lucide-react';
import { deleteProject } from "./deleteProject";
import { updateProjectName } from "./updateProject";
import CustomModal from "../interactives/CustomModal";
import { SiteCreateClient } from "@/lib/db/schema/sites";

type DashboardCardTypes = "standard" | "withButton";

type dashboardCardProps = {
  type: DashboardCardTypes,
  imgSrc?: string,
  projectName?: string,
  projectDesc?: string,
  children?: React.ReactNode,
  url?: string,
  projectID?: string,
  onDelete?: (projectId: string) => void;
  onRename?: (projectId: string, newName: string) => void;
}

const variants = {
  "standard": "standardCard",
  "withButton": "withButtonCard",
}

function DashboardCard({ imgSrc, type, projectDesc, projectName, children, url, projectID, onDelete, onRename }: dashboardCardProps) {
  let cardLayout;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'confirm' | 'input'>('confirm');

  const handleOpenModal = (modalType: 'confirm' | 'input') => {
    console.log("Opening modal with type:", modalType);
    setModalType(modalType);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteProject = async () => {
    if (projectID) {
      try {
        await deleteProject(projectID);
        onDelete?.(projectID);
      } catch (error) {
        console.error("Failed to delete the project:", error);
      }
    }
  };

  const handleConfirmRename = async (newName: string) => {
    if (projectID && newName) {
      try {
        await updateProjectName(projectID, newName);
        onRename?.(projectID, newName);
        handleCloseModal(); // Close modal after successful operation
      } catch (error) {
        console.error("Failed to update the project name:", error);
      }
    }
  };

  switch (type) {
    case "standard":
      cardLayout = (
        <div className={variants[type ?? "default"]}>
          <Link href={url ?? ''}>
            <Image src={imgSrc || ""} alt="cardImage" width={1000} height={1000} className="d-cardImage" priority />
            <div className="cardTxt">
              <h2>{projectName}</h2>
              <p>{projectDesc}</p>
            </div>
          </Link>
          <div className="hoverOptions">
            <DefaultButton type="toggleLink" onClick={() => handleOpenModal('input')}><FolderPen /></DefaultButton>
            <DefaultButton type="toggleLink"><Wrench /></DefaultButton>
            <DefaultButton type="toggleLink" onClick={() => handleOpenModal('confirm')}><Trash2 /></DefaultButton>
          </div>
        </div>
      )
      break;

    case "withButton":
      cardLayout = (
        <div className={variants[type ?? "default"]}>
          <Image src={imgSrc || ""} alt="cardImage" width={1000} height={1000} className="d-cardImage" priority />
          <div className="cardTxt">
            <h2>{projectName}</h2>
            <p>{projectDesc}</p>
            {children}
          </div>
        </div>
      )
      break;
  }

  return (
    <>
      {cardLayout}
      <CustomModal
        type={modalType}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={modalType === 'confirm' ? handleDeleteProject : handleConfirmRename}
        message={modalType === 'confirm' ? "Are you sure you want to delete this project? (This can't be undone!)" : "Enter the new project name:"}
        inputButtonName="Rename"
      />
    </>
  );
}

export default DashboardCard;
