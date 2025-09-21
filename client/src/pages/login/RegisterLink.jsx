import { Link } from 'react-router-dom';

const RegisterLink = () => {
    return (
        <div>
            <div
                style={{
                    marginTop: '12px',
                    color: '#cfd8dc',
                    fontSize: '0.98rem',
                    textAlign: 'center',
                }}
            >
                Don't have an Account?
            </div>
            <Link
                to="/registeruser"
                style={{
                    display: 'block',
                    marginTop: '10px',
                    backgroundColor: 'rgba(255,255,255,0.13)',
                    color: 'white',
                    border: '2px solid #fff',
                    borderRadius: '6px',
                    padding: '8px 0',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    letterSpacing: '1px',
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
                    textAlign: 'center',
                    cursor: 'pointer',
                }}
            >
                Create Account Now
            </Link>
        </div>
    );
}

export default RegisterLink;
