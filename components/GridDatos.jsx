"use client"

import { DataGrid} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomId,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator'; 

import { useEffect, useState } from 'react';
import * as React from 'react';

import Button from '@mui/material/Button';
import { formatValue } from 'react-currency-input-field';
import { Box, Icon, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormCargarGasto from './FormCargarGasto';
import moment from 'moment';
import {Chip} from "@nextui-org/react";
import FormPedirCaja from './FormPedirCaja';


const formatearValor = (valor) => {
  const totalFormateado = formatValue({
    value: valor.toString(),
    groupSeparator: ',',
    decimalSeparator: '.',
    prefix: '$'
  });
  return totalFormateado
}

const handlePedirCaja = () => {
  console.log("pidiendo caja")
}

const GridDatos = () => {
  const [cajaState, setCajaState] = useState([]);

  useEffect(() => {
    setCajaState(nuevasRows);
  }, []);
  

  // https://mui.com/x/react-data-grid/row-updates/

  // https://mui.com/x/react-data-grid/editing/#persistence
  
  //Actualizar estado cuando se actualiza una row
  const processRowUpdate = React.useCallback(
    (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setCajaState(cajaState.map((row) => (row.id === newRow.id ? updatedRow : row)));
      
      return updatedRow
    }
  );


  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);




  const CardComponent = (props) => {
    const [total, setTotal] = useState(0);
    const [formatedTotal, setFormatedTotal] = useState(0);
    const [porCobrar, setPorCobrar] = useState(0);
    const [porRendir, setPorRendir] = useState(0);
  
    useEffect(() => {

      if (!Array.isArray(props.datos) || props.datos.length === 0) {
        // Los datos aún no están cargados, salir del useEffect
        console.log("sin array")
        return;
      }

      let tempTotal = 0;
      let tempCobros = 0;
      let tempRendir = 0;
      
      if (Array.isArray(props.datos)) {
        props.datos.forEach((item) => {
          // console.log("Item actual:", item); // veremos cada objeto del array
          if (item.estado_pago === "Pagado" ){
            if (item.tipo === "CajaArquitecto") {
              console.log("Restando monto:", item.monto); // cuando se restará un monto
              tempTotal += item.monto;
            } 
           
            else {
              console.log("Sumando monto:", item.monto); // cuando se sumará un monto
              tempTotal -= item.monto;
            }

          }

          if (item.estado_pago === "Pendiente" ){
            if (item.tipo === "CajaArquitecto") {
              console.log("Sumando por cobrar", item.monto); // cuando se restará un monto
              tempCobros += item.monto;
            } 
           
            else {
              console.log("Sumando por rendir:", item.monto); // cuando se sumará un monto
              tempRendir += item.monto;
            }

          }
        });
        
        console.log("Total calculado:", tempTotal); // el total después de todos los cálculos

        const formatearValor = (valor) => {
          const totalFormateado = formatValue({
            value: valor.toString(),
            groupSeparator: ',',
            decimalSeparator: '.',
            prefix: '$'
          });
          return totalFormateado
        }
        
  
        setTotal(tempTotal);
        setPorCobrar(formatearValor(tempCobros))
        setPorRendir(formatearValor(tempRendir))
        setFormatedTotal(formatearValor(tempTotal));
        
      } else {
        console.log("props.datos no es un array"); // si props.datos no es un array
      }
    }, [props.datos]);
  
    return (
      <div className='cardWrapper flex'>
        <div className ="card card-saldo" >
          <h2 className='h2Card'>Saldo Actual</h2>
          <p>{formatedTotal}</p>
        </div>
        <div className ="card" >
          <h2 className='h2Card'>Por cobrar</h2>
          <p>{porCobrar}</p>
        </div>
        <div className ="card" >
          <h2 className='h2Card'>Por Rendir</h2>
          <p>{porRendir}</p>
        </div>
      </div>
    );
  };

  const CargarGastoButton = () => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        obra: "Nueva Obra",
        concepto: "",
        monto: "",
        tipo: "",
        fecha: ""
    });

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleFormSubmit = (data) => {
      setFormData(data);  // Actualizar el estado del modal con los datos del formulario
      console.log(data)

      // Agrega la data a cajaState
      setCajaState(prevState => [...prevState, {
      ...data,
      monto: Number(data.monto),
      estado_pago: "Pendiente",
      id: randomId(), // Genera un nuevo ID aleatorio para esta entrada
  }]);

      handleClose();      // Cerrar el modal
    };

    return (
      <>
        <button onClick={handleOpen} className='accion-boton'>Cargar Gasto</button>
        <Modal
          disableEnforceFocus 
          className='modal-action'
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className="boxModal">
            <button onClick={handleClose} className='accion-boton closeModal'><CloseIcon/></button>
            <FormCargarGasto onFormSubmit={handleFormSubmit} formData={formData}/>
          </Box>
        </Modal>
      </>
    )
}

const PedirCajaButton = () => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
      obra: "Nueva Obra",
      concepto: "",
      monto: "",
      tipo: "CajaArquitecto",
      fecha: ""
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);  // Actualizar el estado del modal con los datos del formulario
    console.log(data)

    // Agrega la data a cajaState
    setCajaState(prevState => [...prevState, {
    ...data,
    monto: Number(data.monto),
    estado_pago: "Pendiente",
    tipo: "CajaArquitecto",
    id: randomId(), // Genera un nuevo ID aleatorio para esta entrada
  }]);

    handleClose();      // Cerrar el modal
  };

  return (
    <>
      <button onClick={handleOpen} className='accion-boton'>Pedir Caja</button>
      <Modal
        disableEnforceFocus 
        className='modal-action'
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="boxModal">
          <button onClick={handleClose} className='accion-boton closeModal'><CloseIcon/></button>
          <FormPedirCaja onFormSubmit={handleFormSubmit} formData={formData}/>
        </Box>
      </Modal>
    </>
  )
}
  


  return (
    <div className='p-1 lg:p-[200px] '> 
      <div sx={{ height: 400, width: '100%'}}>
          <CardComponent datos={cajaState}/>
        <div className='header-tabla'>
          <h1>Pendientes</h1>
          <div className='button-wrap'>
            <CargarGastoButton titulo="Cargar Gasto"/>
            <PedirCajaButton titulo="Pedir Caja" />
          </div>
        </div>
        <DataGrid
            disableColumnFilter
            rowHeight={35}
            hideFooter
            stickyHeader
            // Probando con Commit de la celda editada
            // onCellEditCommit={onCellEditCommit}
            // // Probando row edit mode
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            on
            sx={{marginBottom: "50px",backgroundColor: "white"}}
            className='mb-5'
            rows={cajaState} columns={columns}
            initialState={{
              filter: {
                filterModel: {
                  items: [{ field: 'estado_pago', operator: "is", value: "Pendiente" }],
                },
              },
            }} 
        />


        {/* <h1>Personas con mas o menos de 25 años</h1>
        <DataGrid 
        rows={cajaState} columns={columns2}
        rowHeight={35}
        hideFooter
        sx={{
          marginBottom: "50px"
        }}

        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        initialState={{
          filter: {
            filterModel: {
              items: [{ field: 'age', operator: '<', value: 25 }],
            },
          },
        }}
         /> */}

        <h1>Historial</h1>
        <DataGrid 
        rows={cajaState} columns={columns}
        rowHeight={35}
        hideFooter
        sx={{marginBottom: "50px",backgroundColor: "white"}}
        
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        initialState={{
          filter: {
            filterModel: {
              items: [{ field: 'estado_pago', operator: "not", value: "Pendiente" }],
            },
          },
        }}
         />
      </div>   
    </div>
  )
}

const chipColors = {
  'Pendiente': 'default',
  'Pagado': 'success',
  'Rechazado': 'danger'
};



const columns = [
    { 
      field: 'estado_pago',
      headerName: 'Estado',
      type: 'singleSelect',
      valueOptions: ['Pendiente', 'Pagado', 'Rechazado'],
      width: 150,
      cellClassName: 'estadoPagoCell',
      renderCell: (cellValues) => {
        return (
          <>
            <Chip
              color={chipColors[cellValues.value] || 'default'}
              size="sm"
            >
            {cellValues.value}
            </Chip>
          </>
        )},
      editable: true,
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      type: 'date',
      typewidth: 180,
      width: 130, 
      valueFormatter: params => 
      moment(params?.value).format('L'),
      
    },
    { field: 'obra', headerName: 'Obra',width: 200, editable: true },
    { field: 'concepto', headerName: 'Concepto', editable: true },
    { 
      field: 'monto',
      headerName: 'Monto',
      type: 'number',
      valueGetter: (params) => {
        if (!params.value) {
          return "11111";
        }
        // Convert the decimal value to a percentage
        return params.value;
      },
      editable: true 
    },
    { field: 'tipo',width:200, headerName: 'Tipo', editable: true },
    
  ];

 
  
  
const nuevasRows = [
    {
      id: 1,
      estado_pago: "Pendiente",
      fecha: randomCreatedDate(),
      obra: "Zapiola 2345",
      concepto: "Tornillos",
      monto: 2300,
      tipo: "Ferreteria",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 2,
      estado_pago: "Pendiente",
      fecha: randomCreatedDate(),
      obra: "Cabrera 1356",
      concepto: "Flete puerta",
      monto: 6000,
      tipo: "Fletes",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 3,
      estado_pago: "Pendiente",
      fecha: randomCreatedDate(),
      obra: "Av Cordoba 6087",
      concepto: "Caja",
      monto: 10000,
      tipo: "CajaArquitecto",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 4,
      estado_pago: "Pagado",
      fecha: randomCreatedDate(),
      obra: "Av. Olazabal 1245",
      concepto: "Flexibles",
      monto: 4000,
      tipo: "Sanitarios",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 5,
      estado_pago: "Rechazado",
      fecha: randomCreatedDate(),
      obra: "Av Cordoba 6087",
      concepto: "Cabify",
      monto: 6000,
      tipo: "Transporte",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 6,
      estado_pago: "Pagado",
      fecha: randomCreatedDate(),
      obra: "Galvan 2145",
      concepto: "Tornillos",
      monto: 3400,
      tipo: "Fletes",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 7,
      estado_pago: "Pagado",
      fecha: randomCreatedDate(),
      obra: "Av Cordoba 6087",
      concepto: "Volquete",
      monto: 16000,
      tipo: "Volquetes",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 8,
      estado_pago: "Rechazado",
      fecha: randomCreatedDate(),
      obra: "Galvan 2145",
      concepto: "Caja",
      monto: 20000,
      tipo: "CajaArquitecto",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 9,
      estado_pago: "Pagado",
      fecha: randomCreatedDate(),
      obra: "Av Cordoba 6087",
      concepto: "Caja",
      monto: 12000,
      tipo: "CajaArquitecto",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 10,
      estado_pago: "Pagado",
      fecha: randomCreatedDate(),
      obra: "Freire 1768",
      concepto: "Tornillos",
      monto: 3000,
      tipo: "Ferreteria",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 11,
      estado_pago: "Rechazado",
      fecha: randomCreatedDate(),
      obra: "Av Cordoba 6087",
      concepto: "Cabify",
      monto: 9000,
      tipo: "Transporte",
      fecha_pago: randomUpdatedDate()
    },
    {
      id: 12,
      estado_pago: "Pagado",
      fecha: randomCreatedDate(),
      obra: "Concordia 2468",
      concepto: "Fletes",
      monto: 12000,
      tipo: "Fletes",
      fecha_pago: randomUpdatedDate()
    },
  ]
export default GridDatos;
