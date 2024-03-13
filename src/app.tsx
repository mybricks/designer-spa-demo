import React, { useRef } from "react";

import css from "./app.less";

const SPADesigner = (window as any).mybricks.SPADesigner;

export default function App() {
  const designerRef = useRef<{ dump: () => any }>(null);

  const save = () => {
    const dumpJSON = designerRef.current?.dump();
    if (dumpJSON) {
      localStorage.setItem("--mybricks-dumpJSON--", JSON.stringify(dumpJSON));
      alert("保存成功");
    }
  };

  return (
    <div className={css.main}>
      <div className={css.toolbar}>
        <div className={css.title}>&lt;定制您自己的无代码设计解决方案&gt;</div>
        <button className={css.save} onClick={save}>
          保存
        </button>
      </div>
      <SPADesigner
        ref={designerRef}
        config={{
          comLibLoader: () => {
            return new Promise((resolve) => {
              resolve((window as any)["__comlibs_edit_"]);
            });
          },
          pageContentLoader: () => {
            return new Promise((resolve) => {
              const dumpJSON = localStorage.getItem("--mybricks-dumpJSON--");
              resolve(dumpJSON ? JSON.parse(dumpJSON) : null);
            });
          },
          geoView: {
            scenes: {
              adder: [
                {
                  type: "normal",
                  title: "页面",
                },
                {
                  type: "popup",
                  title: "对话框",
                  template: {
                    namespace: "mybricks.basic-comlib.popup",
                    deletable: false,
                    asRoot: true,
                  },
                },
                {
                  type: "popup",
                  title: "抽屉",
                  template: {
                    namespace: "mybricks.basic-comlib.drawer",
                    deletable: false,
                    asRoot: true,
                  },
                },
              ],
            },
          },
          toplView: {
            title: "交互",
            cards: {
              main: {},
            },
          },
          com: {
            env: {
              i18n: (value: string) => value,
            },
          },
        }}
      />
    </div>
  );
}
