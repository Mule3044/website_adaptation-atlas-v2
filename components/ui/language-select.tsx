'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  setLanguage: React.Dispatch<React.SetStateAction<string>>
  isHome: boolean
}

const LanguageSelect = ({ setLanguage, isHome }: Props) => {
  const router = useRouter()
  const handleLanguageSelect = (value: string) => {
    setLanguage(value)
    if (!isHome) router.push('/')
  }
  return (
    <Select onValueChange={handleLanguageSelect}>
      <SelectTrigger className='fixed top-5 right-5'>
        <SelectValue placeholder='ENGLISH' />
      </SelectTrigger>
      <SelectContent className='bg-white'>
        <SelectItem value='en'>ENGLISH</SelectItem>
        <SelectItem value='fr'>FRANÇAIS</SelectItem>
      </SelectContent>
    </Select>

  )
}

export default LanguageSelect