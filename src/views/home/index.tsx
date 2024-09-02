"use client";

import React from "react";
import Select from "@/components/select";
import { usePosts } from "@/hooks/use-posts";

interface Option {
  value?: string;
  label?: string;
  meta?: string;
  isActive?: boolean;
  image?: string;
  icon?: string;
}

const options = [
  {
    value: "phoenix",
    label: "Phoenix Baker",
    meta: "@phoenix",
    isActive: true,
    image: "/img/olivia.png",
    icon: "./icons/user.svg",
  },
  {
    value: "olivia",
    label: "Olivia Rhye",
    meta: "@olivia",
    isActive: false,
    image: "/img/olivia.png",
    icon: "./icons/user.svg",
  },
  {
    value: "lana",
    label: "Lana Steiner",
    meta: "@lana",
    isActive: true,
    image: "/img/olivia.png",
    icon: "./icons/user.svg",
  },
  {
    value: "demi",
    label: "Demi Wilkinson",
    meta: "@demi",
    isActive: false,
    image: "/img/olivia.png",
    icon: "./icons/user.svg",
  },
  {
    value: "candice",
    label: "Candice Wu",
    meta: "@candice",
    isActive: true,
    image: "/img/olivia.png",
    icon: "./icons/user.svg",
  },
  {
    value: "natali",
    label: "Natali Craig",
    meta: "@natali",
    isActive: false,
    image: "/img/olivia.png",
    icon: "./icons/user.svg",
  },
  {
    value: "drew",
    label: "Drew Cano",
    meta: "@drew",
    isActive: true,
    image: "/img/olivia.png",
    icon: "./icons/user.svg",
  },
  {
    value: "selim",
    label: "Selim Günaydın",
    meta: "@selim",
    isActive: true,
    image: "/img/olivia.png",
    icon: "./icons/user.svg",
  },
];

export default function HomeView() {
  const { data: posts, isLoading, error } = usePosts();

  const handleSelect = (value: any) => {
    console.log(value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  const customOptions = posts.map((post: any) => ({
    value: post.id,
    label: post.title,
    meta: post.body,
  }));

  return (
    <div className="grid grid-cols-12 gap-12 mt-12">
      <p className="col-span-12 flex justify-center text-3xl text-gray-800 font-bold">
        Select Component Variants
      </p>
      <div className="flex col-span-4 flex-col items-start">
        <h2 className="mb-4 font-bold text-gray-600">API Data</h2>
        <Select
          options={customOptions}
          placeholder={"Select team member"}
          title={"Team Member"}
          label={"This is a hint text to help user."}
          className="mr-4"
          width={320}
          selectedIcon="./icons/check.svg"
          sorting="asc"
          viewData="meta"
          onChange={handleSelect}
        />
      </div>
      <div className="flex col-span-4 flex-col items-start">
        <h2 className="mb-4 font-bold text-gray-600">Icon View</h2>
        <Select
          options={options}
          placeholder={"Select team member"}
          title={"Team Member"}
          label={"This is a hint text to help user."}
          className="mr-4"
          width={320}
          selectedIcon="./icons/check.svg"
          sorting="asc"
          viewData="meta"
          onChange={handleSelect}
        />
      </div>

      <div className="flex col-span-4 flex-col items-start">
        <h2 className="mb-4 font-bold text-gray-600">Icon View</h2>
        <Select
          options={options}
          placeholder={"Select team member"}
          title={"Team Member"}
          label={"This is a hint text to help user."}
          variant="iconView"
          className="mr-4"
          selectedIcon="./icons/check.svg"
          viewData="meta"
          onChange={handleSelect}
        />
      </div>

      <div className="flex col-span-4 flex-col items-start">
        <h2 className="mb-4 font-bold text-gray-600">Image View</h2>
        <Select
          options={options}
          placeholder={"Select team member"}
          title={"Team Member"}
          label={"This is a hint text to help user."}
          variant="imageView"
          className="mr-4"
          selectedIcon="./icons/check.svg"
          viewData="meta"
          onChange={handleSelect}
        />
      </div>

      <div className="flex col-span-4 flex-col items-start">
        <h2 className="mb-4 font-bold text-gray-600">Active View</h2>
        <Select
          options={options}
          placeholder={"Select team member"}
          title={"Team Member"}
          label={"This is a hint text to help user."}
          variant="activeView"
          className="mr-4"
          selectedIcon="./icons/check.svg"
          viewData="meta"
          onChange={handleSelect}
        />
      </div>

      <div className="flex col-span-4 flex-col items-start">
        <h2 className="mb-4 font-bold text-gray-600">Search View</h2>
        <Select
          options={options}
          placeholder={"Select team member"}
          title={"Team Member"}
          label={"This is a hint text to help user."}
          variant="search"
          className="mr-4"
          selectedIcon="./icons/check.svg"
          viewData="meta"
          onChange={handleSelect}
        />
      </div>

      <div className="flex col-span-4 flex-col items-start">
        <h2 className="mb-4 font-bold text-gray-600">Multi Search View</h2>
        <Select
          options={options}
          placeholder={"Select team member"}
          title={"Team Member"}
          label={"This is a hint text to help user."}
          variant="multiSearch"
          className="mr-4"
          selectedIcon="./icons/check.svg"
          viewData="label"
          onChange={handleSelect}
        />
      </div>
    </div>
  );
}
