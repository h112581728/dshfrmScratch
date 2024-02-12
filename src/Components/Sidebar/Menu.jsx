import { Link } from 'react-router-dom';

function Menu({ icon, text, link, width }) {
    return <>
        <Link to={link}>
            <button className='px-3 py-1 text-left' style={{ width: '200px' }}>
                <div style={{ display: 'inline-block' }}>
                    <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <img src={icon} width={width} />
                    </div>
                    <div style={{ display: 'inline-block', verticalAlign: 'middle' }} className='px-2'> {text}</div>
                </div>
            </button>
        </Link>
    </>

}

export default Menu

