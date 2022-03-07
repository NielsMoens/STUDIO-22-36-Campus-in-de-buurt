import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import MainRouting from './MainRouting';

const App = () => {

    return (
        <>
            <Header />
            <div className="content">
                <div className="app">
                    <Sidebar />
                    <main>
                        <MainRouting />
                    </main>
                </div>
            </div>
        </>
    )
};

export default App;
