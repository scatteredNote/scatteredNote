
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

export default function Index({ user, contentlist, tags, content }) {
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
    <section className='h-[100vh] backdrop-blur-sm backdrop-saturate-200 bg-black/90 font-manrope'>
      <KBarProvider >
        <SearchPortal data={content} />
        <Nav />
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
            <section className='mt-4'>
              <CreatableSelect
                isMulti options={tags}
                value={valueOp}
                onChange={(newValue) => setValueOp(newValue)}
              />
            </section>
          </section>
          <section className='border-r-2 border-gray-400 col-start-5 col-span-10 p-4 '>
            Main Content

            <div>
              {contentPage.map((item, index) => {
                return (

                  <Link href={`/${user}/notes/${item.path.split(".json")[0].replaceAll("/", "_")}`} key={index}><div key={index} className="w-[80%] p-4 rounded-lg border-2 mt-4">
                    <div className='text-2xl'>{item.path}</div>
                    <div className='text-sm bg-gray-200 outline-2' dangerouslySetInnerHTML={{ __html: md.render(item?.grab).substring(0, 60) }} />
                    <div className='text-sm mt-2 bg-gray-200 outline-2' dangerouslySetInnerHTML={{ __html: md.render(item?.views).substring(0, 60) }} />
                  </div>
                  </Link>
                )
              })}
            </div>
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
      content
    },
  };
}

