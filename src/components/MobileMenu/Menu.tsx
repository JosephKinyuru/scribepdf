"use client"

import { useEffect, useState } from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {  menuSlide, slide } from './anim'
import { SignOutButton } from '@clerk/nextjs';

const Menu = ({ isAuth}: {isAuth: boolean}) => {

  const [isOpen, setIsOpen ] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);


  return (
    <div className='sm:hidden'>

        <button 
            className={styles.button}
            onClick={toggleOpen}
        >
            <div className={styles.hamBox}>
                <div className={`${styles.hamBoxInner} ${isOpen ? styles.hamBoxInnerActive : ""}`}></div>
            </div>
        </button>

        <AnimatePresence mode='wait'>
          { isOpen && (
            <motion.div 
              variants={menuSlide}
              animate="enter"
              exit="exit"
              initial="initial"
              className="block h-screen bg-sky-50 absolute right-0 top-0 text-white w-[100vw]"
            >
                <div className="box-border h-full p-10 flex flex-col justify-between">
                  <div className="flex flex-col text-5xl gap-3 mt-20">
                    <div className="text-gray-600 border-b border-gray-600 uppercase text-xs mb-10">
                      <p>Navigation</p>
                    </div>
                    {!isAuth ? (
                        NavItems.map( (item, index) => (
                          <motion.div 
                            key={`@$${index}`} 
                            className="relative flex items-center"
                            variants={slide}
                            animate="enter"
                            exit="exit"
                            initial="initial"
                            custom={index}
                          >
                            <Link
                              href={item.href}
                              onClick={toggleOpen}
                              className="no-underline text-slate-950 font-normal pb-8"
                            >
                              {item.title}
                            </Link>
                          </motion.div>
                        ))
                    ) : (
                          <>
                            <motion.div 
                              className="relative flex items-center"
                              variants={slide}
                              animate="enter"
                              exit="exit"
                              initial="initial"
                              custom={1}
                            >
                              <Link
                                href='/dashboard'
                                onClick={toggleOpen}
                                className="no-underline text-slate-950 font-normal pb-8"
                              >
                                Dashboard
                              </Link>
                            </motion.div>
                            <motion.div 
                              className="relative flex items-center text-slate-950"
                              variants={slide}
                              animate="enter"
                              exit="exit"
                              initial="initial"
                              custom={2}
                            >
                              <SignOutButton>   
                                  Sign out 
                              </SignOutButton>
                            </motion.div>
                          </>
                    )}
                  </div>

                  <div className="flex w-full justify-between text-sm gap-x-10 mr-12 text-slate-800">
                    <a>Awards</a>
                    <a>Instagram</a>
                    <a>Dribble</a>
                    <a>LinkedIn</a>
                  </div> 

                </div>
            </motion.div>
          )
          }
        </AnimatePresence>

    </div>
  )
}

export default Menu

const NavItems = [
  {
    title: "Get Started",
    href: "/sign-up"
  },
  {
    title: "Sign in",
    href: "/sign-in"
  },
  {
    title: "Pricing",
    href: "/pricing"
  }
]