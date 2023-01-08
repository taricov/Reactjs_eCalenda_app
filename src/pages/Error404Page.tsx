import React from "react";
import MantineBtn from "../components/MantineBtn";

const Error404Page = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 lg:flex-row md:gap-28 bg-gradient-to-r from-skin-hue2 to-skin-hue0 ">
      <div className="flex flex-col gap-2 items-center justify-center xl:pt-24 xl:w-1/2 relative pb-12 lg:pb-0 ">
        <div className="">
          <img
            src="https://i.ibb.co/G9DC8S0/404-2.png"
            className="bg-cover"
            alt="404"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="my-2 text-gray-800 font-bold text-5xl text-center">
            You Are Away!
          </h1>
          <p className="my-2 text-gray-800 text-center">
            Looks like you are knocking wrong doors.
          </p>
          <MantineBtn
            title="Take me Home!"
            variant="filled"
            color="bg-primary-600 hover:bg-primary-700 transition-all duration-trans text-white hover:text-white mt-5"
            href="/"
            target="_self"
          />
        </div>
      </div>
    </div>
  );
};

export default Error404Page;
