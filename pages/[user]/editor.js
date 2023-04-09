import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import * as commands from "@uiw/react-md-editor/lib/commands";
// import 'react-folder-tree/dist/style.css';
// import  { testData } from 'react-folder-tree';


const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);


const FolderTree = dynamic(() => import("@/components/react-folder-tree/FolderTree"), {
  ssr: false,
});


const testData = {
  name: 'All Cryptos',
  children: [
    { name: 'Bitcoin' },
    { name: 'Etherium' },
    { name: 'Polkadot' },
    {
      name: 'POW',
      children: [
        { name: 'Bitcoin' },
        { name: 'Litecoin' },
        { name: 'Bitcoin Cash' },
      ],
    },
    {
      name: 'Public Chains',
      children: [
        { name: 'Ripple' },
        { name: 'Chainlink' },
        {
          name: 'POW',
          children: [
            { name: 'Bitcoin' },
            { name: 'Litecoin' },
            { name: 'Bitcoin Cash' },
          ],
        },
        {
          name: 'POS',
          children: [
            { name: 'Etherium' },
            { name: 'EOS' },
            {
              name: 'Crosschain',
              children: [
                { name: 'Polkadot' },
                { name: 'Cosmos' },
              ],
            },
          ],
        },
      ],
    },
  ],
};


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
  const onTreeStateChange = (state, event) => console.log(state, event);
  return (  
    <>
      <div className=" mx-auto w-11/12 mt-10 grid grid-cols-12 border-2">
        <div className="col-span-7 ">
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
        <div className="col-start-8 col-span-12 border-2 p-4">
            <h1 className="text-center text-[#00000] font-bold">Metadata</h1>

            <div className="mt-4">
              <label htmlFor="title" className="text-sm">Create Main Topic</label>
              <br/>
              <input type="text" name="title" id="title" placeholder="Topic" className="w-full border mt-2 p-2" />
            </div>

            <div className="mt-4">
              <label htmlFor="title" className="text-sm">Create Sub Topic</label>
              <br/>
              <input type="text" name="title" id="title" placeholder="Sub Topic" className="w-full border mt-2 p-2" />
            </div>

            <div className="mt-4 w-full">
              <FolderTree
                data={ testData }
            onChange={onTreeStateChange}
            
              />

            </div>

        </div>
      </div>
    </>
  )
}