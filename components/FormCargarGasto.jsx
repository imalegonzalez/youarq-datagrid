import * as React from 'react';
import {Input, Button, Divider} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";

import { useForm } from 'react-hook-form';

// import FormControl from '@mui/base/FormControl';
// import Input from '@mui/base/Input';
// import { styled } from '@mui/system';
// import Select, { selectClasses } from '@mui/base/Select';
// import Option, { optionClasses } from '@mui/base/Option';
// import Popper from '@mui/base/Popper';





const FormCargarGasto = (props) => {
  const { register, handleSubmit, formState: { errors }, setValue  } = useForm();
  
  function onSubmit(data) {
  
    console.log(data)
    return props.onFormSubmit(data);
  }

  console.log(errors);
  const [ tipo, setTipo ] = React.useState("Tipo de gasto")

  
  
  return (
    <form className="grid grid-row-4 grid-col-flow gap-4 px-10 py-10" onSubmit={handleSubmit(onSubmit)}>
     <div className="col-span-4">
      <h1 className="col-span-4 m-0" >Cargar gasto</h1>
      <span className="col-span-4 text-sm text-slate-400 p-0">Carga nuevos gastos para rendir tu caja</span>
     </div>
      <Divider className="col-span-4 my-4" />
      <Input variant="bordered" className="col-span-2" type="text" placeholder="Obra" {...register("obra", {required: true})} />
      <Input variant="bordered" className="col-span-2" type="date" placeholder="fecha" {...register("fecha", {required: true})} />
      <Input variant="bordered" className="col-span-2" type="number" placeholder="Monto" {...register("monto", {required: true})} />
      <Dropdown className="col-span-2" >
        <DropdownTrigger >
          <Button className="col-span-2"
            variant="bordered" 
          >
            {tipo}
          </Button>
        </DropdownTrigger>
        <DropdownMenu  onAction={(key) => {
            const selectedTipo = String(key);
            setTipo(selectedTipo);
            console.log("Selected tipo:", selectedTipo);
            setValue('tipo', selectedTipo);  // Use react-hook-form to set the value directly
                }} aria-label="tipo">
          <DropdownItem value="Ferreteria" key="Ferreteria">Ferreteria</DropdownItem>
          <DropdownItem value="Cabify" key="Cabify">Cabify</DropdownItem>
          <DropdownItem value="Caja" key="Caja">Caja</DropdownItem>
          <DropdownItem value="Otro" key="Otro">Otro</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Input variant="bordered" className="col-span-4" type="text" placeholder="Concepto" {...register("concepto", {required: true, maxLength: 300})} />
      <span className="col-span-2"></span>
      
      <Input color="primary" className="col-span-4"  value="Enviar" type="submit" />
    </form>
  );
}

export default FormCargarGasto

