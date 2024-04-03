import Share from '@/components/ui/share'
import Link from 'next/link'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='flex flex-col lg:flex-row justify-between w-full p-5'>
      <p className='order-2 lg:order-1'>© {year} AAA & CGIAR</p>
      <div className='relative flex flex-col lg:flex-row order-1 lg:order-2 gap-4 mb-5'>
        <a href='mailto:toddrosenstock@adaptationatlas.info' className='font-medium text-grey-600 hover:text-brand-green transition-colors'>Join our mailing list</a>
        <a href='mailto:toddrosenstock@adaptationatlas.info' className='font-medium text-grey-600 hover:text-brand-green transition-colors'>Provide feedback</a>
        <a href='mailto:toddrosenstock@adaptationatlas.info' className='font-medium text-grey-600 hover:text-brand-green transition-colors'>Contact us</a>
        <Share />
      </div>
    </footer>
  )
}
export default Footer