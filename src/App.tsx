import './styles.css';

import Header from './components/Header';
import List from './components/List';

function App() {
    return (
        <>
            <Header />
            <main className='container'>
                <List />
            </main>
        </>
    );
}

export default App;
