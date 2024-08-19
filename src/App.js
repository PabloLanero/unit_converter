import {Component, useEffect} from 'react'
import React, {useState } from 'react';
import './estilos.css'

// Esta es la funcion con la que se carga los datos del xml y se muestran por pantalla
function CargarXML() {

  const [datos, setDatos] = useState([])

  useEffect(() => {
    fetch('/Datos.xml')
      .then((response) => response.text())
      .then((xmlString) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

          const saves = Array.from(xmlDoc.getElementsByTagName('save')).map((save) => {
            return {
              OriginalValue: save.getElementsByTagName('OriginalValue')[0].textContent,
              DataValue: save.getElementsByTagName('DataValue')[0].textContent,
              NewValue: save.getElementsByTagName('NewValue')[0].textContent,
              NewDataValue: save.getElementsByTagName('NewDataValue')[0].textContent,
            }
          })

          setDatos(saves);
      })
  })
return(
  <div className='centrador'>
  <div className='guardados'>
    <div className='saved'>
      <b>saved</b>
    </div>
    <div className='saves'>
  {datos.map((saves, index) => (
    
    <div className='save'>  

      {saves.DataValue + ' '}
      {saves.OriginalValue + ' -> '}    
        
      
       {saves.NewDataValue + ' '}
        
          {saves.NewValue}
        
        
          
        
    </div>
    ))}
    </div>
  </div>
  </div>
)


}

//Aqui en esta funcion es para gestionar la zona del conversor de unidades
function DropdownList() {
  const [unidad, setUnidad] = useState(1); 
  const [ selectedValue, setSelectedValue, ] = useState(1.09361);

  const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
      
  };

  const handleUnidadChange = (event) => {
    setUnidad(event.target.value);
  }

  return (
      <div>
        <div className='centrando'>
          <div className='principal'>
            <div className='tituloDiv'>
              <b>convert</b>
            </div>
            <div className='inputs'>
              {/*Aqui se gestiona el select para elegir como sera la conversion*/}
          <select value={selectedValue} onChange={handleSelectChange}>
              
              <option value="0.000621371" >Metros a millas</option>
              <option value="1.09361">Metros a Yardas</option>
              <option value="3.28084">Metros a Pie</option>
              <option value="39.3701">Metros a pulgadas</option>
              <option value="0.001">Metros a Kilometros</option>
              <option value="0.000621371" >Kilometros a millas</option>
              <option value="1093.61">Kilometros a Yardas</option>
              <option value="3280.83">Kilometros a Pie</option>
              <option value="39370.1">Kilometros a pulgadas</option>
              <option value="1000">Kilometros a Metros</option>
              <option value="1609.34">Millas a Metros</option>
              <option value="1760">Millas a Yardas</option>
              <option value="5280">Millas a Pies</option>
              <option value="63360">Millas a Pulgadas</option>
              <option value="0.9144">Yarda a Metro</option> 
              <option value="0.000568182">Yarda a Milla</option>
              <option value="3">Yarda a Pie</option>
              <option value="36">Yarda a Pulgadas</option>
              <option value="0.3048">Pies a Metros</option>
              <option value="0.000189394">Pies a Millas</option>
              <option value="0.33333">Pies a Yardas</option>
              <option value="0.12">Pies a Pulgadas</option>
              <option value="0.0254">Pulgadas a Metros</option>
              <option value="0.000015783">Pulgadas a Millas</option>
              <option value="0.0277778">Pulgadas a Yardas</option>
              <option value="0.0833333">Pulgadas a Pies</option>
          </select>
          {/* El input donde el usuario pondra el valor que quiere cambiar*/ }
          <input 
          type="number" 
          value={unidad}
          onChange={handleUnidadChange}
          placeholder="Medida"
      />

      </div>
        {/* Aqui se mostrara el resultado*/ }
          <p className='resultado'>{(selectedValue * unidad).toFixed(2) }</p>
      </div>

        </div>
      </div>
  );
}




class App extends Component {
  
  render() {
    return(

      <div>
      
        <div className='cabecera'>
          <div className='cabeceraTexto'>  
          <img src="./flechas.png" className='imagen' alt='flechas'></img>
            <p>unit converter</p>
          </div>
        </div>
        
      <p>
          <DropdownList />
          
      </p>
          <CargarXML />

      

      </div>
      
    )
  }

}


export default App;
