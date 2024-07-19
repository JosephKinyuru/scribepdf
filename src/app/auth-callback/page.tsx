"use client"

import { useQuery } from "@tanstack/react-query"
import { getAuthStatus } from "./actions"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"


const Page = () => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')


  const { data, error } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  })

  if (data?.success) {
    router.push(origin ? `/${origin}` : '/dashboard');
  } else {
    router.push('/sign-in');
  }

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Setting up your account...
        </h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )

}

export default Page
