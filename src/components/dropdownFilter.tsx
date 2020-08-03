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
    changeFilter: Function,
    setFilter: Function,
    filterValue:string
    
}
 
export interface DropdownFilterState {
    filterName: string
    
}
 
class DropdownFilter extends React.Component<DropdownFilterProps, DropdownFilterState> {
    state = { 
        filterName: "popularity.desc"
    }
    render() { 
        return(
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Filter: {this.props.filterValue}
                </Dropdown.Toggle>
    
                <Dropdown.Menu>
                    {filters.map((filter:string) => <Dropdown.Item onClick={()=> this.applyFilter(filter)}>{filter}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    applyFilter = (filter:string) => {
        //change button name
        this.props.setFilter(filter)

        //apply filter
        this.props.changeFilter(filter);

    }


}
 
export default DropdownFilter;

