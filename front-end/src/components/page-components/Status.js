import { useEffect, useState } from 'react'
import droneSvg from '../../assets/graphics/drone.svg'
import loader from '../../assets/graphics/loader.png'

export default function Status() {

    const [loading, setLoading] = useState(true);
    const [eta, setEta] = useState('');
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/api/beans', {
            method: 'post',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEta(data.eta);
                setOrderNumber(data.orderNr);
                //setLoading(false);
            })
    }, [])

    // Innan vi har fått datan från API:et så renderas förljande: 
    if (loading) {
        return (
        <div className="loading-container">
            <img className="loading-png" alt="loader-png" src={loader}></img>
            <p>Din beställnings förbereds</p>
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
            <div className="status-btn-container">
                <button className="status-btn">Ok, cool!</button>
            </div>
        </div>
    )
}
