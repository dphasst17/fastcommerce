import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"

const FilterType = ({type,currentType,setCurrentType}:{type:string[],currentType:string,setCurrentType:React.Dispatch<React.SetStateAction<string>>}) => {
  return <Dropdown>
    <DropdownTrigger>
      <Button
        variant="solid"
        radius='sm'
        size='sm'
        color='primary'
      >
        {currentType.toLocaleUpperCase()}
      </Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Static Actions">
      {type?.map((t: string) => <DropdownItem
        onClick={() => setCurrentType(t)}
        className={`text-zinc-800 ${t === currentType ? 'bg-blue-500 text-white' : 'bg-transparent'}`}
        key={t} >
        {t.toLocaleUpperCase()}
      </DropdownItem>)}
    </DropdownMenu>
  </Dropdown>
}

export default FilterType