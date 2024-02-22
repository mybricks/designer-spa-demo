import React, { useRef } from "react";

const SPADesigner = (window as any).mybricks.SPADesigner;

export default function App() {
  const designerRef = useRef(null);
  return (
    <SPADesigner
      ref={designerRef}
      config={{
        comLibLoader: () => {
          return new Promise((resolve) => {
            resolve([])
          })
        },
        pageContentLoader: () => {
          return new Promise((resolve) => {
            resolve(null)
          })
        },
        toplView: {
          title: '交互',
          cards: {
            main: {}
          },
        }
      }}
    />
  )
}
