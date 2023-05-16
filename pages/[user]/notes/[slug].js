import React from 'react'
import { getUsersDataPath, getUsersDataContent, getUsersData } from '@/libs/getUsersDirectory';
import CreatableSelect from 'react-select/creatable';
import { useState } from 'react';
import MiniSearch from 'minisearch'
import { Remarkable } from 'remarkable';
import DirectoryTree from '@/components/DirectoryTree';
import Link from 'next/link';


export default function Index({ user, contentlist, tags, content, mainContent }) {
  const [valueOp, setValueOp] = useState([]);
  const [contentPage, setContentPage] = useState([]);
  const search = new MiniSearch({
    fields: ['path', 'grab', 'views', 'tags'],
    storeFields: ['path', 'grab', 'views', 'tags']
  });

  search.addAll(content);

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
    <>
      <div className='grid grid-cols-12'>

        <section className='border-2 col-start-1 col-span-4 p-4'>
          <h1 className=' text-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text'>Memory<i className='font-bold'>X</i></h1>
          <div><i className='ml-2 font-bold text-xs'>In Peace with Forgetting</i></div>
          
          <section className='mt-4'>
            <input type="text" placeholder="Search.." className='w-full rounded-lg border-2 p-2'
              onKeyPress={searchFunc}
            />
          </section>
          <br />
          <hr />
          <section className='mt-4'>
            {contentlist.map((item, index) => {
              return (
                <DirectoryTree key={index} data={item} user={user} setContentPage={setContentPage} />
              )
            }
            )}
          </section>
          <hr />
          <section className='mt-4'>
            <CreatableSelect
              isMulti options={tags}
              value={valueOp}
              onChange={(newValue) => setValueOp(newValue)}
            />
          </section>
        </section>
        <section className='border-2 col-start-5 col-span-12 p-4'>
          Main Content

          
          {contentPage.length === 0 && mainContent && (
            <>
              {mainContent.map((item, index) => {
                return (
                  <div key={index} className="w-[80%] p-4 mt-4">
                    <div className=' rounded-xl border-2  w-fit p-4' dangerouslySetInnerHTML={{ __html: md.render(item.grab) }} />
                    <div className=' ml-16  border-dashed border-l-2 p-4 w-4 h-full' />
                    <div className=' rounded-xl border-2  w-fit p-4 ml-6 ' dangerouslySetInnerHTML={{__html: md.render(item.views)}} />
                  </div>
                )
              }) }
            </>
          )}
          <div>
            {contentPage.map((item, index) => {
              return (
                 <Link href={`/${user}/notes/${item.path.split(".json")[0].replaceAll("/", "_")}`} key={index} passHref>
                  <div key={index} className="w-[80%] p-4 rounded-lg border-2 mt-4" onClick={handleLinkClick}>
                    <div className='text-2xl'>{item.path}</div>
                    <div className='text-sm bg-gray-200 outline-2' dangerouslySetInnerHTML={{__html: md.render(item.grab).substring(0, 60)}} />
                    <div className='text-sm mt-2 bg-gray-200 outline-2' dangerouslySetInnerHTML={{__html: md.render(item.views).substring(0, 60)}} />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>


      </div>
    </>
  )
}



export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  const users = fs.readdirSync(path.join(process.cwd(), 'users'));
  const paths = users.flatMap((user) => {
    const userDir = path.join(process.cwd(), 'users', user);
    const contentlist = getUsersDataPath(userDir);
    console.log("Content List", contentlist);
    const paths = contentlist.map((item) => ({
      params: { user: user, slug: item.replaceAll("/", "_") }
    }))
    console.log("PATHS", paths);
    return paths

  })
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const path = require('path');
  const fs = require('fs');
  const user = params.user;
  const slug = params.slug.replaceAll("_", "/");
  const userDir = path.join(process.cwd(), 'users', user);
  const contentlist = getUsersData(userDir);
  let tags;

  let fpath = path.join(process.cwd(), 'userMeta', `${user}.json`)

  if (fs.existsSync(fpath)) {
    tags = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'userMeta', `${user}.json`), "utf-8"))?.tags;
    tags = tags.map((item, index) => {
      return {label:item.toLowerCase(), value:item}
    })
  }
  else {
    tags = null
  }

  let content = getUsersDataContent(userDir)
  let i = 0;
  content = content.flatMap(({ id, path, content }) => {
    
    return content.map(({ grab, views, tags }, index) => ({ 
            id: i++, 
            path, 
            grab, 
            views, 
            tags 
        }))
  });

  // get body main content
  const requestedContentPath = path.join(process.cwd(), 'users', user, `${slug}.json`);
  let mainContent = null;
  if (fs.existsSync(requestedContentPath)) {
      mainContent =  JSON.parse(fs.readFileSync(requestedContentPath, 'utf-8'));
  }
 
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
