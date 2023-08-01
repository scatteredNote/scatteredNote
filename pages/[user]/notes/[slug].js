import React from 'react'
import { Octokit } from "@octokit/rest";
import { getUsersDataPath, getUsersDataContent, getUsersData, getTags } from '@/libs/githubops';
import { useState, useEffect } from 'react';
import MiniSearch from 'minisearch'
import { Remarkable } from 'remarkable';
import DirectoryTree from '@/components/DirectoryTree';
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

  const handleLinkClick = () => {
    setContentPage([]); // Clear the contentPage state
  };

  return (
    <section className='min-h-screen backdrop-blur-sm backdrop-saturate-200 bg-black/90 font-manrope'>
      <KBarProvider >
        <SearchPortal data={content} />
        <Nav dark={true} />
        <div className='grid grid-cols-12 mx-auto max-w-screen-xl px-4 py-10 md:py-10 mt-10 '>
          <section className='border-r-2 border-gray-400 col-start-1 col-span-4 p-4 max-h-screen overflow-y-auto'>
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
          <section className='border-r-2 border-gray-400 col-start-5 col-span-10 p-4 text-white'>
            {mainContent.map((item, index) => {
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
        </div>
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
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    path: usersDir,
  });
  const paths = (await Promise.all(users.data.map(async (user) => {
    const userDir = `users/${user.name}`;
    const contentlist = await getUsersDataPath(userDir);
    const paths = contentlist.map((item) => ({
      params: { user: user.name, slug: item.replaceAll("/", "_") }
    }));
    return paths;
  }))).flat();
  return { paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
  const user = params.user;
  const slug = params.slug.replaceAll("_", "/");
  const userDir = `/users/${user}`
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  try {
    await octokit.repos.getContent({
      owner: process.env.REPO_OWNER,
      repo: process.env.REPO_NAME,
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

  const requestedContentPath = `users/${user}/${slug}.json`; // Relative path to the requested content
  let mainContent = null;

  try {
    const response = await octokit.repos.getContent({
      owner: process.env.REPO_OWNER,
      repo: process.env.REPO_NAME,
      path: requestedContentPath,
    });

    if (response.data.type === "file") {
      const content = Buffer.from(response.data.content, "base64").toString("utf-8");
      mainContent = JSON.parse(content);
    }
  } catch (error) {
    console.error("Error retrieving content:", error);
  }

  return {
    props: {
      user,
      contentlist,
      tags,
      content,
      mainContent
    },
    revalidate: 10,
  };
}
