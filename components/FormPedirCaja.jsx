import * as React from 'react';
import FormControl from '@mui/base/FormControl';
import Input from '@mui/base/Input';
import { styled } from '@mui/system';
import Select, { selectClasses } from '@mui/base/Select';
import Option, { optionClasses } from '@mui/base/Option';
import Popper from '@mui/base/Popper';







// Buscar ejemplos de form para reformular
// https://www.google.com/search?q=form+mui+examples&rlz=1C1ONGR_esAR1024AR1024&oq=form+mui+examples&aqs=chrome..69i57j0i22i30l2.5862j0j9&sourceid=chrome&ie=UTF-8

// Como pasar al componente padre las props?
// https://www.youtube.com/watch?v=mcgk-NEmaQw&ab_channel=Developero




const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return <Input slots={{ input: StyledInputElement, textarea: StyledTextareaElement}} {...props} ref={ref} />;
  });

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
};

return <Select placeholder="Elige una opcion" {...props} ref={ref} slots={slots} />;
});

const FormPedirCaja = (props) => {
   
  const [formState, setFormState] = React.useState(props.formData);

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormState(prevState => ({
          ...prevState,
          [name]: value
      }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onFormSubmit(formState);
  }


    return (
      <form onSubmit={handleSubmit}>
      
        
      <CustomInput 
            name="concepto"  // <-- Asigna el nombre del estado
            value={props.concepto}
            onChange={handleInputChange}  // <-- Usa el manejador de cambio aquí
            required={true}
            aria-label="Concepto"
            placeholder="Concepto"
        />
        {/* <CustomInput name="fecha" value={props.fecha} onChange={handleInputChange}  type="date" required={true} aria-label="Demo input" placeholder="Type something…" /> */}
        <CustomSelect name="tipo" aria-label="tipo" value={props.tipo} onChange={handleInputChange}  defaultValue={"Ferreteria"} >
            <StyledOption  name="tipo" value={"Ferreteria"}>Ferreteria</StyledOption>
            <StyledOption name="tipo"  value={"Carpinteria"}>Carpinteria</StyledOption>
            <StyledOption  name="tipo" value={"Otra opcion"}>Otra opcion</StyledOption>
            <StyledOption  name="tipo" value={"Una mas"}>Una mas</StyledOption>
        </CustomSelect>
        <CustomInput 
            name="monto"  // <-- Asigna el nombre del estado
            value={props.monto}
            onChange={handleInputChange}  // <-- Usa el manejador de cambio aquí
            required={true}
            aria-label="Monto"
            placeholder="Monto"
        />

        <button type="submit">Submit</button>

      
      </form>
    );
  }

export default FormPedirCaja

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
  };
  
  const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  const StyledDateElement = styled('date')(
    ({ theme }) => `
    width: 50%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  const StyledTextareaElement = styled('textarea', {
    shouldForwardProp: (prop) =>
      !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
  })(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 50%;
    margin-bottom: 5px;
    padding: 12px;
    border-radius: 12px;
    text-align: left;
    line-height: 1.5;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &.${selectClasses.focusVisible} {
      border-color: ${blue[400]};
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    &.${selectClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `,
  );
  
  const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 0;
    min-width: 320px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
  );
  
  const StyledOption = styled(Option)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionClasses.highlighted} {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${optionClasses.highlighted}.${optionClasses.selected} {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.${optionClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `,
  );
  
  const StyledPopper = styled(Popper)`
    z-index: 99999;
  `;