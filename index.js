const { select, input } = require('@inquirer/prompts')

let metas = []

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

        const opcao = await select({})

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                console.log("Vamos listar as metas")
                break
            case "sair":
                break
        }
    }
}