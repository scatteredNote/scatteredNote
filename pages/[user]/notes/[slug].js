import React from 'react'
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { getUsersDataPath, getUsersDataContent, getUsersData } from '@/libs/getUsersDirectory';
import { useState, useEffect } from 'react';
import DirectoryTree from '@/components/DirectoryTree';
import Nav from '@/components/NavBar'
import SearchPortal, { SearchField } from "@/components/SearchPortal";
import dynamic from 'next/dynamic';
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
    <section className='min-h-screen backdrop-blur-sm backdrop-saturate-200 bg-black/90 font-manrope'>
      <KBarProvider >
        <SearchPortal data={content} />
        <Nav dark={true} />
        <div className='grid grid-cols-12 mx-auto max-w-screen-xl px-4 py-10 md:py-10 mt-10 '>
          <section className=' border-gray-400 col-start-1 col-span-4 p-4 max-h-screen overflow-y-auto'>
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
          <section className='border-r-2 border-l-2 border-gray-400 col-start-5 col-span-10 p-4 '>
            {mainContent.map((item, index) => {
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
        </div>
      </KBarProvider>
    </section>
  )
}


export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  const users = fs.readdirSync(path.join(process.cwd(), 'data/users'));
  const paths = users.flatMap((user) => {
    const userDir = path.join(process.cwd(), 'data/users', user);
    const contentlist = getUsersDataPath(userDir);
    const paths = contentlist.map((item) => ({
      params: { user: user, slug: item.replaceAll("/", "_") }
    }))
    return paths

  })
  return { paths: paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
  const path = require('path');
  const fs = require('fs');
  const user = params.user;
  const slug = params.slug.replaceAll("_", "/");
  const userDir = path.join(process.cwd(), 'data/users', user);
  let contentlist = [];
  let content = []
  if (fs.existsSync(userDir)) {
    contentlist = getUsersData(userDir);
    content = await getUsersDataContent(userDir)
   }
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

  const requestedContentPath = path.join(process.cwd(), 'data/users', user, `${slug}.json`);
  let mainContent = null;
  if (fs.existsSync(requestedContentPath)) {
    mainContent = JSON.parse(fs.readFileSync(requestedContentPath, 'utf-8'));
  }

  return {
    props: {
      user,
      contentlist,
      content,
      mainContent
    },
    revalidate: 10,
    notFound: !{},
  };
}
