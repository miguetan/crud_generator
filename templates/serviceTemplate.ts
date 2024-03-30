import axios from 'axios';
import tools from "@/composables/tools";
import { {{Modelo}} } from '@/interfaces/{{Modelo}}'


export abstract class {{Modelo}}Service{

    static async getAll(page:number,filter:{{Modelo}}) : Promise<{
                                        data: {{Modelo}}[],
                                        current_page: number,
                                        last_page: number,
                                        }|null>{
            try {
            const response = await axios.get('{{modelo}}s',{params:{page:page,filter:filter}})
            return response.data
            } catch (error) {
            tools().toast('No se pudo obtener las {{modelo}}s','danger',5000)
            return null
            }      
            }

    static async get(id:number) : Promise<{{Modelo}}>{
        try {
            const response = await axios.get('{{modelo}}s/' + id)
            return response.data
        } catch (error) {
            tools().toast('No se pudo obtener la {{modelo}} #' + id,'danger',5000)
            return {} as {{Modelo}}
        }      
    }

    static async create(my{{Modelo}}:{{Modelo}}) : Promise<{{Modelo}}>{
        try {
            const response = await axios.post('{{modelo}}s',my{{Modelo}})
            tools().toast('Se ha creado la {{modelo}} #' + response.data.id + ' correctamente','success',5000)
            return response.data
        } catch (error) {
            tools().toast('No se pudo crear la {{modelo}}','danger',5000)
            return {} as {{Modelo}}
        }      
    }

    static async update(my{{Modelo}}:{{Modelo}}) : Promise<{{Modelo}}>{
        try {
            const response = await axios.put('{{modelo}}s/' + my{{Modelo}}.id,my{{Modelo}})
            tools().toast('Se ha actualizado la {{modelo}} #' + my{{Modelo}}.id + ' correctamente','success',5000)
            return response.data
        } catch (error) {
            tools().toast('No se pudo actualizar la {{modelo}} #' + my{{Modelo}}.id,'danger',5000)
            return {} as {{Modelo}}
        }      
    }

    static async toggleActive(my{{Modelo}}:{{Modelo}}) : Promise<{{Modelo}}[]>{
        try {
            const response = await axios.post('{{modelo}}s/' + my{{Modelo}}.id + '/toggle')
            tools().toast('Se ha cambiado el estado de la {{modelo}} #' + my{{Modelo}}.id + ' correctamente','success',5000)
            return response.data
        } catch (error) {
            tools().toast('No se pudo cambiar el estado de la {{modelo}} #' + my{{Modelo}}.id,'danger',5000)
            return {} as {{Modelo}}[]
        }      
    }

    static async destroy(my{{Modelo}}:{{Modelo}}) : Promise<boolean>{
        try {
            const response = await axios.delete('{{modelo}}s/' + my{{Modelo}}.id)
            tools().toast('Se ha borrado la {{modelo}} #' + my{{Modelo}}.id + ' correctamente','success',5000)
            return true
        } catch (error) {
            tools().toast('No se pudo borrar la {{modelo}} #' + my{{Modelo}}.id,'danger',5000)
            return false
        }      
    }
}