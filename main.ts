scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`grassLands`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(14, 2))
    area = "grassLands"
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
    tiles.setCurrentTilemap(tilemap`batRoom`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
    area = "batRoom"
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(menuOpen)) {
        controller.moveSprite(mySprite, 0, 0)
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("save"),
        miniMenu.createMenuItem("load")
        )
        myMenu.setFlag(SpriteFlag.RelativeToCamera, true)
        menuOpen = true
        miniMenu.onButtonPressed(myMenu, miniMenu.Button.A, function (selection, selectedIndex) {
            if (selection == "save") {
                blockSettings.writeString("area", area)
                blockSettings.writeNumber("mySpriteX", mySprite.x)
                blockSettings.writeNumber("mySpriteY", mySprite.y)
                if (gotSword) {
                    blockSettings.writeString("gotSword", "true")
                } else {
                    blockSettings.writeString("gotSword", "false")
                }
            }
            if (selection == "load") {
                if (blockSettings.readString("area") == "grassLands") {
                    tiles.setCurrentTilemap(tilemap`grassLands`)
                }
                if (blockSettings.readString("area") == "batRoom") {
                    tiles.setCurrentTilemap(tilemap`batRoom`)
                }
                mySprite.setPosition(blockSettings.readNumber("mySpriteX"), blockSettings.readNumber("mySpriteY"))
                if (blockSettings.readString("gotSword") == "true") {
                    gotSword = true
                } else {
                    gotSword = false
                }
            }
        })
    } else {
        miniMenu.close(myMenu)
        controller.moveSprite(mySprite, 100, 100)
        menuOpen = false
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (attack) {
        sprites.destroy(mySprite2)
    }
})
let myMenu: Sprite = null
let menuOpen = false
let mySprite2: Sprite = null
let attack = false
let gotSword = false
let area = ""
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`grassLands`)
mySprite = sprites.create(assets.image`myImage0`, SpriteKind.Player)
area = "grassLands"
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(5, 15))
music.play(music.createSong(hex`000e0104080a0505001c000f0a006400f4010a00000400000000000000000000000000000000027e0020002500012c2500290001312b002f0001333000350001363500390001383b003f00013d40004100013841005a0001bb60007700013880008100013881008c00013a90009b000136a000ab000133b000b8000131c000ca0001b4d000d30001b4d500d8000133db00de000131e000ea00012cf000fa00013300013001013106001c00010a006400f401640000040000000000000000000000000000000002b40000002e00042529312c300032000425292c3135003800042531292c3b003d00042531292c4000690004a82cafb47000730004a82cafb47500780004a8af2cb47b007d0004a82cb4af8000a900042a2e3631b000b300042a2e3136b500b800042a2e3136bb00be00042a2e3136c000d900042aadb431e000e2000425a8ad31e500e7000425a831adeb00ed00042531a8adf000f20004272aafb4f500f70004272ab4affb00fd000427b42aaf00012e01042529312c07001c00020a006400f401640000040000000000000000000000000000000003200100000500011905000b00011d0b001000012010001500012515001b0001201b002000011d20002500011925002b00011d2b003000012030003500012535003b0001203b004000011d40004500019745004b00019c4b00500001205000550001a355005b0001205b006000019c60006500019765006b00019c6b00700001207000750001a375007b0001207b008000019c80008500011985008b00011e8b009000012290009500012595009b0001229b00a000011ea000a5000119a500ab00011eab00b0000122b000b5000125b500bb000122bb00c000011ec000c5000119c500cb00011ecb00d00001a1d000d50001a8d500db0001a1db00e000011ee000e5000119e500eb00011eeb00f00001a1f000f5000125f500fb0001a3fb000001011e08001c000e050046006603320000040a002d00000064001400013200020100026d0000000b00020d9315001800010d1b001e00010d20003100010d4000530001905500580001905b005e0001906000710001908000930001129500980001129b009d000112a000b1000112c000d0000195d500d8000195db00dd000195e000ec000195f000f800019700013001011909010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800770000000e00020307150017000203071b001d0002030720002f0002030740005100020307550058000203075b005d0002030760006e0002030780008f00020307950098000203079b009d00020307a000ad00020307c000cf00020307d500d700020307db00dd00020307e000ee0002030700011e01020308057f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f063e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e074444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444440856565656565656565656565656565656565609537f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f`), music.PlaybackMode.LoopingInBackground)
