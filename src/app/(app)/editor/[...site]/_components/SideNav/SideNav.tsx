import React, { useEffect, useState } from "react";
import Button from "./buttons/Button";
import BreadCrumbs from "./BreadCrumbs";
import "@/resources/styling/components/SideNav/sidenav.scss";
import useSideNav from "@/components/hooks/useSideNav";
import TestDragComponent from "@/components/editor-drag-components/TestDragComponent";
import useEditor from "@/components/hooks/useEditor";
import LoadingButton from "./buttons/LoadingButton";
import {
  CaseSensitive,
  Home,
  Image as ImageIcon,
  MousePointerClick,
  PanelBottom,
  PanelTop,
  Plus,
  LayoutDashboard,
  StickyNote,
} from "lucide-react";
import AddPage from "./modal/AddPage";
// import { testComponents } from "@/components/pages/editor/testComponents";

import NavBarSelectButton from "./buttons/NavBarSelectButton";
import FooterSelectedButton from "./buttons/FooterSelectedButton";

export default function SideNav() {
  // get the nav type from the useSideNav hook
  const {
    setCurrentNavName,
    setNavType,
    navType,
    currentNavName,
    pages,
    loading,
    page_id,
    navbars,
    footer,
    typesWithComponents,
  } = useSideNav();

  //#region Navs
  let navs = [
    {
      type: "main",
      content: [
        {
          text: "",
          type: "break",
          key: "break1",
        },
        {
          text: "Add new page",
          type: "new-page",
          icon: <Plus />,
          key: "new-page",
        },
        {
          text: "page settings",
          type: "break",
          key: "break2",
        },
        { text: "Navbar", type: "nav", icon: <PanelTop />, key: "nav" },
        {
          text: "Footer",
          type: "footer",
          icon: <PanelBottom />,
          key: "footer",
        },
      ],
    },
    {
      type: "page-select",
      content: [
        {
          text: "Select your component type",
          type: "break-top",
          key: "break1",
        },
        {
          text: "Text",
          type: "page-component",
          icon: <CaseSensitive />,
          key: "text-category",
        },
        {
          text: "Image",
          type: "page-component",
          icon: <ImageIcon />,
          key: "image-category",
        },
        {
          text: "Button",
          type: "page-component",
          icon: <MousePointerClick />,
          key: "button-category",
        },
        {
          text: "Container",
          type: "page-component",
          icon: <MousePointerClick />,
          key: "container-category",
        },
        {
          text: "Form",
          type: "page-component",
          icon: <Home />,
          key: "form-category",
        },
        {
          text: "List",
          type: "page-component",
          icon: <Home />,
          key: "list-category",
        },
        {
          text: "Table",
          type: "page-component",
          icon: <Home />,
          key: "table-category",
        },
        // {
        //     text: "Container",
        //     type: "page-component",
        //     icon: <Home />,
        //     key: "container",
        // },
      ],
    },
    {
      type: "page-component",
      content: [],
    },
    {
      type: "navbar",
      content: [],
    },
    {
      type: "footer",
      content: [],
    },
  ];
  //#endregion

  // find the current nav
  const currentNav = navs.find((nav) => nav.type === navType);
  const currentPage = pages.find((page) => page.id === page_id);

  useEffect(() => {
    if (page_id) {
      setNavType("page-select");
      if (currentPage) {
        setCurrentNavName([currentPage.title]);
      }
    } else {
      setNavType("main");
    }
    // check if a matching page exists
  }, [page_id, currentPage, setCurrentNavName, setNavType]);

  pages.forEach((page) => {
    navs[0].content.unshift({
      text: page.title,
      type: "page-select",
      icon: <StickyNote />,
      key: page.id,
    });
  });

  navbars.forEach((navbar) => {
    navs[3].content.push({
      text: navbar.name,
      type: "navbar",
      icon: <PanelTop />,
      key: navbar.id,
    });
  });

  footer.forEach((footer) => {
    navs[4].content.push({
      text: footer.name,
      type: "footer",
      icon: <PanelBottom />,
      key: footer.id,
    });
  });

  function content() {
    if (currentNav && currentNav.type === "page-component") {
      const currentNavText = currentNavName[currentNavName.length - 1];
      // const components = testComponents.find(
      //     (component) => component.name === currentNavText
      // );
      const components = typesWithComponents.find(
        (component) => component.name === currentNavText.toLocaleLowerCase()
      );
      return components?.components?.map((component) => (
        <TestDragComponent
          id={component.id}
          data={component}
          key={component.id}
        >
          {component.name}
        </TestDragComponent>
      ));
    } else if (currentNav && currentNav.type === "navbar") {
      return navbars.map((navbar) => (
        <NavBarSelectButton
          name={navbar.name}
          id={navbar.id}
          styles={navbar.styles}
          key={navbar.id}
        />
      ));
    } else if (currentNav && currentNav.type === "footer") {
      return footer.map((footer) => (
        <FooterSelectedButton
          name={footer.name}
          id={footer.id}
          styles={footer.styles}
          key={footer.id}
        />
      ));
    } else {
      if (loading) {
        return <LoadingButton />;
      } else {
        return currentNav?.content.map((button) => (
          <Button
            text={button.text}
            type={button.type}
            Icon={button.icon}
            id={button.key ?? button.text}
            key={button.key}
          />
        ));
      }
    }
  }

  return (
    <div className="sidenav">
      <div className="sidenav-content">
        <h1 className="sidenav-title">Navigator</h1>
        <BreadCrumbs />
        <div className="buttons">{content()}</div>
      </div>
      <Button
        text="Dashboard"
        type="dashboard"
        Icon={<LayoutDashboard />}
        id="dashboard"
      />
      <AddPage />
    </div>
  );
}
