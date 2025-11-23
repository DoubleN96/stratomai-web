this.cameras.main.fadeOut(500, 0, 0, 0);

this.cameras.main.once(
  Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
  () => {
    this.scene.start(SCENES.INTRO);
  }
);
  }
}
