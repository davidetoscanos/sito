document.addEventListener("DOMContentLoaded", () => {
    // ============================
    // AOS
    // ============================
    if (typeof AOS !== "undefined") {
        AOS.init();
    }

    // ============================
    // NAVBAR
    // ============================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;

    // Toggle menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });
    }

    // Chiudi menu mobile al click su un link
    if (nav) {
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                if (menuToggle) menuToggle.classList.remove('active');
            });
        });
    }

    // Scroll: colore navbar + mostra/nascondi
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (navbar) {
            // Cambia colore navbar
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('transparent');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.add('transparent');
            }
        }

        lastScrollY = currentScroll;
    });

    // ============================
    // COOKIE BANNER + TERZE PARTI
    // ============================
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const mapContainer = document.getElementById("map-container");
    const videoContainer = document.getElementById("video-container");

    const videoTrattamentoColon = document.getElementById("video-trattamento-colon");
    const videoFeciESalute = document.getElementById("video-feci-e-salute");
    const videoSistemaDigestivo = document.getElementById("video-sistema-digestivo");    

    const mapIframe = `
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2850.0952176722258!2d8.898256799999999!3d44.410691799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d341833447c765%3A0x5c4d059a1b115f1d!2sIdrocolonterapia%20Genova!5e0!3m2!1sit!2sit!4v1754144924669!5m2!1sit!2sit"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    `;

    const videos = [

        {
            id:"video-1",
            title: "Trattamento Idrocolon - Benefici",
            type:"local",
            src:"benefici.mov",
            mime:"video/mp4"
        },
        {
            id:"video-2",
            title: "Trattamento Idrocolon - Macchinario",
            type:"local",
            src:"macchinario.mov",
            mime:"video/mp4"
        },
        {
            id:"video-3",
            title: "Trattamento Idrocolon - Ogni Quanto?",
            type:"local",
            src:"ogni-quanto.mov",
            mime:"video/mp4"
        },

        {
            id:"video-4",
            title: "Trattamento Idrocolon - Pulizia Profonda",
            type:"local",
            src:"pulizia-profonda.mov",
            mime:"video/mp4"
        },

        {
            id:"video-5",
            title: "Trattamento Idrocolon - Gonfiore Addominale?",
            type:"local",
            src:"soffri-di-gonfiore-addominale.mov",
            mime:"video/mp4"
        },
        
        {
            id:"video-6",
            title: "Trattamento Idrocolon - Durata",
            type:"local",
            src:"durata.mov",
            mime:"video/mp4"
        },
        {
            id:"video-7",
            title: "Trattamento Idrocolon - Strumento CleanColon",
            type:"youtube",
            src:"https://www.youtube-nocookie.com/embed/nNS9no1pqEI",
            mime:"video/mp4"
        },
        {
            id:"video-8",
            title: "Trattamento Idrocolon - Feci e Salute",
            type:"local",
            src:"idrocolon-feci-e-salute.mp4",
            mime:"video/mp4"
        },
        {
            id:"video-9",
            title: "Trattamento Idrocolon - Sistema Digestivo",
            type:"local",
            src:"sistema-digestivo.mov",
            mime:"video/mp4"
        }

    ];

    function showVideoPlaceholders() {

        videos.forEach(video => {

            const container = document.getElementById(video.id);

            if (!container) return;

            container.innerHTML = `
            <div class="video-placeholder">
                
                <h3>${video.title}</h3>

                <p>
                    Accetta i cookie per visualizzare questo video.
                </p>
            </div>
        `;

        });

    }

    function loadThirdPartyContent(){

        if(mapContainer)
            mapContainer.innerHTML=mapIframe;

        videos.forEach(video=>{

            const container=document.getElementById(video.id);

            if(!container) return;

            if(video.type==="youtube"){

                container.innerHTML=`
                <h3 class="video-title">${video.title}</h3>
                <iframe
                    src="${video.src}"
                    loading="lazy"
                    allowfullscreen>
                </iframe>
            `;

            }else{

                container.innerHTML = `
                <h3 class="video-title">${video.title}</h3>
                <video controls muted loop loading="lazy" width="100%">
                    <source src="${video.src}">
                    Il tuo browser non supporta il video.
                </video>
            `;
            }

        });

    }


    if (localStorage.getItem("cookiesAccepted") === "true") {

        loadThirdPartyContent();

        if (banner)
            banner.style.display = "none";

    } else {

        showVideoPlaceholders();

        if (banner)
            setTimeout(() => banner.classList.add("show"), 100);

    }

    if (acceptBtn) {
        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("cookiesAccepted", "true");
            loadThirdPartyContent();
            if (banner) {
                banner.classList.remove("show");
                setTimeout(() => banner.style.display = "none", 500);
            }
        });
    }

    // ============================
    // SCROLL FLUIDO PER LINK INTERNI
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetID);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const showBtn=document.getElementById("showMoreVideos");

    if(showBtn){

        showBtn.addEventListener("click",()=>{

            document
                .querySelectorAll(".hidden-video")
                .forEach(video=>{

                    video.style.display="block";

                });

            showBtn.style.display="none";

        });

    }
});