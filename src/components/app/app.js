import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        const storedData = JSON.parse(localStorage.getItem('employeesData'));
        this.state = {
            data: storedData || [
                { name: 'John C.', salary: 800, increase: false, rise: true, id: 1 },
                { name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2 },
                { name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3 }
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    saveDataToLocalStorage = (data) => {
        localStorage.setItem('employeesData', JSON.stringify(data));
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const newData = data.filter(item => item.id !== id);
            this.saveDataToLocalStorage(newData);
            return {
                data: newData
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            this.saveDataToLocalStorage(newArr);
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => {
            const newData = data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            });
            this.saveDataToLocalStorage(newData);
            return {
                data: newData
            }
        })
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term })
    }

    filterPost = (items, filter) => {
        if (filter === "rise") {
            return items.filter(item => item.rise);
        } else if (filter === "moreThen1000") {
            return items.filter(item => item.salary > 1000);
        } else {
            return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    onValueChange = (id, salary) => {
        this.setState(({ data }) => {
            const newData = data.map(item => {
                if (item.id === id) {
                    return { ...item, salary: parseInt(salary, 10) }
                }
                return item;
            });
            this.saveDataToLocalStorage(newData);
            return {
                data: newData
            }
        })
    }


    render() {
        const { data, term, filter } = this.state,
            employees = this.state.data.length,
            increased = this.state.data.filter(item => item.increase).length,
            visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onValueChange={this.onValueChange} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;