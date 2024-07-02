import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"
import { currentUser, } from "@clerk/nextjs/server"
import UserAccountNav from "./UserAccountNav"
import MobileNav from "./MobileNav"

const Navbar = async () => {

  const user = await currentUser()

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b border-zinc-200 ">
                <Link 
                    className="flex z-40 font-semibold" 
                    href="/"
                >
                    <span>intelliPDF</span>
                </Link>

                <MobileNav isAuth={!!user}/>

                <div className="hidden items-center space-x-4 sm:flex">
                    {!user ? (
                        <>
                            <Link 
                                href="/pricing"
                                className={buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                })}
                            >
                                Pricing
                            </Link>
                            <SignInButton
                            //@ts-ignore
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                            >
                                Sign in
                            </SignInButton>
                            <SignUpButton
                            //@ts-ignore
                            className={buttonVariants({
                                size: "sm",
                            })}
                            >
                                Get started 
                            </SignUpButton>
                        </>
                    ) : (
                        <>
                            <Link 
                                    href="/dashboard"
                                    className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                    })}
                                >
                                    Dashboard
                            </Link>

                            <UserAccountNav 
                                name={
                                    !user.firstName || !user.fullName ? "Your Account" : `${user.fullName}`
                                }
                                email={user.primaryEmailAddress?.emailAddress}
                                imageUrl={user.imageUrl}
                            />
                        </>
                    )}
                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar