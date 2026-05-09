import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import z, { string, success } from "zod"


const paramsSchema = z.object({
    name: z.string(),
    id: z.coerce.string().optional()
})

export async function GET(req: NextRequest, params: {name: string, id: string}){
    const controler = new AbortController()
    const timoutId = setTimeout(() => controler.abort(), 5000)
    try{
        const validationParams = paramsSchema.safeParse(params)
        
        if(!validationParams.success){
            return NextResponse.json({
                error: "Dados inválidos",
                success: false,
            
            }, {status: 400})
        }

        const response = await fetch("Base url/pokemon/${id}", {

        })        

        if(!response.ok){
            clearTimeout(timoutId)
            if(response.status === 401){
                 return NextResponse.json({
                    error: "acesso negado",
                    success: false,
                })
            }
            if(response.status === 404){
                return NextResponse.json({
                    error: "pokemon não encontrado",
                    success: false,
                })
            }

            if(response.status === 429){
                return NextResponse.json({
                    error: "limite de requisições exedido",
                    success: false,
                }, {status: 429})
            }

            return NextResponse.json({
                error: 'Falha ao buscar pokemons',
                success: false,
            }, {status: response.status})
        }
        
        const {name, id} = validationParams.data


    }catch(error){

    }
}