import { Input } from '@/components/ui/input'
import { EnabledSelect } from '@/components/custom/enabled-select'
import { Button } from '@/components/custom/button'
import { IconSearch, IconPlus, IconX } from '@tabler/icons-react'
import { ICriteria } from './table-schema'
import { initialCriteria } from './table-schema'

interface DataTableToolbarProps{
  criteria: ICriteria
  setCriteria: React.Dispatch<React.SetStateAction<ICriteria>>
  loadPage: () => void,
  create: () => void
}

export function DataTableToolbar ({ 
  criteria, 
  setCriteria,
  loadPage,
  create
}: DataTableToolbarProps) {
  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-2'>
        <div className='flex flex-wrap w-full sm:w-auto sm:space-x-2'>
          <Input
            placeholder='Number'
            value={criteria.num}
            onChange={(event) => setCriteria({ ...criteria, num: event.target.value })}
            className='h-8 w-[90px] lg:w-[130px] mb-2 sm:mb-0' // Add mb-2 for spacing between fields
          />
          <Input
            placeholder='Category Code'
            value={criteria.categoryCode}
            onChange={(event) => setCriteria({ ...criteria, categoryCode: event.target.value })}
            className='h-8 w-[90px] lg:w-[130px]' // No bottom margin for the last field
          />
          <EnabledSelect
            value={criteria.enabled}
            onValueChange={(value) => setCriteria({ ...criteria, enabled: value })}
            className='h-8 w-[90px] lg:w-[130px] mb-2 sm:mb-0' // Add mb-2 for spacing between fields
          />
        </div>
        <Button
          variant='secondary'
          onClick={() => setCriteria(initialCriteria)}
          className='h-8 px-2 lg:px-3 lg:flex hidden' // Hide on small screens
        >
          <IconX className='mr-2 h-4 w-4' />
          Reset
        </Button>
        <Button
          onClick={() => loadPage()}
          className='h-8 px-2 lg:px-3'
        >
          <IconSearch className='mr-2 h-4 w-4' />
          Search
        </Button>
      </div>
      <Button
        onClick={() => create()}
        className='h-8 px-2 lg:px-3 mr-2'
      >
        <IconPlus className='mr-2 h-4 w-4' />
        Create
      </Button>
    </div>
  )
}
