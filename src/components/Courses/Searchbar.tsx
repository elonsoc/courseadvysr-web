import Axios from "axios";
import { Dispatch, SetStateAction, useState, useCallback, useEffect } from "react";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { ep } from "../../cfg";

type Option = {
    subject: string;
    title: string;
};




interface  SearchbarProps {
    updateSelections: Dispatch<SetStateAction<MultiValue<Selection[]>>>
}

const Searchbar: React.FC<SearchbarProps> = ({updateSelections}) =>{
    const [courseOptions, setCourseOptions] = useState([]);
    
    const addToCourseOptions = useCallback((opt: any) => {
        let temp: any = courseOptions
        temp.push(opt)
        setCourseOptions(temp)   
    }, [courseOptions])
    

    useEffect(() => {
        Axios({
            method: "get",
            url: ep + "/options",
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                response.data.forEach((item: Option) => {
                    addToCourseOptions({ value: item.subject, label: item.title })

                });
            })
            .catch((response) => {
                console.log(response, "failure!");
            });
    }, [addToCourseOptions, courseOptions]);
    
    return (
        <CreatableSelect
            formatCreateLabel={(inputValue) => {
                return inputValue.search(":") !== -1
                    ? `${inputValue.substring(
                        0,
                        inputValue.search(":")
                    )} ${inputValue.charAt(
                        inputValue.search(":") + 1
                    )}xxx`
                    : inputValue;
            }}
            isMulti
            onChange={(sel: MultiValue<Selection[]>) => updateSelections(sel)}
            // className={this.props.style}
            placeholder={`ECO, CSC:2, Art, Ceramics`}
            options={courseOptions}
        />
    )
}

export default Searchbar