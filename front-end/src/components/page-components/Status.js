import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import droneSvg from '../../assets/graphics/drone.svg'
import loader from '../../assets/graphics/loader.png'

export default function Status() {

    const [loading, setLoading] = useState(true);
    const [eta, setEta] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/api/beans', {
            method: 'post',
        })
            .then((response) => response.json())
            .then((data) => {
                setEta(data.eta);
                setOrderNumber(data.orderNr);
                setLoading(false);
            })
    }, [])

    // Before we have gotten the Data from the API, loading renders. 
    if (loading) {
        return (
        <div className="loading-container">
            <img className="loading-png" alt="loader-png" src={loader}></img>
            <p>Stäng inte sidan. Din beställning tas emot.</p>
        </div>
        )
    }

    return (
        <div className="status-container">
            <div className="div-p-svg">
                <p className="status-p">Ordernummer <strong>#{orderNumber}</strong></p>
                <img alt="drone-svg" src={droneSvg}></img>
            </div>
            <div className="status-div">
                <h2 className="status-h2-styling">Din beställning <br/> är på väg!</h2>
            </div>
            <p className="eta-time"><strong>{eta}</strong> minuter</p>
            <div onClick={() => history.push('/menu')} className="status-btn-container">
                <button className="status-btn">Ok, cool!</button>
            </div>
        </div>
    )
}
