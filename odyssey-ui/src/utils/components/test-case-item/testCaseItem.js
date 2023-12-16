import SearchableSelect from "../select/select"
import { IoCheckmarkDone } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { VscBlank } from "react-icons/vsc";
const TestCaseItem = ({addTestItem, key, addEnabled, count}) => {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ];
    return(
        <div className="flex mt-5 mx-5 items-center h-fit" key={key}>
            {!addEnabled ?
                <IoCheckmarkDone size={22} className='mr-2 text-green-500'/>
                :
                <VscBlank size={22} className='mr-2'/>
            }
            <p className='text-clean bg-accent px-1 mr-2 rounded'>{count}</p>
            <SearchableSelect options={options} placeholder="Start Typing" />
            {addEnabled ?
                <FiPlusCircle  size={24} className='ml-2 text-primary-light' onClick={addTestItem}/>
                :
                <VscBlank size={22} className='mr-2'/>
            }
        </div>
    )
}

export default TestCaseItem;