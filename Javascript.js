const frente = 'card_frente'
const tras = 'card_tras'
const ICON = "icon"

start()
function start() {
    game.criar_molde()
    iniciar_cards(game.criar_molde())

}

function iniciar_cards(cards) {
    tabuleiro = document.querySelectorAll('.tabuleiro')[0]
    tabuleiro.innerHTML = ''
    for (let card of game.cards) {
        let div_elemento = document.createElement('div')
        div_elemento.id = card.id

        div_elemento.classList.add('card')
        div_elemento.dataset.icon = card.icon

        criar_card_contexto(card, div_elemento)
        div_elemento.addEventListener('click', virar_card)
        tabuleiro.appendChild(div_elemento)
    }
}
        
    function criar_card_contexto(card, div_elemento) {
        criar_card_face(frente, card, div_elemento)
        criar_card_face(tras, card, div_elemento)
    }

    function criar_card_face(face, card, div_elemento) {
        let card_elemento_face = document.createElement('div')
        card_elemento_face.classList.add(face)
        if(face === frente){
            let icone_elemento = document.createElement('img')
            icone_elemento.classList.add(ICON)
            icone_elemento.src = "./Apenas+imagens/images/" + card.icon + ".png"
            card_elemento_face.appendChild(icone_elemento)
            }else{
            card_elemento_face.innerHTML =  "&lt/&gt"
        }
        div_elemento.appendChild(card_elemento_face)
    }

function virar_card() {

    if (game.set_card(this.id)){
        this.classList.add('desinverter')
        if (game.segundo_card) {      
            if (game.check()){
                game.resetar_card()
                if (game.check_fim()) {
                    let fim_de_jogo = document.querySelectorAll(".game_over")[0]
                    fim_de_jogo.style.display = 'flex'
                }
            }else{
                setTimeout(()=>{

                
                    let primeiro_card_visto = document.getElementById(game.primeiro_card.id)
                    let segundo_card_visto = document.getElementById(game.segundo_card.id)
                
                    primeiro_card_visto.classList.remove('desinverter')
                    segundo_card_visto.classList.remove('desinverter')

                    game.unflip_cards()
                }, 1000)
            }
        }
    }
}

function restart(){
    game.resetar_card()
    iniciar_cards()
    let fim_de_jogo = document.querySelectorAll(".game_over")[0]
    fim_de_jogo.style.display = 'none'
}