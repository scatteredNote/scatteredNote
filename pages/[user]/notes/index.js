
import DirectoryTree from '@/components/DirectoryTree';
import { getUsersData, getUsersDataContent } from '@/libs/getUsersDirectory';


export default function index({ contentlist, content }) {
  return (
    <>
      <div className='grid grid-cols-12'>

        <section className='border-2 col-start-1 col-span-4 p-4'>
          <h1 className=' text-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text'>Memory<i className='font-bold'>X</i></h1>
          <div><i className='ml-2 font-bold text-xs'>In Peace with Forgetting</i></div>
          
          <section className='mt-4'>
            Search Compnent Goes here
          </section>
          <hr />
          <section className='mt-4'>
            {contentlist.map((item, index) => {
              return (
                <DirectoryTree key={index} data={item} />
              )
            }
            )}
          </section>
        </section>
        <section className='border-2 col-start-5 col-span-12 p-4'>
            Main Content
        </section>


      </div>
    </>
  )
}



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
  const fs = require('fs');
  const user = params.user;
  const userDir = path.join(process.cwd(), 'users', user);
  const contentlist = getUsersData(userDir);
  let fileJson;

  let fpath = path.join(process.cwd(), 'userMeta', `${user}.json`)

  if (fs.existsSync(fpath)) {
    fileJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'userMeta', `${user}.json`), "utf-8"))?.tags;
  }
  else {
    fileJson = null
  }

  let content = getUsersDataContent(userDir)
  content = content.map((item, index) => {
      return {...item, id:index+1}
  })

  return {
    props: {
      user,
      contentlist,
      fileJson,
      content
    },
  };
}

