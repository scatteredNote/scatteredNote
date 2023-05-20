
import DirectoryTree from '@/components/DirectoryTree';
import { getUsersData, getUsersDataContent } from '@/libs/getUsersDirectory';
import CreatableSelect from 'react-select/creatable';
import { useState } from 'react';
import MiniSearch from 'minisearch'
import { Remarkable } from 'remarkable';
import Link from 'next/link';

export default function Index({ user, contentlist, tags, content }) {
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
                <DirectoryTree key={index} data={item} user={user} />
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
          
          <div>
            {contentPage.map((item, index) => {
              return (

                <Link href={`./${user}/notes/${item.path.split(".json")[0].replaceAll("/", "_")}`} key={index}><div key={index} className="w-[80%] p-4 rounded-lg border-2 mt-4">
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
  const usersDir = path.join(process.cwd(), 'users');
  const users = fs.existsSync(usersDir) ? fs.readdirSync(usersDir) : [];
  const paths = users.map((user) => ({
    params: { user: user },
  }));

  return { paths, fallback: false };
}


export async function getStaticProps({ params }) {
  const path = require('path');
  const fs = require('fs');
  const user = params.user;
  const userDir = path.join(process.cwd(), 'users', user);

  if (!fs.existsSync(userDir)) {
    return { notFound: true };
  }
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
 

  return {
    props: {
      user,
      contentlist,
      tags,
      content
    },
  };
}

