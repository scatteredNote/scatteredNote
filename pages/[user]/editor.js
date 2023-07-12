import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import * as commands from '@uiw/react-md-editor/lib/commands';
import { generateDirectoryStructure, generateDirectoryFilese } from '@/libs/githubops';
import CreatableSelect from 'react-select/creatable';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { Octokit } from "@octokit/rest";
import Nav from '@/components/NavBar'

export async function getStaticPaths() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const usersDir = 'users'; // Assuming 'users' is a directory in your GitHub repository

  const users = await octokit.repos.getContent({
    owner: "scatteredNote",
    repo: "data",
    path: usersDir,
  });

  const paths = users.data
    .filter((file) => file.type === 'dir')
    .map((dir) => ({
      params: { user: dir.name },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const user = params.user;
  const userDir = `/users/${user}`
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    await octokit.repos.getContent({
      owner: 'scatteredNote',
      repo: 'data',
      path: userDir,
    });
  } catch (error) {
    if (error.status === 404) {
      return { notFound: true };
    }
    // Handle other errors if needed
  }

  const data = await generateDirectoryStructure(userDir);
  const directoryStructure = await generateDirectoryFilese(userDir);

  // const data = { name: user, children: getUsersData(userDir) };
  return {
    props: {
      data,
      directoryStructure,
      user
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

export default function Editor({ data, directoryStructure, user }) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const router = useRouter();
  const [value, setValue] = useState('**Hello world!!!**');
  const [views, setViews] = useState('**Store Views!!!**');
  const [isPublic, setIsPublic] = useState(true);
  const [valueOp, setValueOp] = useState([]);
  const [mainTopic, setMainTopic] = useState()
  const [subTopic, setSubTopic] = useState()
  const [note, setNote] = useState()

  if (loading) return <h1>Loading...</h1>

  // if not session redirect to home page
  if (!session) {
    router.push('/'); // Redirect to home page if not authenticated
    return null; // Render nothing whi
  }

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const notes = () => {
    if (subTopic && directoryStructure[subTopic.value]) {
      if (directoryStructure[subTopic.value].files.length > 0) {
        return directoryStructure[subTopic.value].files
      }
      else {
        return []
      }
    }

    if (mainTopic && directoryStructure[mainTopic.value]) {
      if (directoryStructure[mainTopic.value].files.length > 0) {
        return directoryStructure[mainTopic.value].files
      }
      else {
        return []
      }
    }
    return []
  }

  const handleCommit = () => {
    //get all necessary state
    const data = {
      MainTopic: mainTopic.value,
      SubTopic: subTopic.label,
      note: note.label,
      grab: value,
      views: views,
      isPublic: isPublic,
      user: user,
      tags: valueOp.map((item) => item.value)
    }

    fetch("/api/commitv2", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to save note.");
        }
        console.log("Note saved successfully!");
        setIsPublic(true);
        setValue('');
        setViews('');
        setValueOp([]);
        setMainTopic(null);
        setSubTopic(null);
        setNote(null);

      })
      .catch(error => {
        console.error(error);
      });

  }

  //TODO:
  // fetch users metadata from usermEtadata.json
  // populate Tags with user tags
  // set public default to from metadata if note ispublic is already set

  return (
    <>
      <Nav />
      <div className=" mx-auto w-11/12 mt-10 grid grid-cols-12 rounded-lg p-4 bg-slate-900 text-slate-400">
        <div className="col-span-8 ">
          <section className="flex flex-col">
            <h1 className="font-bold tracking-light text-2xl mb-2 text-slate-200">Grab Editor</h1>
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
            <h1 className="font-bold tracking-light text-2xl mb-2 text-slate-200">Note</h1>
            <MDEditor
              value={views}
              onChange={setViews}
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
            <h1 className="font-bold tracking-light text-2xl mb-2 text-slate-200">Tags</h1>
            <div className='w-full ' style={{ all: "initial" }}>
              <CreatableSelect
                isMulti options={options}
                value={valueOp}
                onChange={(newValue) => setValueOp(newValue)}
              />
            </div>

          </section>

        </div>
        <div className="col-start-9 col-span-12 p-4 pl-8 pr-2">
          <h1 className="text-center font-extrabold tracking-light text-2xl mb-2 text-slate-200">Metadata</h1>

          <div className="mt-8 w-full">
            <h1 className="font-bold tracking-light text-2xl mb-2 text-slate-200">Main Topic</h1>
            <small><i>Use an Existing Topic  or create a new Topic by just typing out the name and click on the drop down selection &ldquo;Create ...&rdquo;</i></small>
            <div className='w-full ' style={{ all: "initial" }}>
              <CreatableSelect
                options={data}
                value={mainTopic}
                onChange={(newValue) => setMainTopic(newValue)}
              />
            </div>

          </div>
          <div className="mt-8 w-full">
            <h1 className="font-bold tracking-light text-2xl mb-2 text-slate-200">Sub Topic</h1>
            <small><i>Use an Existing subtopic or create a new subtopic by just typing out the name and click on the drop down selection &ldquo;Create ...&rdquo;</i></small>
            <div className='w-full ' style={{ all: "initial" }}>
              <CreatableSelect
                options={mainTopic && directoryStructure[mainTopic.value] ? directoryStructure[mainTopic.value].directory : []}
                value={subTopic}
                onChange={(newValue) => setSubTopic(newValue)}
              />
            </div>

          </div>
          <div className="mt-8 w-full">
            <h1 className="font-bold tracking-light text-2xl mb-2 text-slate-200">Notes</h1>
            <small><i>Use an Existing Note  or create a new Note by just typing out the name and click on the drop down selection &ldquo;Create ...&rdquo;</i></small>
            <div className='w-full ' style={{ all: "initial" }}>
              <CreatableSelect
                options={notes()}
                value={note}
                onChange={(newValue) => setNote(newValue)}
              />
            </div>

          </div>

          {/* <div className="flex items-center relative mt-8">
            <small className='absolute top-0'><i>Make a new note public or private</i></small>
            <br />
            <label
              htmlFor="toggle"
              className="flex items-center cursor-pointer mt-10"
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
                  className={`block ${isPublic ? 'bg-green-400' : 'bg-gray-600'
                    } w-14 h-8 rounded-full transition duration-300`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300 ${isPublic ? 'transform translate-x-full' : ''
                    }`}
                ></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                {isPublic ? 'Public' : 'Private'}
              </div>
            </label>
          </div> */}

          <div>
            <button
              className='px-4 py-2 bg-green-400 text-white rounded-md mt-8 mx-auto float-right'
              onClick={() => handleCommit()}
            >
              Commit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
