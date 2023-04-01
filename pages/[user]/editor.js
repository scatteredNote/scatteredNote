import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  commands
} from "@uiw/react-md-editor";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);



const t2 = (() => {
  const languages = ["js", "rust", "ts", "php", "bash"];
  const output = [];
  const shortcuts = {
    js: "cmd+j",
    rust: "cmd+r",
    ts: "cmd+shift+t",
    php: "cmd+shift+p",
    bash: "cmd+sh"
  };

  for (const l of languages) {
    output.push({
      name: `${l}`,
      keyCommand: `${l}`,
      buttonProps: { "aria-label": `${l}` },
      shortcuts: `${shortcuts[l]}`,
      icon: <span>{l}</span>,
      execute: (state, api) => {
        let modifyText = `\`\`\`${l}\n ${state.selectedText} \n\`\`\`\n `;
        if (!state.selectedText) {
          modifyText = `\`\`\`${l}\n\n \`\`\` `;
        }
        api.replaceSelection(modifyText);
      }
    });
  }
  return output;
})();



export default function Editor() {
  const [value, setValue] = useState("**Hello world!!!**");
  return (  
    <>
      <div className=" mx-auto w-11/12 mt-10 grid grid-cols-12 border-2">
        <div className="col-span-9 ">
          <section className="flex flex-col">
            <h1>Grab Editor</h1>
            <MDEditor 
              value={value} 
              onChange={setValue}
              height={400}
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.hr,
                commands.title,
                commands.divider,
                commands.link,
                commands.quote,
                commands.code,
                commands.codeBlock,
                commands.image,
                commands.group([...t2], {
                  name: "language",
                  groupName: "language",
                  buttonProps: { "aria-label": "Insert a language" },
                  icon: <span>language</span>
                }),
                commands.divider,
                commands.orderedListCommand,
                commands.unorderedListCommand,
                commands.checkedListCommand
              ]}
              extraCommands={[
                commands.codeEdit,
                commands.codePreview,
                commands.codeLive
              ]}
            />
          </section>
          
        </div>
      </div>
    </>
  )
}