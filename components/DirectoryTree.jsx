import { useState } from 'react';
import Link from 'next/link';

export default function DirectoryTree({ data, user, isChild, setContentPage }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDirectory = data.children && data.children.length > 0;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = () => {
    //setContentPage([]); // Clear the contentPage state
  };

  return (
    <div className='text-gray-700'>
      {isDirectory && (
        <div onClick={handleToggle} className={`flex items-center py-1 text-gray-400 ${isChild ? "ml-2" : "ml-0"}`}>

          <span className='text-md font-medium hover:text-gray-1000 !text-gray-400'>{data.name}</span>
          <span className='ml-auto w-6'>{isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>

          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>

          )}</span>
        </div>
      )}
      {!isDirectory && (
        <div className='ml-2 text-sm font-medium  hover:text-gray-900 border-l-[1px] border-l-gray-300'>
          <Link href={`/${user}/notes/${data.value.split(".json")[0].replaceAll("/", "_")}`} className="ml-2 text-gray-400"><button onClick={handleLinkClick}>{data.name}</button></Link>
        </div>
      )}
      {isDirectory && isExpanded && (
        <ul>
          {data.children.map((child) => (
            <li key={child.name} >
              <DirectoryTree data={child} user={user} isChild={true} setContentPage={setContentPage} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
