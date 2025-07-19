import { useState, useEffect } from "react";
import { IglesiaService } from "../service/IglesiaService";
import { CreateIglesiaRequest, CreateIglesiaResponse, Iglesia, IglesiaUpdateRequest } from "../types";
import swal from "sweetalert2";

// funcion para obtener el mensaje de error
function getErrorMesage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
}

export function useIglesias(){

    //estados necesarios
    const [iglesias, setIglesias] = useState<Iglesia[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    //instancia del servicio
    const iglesiaService = new IglesiaService();

    //cargar las primeras 10 iglesias
    const fetchIglesias  = async () => {
        try{
            setLoading(true);
            const data = await iglesiaService.fetchFirst10();
            setIglesias(data);
        }catch(err: unknown){
            setError(getErrorMesage(err));
        }finally{
            setLoading(false);
        }
    }
    
    // buscar iglesias por texto
    const searchIglesias = async (text: string) => {
        try{
            setLoading(true);
            const data  =  await iglesiaService.searchByText(text);
            setIglesias(data);
        }catch(err: unknown){
            setError(getErrorMesage(err));
        }finally{
            setLoading(false);
        }
    }

    //crear una nueva iglesia
    const createIglesia = async (payload: CreateIglesiaRequest) => {
        try{
            setLoading(true);
            const response = await iglesiaService.create(payload);
            setIglesias(prev => [...prev, response.data]);
            return response;
        }catch(err: unknown){
            const message = getErrorMesage(err); 
            setError(message);
            throw new Error(message);
        }finally{
            setLoading(false);
        }
    }

    const updateIglesia = async (payload: IglesiaUpdateRequest) => {
        try{
            setLoading(true);
            const response = await iglesiaService.update(payload);
            setIglesias(prev => prev.map(iglesia => iglesia.id === response.data.id ? response.data : iglesia));
            return response;
        }catch(err: unknown){
            const message = getErrorMesage(error);
            setError(message);
            throw new Error(message);
        }finally{
            setLoading(false);
        }
    }

    const deleteIglesia = async (id: string ) => {
        try{
            setLoading(true);

            //mensaje de confirmacion para eliminar
            const swalResponse = await swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });

            if (!swalResponse.isConfirmed) {
                return; 
            }
            await iglesiaService.delete(id);
            setIglesias(prev => prev.filter(iglesia => iglesia.id !== id));
        }catch(err: unknown){
            const message = getErrorMesage(err);
            setError(message);
            throw new Error(message);
        }finally{
            setLoading(false);
        }
    };

    //
    useEffect(() => {
        fetchIglesias();
    },[]);


    return {

        //estados 
        iglesias,
        loading, 
        error,

        //metodos
        fetchIglesias,
        searchIglesias,
        updateIglesia,
        deleteIglesia
    };
}