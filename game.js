let game = {

    verificar:false,
    primeiro_card : null,
    segundo_card: null,

    set_card : function(id){

        let card = this.cards.filter(card => card.id === id)[0]
        if (card.virada || this.verificar) {
            return false
        }

        if (!this.primeiro_card) {
            this.primeiro_card = card
            this.primeiro_card.virada = true
            return true
        }else{
            this.segundo_card = card
            this.segundo_card.virada = true
            this.verificar = true
            return true
        }
    },

    check : function(){
        if (!this.primeiro_card || !this.segundo_card) {
            return false
        }
        return this.primeiro_card.icon === this.segundo_card.icon
    },

    resetar_card : function(){
        this.primeiro_card = null
        this.segundo_card = null
        this.verificar = false
    },

    unflip_cards(){
        this.primeiro_card.virada = false
        this.segundo_card.virada = false
        this.resetar_card()
    },

    check_fim(){
       return this.cards.filter(card => !card.virada).length == 0
    },

    tecs : [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
    ],

    cards: null,

    criar_molde : function(){
        this.cards = []
    
        for (let tec of this.tecs){
           this.cards.push(this.criar_objeto_card(tec))
        }
       this.cards = this.cards.flatMap(pair => pair)
       this.escolher_ordem()
       return this.cards
    },
    
    criar_objeto_card : function(tec){
        return [{
            id: this.criar_id(tec),
            icon: tec,
            virada: false
    
        },{
            id: this.criar_id(tec),
            icon: tec,
            virada: false
        }]
    },
    
    criar_id : function(tec) {
        return(
            tec + parseInt(Math.random() * 1000)
        )
    },

    escolher_ordem : function (){
        let ultimo = this.cards.length
        let randomindex = 0
    
        while (ultimo !== 0) {
            randomindex = Math.floor(Math.random() * ultimo)
            ultimo--
            [this.cards[randomindex], this.cards[ultimo]] = [this.cards[ultimo], this.cards[randomindex]]
        }
    }
}