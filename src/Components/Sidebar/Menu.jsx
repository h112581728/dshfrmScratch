import { Link } from 'react-router-dom';

function Menu({ icon, text, link, width, classV, handler }) {

    return <>
        <Link to={link}>
            <button className={classV} style={{ width: '200px' }} onClick={handler}>
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

