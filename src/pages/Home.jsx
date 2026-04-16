import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
    return (
        <main className="home">
            <Navbar />

            <section style={{ flex: 1 }}></section>

            <Footer />
        </main>
    );
};

export default Home;
