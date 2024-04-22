import { Input } from "@/components/ui/input"
import { EnabledSelect } from "@/components/custom/enabled-select"
import { Button } from "@/components/custom/button"
import { IconSearch, IconX, IconPlus, IconUpload } from "@tabler/icons-react"
import { ICriteria } from "./table-schema"
import { initialCriteria } from "./table-schema"
import { EditDialog } from "../dialog/edit-dialog"
import { type FormSchema } from "../table/table-schema"
import { type UploadFormSchema } from "@/components/custom/upload-dialog"
import { DialogTrigger } from "@/components/ui/dialog"
import { UploadDialog } from "@/components/custom/upload-dialog"

interface DataTableToolbarProps{
  entityName: string,
  criteria: ICriteria
  setCriteria: React.Dispatch<React.SetStateAction<ICriteria>>
  loadPage: () => void,
  save: (formData: FormSchema) => Promise<any>,
  upload: (formData: UploadFormSchema) => Promise<any>
}

export function DataTableToolbar ({
  entityName,
  criteria, 
  setCriteria,
  loadPage,
  save,
  upload
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <div className="flex flex-wrap w-full sm:w-auto space-x-2">
          <Input
            placeholder="Number"
            value={criteria.num}
            onChange={(event) => setCriteria({ ...criteria, num: event.target.value })}
            className="h-8 w-[130px] lg:w-[130px]"
          />
          <Input
            placeholder="Category Code"
            value={criteria.categoryCode}
            onChange={(event) => setCriteria({ ...criteria, categoryCode: event.target.value })}
            className="h-8 w-[130px] lg:w-[130px] mb-2 sm:mb-0" // Add mb-2 for spacing between fields
          />
        </div>
        <div className="flex flex-wrap w-full sm:w-auto space-x-2">
          <EnabledSelect
            value={criteria.enabled}
            onValueChange={(value) => setCriteria({ ...criteria, enabled: value })}
            className="h-8 w-[130px] lg:w-[130px]"
          />
          <Button
            variant="link"
            onClick={() => setCriteria(initialCriteria)}
            className="h-8 lg:px-3 lg:flex hidden" // Hide on small screens
          >
            <IconX className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => loadPage()}
            className="h-8 px-2 lg:px-3"
          >
            <IconSearch className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      <div>
        <EditDialog entityName={entityName} save={save}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="mr-2">
              <IconPlus className="mr-2 size-4" aria-hidden="true" />
              Create
            </Button>
          </DialogTrigger>
        </EditDialog>
        <UploadDialog entityName={entityName} upload={upload} description="Supported file types: .txt, .json">
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="mr-2">
              <IconUpload className="mr-2 size-4" aria-hidden="true" />
              Upload
            </Button>
          </DialogTrigger>
        </UploadDialog>
      </div>
    </div>
  )
}
