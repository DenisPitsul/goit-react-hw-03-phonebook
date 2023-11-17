import { Component } from 'react'
import classes from './Filter.module.css'

export class Filter extends Component {

    render() {
        const {filter, onFilterChange} = this.props;

        return (
            <div className={classes.filter}>
                <h3 className={classes.filterTitle}>Find contacts by name</h3>
                <input 
                    className={classes.filterInput}
                    value={filter}
                    onChange={e => onFilterChange(e.target.value)}
                />
            </div>
        )
    }
}