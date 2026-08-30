scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(14, 2))
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gotSword) {
        mySprite.setImage(assets.image`swordLink`)
        pause(300)
        attack = true
        mySprite.setImage(assets.image`attack`)
        pause(300)
        attack = false
        mySprite.setImage(assets.image`myImage0`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`pressureplate`, function (sprite, location) {
    if (!(gotSword)) {
        if (controller.A.isPressed()) {
            tiles.setTileAt(tiles.getTileLocation(13, 5), assets.tile`myTile3`)
            game.showLongText("you got a sword.press B to swing", DialogLayout.Bottom)
            gotSword = true
            mySprite2 = sprites.create(img`
                . . f f f . . . . . . . . f f f 
                . f f c c . . . . . . f c b b c 
                f f c c . . . . . . f c b b c . 
                f c f c . . . . . . f b c c c . 
                f f f c c . c c . f c b b c c . 
                f f c 3 c c 3 c c f b c b b c . 
                f f b 3 b c 3 b c f b c c b c . 
                . c b b b b b b c b b c c c . . 
                . c 1 b b b 1 b b c c c c . . . 
                c b b b b b b b b b c c . . . . 
                c b c b b b c b b b b f . . . . 
                f b 1 f f f 1 b b b b f c . . . 
                f b b b b b b b b b b f c c . . 
                . f b b b b b b b b c f . . . . 
                . . f b b b b b b c f . . . . . 
                . . . f f f f f f f . . . . . . 
                `, SpriteKind.Enemy)
            tiles.placeOnTile(mySprite2, tiles.getTileLocation(8, 8))
            pause(1000)
            mySprite2.follow(mySprite)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`caveEnter`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (attack) {
        sprites.destroy(mySprite2)
    }
})
let mySprite2: Sprite = null
let attack = false
let gotSword = false
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
mySprite = sprites.create(assets.image`myImage0`, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(5, 15))
