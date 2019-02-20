// https://www.typescriptlang.org/docs/handbook/classes.html
// tslint:disable
class Animal {
    name: string
    protected speed: number

    constructor(theName: string) {
        this.name = theName
        this.speed = 0
    }

    move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`)
    }
}

class Dog extends Animal {
    _barkCount: number
    static isDog = true

    constructor(name: string) {
        super(name)
        this._barkCount = 0
    }

    bark() {
        this._barkCount++
    }

    get barkCount() {
        return this._barkCount
    }
}

class Cat extends Animal {
    private age: number

    constructor(name: string) {
        super(name)
        this.age = 0
    }

    getOlder() {
        this.age = this.age + 1
    }
}

abstract class Art {
    authors: string[]

    protected constructor(authors: string[]) {
        this.authors = authors
    }
}

class Painting extends Art {
    colors: string[]

    constructor(colors: string[], authors: string[]) {
        super(authors)
        this.colors = colors
    }
}

class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

interface Point3d extends Point {
    z: number
}
