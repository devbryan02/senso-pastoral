import { createClient } from "@/utils/supabase/client";
import {
    Iglesia,
    IglesiaUpdateRequest,
    CreateIglesiaResponse,
    DeleteIglesiaResponse,
    UpdateIglesiaResponse,
    CreateIglesiaRequest
} from "../types";

const supabase = createClient();
const TABLE_NAME = "iglesia";

export class IglesiaService {

    // Obtener los primeros 10 registros de iglesias
    async fetchFirst10(): Promise<Iglesia[]> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select("*")
            .order("fecha_registro", { ascending: true })
            .limit(10);

        if (error) {
            throw new Error(`Error fetching iglesias: ${error.message}`);
        }

        return data as Iglesia[];
    }

    //buscar por palabra
    async searchByText(text: string): Promise<Iglesia[]> {
        const queryOr = `nombre.ilike.%${text}%,direccion.ilike.%${text}%,departamento.ilike.%${text}%,provincia.ilike.%${text}%`;
        const { data, error } = await supabase.from(TABLE_NAME)
            .select("*")
            .or(queryOr)
            .limit(10);

        if (error) throw new Error(`Error searching iglesias: ${error.message}`);

        return data as Iglesia[];
    }

    //crear nueva iglesia 
    async create(payload: CreateIglesiaRequest): Promise<CreateIglesiaResponse> {
        const { data, error } = await supabase.from(TABLE_NAME)
        .insert(payload)
        .select()
        .single();

        if (error) throw new Error(`Error creating iglesia: ${error.message}`);

        return {
            data: data as Iglesia,
            message: "Iglesia creada exitosamente"
        }
    }

    //actualizar iglesia
    async update(payload: IglesiaUpdateRequest): Promise<UpdateIglesiaResponse>{

        // Validar que el ID esté presente
        const {id, ...updateData} = payload;

        const {data, error} = await supabase.from(TABLE_NAME)
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

        if (error) throw new Error(`Error updating iglesia: ${error.message}`);

        return {
            data: data as Iglesia,
            message: "Iglesia actualizada exitosamente"
        }
    }

    //eliminar iglesia
    async delete(id: string ): Promise<DeleteIglesiaResponse>{

        const {error} = await supabase.from(TABLE_NAME)
        .delete()
        .eq("id", id);

        if(error) throw new Error(`Error deleting iglesia: ${error.message}`);

        return {
            message: "Iglesia eliminada exitosamente"
        }
    }
}




