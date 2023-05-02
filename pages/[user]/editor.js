import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import * as commands from '@uiw/react-md-editor/lib/commands';
import { generateDirectoryStructure, generateDirectoryFilese } from '@/libs/getUsersDirectory';
import CreatableSelect from 'react-select/creatable';

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  const users = fs.readdirSync(path.join(process.cwd(), 'users'));
  const paths = users.map((user) => ({
    params: { user: user },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const path = require('path');
  const user = params.user;
  const userDir = path.join(process.cwd(), 'users', user);
  const data = generateDirectoryStructure(userDir);
  const directoryStructure = generateDirectoryFilese(userDir);
  
  // const data = { name: user, children: getUsersData(userDir) };
  return {
    props: {
      data,
      directoryStructure,
    },
  };
}

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const FolderTree = dynamic(
  () => import('@/components/react-folder-tree/FolderTree'),
  {
    ssr: false,
  }
);

const t2 = (() => {
  const languages = ['js', 'rust', 'ts', 'php', 'bash'];
  const output = [];
  const shortcuts = {
    js: 'cmd+j',
    rust: 'cmd+r',
    ts: 'cmd+shift+t',
    php: 'cmd+shift+p',
    bash: 'cmd+sh',
  };

  for (const l of languages) {
    output.push({
      name: `${l}`,
      keyCommand: `${l}`,
      buttonProps: { 'aria-label': `${l}` },
      shortcuts: `${shortcuts[l]}`,
      icon: <span>{l}</span>,
      execute: (state, api) => {
        let modifyText = `\`\`\`${l}\n ${state.selectedText} \n\`\`\`\n `;
        if (!state.selectedText) {
          modifyText = `\`\`\`${l}\n\n \`\`\` `;
        }
        api.replaceSelection(modifyText);
      },
    });
  }
  return output;
})();

const options = [
  { label: "economics", value: "Economics" },
  { label: "machine", value: "Machine" },
  { label: "philosophy", value: "Philosophy" }
];

export default function Editor({ data, directoryStructure }) {
  const [value, setValue] = useState('**Hello world!!!**');
  const [isPublic, setIsPublic] = useState(true);
  const handleToggle = () => {
    setIsPublic(!isPublic);
  };
  const [valueOp, setValueOp] = useState([]);
  const [mainTopic, setMainTopic] = useState()
  const [subTopic, setSubTopic] = useState()
  const [note, setNote] = useState()
  console.log("mainTopic", mainTopic);
  return (
    <>
      <div className=" mx-auto w-11/12 mt-10 grid grid-cols-12 border-2">
        <div className="col-span-8 ">
          <section className="flex flex-col">
            <h1 className="text-[#00000] font-bold">Grab Editor</h1>
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
                  name: 'language',
                  groupName: 'language',
                  buttonProps: { 'aria-label': 'Insert a language' },
                  icon: <span>language</span>,
                }),
                commands.divider,
                commands.orderedListCommand,
                commands.unorderedListCommand,
                commands.checkedListCommand,
              ]}
              extraCommands={[
                commands.codeEdit,
                commands.codePreview,
                commands.codeLive,
              ]}
            />
          </section>
          <section className="flex flex-col mt-4">
            <h1 className="text-[#00000] font-bold">Note</h1>
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
                  name: 'language',
                  groupName: 'language',
                  buttonProps: { 'aria-label': 'Insert a language' },
                  icon: <span>language</span>,
                }),
                commands.divider,
                commands.orderedListCommand,
                commands.unorderedListCommand,
                commands.checkedListCommand,
              ]}
              extraCommands={[
                commands.codeEdit,
                commands.codePreview,
                commands.codeLive,
              ]}
            />
          </section>

          <section className="flex flex-col mt-4 mb-4">
            <h1 className="text-[#00000] font-bold">Tags</h1>
            <CreatableSelect
              isMulti options={options}
              value={valueOp}
              onChange={(newValue) => setValueOp(newValue)}
            />
          </section>

        </div>
        <div className="col-start-9 col-span-12 border-2 p-4">
          <h1 className="text-center text-[#00000] font-bold">Metadata</h1>

          <div className="flex items-center ">
            <label
              htmlFor="toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  id="toggle"
                  type="checkbox"
                  className="sr-only"
                  checked={!isPublic}
                  onChange={handleToggle}
                />
                <div
                  className={`block ${
                    isPublic ? 'bg-green-400' : 'bg-gray-600'
                  } w-14 h-8 rounded-full transition duration-300`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300 ${
                    isPublic ? 'transform translate-x-full' : ''
                  }`}
                ></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                {isPublic ? 'Public' : 'Private'}
              </div>
            </label>
          </div>

          <div className="mt-4 w-full">
            <h1 className="text-[#00000] font-bold">Main Topic</h1>
            <CreatableSelect
                options={data}
                value={mainTopic}
                onChange={(newValue) => setMainTopic(newValue)}
              />
          </div>
          <div className="mt-4 w-full">
            <h1 className="text-[#00000] font-bold">Sub Topic</h1>
            <CreatableSelect
              options={mainTopic ? directoryStructure[mainTopic.label].directory: [] }
                value={subTopic}
                onChange={(newValue) => setSubTopic(newValue)}
              />
          </div>
          <div className="mt-4 w-full">
            <h1 className="text-[#00000] font-bold">Notes</h1>
            <CreatableSelect
                options={data}
                value={mainTopic}
                onChange={(newValue) => setMainTopic(newValue)}
              />
          </div>
        </div>
      </div>
    </>
  );
}
