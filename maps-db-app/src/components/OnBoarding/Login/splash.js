import Button from '../../Design/Button';
import Container from '../../Design/Container';
import { Link } from 'react-router-dom';

const SplashPage = ({ setUser }) => {

    return(
        <div className="middle">
            <Container>
                <div className='formContainer'>
                    <div>
                        <h1 className="title text-center">Campus in de buurt</h1>
                        <p>
                            Veniam reprehenderit commodo velit tempor consectetur culpa Lorem amet reprehenderit cupidatat sint. In reprehenderit sint occaecat nisi amet est exercitation do. Nostrud aliqua id labore do laboris ea fugiat.
                        </p>
                        <div className='btnContainer'>
                            <Link to="/login"><Button color="primary" className="center bigBtn">Get started</Button></Link>
                        </div>
                        <p className='text-center'><Link className="formSmall" to="/login">Login as docent</Link></p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SplashPage;