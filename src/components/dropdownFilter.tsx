import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const filters = [
    "popularity.asc",
    "popularity.desc",
    "release_date.asc",
    "release_date.desc",
    "revenue.asc",
    "revenue.desc",
    "primary_release_date.asc",
    "primary_release_date.desc",
    "original_title.asc",
    "original_title.desc",
    "vote_average.asc",
    "vote_average.desc",
    "vote_count.asc",
    "vote_count.desc"
];

export interface DropdownFilterProps {
    changeFilter: Function
    
}
 
export interface DropdownFilterState {
    
}
 
class DropdownFilter extends React.Component<DropdownFilterProps, DropdownFilterState> {
    //state = { :  }
    render() { 
        return(
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
                    {filters.map((filter:string) => <Dropdown.Item onClick={()=> this.props.changeFilter(filter)}>{filter}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
 
export default DropdownFilter;

