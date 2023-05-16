import { useState } from 'react';
import Link from 'next/link';

export default function DirectoryTree({ data, user, isChild, setContentPage }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDirectory = data.children && data.children.length > 0;

  console.log("DATA", user)

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = () => {
    setContentPage([]); // Clear the contentPage state
  };

  return (
    <div>
      {isDirectory && (
        <div onClick={handleToggle} className={`${isChild ? "ml-2": "ml-0"}`}>
          {isExpanded ? '-' : '+'}
          {data.name}
        </div>
      )}
      {!isDirectory && (
        <div>
         <Link href={`/${user}/notes/${data.value.split(".json")[0].replaceAll("/", "_")}`} className="ml-2"><button onClick={handleLinkClick}>{data.name}</button></Link>
        </div>
      )}
      {isDirectory && isExpanded && (
        <ul>
          {data.children.map((child) => (
            <li key={child.name}>
              <DirectoryTree data={child} user={user} isChild={true}  setContentPage={setContentPage} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
