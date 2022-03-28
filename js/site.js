let _isShowdownLoaded = false;
let _content = [{"name":"terms","isLoaded":false,"content":""}]

// Banner carousel
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

//Slide in animation for body
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


//Pop up activation
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

//Content fetching from json
const getContentFromJson = async (key) =>{
    const data = await fetch(`${location.origin}/content/impact.json`).then(resp => resp.json()).then(data => data[key]);
    return data;
}

// Send email with potential user query
const sendQuery = (e) =>{
    event.preventDefault();

    const target = $(e).closest(".contact-form");
    const isValidForm = validateUserQuery(target);

    if(isValidForm){
        sendMail(
            {
                name: $(target).find("#name").val(),
                email: $(target).find("#email").val(),
                phone: $(target).find("#phone").val(),
                preferredTime: $(target).find("#preferredTime").val(),
                query: $(target).find("#query").val()
            }
        );
    }
}

const validateUserQuery = (target) =>{
    let isValid = true;
    $(target).find('.required').each(function(){
        if(!$(this).val()){
            $(this).addClass("error");
            isValid = false;
        }
    });

    return isValid;
}

$(document).on('change','.required',function(){
    $(this).removeClass('error');
});


function _0x2d41(_0x123327,_0x266563){const _0x5a5497=_0x5a54();return _0x2d41=function(_0x2d4135,_0x467a1a){_0x2d4135=_0x2d4135-0xa3;let _0x142c23=_0x5a5497[_0x2d4135];return _0x142c23;},_0x2d41(_0x123327,_0x266563);}function _0x5a54(){const _0x10d6a7=['<h4>New\x20query\x20received\x20from\x20website</h4><br/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<table>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Name</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Email</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Phone</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Preferred\x20time</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Query</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>','4411295AJUNSm','https://api.smtp2go.com/v3/email/send','2710986uIvkWI','2711409qkBtcM','then','9110yfGALc','5dtPxJt','Thank\x20you\x20for\x20sending\x20us\x20your\x20query.\x20Our\x20team\x20would\x20reach\x20back\x20in\x2024hrs.','8vXozdz','14244vMGkRh','POST','data','4mrfBUn','query','26884eplmUm','stringify','name','.btn-close','succeeded','239647blMDoF','We\x20are\x20facing\x20some\x20issue\x20at\x20this\x20time.\x20Please\x20try\x20again\x20later.','click','2537612sxDZip','6sQopug','info@convolveai.in','json','</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>','8055mdBFJL','New\x20query\x20received'];_0x5a54=function(){return _0x10d6a7;};return _0x5a54();}(function(_0x17548a,_0x32cf09){const _0x17b5fd=_0x2d41,_0x2f7841=_0x17548a();while(!![]){try{const _0x3b94b1=parseInt(_0x17b5fd(0xab))/0x1*(-parseInt(_0x17b5fd(0xaf))/0x2)+parseInt(_0x17b5fd(0xb9))/0x3*(parseInt(_0x17b5fd(0xa4))/0x4)+-parseInt(_0x17b5fd(0xbc))/0x5*(parseInt(_0x17b5fd(0xb8))/0x6)+-parseInt(_0x17b5fd(0xb6))/0x7*(parseInt(_0x17b5fd(0xbe))/0x8)+-parseInt(_0x17b5fd(0xb3))/0x9*(parseInt(_0x17b5fd(0xbb))/0xa)+-parseInt(_0x17b5fd(0xae))/0xb+parseInt(_0x17b5fd(0xbf))/0xc*(parseInt(_0x17b5fd(0xa6))/0xd);if(_0x3b94b1===_0x32cf09)break;else _0x2f7841['push'](_0x2f7841['shift']());}catch(_0x16853b){_0x2f7841['push'](_0x2f7841['shift']());}}}(_0x5a54,0x7ce25));const sendMail=async _0x2cd5cc=>{const _0x1f15c8=_0x2d41,_0x57310f={'api_key':'api-6182874AAE4911EC9457F23C91C88F4E','to':[_0x1f15c8(0xb0)],'sender':_0x1f15c8(0xb0),'subject':_0x1f15c8(0xb4),'html_body':_0x1f15c8(0xb5)+_0x2cd5cc[_0x1f15c8(0xa8)]+_0x1f15c8(0xb2)+_0x2cd5cc['email']+'</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>'+_0x2cd5cc['phone']+_0x1f15c8(0xb2)+_0x2cd5cc['preferredTime']+'</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>'+_0x2cd5cc[_0x1f15c8(0xa5)]+'</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'},_0x44308f=await fetch(_0x1f15c8(0xb7),{'method':_0x1f15c8(0xc0),'body':JSON[_0x1f15c8(0xa7)](_0x57310f)})[_0x1f15c8(0xba)](_0x2299a4=>_0x2299a4[_0x1f15c8(0xb1)]());$(_0x1f15c8(0xa9))[_0x1f15c8(0xad)]();if(_0x44308f[_0x1f15c8(0xa3)][_0x1f15c8(0xaa)]&&_0x44308f[_0x1f15c8(0xa3)][_0x1f15c8(0xaa)]>0x0)alert(_0x1f15c8(0xbd));else alert(_0x1f15c8(0xac));};


//Javascript file loading on demand
const loadJS = () =>{

    $.ajax({
        url: `js/showdown.min.js`,
        async: false,
        dataType: "script",
        success: function(data, textStatus, jqxhr){
        }
    });
}

// Loading content from markdown files
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

// Contact us form pop-up body creation
const contactUs = () =>{
    const contactUsForm = `<form class="container-fluid contact-form" onsubmit="sendQuery();">
                                <div class="form-group">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control required" id="name" placeholder="First Middle Last">
                                </div>
                                <div class="form-group">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control required" id="email" placeholder="name@example.com">
                                </div>
                                <div class="form-group">
                                    <label for="phone" class="form-label">Phone</label>
                                    <input type="phone" class="form-control required" id="phone" placeholder="+91 9999999999">
                                </div>
                                <div class="form-group">
                                    <label for="preferredTime" class="form-label">Preferred time</label>
                                    <input type="time" class="form-control required" id="preferredTime" rows="3"></input>
                                </div>
                                <div class="form-group">
                                    <label for="query" class="form-label">Query</label>
                                    <textarea class="form-control required" id="query" rows="3"></textarea>
                                </div>
                                <div class="col-md-12 d-flex align-items-center justify-content-center mt-4">
                                    <button class="btn btn-outline-danger m-2" onclick="sendQuery(this)">Send</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>`;

    popDetails("Connect with us", contactUsForm);
}