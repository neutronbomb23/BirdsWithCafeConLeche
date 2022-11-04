import { Game } from './game.js';
import { Menu } from './menu.js';

export class FadeScene extends Phaser.Scene
{
	constructor()
	{
        super({key: 'fade'});
	}

	preload()
    {
        this.load.image('portal', 'assets/portal.png');
    }

    create()
    {
		this.cameras.main.setBackgroundColor('#421278')

		this.add.image(400, 300, 'portal')

        this.input.keyboard.once('keydown-SPACE', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
    
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
            this.scene.start('fade')
                  })
        })

        this.cameras.main.fadeIn(1000, 0, 0, 0)
	}
}
