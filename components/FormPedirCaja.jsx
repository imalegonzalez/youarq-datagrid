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





const FormPedirCaja = (props) => {
  const { register, handleSubmit, formState: { errors }, setValue  } = useForm();
  
  function onSubmit(data) {
  
    console.log(data)
    return props.onFormSubmit(data);
  }

  console.log(errors);
  const [ tipo, setTipo ] = React.useState("CajaArquitecto")

  
  
  return (
    <form className="grid grid-row-4 grid-col-flow gap-4 px-10 py-10" onSubmit={handleSubmit(onSubmit)}>
     <div className="col-span-4">
      <h1 className="col-span-4 m-0" >Pedir Caja</h1>
      <span className="col-span-4 text-sm text-slate-400 p-0">Hace un pedido de caja, el mismo debera ser aprobado con administración</span>
     </div>
      <Divider className="col-span-4 my-4" />
      <Input variant="bordered" className="col-span-4" type="text" placeholder="Obra" {...register("obra", {required: true})} />
      <Input variant="bordered" className="col-span-2" type="date" placeholder="fecha" {...register("fecha", {required: true})} />
      <Input variant="bordered" className="col-span-2" type="number" placeholder="Monto" {...register("monto", {required: true})} />
      <Input variant="bordered" className="col-span-4" type="text" placeholder="Concepto" {...register("concepto", {required: true, maxLength: 300})} />
      <span className="col-span-2"></span>
      
      <Input color="primary" className="col-span-4"  value="Enviar" type="submit" />
    </form>
  );
}

export default FormPedirCaja

