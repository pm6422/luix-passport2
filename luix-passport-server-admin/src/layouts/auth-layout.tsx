import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { useLocation } from 'react-router-dom'

export default function AuthLayout() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const location = useLocation();

  useEffect(() => {
    console.log('Location changed: ', location)
    
  }, [location]);

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}
