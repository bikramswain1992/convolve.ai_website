let _isShowdownLoaded = false;
let _content = [{"name":"terms","isLoaded":false,"content":""}]


$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    mouseDrag:false,
    autoplay:true,
    animateOut: 'slideOutUp',
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

const headerTexts = document.querySelectorAll(".section-content h1");

const headerObserver = new IntersectionObserver(headers =>{
    headers.forEach(header => {
        if(header.isIntersecting)
            header.target.classList.add("slidein");
    });
},{
    threshold: 0.5
});

headerTexts.forEach(headerText => headerObserver.observe(headerText));

const sectionImages = document.querySelectorAll(".section-image img");

const sectionImageObserver = new IntersectionObserver(sectionImages =>{
    sectionImages.forEach(sectionImage => {
        if(sectionImage.isIntersecting)
            sectionImage.target.classList.add("slidein");
    });
},{
    threshold: 0.5
});

sectionImages.forEach(sectionImage => sectionImageObserver.observe(sectionImage));

const sectionDescriptions = document.querySelectorAll(".section-description p");

const sectionDescriptionObserver = new IntersectionObserver(sectionDescriptions =>{
    sectionDescriptions.forEach(sectionDescription => {
        if(sectionDescription.isIntersecting)
        sectionDescription.target.classList.add("slidein");
    });
},{
    threshold: 0.5
});

sectionDescriptions.forEach(sectionDescription => sectionDescriptionObserver.observe(sectionDescription));

const  popDetails = async (e,modelBody) =>{
    const title = typeof(e) == "string" ? e : $(e).find('.card-title').text();

    if(typeof(e) != "string"){
        modelBody = await getContentFromJson($(e).prop("class").split(" ")[1]);
    }

    $("body").append(`
        <div class="modal fade" id="cardsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                ${modelBody}
                </div>
                <div class="modal-footer">
                
                </div>
            </div>
            </div>
        </div>`
    );
    $("#cardsModal").modal("show");

    var myModal = document.getElementById('cardsModal');

    myModal.addEventListener('hidden.bs.modal', function (event) {
        $("#cardsModal").remove();
    });
}

const getContentFromJson = async (key) =>{
    const data = await fetch(`${location.origin}/content/impact.json`).then(resp => resp.json()).then(data => data[key]);
    return data;
}

const sendQuery = () =>{
    event.preventDefault();
}

const loadJS = () =>{

    $.ajax({
        url: `js/showdown.min.js`,
        async: false,
        dataType: "script",
        success: function(data, textStatus, jqxhr){
        }
    });
}

const loadContent = async (contentName) =>{

    if(!_isShowdownLoaded){
        loadJS();
        _isShowdownLoaded = true;
    }
    
    const contentData = _content.filter(x=>x.name===contentName)[0];

    if(contentData.isLoaded){
        const converter = new showdown.Converter();
        const content = contentData.content;
        const html = converter.makeHtml(content);
        popDetails("Terms & Conditions", html);
    }
    else{
        const converter = new showdown.Converter();
        const content = await fetch(`${location.origin}/content/${contentName}.md`).then(resp => resp.text());
        const html = converter.makeHtml(content);
        popDetails("Terms & Conditions", html);

        const newContent = _content.map(d => {
            if(d.name === contentName){
                return{
                    ...d,
                    isLoaded: true,
                    content: content
                }
            }
            return d;
        });

        _content = [...newContent];
    }
}

const contactUs = () =>{
    const contactUsForm = `<form class="container-fluid contact-form" onsubmit="sendQuery();">
                                <div class="form-group">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="name" placeholder="First Middle Last">
                                </div>
                                <div class="form-group">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="name@example.com">
                                </div>
                                <div class="form-group">
                                    <label for="phone" class="form-label">Phone</label>
                                    <input type="phone" class="form-control" id="phone" placeholder="+91 9999999999">
                                </div>
                                <div class="form-group">
                                    <label for="preferredTime" class="form-label">Preferred time</label>
                                    <input type="time" class="form-control" id="preferredTime" rows="3"></input>
                                </div>
                                <div class="form-group">
                                    <label for="query" class="form-label">Query</label>
                                    <textarea class="form-control" id="query" rows="3"></textarea>
                                </div>
                                <div class="col-md-12 d-flex align-items-center justify-content-center mt-4">
                                    <button class="btn btn-outline-danger m-2">Send</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>`;

    popDetails("Connect with us", contactUsForm);
}