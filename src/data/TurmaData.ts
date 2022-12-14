import { Turma } from "../Informations";
import BaseDataBase from "./BaseDataBase";

export class TurmaData extends BaseDataBase {

    async criarTurma(turma: Turma, id:string): Promise<string> {

        await this.getConnetion().insert({
            id: id,
            nome: turma.getNome()
        }).into("Turma")

        return `turma ${turma.getNome()} criada com sucesso `
    }

    async selecionarTurmasAtivas(): Promise<Turma[]> {

        const result = await this.getConnetion()
            .select("*")
            .from("Turma")
            .where("modulo", ">", 0)

        const todasTurmas = result.map((turma) => {
            return new Turma(turma.nome, turma.id, turma.modulo)
        })

        return todasTurmas
    }

    async mudarModulo(id: string, modulo: number): Promise<string> {
        await this.getConnetion()
            .update({ modulo })
            .into("Turma")
            .where({ id })

        return `O modulo foi alterado com sucesso!`
    }

    async buscarTurmaPeloId(id: string) {

        const result = await this.getConnetion()
            .select("*")
            .from("Turma")
            .where({ id })
    
        return result
    }
}