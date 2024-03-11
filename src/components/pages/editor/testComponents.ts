import {
  Component,
  UsedComponent,
  EditorHandlerState,
  EditorHandlerProps,
} from "editor";
import { nanoid } from "@/lib/utils";

export const testComponents: Component[] = [
  {
    id: nanoid(10),
    name: "Image",
    type: "image",
    props: {
      src: "",
      alt: "",
    },
    styles: {
      width: "",
      height: "",
    },
    hasChildren: false,
    allowedChildren: [],
  },
  {
    id: nanoid(10),
    name: "Text",
    type: "text",
    props: {
      text: "",
    },
    styles: {
      fontSize: "",
      color: "",
    },
    hasChildren: false,
    allowedChildren: [],
  },
  {
    id: nanoid(10),
    name: "Button",
    type: "button",
    props: {
      text: "",
    },
    styles: {
      type: "",
      color: "",
    },
    hasChildren: false,
    allowedChildren: [],
  },
  {
    id: nanoid(10),
    name: "Container",
    type: "container",
    props: {},
    styles: {},
    hasChildren: true,
    allowedChildren: ["text", "button", "image"],
  },
];

export const testUsedComponents: UsedComponent[] = [
  // {
  //   id: "test-id-container",
  //   index: 0,
  //   component: testComponents[3],
  //   props: {},
  //   styles: {},
  //   children: [
  //     {
  //       id: "test-id-text",
  //       index: 0,
  //       component: testComponents[1],
  //       props: { text: "Hello, World!" },
  //       styles: { fontSize: "24px", color: "black" },
  //       children: [],
  //     },
  //     {
  //       id: "test-id-button",
  //       index: 1,
  //       component: testComponents[2],
  //       props: { text: "Click me!" },
  //       styles: { type: "primary", color: "blue" },
  //       children: [],
  //     },
  //   ],
  // },

  {
    id: "test-id-text",
    index: 0,
    component: testComponents[1],
    props: { text: "Hello, World!" },
    styles: { fontSize: "24px", color: "black" },
    children: [],
  },
  {
    id: "test-id-button",
    index: 1,
    component: testComponents[2],
    props: { text: "Click me!" },
    styles: { type: "primary", color: "blue" },
    children: [],
  },
  {
    id: "test-id-image",
    index: 2,
    component: testComponents[0],
    props: { src: "https://via.placeholder.com/150", alt: "placeholder" },
    styles: { width: "150px", height: "150px" },
    children: [],
  },
  {
    id: "test-id-container",
    index: 3,
    component: testComponents[3],
    props: {},
    styles: {},
    children: [],
  },
];
