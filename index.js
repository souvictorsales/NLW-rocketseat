const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem-vindo ao aplicativo de controle de metas!";
let meta = {
    value: "Beber 2L de água todos os dias",
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a sua meta:"})

    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia!"
        return
    }

    metas.push({ value: meta, checked: false })

    mensagem = "Parabéns! Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message:"Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar, e o Enter para finalizar.",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada."
        return
    }    

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta concluída!"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = "Ainda não há metas realizadas."
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        mensagem = "Não há metas abertas."
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const metasDeletar = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const metasParaDeletar = await checkbox({
        message:"Selecione uma meta para deletar.",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(metasParaDeletar.length == 0){
        mensagem = "Nenhum item selecionado!"
        return
    }

    metasParaDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletadas com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();
    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}


const start = async () => {

    while(true){
        mostrarMensagem()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"

                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"

                },
                {
                    name: "Metas Abertas",
                    value: "abertas"

                },
                {
                    name: "Deletar Meta(s)",
                    value: "deletar"

                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
            
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await metasDeletar()
                break
            case "sair":
                console.log("Até a próxima!!")
                return
        }
    }
}
start()