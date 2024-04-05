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
      <div className='flex flex-1 flex-col items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Number'
          value={criteria.num}
          onChange={(event) => setCriteria({ ...criteria, num: event.target.value })}
          className='h-8 w-[90px] lg:w-[130px]'
        />
        <Input
          placeholder='Category Code'
          value={criteria.categoryCode}
          onChange={(event) => setCriteria({ ...criteria, categoryCode: event.target.value })}
          className='h-8 w-[90px] lg:w-[130px]'
        />
        <EnabledSelect
          value={criteria.enabled}
          onValueChange={(value) => setCriteria({ ...criteria, enabled: value })}
          className='h-8 w-[90px] lg:w-[130px]'
        />
        <Button
          variant='secondary'
          onClick={() => setCriteria(initialCriteria)}
          className='h-8 px-2 lg:px-3 lg:flex hidden'
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
