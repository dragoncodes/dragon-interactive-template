import {TimelineLite} from 'gsap';

class MainController {
  constructor() {
    var tl = new TimelineLite(),
      overlay = $('.loading-overlay');

    tl.from(overlay, 0.5, {opacity: 1});
    tl.to(overlay, 0.5, {opacity: 0, display: 'none'});

  }

}

new MainController();
