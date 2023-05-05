import { useState } from 'react';
import Link from 'next/link';

export default function DirectoryTree({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDirectory = data.children && data.children.length > 0;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {isDirectory && (
        <div onClick={handleToggle}>
          {isExpanded ? '-' : '+'}
          {data.name}
        </div>
      )}
      {!isDirectory && (
        <div>
         <Link href={data.value}>{data.name}</Link>
        </div>
      )}
      {isDirectory && isExpanded && (
        <ul>
          {data.children.map((child) => (
            <li key={child.name}>
              <DirectoryTree data={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
