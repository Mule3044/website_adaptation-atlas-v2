import Share from '@/components/ui/share'
import Link from 'next/link'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='flex justify-between w-full p-5'>
      <p>© {year} CGIAR</p>
      <div className='flex gap-4'>
        <Link href='mailto:t.rosenstock@cgiar.org' className='font-medium text-grey-600 hover:text-brand-green transition-colors'>Sign up for our newsletter</Link>
        <Link href='mailto:t.rosenstock@cgiar.org' className='font-medium text-grey-600 hover:text-brand-green transition-colors'>Contact us</Link>
        <Share />
      </div>
    </footer>
  )
}
export default Footer