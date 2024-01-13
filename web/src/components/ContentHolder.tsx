import { Terminal, X } from "@phosphor-icons/react";
import React from "react";
import { ViewerRef } from "react-epub-viewer";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../@/components/ui/alert";

export interface Toc {
  label: string;
  href: string;
}

interface Props {
  toc: Toc[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  viewerRef: React.RefObject<ViewerRef>;
}

const ContentHolder: React.FC<Props> = ({ toc, setShow, show, viewerRef }) => {
  return (
    <div
      className={`content-menu ${
        show ? "content-menu-active" : ""
      } fixed right-0 h-[100vh] w-[300px]
       dark:bg-[rgba(11,14,32,0.46)] bg-[rgba(255,222,203,0.45)] z-[15]
       p-10 overflow-y-auto 
       `}
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div
        className="flex justify-end cursor-pointer "
        onClick={() => setShow(false)}
      >
        <X className="text-2xl" />
      </div>

      <div className="flex flex-col gap-2 py-5 overflow-x-hidden">
        {toc &&
          toc.map((toc, i) => (
            <h1
              className="p-1 cursor-pointer transition-all duration-500 hover:translate-x-3 relative z-[20]"
              key={i}
              onClick={() => {
                viewerRef.current?.setLocation(toc.href);
                // setShow(false);
              }}
            >
              {toc.label}
            </h1>
          ))}
      </div>
    </div>
  );
};

export default ContentHolder;
