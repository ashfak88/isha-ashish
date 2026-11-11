// Page opening curtain, YouTube song playback from 0:00, mute toggle, and scroll animations.
export const bodyClass = "";
export const bodyStyle = "";
export const scripts = [
  {
    src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  },
  {
    src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  },
  {
    src: "https://cdnjs.cloudflare.com/ajax/libs/lenis/1.1.13/lenis.min.js",
  },
  {
    code: `
window.WEDDING_CONFIG = {
  couple: {
    brideName: "Isha Wadhwa",
    groomName: "Ashish Goel",
    monogram: "I & A",
    tagline: "Wedding Invitation"
  },
  event: {
    dateISO: "2026-12-11T20:00:00+05:30",
    dateDisplay: "Friday, 11 December 2026",
    time: "8:00 PM",
    venueName: "The Eastern Address",
    venueAddress: "Devasya City Centre, Plot 11, near Karkardooma Court, Vishwas Nagar Extension, Vishwas Nagar, Shahdara, Delhi, 110032"
  },
  youtubeVideoId: "NZGHXy1IAHM",
  rsvp: {
    whatsappNumber: "919811593066"
  }
};
`,
  },
  {
    code: `
(function(){
  "use strict";
  const CFG = window.WEDDING_CONFIG;

  /* ---------------- YouTube IFrame Player API ---------------- */
  let ytPlayer = null;
  let ytReady = false;
  let prebuffering = false;
  let prebufferedAtZero = false;
  let pendingPlay = false;
  let isPlaying = false;
  let userMuted = false;
  let retryAttached = false;
  let opened = false;

  const musicBtn = document.getElementById('music-control');
  const disc = document.getElementById('discIcon');

  // Show the mute/music button right over the corner icon
  if(musicBtn){
    musicBtn.classList.add('visible');
  }

  function updateDisc(playing){
    isPlaying = !!playing;
    if(disc){
      disc.classList.toggle('spinning', isPlaying && !userMuted);
    }
    if(musicBtn){
      musicBtn.classList.toggle('is-muted', userMuted || !isPlaying);
      if(isPlaying && !userMuted){
        musicBtn.classList.remove('needs-tap');
      }
    }
  }

  function registerMediaSession(){
    if(!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'A Thousand Years',
        artist: 'Isha & Ashish Wedding',
        album: 'Shubh Vivah'
      });
      navigator.mediaSession.setActionHandler('play', () => {
        userMuted = false;
        resumeYouTube();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        userMuted = true;
        if(ytPlayer && ytReady){
          ytPlayer.pauseVideo();
        }
        updateDisc(false);
      });
    } catch(e) {}
  }

  function playYouTubeFromStart(){
    prebuffering = false;
    userMuted = false;
    if(ytPlayer && ytReady){
      try {
        ytPlayer.unMute();
        ytPlayer.setVolume(70);
        if(!prebufferedAtZero){
          ytPlayer.seekTo(0, true);
        }
        prebufferedAtZero = false;
        ytPlayer.playVideo();
        pendingPlay = false;
        registerMediaSession();
      } catch(e) {
        attachAutoRetry();
      }
    } else {
      pendingPlay = true;
    }
  }

  function resumeYouTube(){
    if(!opened || userMuted || !ytPlayer || !ytReady) return;
    try {
      ytPlayer.unMute();
      ytPlayer.setVolume(70);
      ytPlayer.playVideo();
    } catch(e) {}
  }

  function attachAutoRetry(){
    if(retryAttached) return;
    retryAttached = true;
    const tryAgain = () => {
      if(isPlaying || userMuted){
        document.removeEventListener('click', tryAgain);
        document.removeEventListener('touchend', tryAgain);
        retryAttached = false;
        return;
      }
      if(ytPlayer && ytReady){
        try {
          ytPlayer.unMute();
          ytPlayer.setVolume(70);
          ytPlayer.playVideo();
        } catch(e) {}
      }
    };
    document.addEventListener('click', tryAgain);
    document.addEventListener('touchend', tryAgain, { passive: true });
  }

  function createYTPlayer(){
    if(ytPlayer || !window.YT || !window.YT.Player) return;
    const el = document.getElementById('yt-player');
    if(!el) return;
    ytPlayer = new window.YT.Player('yt-player', {
      width: '200',
      height: '113',
      videoId: CFG.youtubeVideoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        loop: 1,
        modestbranding: 1,
        playsinline: 1,
        playlist: CFG.youtubeVideoId,
        rel: 0,
        start: 0
      },
      events: {
        onReady: () => {
          ytReady = true;
          if((pendingPlay || opened) && !userMuted){
            playYouTubeFromStart();
          } else {
            try {
              prebuffering = true;
              ytPlayer.mute();
              ytPlayer.playVideo();
            } catch(e) {
              prebuffering = false;
            }
          }
        },
        onStateChange: (e) => {
          if(!window.YT || !window.YT.PlayerState) return;
          if(e.data === window.YT.PlayerState.PLAYING){
            if(prebuffering && !opened){
              prebuffering = false;
              prebufferedAtZero = true;
              try {
                ytPlayer.pauseVideo();
                ytPlayer.seekTo(0, true);
              } catch(err) {}
              return;
            }
            updateDisc(true);
          } else if(e.data === window.YT.PlayerState.PAUSED || e.data === window.YT.PlayerState.ENDED){
            if(!prebuffering){
              updateDisc(false);
            }
          }
        }
      }
    });
  }

  const prevYTReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    if(typeof prevYTReady === 'function') prevYTReady();
    createYTPlayer();
  };

  if(window.YT && window.YT.Player){
    createYTPlayer();
  } else if(!document.querySelector('script[src*="youtube.com/iframe_api"]')){
    const ytScript = document.createElement('script');
    ytScript.src = 'https://www.youtube.com/iframe_api';
    ytScript.async = true;
    document.body.appendChild(ytScript);
  }

  // Resume playback if browser paused the iframe while switching tabs
  document.addEventListener('visibilitychange', () => {
    if(!document.hidden){
      resumeYouTube();
    }
  });
  window.addEventListener('focus', resumeYouTube);
  window.addEventListener('pageshow', resumeYouTube);

  if(musicBtn){
    musicBtn.addEventListener('click', (e) => {
      if(!opened){
        openInvitation();
        return;
      }
      e.stopPropagation();
      if(!ytPlayer || !ytReady) return;
      try {
        if(isPlaying && !userMuted){
          userMuted = true;
          ytPlayer.mute();
          ytPlayer.pauseVideo();
          updateDisc(false);
        } else {
          userMuted = false;
          ytPlayer.unMute();
          ytPlayer.setVolume(70);
          ytPlayer.playVideo();
          updateDisc(true);
        }
      } catch(err) {}
    });
  }

  /* ---------------- floating petals ---------------- */
  const petalLayer = document.getElementById('petal-layer');
  function makePetal(){
    if(!petalLayer) return;
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    p.setAttribute('viewBox','0 0 20 20');
    p.setAttribute('class','petal');
    p.innerHTML = '<path d="M10 1C13 5 19 7 19 12C19 16 15 19 10 19C5 19 1 16 1 12C1 7 7 5 10 1Z" fill="' + (Math.random() > 0.5 ? '#D4AF37' : '#B76E79') + '" opacity="0.45"/>';
    const size = 8 + Math.random()*14;
    p.style.width = size+'px';
    p.style.height = size+'px';
    p.style.left = Math.random()*100+'%';
    petalLayer.appendChild(p);
    const duration = 12 + Math.random()*10;
    const drift = (Math.random()-0.5)*160;
    if(window.gsap){
      gsap.fromTo(p, { y: -40, rotate: 0, opacity:.55 }, {
        y: window.innerHeight + 60,
        x: '+=' + drift,
        rotate: 360*(Math.random() > 0.5 ? 1 : -1),
        opacity: 0,
        duration: duration,
        ease: 'none',
        onComplete: () => p.remove()
      });
    } else { p.remove(); }
  }
  let petalInterval = null;

  /* ---------------- opening -> main reveal ---------------- */
  const opening = document.getElementById('opening');
  const openingVideo = document.getElementById('opening-video');
  const tapHint = document.getElementById('tap-hint');

  function onTouchEnd(e){
    e.preventDefault();
    openInvitation();
  }

  function openInvitation(){
    if(opened) return;
    opened = true;

    tapHint && tapHint.classList.add('hidden');
    document.removeEventListener('click', openInvitation);
    document.removeEventListener('touchend', onTouchEnd);

    playYouTubeFromStart();
    musicBtn && musicBtn.classList.add('visible');

    setTimeout(() => {
      if(!isPlaying && !userMuted){
        musicBtn && musicBtn.classList.add('needs-tap');
        attachAutoRetry();
      }
    }, 2200);

    if(!openingVideo){
      completeOpening();
      return;
    }

    openingVideo.muted = true;
    openingVideo.volume = 0;

    let started = false;
    const fallbackTimer = setTimeout(() => {
      if(!started) completeOpening();
    }, 4000);

    openingVideo.addEventListener('playing', function onPlaying(){
      started = true;
      clearTimeout(fallbackTimer);
      openingVideo.removeEventListener('playing', onPlaying);
    });

    openingVideo.play().catch(() => {
      openingVideo.load();
      openingVideo.play().catch(() => {
        clearTimeout(fallbackTimer);
        completeOpening();
      });
    });
  }

  if(opening){
    document.addEventListener('click', openInvitation);
    document.addEventListener('touchend', onTouchEnd, { passive: false });
    openingVideo && openingVideo.addEventListener('ended', completeOpening);
  } else {
    initSiteAnimations();
  }

  function completeOpening(){
    if(openingVideo){
      openingVideo.muted = true;
      openingVideo.volume = 0;
    }

    if(window.gsap && opening){
      gsap.to(opening, {
        opacity: 0,
        duration: 0.9,
        ease: 'power2.inOut',
        onComplete: () => {
          opening.style.display = 'none';
          initSiteAnimations();
          musicBtn && musicBtn.classList.add('visible');
          if(!petalInterval){
            petalInterval = setInterval(makePetal, 900);
            for(let i = 0; i < 4; i++) setTimeout(makePetal, i * 250);
          }
        }
      });
    } else {
      if(opening) opening.style.display = 'none';
      initSiteAnimations();
    }
  }

  /* ---------------- scroll animations (post-open) ---------------- */
  let siteInited = false;
  function initSiteAnimations(){
    if(siteInited) return;
    siteInited = true;

    if(window.Lenis){
      const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      if(window.gsap && window.ScrollTrigger){
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
      }
    }

    if(!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('#hero [data-fade]', {
      opacity: 0,
      y: 26,
      duration: 0.95,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });

    document.querySelectorAll('.section [data-fade], .detail-card, .rsvp-wrap').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
  }
})();
`,
  },
];
