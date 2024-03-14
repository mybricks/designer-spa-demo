import React, { useRef } from "react";

import css from "./app.less";

const SPADesigner = (window as any).mybricks.SPADesigner;

export default function App() {
  const designerRef = useRef<{
    /** 导出当前页面搭建数据 */
    dump: () => any;
  }>(null);

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
          /** 加载组件库 */
          comLibLoader: () => {
            return new Promise((resolve) => {
              resolve([
                "https://assets.mybricks.world/comlibs/mybricks.normal-pc/1.5.26/2024-03-05_11-25-10/edit.js",
                "https://assets.mybricks.world/comlibs/mybricks.basic-comlib/1.1.17/2024-03-04_14-46-39/edit.js",
              ]);
            });
          },
          /** 加载页面搭建数据 */
          pageContentLoader: () => {
            return new Promise((resolve) => {
              const dumpJSON = localStorage.getItem("--mybricks-dumpJSON--");
              resolve(dumpJSON ? JSON.parse(dumpJSON) : null);
            });
          },
          geoView: {
            /** 开启多场景 */
            scenes: {
              /** 可添加的多场景 */
              adder: [
                /** 默认页面（普通画布） */
                {
                  type: "normal",
                  title: "页面",
                },
                /** 来自组件库 */
                {
                  /** 定义为弹出层 */
                  type: "popup",
                  title: "对话框",
                  template: {
                    /** 对应组件的唯一namespace */
                    namespace: "mybricks.basic-comlib.popup",
                    /** 不允许删除 */
                    deletable: false,
                    /** 作为根组件 */
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
