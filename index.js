const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Beber 2L de água todos os dias',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a sua meta:"})

    if(meta.length == 0){
        console.log("A meta não pode ser vazia!")
        return
    }

    metas.push({ value: meta, checked: false })
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message:"Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar, e o Enter para finalizar.",
        choices: [...metas],
        instructions: false,
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada.")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) concluída(s)")
}


const start = async () => {

    while(true){

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
                    name: "Sair",
                    value: "sair"
                }
            ]
            
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "sair":
                console.log("Até a próxima!!")
                return
        }
    }
}
start()