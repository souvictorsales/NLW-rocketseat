const { select, input } = require('@inquirer/prompts')

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
                console.log("Vamos listar as metas")
                break
            case "sair":
                console.log("Até a próxima!!")
                return
        }
    }
}
start()