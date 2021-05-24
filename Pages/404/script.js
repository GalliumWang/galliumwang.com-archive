new Vue({
  el: '#app',
  data() {
    return {
      startX: 0,
      x: 0,
      y: 0,
      flip: false,
      startArms: 0,
      throttledCoordinates: null
    };

  },
  methods: {
    DesktopCheck(){
      return !/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    armsTL() {
      let tl = new TimelineMax();
      tl.add('startarms');
      tl.to('#backhand', 2, {
        x: -16,
        rotation: 150,
        transformOrigin: '50% 50%' },
      'startarms');
      tl.to('#rightarm', 2, {
        rotation: 30,
        transformOrigin: '100% 0' },
      'startarms');
      tl.to('#newrightarm', 2, {
        x: -94,
        y: -918,
        rotation: 10,
        transformOrigin: '100% 100%' },
      'startarms');

      tl.to('#hand', 2, {
        x: -15,
        y: -7,
        rotation: 90,
        transformOrigin: '50% 50%' },
      'startarms');
      tl.to('#leftarm', 2, {
        rotation: 20,
        transformOrigin: '100% 0' },
      'startarms');
      tl.to('#newleftarm', 2, {
        x: -100,
        y: -924,
        transformOrigin: '100% 100%' },
      'startarms');

      return tl;
    },
    coordinates(e) {
      if(!this.throttledCoordinates){
        this.throttledCoordinates=_.throttle(this._coordinates, 30);
      }
      this.throttledCoordinates(e);
    },
    _coordinates(e) {
      if(!this.DesktopCheck()) return;
      walleBox = document.getElementById('walle').getBoundingClientRect(),
      walleCoordsX = walleBox.width / 2 + walleBox.left;
      walleCoordsY = walleBox.height * 0.405 + walleBox.top;

      if (this.startArms == 0) {
        this.startArms = this.armsTL();
      }


      this.y = (e.clientY - walleCoordsY) / walleBox.height * 5 + walleBox.height * 0;

      if (e.clientX > walleCoordsX) {
        this.x = -((e.clientX - walleCoordsX)/ 200);
        this.flip = true;
      } else {
        this.x = (e.clientX - walleCoordsX)/ 200;
        this.flip = false;

      // extend eye length
      // TODO: update extend policy
      TweenMax.set("#righteyeb2", {
        scaleX: 1 + (1 - e.clientX / walleCoordsX) / 5 });
      TweenMax.set("#lefteyeb2", {
        scaleX: 1 + (1 - e.clientX / walleCoordsX) / 5 });

      // TODO: update bot move policy
      // set horizontal move for whole bot svg
      TweenMax.set("#walle", {
        x: e.clientX / walleCoordsX * 50 - 40 });

      this.startArms.progress(1 - e.clientX / walleCoordsX).pause();

      }
    }
  },

  mounted() {
    // auto repeat animation
    let tl = new TimelineMax({
      repeat: -1,
      repeatDelay: 2 });

    tl.add('redo');
    tl.to('#lefteye', 0.5, {
      rotation: 5,
      repeat: 3,
      yoyo: true,
      transformOrigin: '100% 50%',
      ease: Sine.easeOut },
    'redo');
    tl.to('#righteye', 0.5, {
      rotation: -5,
      repeat: 3,
      yoyo: true,
      transformOrigin: '0% 30%',
      ease: Sine.easeOut },
    'redo+=0');
    tl.fromTo('#lefteyeball', 0.05, {
      scaleY: 1 },
    {
      scaleY: 0,
      repeat: 3,
      yoyo: true,
      transformOrigin: '50% 50%',
      ease: Circ.easeOut },
    'redo+=4');
    tl.fromTo('#righteyeball', 0.05, {
      scaleY: 1 },
    {
      scaleY: 0,
      repeat: 3,
      yoyo: true,
      transformOrigin: '50% 50%',
      ease: Circ.easeOut },
    'redo+=4');
    tl.to('#eyecontain', 0.4, {
      rotation: -15,
      repeat: 1,
      yoyo: true,
      transformOrigin: '50% 50%',
      ease: Sine.easeInOut },
    'redo+=2');
  } });

window.addEventListener("click",(event)=>{
  TweenMax.to('#warning', 0.5, {
    opacity: 0,
    delay: 0.2,
    ease: Sine.easeIn });
})

document.querySelector(".toggle-themes").addEventListener('click',(e)=>{
  e.stopPropagation();
})