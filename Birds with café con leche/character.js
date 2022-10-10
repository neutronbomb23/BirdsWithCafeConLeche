export class position{
	constructor(x, y){
		this._x = x;
		this._y = y;
	}
	
	getX(){return this._x}
	getY(){return this._y}
	setX(x){this._x = x}
	setY(y){this._y = y}
	addX(x){this._x = (this.getX() + x)}
	addY(y){this._y = (this.getY() + y)}
}

//Clase base Enemy
export class Enemy{
	constructor(name, position, size, color, imgId){
		this.name = name;
		this._position = position;
		this._size = size;
		this._color = color;
		this._imgId = imgId
		this._direction = 'right'
		this._directionY = 'down'
	}
}