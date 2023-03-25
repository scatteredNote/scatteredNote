import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);





export default function Editor() {
  const [value, setValue] = useState("**Hello world!!!**");
  return (  
    <>
      <div className=" mx-auto w-11/12 mt-10 grid grid-cols-12 border-2">
        <div className="col-span-9 border-2">
          <section className="flex flex-col">
            <h1>Grab Editor</h1>
            <MDEditor value={value} onChange={setValue} />
          </section>
          
        </div>
      </div>
    </>
  )
}