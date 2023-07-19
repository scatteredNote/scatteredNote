
import DirectoryTree from '@/components/DirectoryTree';
import { Octokit } from "@octokit/rest";
import { getTags, getUsersData, getUsersDataContent } from '@/libs/githubops';
import CreatableSelect from 'react-select/creatable';
import { useState, useEffect } from "react";
import MiniSearch from 'minisearch'
import { Remarkable } from 'remarkable';
import Link from 'next/link';
import Nav from '@/components/NavBar'
import SearchPortal, { SearchField } from "@/components/SearchPortal";
import {
  KBarProvider,
  KBarContext
} from "kbar";

export default function Index({ user, contentlist, tags, content, mainContent }) {
  const [valueOp, setValueOp] = useState([]);
  const [contentPage, setContentPage] = useState([]);
  const search = new MiniSearch({
    fields: ['path', 'grab', 'views', 'tags'],
    storeFields: ['path', 'grab', 'views', 'tags']
  });

  search.addAll(content);

  const [modifierKey, setModifierKey] = useState();

  useEffect(() => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
    setModifierKey(isMac ? "⌘" : "Ctrl ");
  }, []);

  const md = new Remarkable();

  const searchFunc = (e) => {
    if (e.key === 'Enter') {
      if (valueOp.length > 0) {
        const tags = valueOp.map((item) => item.value);
        const results = search.search(e.target.value, { filter: (id, filters) => tags.some((tag) => id.tags.includes(tag)) });
        setContentPage(results);
      }
      else {
        const results = search.search(e.target.value);
        setContentPage(results);
      }
    }
  }


  return (
    <section className='backdrop-blur-sm backdrop-saturate-200 bg-black/90 font-manrope  min-h-screen'>
      <KBarProvider >
        <SearchPortal data={content} />
        <Nav dark={true} />
        {content.length > 0 ? <div className='grid grid-cols-12 mx-auto max-w-screen-xl px-4 py-10 md:py-10 mt-10 '>
          <section className='border-r-2 border-gray-400 col-start-1 col-span-4 p-4'>
            {/* <section className='mt-4'>
              <input type="text" placeholder="Search.." className='w-full rounded-lg border-2 p-2'
                onKeyPress={searchFunc}
              />
            </section> */}
            <KBarContext>
              {({ query }) => (
                <SearchField modifierKey={modifierKey} onOpen={query?.toggle} />
              )}
            </KBarContext>
            <br />
            <section className='mt-4'>
              {contentlist.map((item, index) => {
                return (
                  <DirectoryTree key={index} data={item} user={user} />
                )
              }
              )}
            </section>
          </section>
          <section className='col-start-5 col-span-10 p-4 text-white'>
            {mainContent.content.map((item, index) => {
              return (
                <div key={index} className="w-full p-4 mt-4">
                  {item.grab.includes("youtu.be") ? <div className=' rounded-xl  w-full p-4 bg-white text-black'>
                    <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${item.grab.split("/").pop().replace("t=", "start=")}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                  </div> : <div className=' rounded-xl  w-full p-4 bg-white text-black' dangerouslySetInnerHTML={{ __html: md.render(item.grab) }} />}
                  <div className=' ml-16  border-dashed border-l-2 p-4 w-4 h-full' />
                  <div className=' rounded-xl  w-full p-4 ml-6 bg-black text-white' dangerouslySetInnerHTML={{ __html: md.render(item.views) }} />
                </div>
              )
            })}
          </section>


        </div> : <h1 className='text-lg text-white tracking-wide'>No Notes Added</h1>}
      </KBarProvider>
    </section>
  )
}



export async function getStaticPaths() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const usersDir = 'users';
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
  const contentlist = await getUsersData(userDir);
  let tags = await getTags(user);
  let content = await getUsersDataContent(userDir)
  const mainContent = content[0]
  let i = 0;
  content = content.flatMap(({ id, path, content }) => {
    if (content.length > 0) {
      return content.map(({ grab, views, tags }, index) => ({
        id: i++,
        path,
        grab,
        views,
        tags
      }))
    }
    return {
      id: i++,
      path,
    }
  });



  return {
    props: {
      user,
      contentlist,
      tags,
      content,
      mainContent
    },
  };
}

