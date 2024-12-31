import React from 'react';
import { FaDiscord, FaGithub, FaTwitter, FaTwitch } from 'react-icons/fa';

const Links = [
    {
        href: 'https://discord.com', icon: <FaDiscord/>
    },

    {
        href: 'https://twitter.com', icon: <FaTwitter/>
    },

    {
        href: 'https://github.com', icon: <FaGithub/>
    },

    {
        href: 'https://twitch.com', icon: <FaTwitch/>
    }
    
]

const Footer = () => {
  return (
    <footer className="w-screen bg-violet-300 py-4 text-black">
        <div className = "container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
            <p className="text-center text-sm md:text-left">
                &copy; Nova 2024. All rights reserved
            </p>
            <div className = "flex justify-center gap-4 md:justify-start">
                {Links.map((link)=>(
                    <a href = {link.href} key = {link} target = "_blank" rel = "noopener noreferrer" className = "text-black transition-colors duartion-500 ease-in-out hover:text-white">
                        {link.icon}
                    </a>
                ))}
            </div>
            <div>
            <a href="#privacy-policy" className = "text-center text-sm hover:underline md:text-center px-4">Privacy Policy</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer