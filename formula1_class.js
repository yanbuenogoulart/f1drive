class Obj {
    constructor(x, y, w, h, a) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
    }
    
    des_obj() {
        des.fillStyle = this.a;
        des.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Carro extends Obj {
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a);
        this.dirX = 0;
        this.dirY = 0;
        this.pts = 0;
        this.vida = 5;
        this.frame = 1;
        this.tempo = 0;
    }

    des_car_img() {
        let img = new Image();
        img.src = this.a;
        des.drawImage(img, this.x, this.y, this.w, this.h);
    }

    anim(nome) {
        this.frame = (this.frame % 4) + 1;
        this.a = "assets/" + nome + this.frame + ".png";
    }
    
    des_carro() {

    }

    mov_carro() {
        this.x += this.dirX;
        this.y += this.dirY;
        
        if(this.x <= 2) this.x = 2;
        if(this.x >= 416) this.x = 416;
        
        if(this.y <= 2) this.y = 2;
        if(this.y >= 580) this.y = 580;
    }

    point(objeto) {
        return (objeto.y >= 680) && (objeto.y <= 684);
    }
    
    colid(objeto) {
        return (this.x < objeto.x + objeto.w) &&
               (this.x + this.w > objeto.x) &&
               (this.y < objeto.y + objeto.h) &&
               (this.y + this.h > objeto.y);
    }
}

class Carro2 extends Carro {
    mov_carro2() {
        this.y += 15;
        if(this.y >= 780) this.recomeca();
    }
    
    recomeca() {
        this.y = -100;
        this.x = Math.floor(Math.random() * (416 - 2 + 1)) + 2;
    }
}

class Estrada extends Obj {
    des_estrada() {
        des.fillStyle = this.a;
        des.fillRect(this.x, this.y, this.w, this.h);
    }

    mov_est() {
        this.y += 4;
        if(this.y >= 780) this.y = -100;
    }
}

class Text {
    des_text(text, x, y, cor, font) {
        des.fillStyle = cor;
        des.font = font;
        des.fillText(text, x, y);
    }
}