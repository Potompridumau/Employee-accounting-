import './app-info.css';

const AppInfo = ({employees, increased}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудникков в компании</h1>
            <h2>Общее количество сотрудникков: {employees}</h2>
            <h2>Премию получат: {increased}</h2>
        </div>
    );
}

export default AppInfo;