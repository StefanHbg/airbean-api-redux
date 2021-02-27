import React from 'react'
import droneSvg from '../../assets/graphics/drone.svg'

export default function Status() {
    return (
        <div className="status-container">
            <div className="div-p-svg">
                <p className="status-p">API anropet som renderar ORDERNR</p>
                <img src={droneSvg}></img>
            </div>
            <div className="status-div">
                <h2 className="status-h2-styling">Din beställning <br/> är på väg!</h2>
            </div>
            <p className="eta-time">Lägga in ETA</p>
            <div className="status-btn-container">
                <button className="status-btn">Ok, cool!</button>
            </div>
        </div>
    )
}
