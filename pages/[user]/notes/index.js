
import DirectoryTree from '@/components/DirectoryTree';
import { Octokit } from "@octokit/rest";
import { getUsersData, getUsersDataContent } from '@/libs/getUsersDirectory';
import { useState, useEffect } from "react";
import { Remarkable } from 'remarkable';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import Nav from '@/components/NavBar'
import SearchPortal, { SearchField } from "@/components/SearchPortal";
import {
  KBarProvider,
  KBarContext
} from "kbar";
import { useRouter } from 'next/router'
const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);


export default function Index({ user, contentlist, content, mainContent }) {
  const [modifierKey, setModifierKey] = useState();
  const router = useRouter()

  useEffect(() => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
    setModifierKey(isMac ? "⌘" : "Ctrl ");
  }, []);


  if (router.isFallback) {
    return <section className='backdrop-blur-sm backdrop-saturate-200 bg-black/90 font-manrope  min-h-screen'>
      <Nav dark={true} />
      <div className='h-[100vh] w-full flex items-center justify-center'>
        <h2>Data loading and generating page......</h2>
      </div>
    </section>
  }

  return (
    <section className='backdrop-blur-sm backdrop-saturate-200 bg-black/90 font-manrope  min-h-screen'>
      <KBarProvider >
        <SearchPortal data={content} />
        <Nav dark={true} />
        {content?.length > 0 ? <div className='grid grid-cols-12 mx-auto max-w-screen-xl px-4 py-10 md:py-10 mt-10 '>
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
                  </div> : <MarkdownPreview source={item.grab} className=' rounded-xl  w-full p-4 bg-white text-black' style={{ backgroundColor: 'white', color: 'black' }} wrapperElement={'light'} />}
                  <div className=' ml-16  border-dashed border-l-2 p-4 w-4 h-full' />
                  <MarkdownPreview source={item.views} className=' rounded-xl  w-full p-4 ml-6 bg-black text-white' />
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
  const fs = require('fs');
  const path = require('path');
  const usersDir = path.join(process.cwd(), '/data/users');
  const users = fs.existsSync(usersDir) ? fs.readdirSync(usersDir) : [];
  const paths = users.map((user) => ({
    params: { user: user },
  }));

  return { paths: paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
  const path = require('path');
  const user = params.user;
  const userDir = path.join(process.cwd(), 'data/users', user);
  const contentlist = getUsersData(userDir);
  let content = await getUsersDataContent(userDir)
  const mainContent = content?.length ? content[0] : []
  let i = 0;
  content = content.flatMap(({ id, path, content }) => {
    if (content?.length > 0) {
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
      content,
      mainContent
    },
    revalidate: 10,
  };
}

