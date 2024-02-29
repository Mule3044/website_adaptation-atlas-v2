import Share from '@/components/interface/share'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='flex justify-between w-full p-5'>
      <p>© {year} CGIAR</p>
      <div className='flex gap-4'>
        <Share />
      </div>
    </footer>
  )
}
export default Footer