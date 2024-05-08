
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  NO_GROUP,
  useRegisterActions
} from "kbar";

import { useState, useEffect } from "react";
import router from "next/router.js";

export const nameFromUrl = (url) => {
  const name = url.split("/").slice(-1)[0].replace("-", " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export default function SearchPortal({ data }) {
  const [searchActions, setSearchActions] = useState([]);

  useEffect(() => {
    const searchJson = []
    data.forEach((val) => {
      if (val.grab) {
        searchJson.push({
          id: val.id,
          name: `${val.path.split("/").slice(1, -1).join("/")}sep;${val.grab.slice(0, 50)}sep;${val.views.slice(0, 50)}`,
          keywords: (val.tags ? val.tags.join(" ") : ""),
          section: val.path.split("/")[0],
          perform: () => router.push(`${router.asPath.split("/").slice(0, 3).join("/")}/${val.path.split(".json")[0].replaceAll("/", "_")}`),
        })
      }

    })

    setSearchActions(searchJson)
  }, []);
  useRegisterActions(searchActions, [searchActions]);
  return (
    <KBarPortal>
      <KBarPositioner className=" p-4 backdrop-blur backdrop-filter bg-black/50">
        <KBarAnimator className="w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border  border-gray-800 bg-gray-900">
            <div className="flex items-center space-x-4 p-4">
              <span className="block w-5">
                <svg
                  className=" text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <KBarSearch
                defaultPlaceholder="Search"
                className="h-8 w-full bg-transparent focus:outline-none text-slate-200 placeholder-slate-500"
              />
              <span className="inline-block whitespace-nowrap rounded border border-slate-400/70 px-1.5 align-middle font-medium leading-4 tracking-wide [font-size:10px] border-slate-600 text-slate-400">
                ESC
              </span>
            </div>
            <RenderResults />;
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      className="text-white"
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className=" w-full px-4 py-2 text-left text-white ">{item.toLocaleUpperCase()}</div>
        ) : (
          <div
            className={`flex flex-col w-full px-4 py-2 text-left text-white  hover:bg-gray-800 ${active ? "bg-gray-800" : ""
              }`}
          >
            <div className="bg-slate-400 text-sm h-fit text-slate-200 text-right w-full pr-2">{`/${item.name.split("sep;")[0]}`}</div>
            <div className="mt-2">grab: {item.name.split("sep;")[1]}</div>
            <div className="mt-2">views: {item.name.split("sep;")[2]}</div>
          </div>
        )
      }
    />
  )
}


export function SearchField({ modifierKey, onOpen, mobile }) {
  return (
    <button
      type="button"
      className="
      group flex h-6 w-6 items-center justify-center sm:flex sm:justify-start md:h-auto md:w-auto xl:w-full max-w-[380px] shrink xl:rounded-lg xl:py-2.5 xl:pl-4 xl:pr-3.5 md:text-sm xl:ring-1 xl:ring-slate-200 xl:bg-slate-800/75 xl:ring-inset xl:ring-white/5 xl:hover:bg-slate-700/40 xl:hover:ring-slate-500
    "
      onClick={onOpen}
    >
      <span className="h-5 w-5 flex-none  group-hover:fill-slate-500 fill-slate-500 md:group-hover:fill-slate-400" >
        <svg
          className="text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <span
        className="
        text-slate-400  sr-only md:not-sr-only md:ml-2"
      >
        Search
      </span>
      {modifierKey && (
        <kbd
          className="ml-auto font-medium text-slate-500 "
        >
          <kbd className="font-sans">{modifierKey}</kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      )}
    </button>
  );
}