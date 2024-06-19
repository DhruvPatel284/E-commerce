import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
    <section className="bg-slate-100 h-[80px] text-black   font-medium flex flex-col md:flex-row justify-between px-10 items-center">
      <div className="">
        Developed By Dhruv Patel
      </div>
      <div className="flex justify-evenly items-center w-[30%] md:w-[12%] mt-2 md:mt-0">
        <Link href={"https://github.com/DhruvPatel284/"} target="_blank">
          <Github size={20} />
        </Link>
        <Link
          href={"https://www.linkedin.com/in/dhruvpatel156/"}
          target="_blank"
        >
          <Linkedin size={20} />
        </Link>
        <Link href={"mailto:dhruv156328@gmail.com"} target="_blank">
          <Mail size={20} />
        </Link>
      </div>
    </section>
    </div>
  );
};

export default Footer;